const app = require('../app.js');
const login = require('../functions/Login.js');
const session = require('../functions/Session.js');
const databaseRequest = require('../functions/DatabaseRequest.js');

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
                var heute = new Date();
                var date = heute.getDay() + '.' + heute.getMonth() + '.' + heute.getFullYear() + ', ' +
                    heute.getHours() + ':' + heute.getMinutes() + ':' + heute.getSeconds();

                var values = String('"' + data.bezeichnung + '", "' + data.kommentar +
                    '", "' + date + '", "' + data.item + '"'),
                    columns = 'Com_Bez, Comment, Timestomp, ITEM_ID',
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
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'user.comment':");
                console.log(result);
                var message = {result};
                socket.emit('user.comment.result', message)
            }
        })
    });
};



