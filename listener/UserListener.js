const app = require('../app.js');
const login = require('../functions/Login.js');
const session = require('../functions/Session.js');
const databaseRequest = require('../functions/DatabaseRequest.js');
const fs = require('fs');

this.listenForUser = function (socket) {

    socket.on('user.registration', function (data) { //Funktion user.registration
        /**
         * Inputs = reg_PW und reg_BN
         * Output = "registriert" oder "nicht registriert"
         */
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
    socket.on('user.login', function (data) {   //Funktion user.login
        /**
         * Inputs = log_PW und log_BN
         * Output = SessionID oder "nicht Angemeldet"
         */
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
    socket.on('user.username.change', function (data) {   //Funktion user.username.change
        /**
         * Inputs = session_id, log_PW, log_BN und newUsername
         * Output = BN geändert oder Fehlermeldung
         */
        session.checkSessionId(data.session_id, "user.username.change").then((res) => {
            if (res) {
                //Verarbeitung
                login.login(data).then((result) => {
                    if (result.result === "Passwort stimmt überein") {
                        if (data.newUsername === null || data.newUsername === undefined || data.newUsername.length === 0) {
                            result.result = "Diese Form von Benutzername ist nicht erlaubt";
                            console.log("Result von 'user.username.change'");
                            console.log(result);
                            socket.emit('user.username.change.result', result);
                        } else {
                            var condition = String('Benutzername = "' + data.log_BN + '"'),
                                columnsAndValues = 'Benutzername = "' + data.newUsername + '"',
                                choosedTable = 'Benutzer';
                            let sqlData = {columnsAndValues, choosedTable, condition};
                            databaseRequest.update(sqlData).then((result) => {
                                result = "Benutzername wurde geändert";
                                console.log("Result für 'user.username.change':");
                                console.log(result);
                                var message = {result};
                                socket.emit('user.username.change.result', message)

                            }).catch((e) => {
                                throw e;
                            });
                        }
                    } else {
                        console.log("Result von 'user.username.change'");
                        console.log(result);
                        socket.emit('user.username.change.result', result);
                    }
                }).catch((e) => {
                    throw e;
                });
            }
        })
    });
    socket.on('user.password.change', function (data) {   //Funktion user.password.change
        /**
         * Inputs = session_id, log_PW, log_BN und newPassword
         * Output = PW geändert oder Fehlermeldung
         */
        session.checkSessionId(data.session_id, "user.password.change").then((res) => {
            if (res) {
                //Verarbeitung
                login.login(data).then((result) => {
                    if (result.result === "Passwort stimmt überein") {
                        if (data.newPassword === null || data.newPassword === undefined || data.newPassword.length === 0) {
                            result.result = "Diese Form von Passwort ist nicht erlaubt";
                            console.log("Result von 'user.password.change'");
                            console.log(result);
                            socket.emit('user.password.change.result', result);
                        } else {
                            login.createCrypto(data.newPassword).then((hash) => {
                                var condition = String('Benutzername = "' + data.log_BN + '"'),
                                    columnsAndValues = 'Passwort = "' + hash + '"',
                                    choosedTable = 'Benutzer';
                                let sqlData = {columnsAndValues, choosedTable, condition};
                                databaseRequest.update(sqlData).then((result) => {
                                    result = "Passwort wurde geändert";
                                    console.log("Result für 'user.password.change':");
                                    console.log(result);
                                    var message = {result};
                                    socket.emit('user.password.change.result', message)

                                }).catch((e) => {
                                    throw e;
                                });
                            }).catch((e) => {
                                throw e;
                            })
                        }
                    } else {
                        console.log("Result von 'user.password.change'");
                        console.log(result);
                        socket.emit('user.password.change.result', result);
                    }
                }).catch((e) => {
                    throw e;
                });
            }
        })
    });
    socket.on('user.department.change', function (data) {   //Funktion user.department.change
        /**
         * Inputs = session_id, log_PW, log_BN und newDepartment
         * Output = Abteilung geändert oder Fehlermeldung
         */
        session.checkSessionId(data.session_id, "user.department.change").then((res) => {
            if (res) {
                //Verarbeitung
                login.login(data).then((result) => {
                    if (result.result === "Passwort stimmt überein") {
                        if (data.newDepartment === null || data.newDepartment === undefined || data.newDepartment.length === 0) {
                            result.result = "Diese Form von Abteilung ist nicht erlaubt";
                            console.log("Result von 'user.department.change'");
                            console.log(result);
                            socket.emit('user.username.change.result', result);
                        } else {
                            var condition = String('Benutzername = "' + data.log_BN + '"'),
                                columnsAndValues = 'Abteilung = "' + data.newDepartment + '"',
                                choosedTable = 'Benutzer';
                            let sqlData = {columnsAndValues, choosedTable, condition};
                            databaseRequest.update(sqlData).then((result) => {
                                result = "Abteilung wurde geändert";
                                console.log("Result für 'user.department.change':");
                                console.log(result);
                                var message = {result};
                                socket.emit('user.department.change.result', message)

                            }).catch((e) => {
                                throw e;
                            });
                        }
                    } else {
                        console.log("Result von 'user.department.change'");
                        console.log(result);
                        socket.emit('user.department.change.result', result);
                    }
                }).catch((e) => {
                    throw e;
                });
            }
        })
    });
    socket.on('user.comment', function (data) { //Funktion user.comment
        /**
         * Inputs = item, kommentar, sessionID
         * Output = Kommentar gespeichert
         */
        session.checkSessionId(data.session_id, "user.comment").then((res) => {
            if (res) {
                var bezeichnung = "";
                fs.readFile('randoms.txt', 'utf8', ((err, data1) => {
                    if (err) bezeichnung = "Kann nicht's";
                    databaseRequest.select({
                        choosedTable: 'Benutzer b, Sitzungen s',
                        choosedColumns: 'b.Benutzername, b.Benutzer_Nr',
                        condition: `s.Sitzungs_ID = "${data.session_id}" AND b.Benutzer_Nr = s.Benutzer_Nr`
                    }).then((result) => {
                        console.log(result);
                        var randoms = data1.split(';');
                        bezeichnung = result[0]['Benutzername'] + ', ' + Math.round(Math.random() * 50 + 10) + ', ' + randoms[Math.round(Math.random() * randoms.length)];
                        var values = String('"' + bezeichnung + '", "' + data.kommentar +
                            '", "' + data.item + '", ' + result[0]['Benutzer_Nr']),
                            columns = 'Com_Bez, Comment, ITEM_ID, Benutzer_Nr',
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
    socket.on('session.user.get', function (data) { //Funktion session.user.get
        /**
         * Inputs = sessionID
         * Output = Rollenname, Benutzername, Abteilung, Benutzernummer
         */
        session.checkSessionId(data.session_id, "session.user.get").then((res) => {
            if (res) {
                var condition = String('Sitzungs_ID = "' + data.session_id +
                    '" AND s.Benutzer_Nr = b.Benutzer_Nr AND b.Rollen_Nr = r.Rollen_Nr'),
                    choosedColumns = 'b.Benutzername, b.Abteilung, r.Rollen_Name, r.Rollen_Nr, b.Benutzer_Nr',
                    choosedTable = 'Benutzer b, Sitzungen s, Rolle r';
                let sqlData = {choosedColumns, choosedTable, condition};
                databaseRequest.select(sqlData).then((result) => {
                    //console.log("Result für 'session.user.get':");
                    //console.log(result);
                    var message = {result};
                    socket.emit('session.user.get.result', message)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'session.user.get':");
                console.log(result);
                message = {result};
                socket.emit('session.user.get.result', message)
            }
        })
    });
    socket.on('user.delete', function (data) { //Funktion user.delete
        /**
         * Inputs = sessionID, Benutzername
         * Output = Rollenname, Benutzername, Abteilung, Benutzernummer
         */
        session.checkSessionId(data.session_id, "user.delete").then((res) => {
            if (res) {
                var condition = String('b.Benutzername = "' + data.Benutzername + '" AND b.Benutzer_Nr = s.Benutzer_Nr'),
                    choosedTable = 'Benutzer b, Sitzungen s';
                let sqlData = {choosedTable, condition};
                databaseRequest.delete(sqlData).then((result) => {
                    result.result = 'Der Benutzer "' + data.Benutzername + '" wurde gelöscht';
                    console.log("Result für 'user.delete':");
                    console.log(result);
                    var message = {result};
                    socket.emit('user.delete.result', message)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'user.delete':");
                console.log(result);
                message = {result};
                socket.emit('user.delete.result', message)
            }
        })
    });
};



