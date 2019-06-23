const app = require('../app.js');
const login = require('../functions/Login.js');
const session = require('../functions/Session.js');
const databaseRequest = require('../functions/DatabaseRequest.js');
const fs = require('fs');

this.listenForUser = function (socket) {

    socket.on('user.registration', function (data) {
        //Verarbeitung
        login.registration(data).then((result) => {
            console.log("Result von 'user.registration'");
            console.log(result);
            //Ergebnisse zurücksenden
            socket.emit('user.registration.result', result);
        }).catch((e) => {
            throw e;
        });
    });
    socket.on('user.login', function (data) {
        //Verarbeitung
        login.login(data).then((result) => {
            console.log("Result von 'user.login'");
            console.log(result);
            //Ergebnisse zurücksenden
            socket.emit('user.login.result', result);
        }).catch((e) => {
            throw e;
        });

    });
    socket.on('user.comment', function (data) {
        session.checkSessionId(data.session_id, "user.comment").then((res) => {
            if (res) {
                var bezeichnung = "";
                fs.readFile('randoms.txt', 'utf8', ((err, data1) => {
                    if (err) bezeichnung = "Kann nicht's";
                    databaseRequest.select({
                        choosedTable: 'Benutzer b, Sitzungen s',
                        choosedColumns: 'b.Benutzername',
                        condition: `s.Sitzungs_ID = "${data.session_id}" AND b.Benutzer_Nr = s.Benutzer_Nr`
                    }).then((result) => {
                        var randoms = data1.split(';');
                        bezeichnung = result[0]['Benutzername'] + ', ' + Math.round(Math.random() * 50 + 10) + ', ' + randoms[Math.round(Math.random() * randoms.length)];
                        var values = String('"' + bezeichnung + '", "' + data.kommentar +
                            '", "' + data.item + '"'),
                            columns = 'Com_Bez, Comment, ITEM_ID',
                            choosedTable = 'Comment_on_Item';
                        let sqlData = {columns, choosedTable, values};
                        databaseRequest.insert(sqlData).then((result) => {
                            result = "Kommentar wurde gespeichert";
                            console.log("Result für 'user.comment':");
                            console.log(result);
                            var message = {result};
                            socket.emit('user.comment.result', message)

                        }).catch((e) => {
                            throw e;
                        });
                    }).catch((e) => {
                        throw e;
                    });

                }));
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'user.comment':");
                console.log(result);
                var message = {result};
                socket.emit('user.comment.result', message)
            }
        })
    });
    socket.on('session.user.get', function (data) {
        session.checkSessionId(data.session_id, "session.user.get").then((res) => {
            if (res) {
                var condition = String('Sitzungs_ID = "' + data.session_id +
                    '" AND s.Benutzer_Nr = b.Benutzer_Nr AND b.Rollen_Nr = r.Rollen_Nr'),
                    choosedColumns = 'b.*, r.Rollen_Name',
                    choosedTable = 'Benutzer b, Sitzungen s, Rolle r';
                let sqlData = {choosedColumns, choosedTable, condition};
                databaseRequest.select(sqlData).then((result) => {
                    console.log("Result für 'session.user.get':");
                    console.log(result);
                    var message = {result};
                    socket.emit('session.user.get.result', message)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'session.user.get':");
                console.log(result);
                var message = {result};
                socket.emit('session.user.get.result', message)
            }
        })
    });

};



