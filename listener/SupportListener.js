const app = require('../app.js');
const session = require('../functions/Session.js');
const databaseRequest = require('../functions/DatabaseRequest.js');

this.listenForSupport = function (socket) {

    socket.on('chat_emit', function (data) {
        app.io.sockets.emit('chat_send', data);
    });
    socket.on('support.available', function (data) {
        session.checkSessionId(data.session_id, "support.available").then((res) => {
            if (res) {
                var condition = String('Sitzungs_ID = "' + data.session_id + '"'),
                    choosedColumns = 'Benutzer_Nr',
                    choosedTable = 'Sitzungen';

                let sqlData1 = {choosedColumns, choosedTable, condition};
                databaseRequest.select(sqlData1).then((result) => {

                    var condition = String('Benutzer_Nr = ' + result[0]["Benutzer_Nr"]),
                        columnsAndValues = 'Status = "available"',
                        choosedTable = 'Benutzer';

                    let sqlData2 = {columnsAndValues, choosedTable, condition};

                    databaseRequest.update(sqlData2).then((result) => {
                        result = "Status wurde aktualisiert";
                        message = {result};
                        console.log("Result für 'support.available':");
                        console.log(result);
                        socket.emit('support.available.result', message)

                    }).catch((e) => {
                        throw e;
                    });
                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'support.available':");
                console.log(result);
                var message = {result};
                socket.emit('support.available.result', message)
            }
        })
    });
    socket.on('support.away', function (data) {
        session.checkSessionId(data.session_id, "support.away").then((res) => {
            if (res) {
                var condition = String('Sitzungs_ID = "' + data.session_id + '"'),
                    choosedColumns = 'Benutzer_Nr',
                    choosedTable = 'Sitzungen';

                let sqlData1 = {choosedColumns, choosedTable, condition};
                databaseRequest.select(sqlData1).then((result) => {

                    var condition = String('Benutzer_Nr = ' + result[0]["Benutzer_Nr"]),
                        columnsAndValues = 'Status = "away"',
                        choosedTable = 'Benutzer';

                    let sqlData2 = {columnsAndValues, choosedTable, condition};

                    databaseRequest.update(sqlData2).then((result) => {
                        result = "Status wurde aktualisiert";
                        message = {result};
                        console.log("Result für 'support.away':");
                        console.log(result);
                        socket.emit('support.away.result', message)

                    }).catch((e) => {
                        throw e;
                    });
                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'support.away':");
                console.log(result);
                var message = {result};
                socket.emit('support.away.result', message)
            }
        })
    });
    socket.on('update.role', function (data) {
        session.checkSessionId(data.session_id, "update.role").then((res) => {
            if (res) {
                var condition = String('Benutzer_Nr = "' + data.user + '" OR Benutzername = "' + data.user + '"'),
                    columnsAndValues = 'Rollen_Nr = "' + data.role + '"',
                    choosedTable = 'Benutzer';
                let sqlData = {columnsAndValues, choosedTable, condition};
                databaseRequest.update(sqlData).then((result) => {
                    result = "Rolle wurde aktualisiert";
                    console.log("Result für 'update.role':");
                    console.log(result);
                    message = {result};
                    socket.emit('update.role.result', message)
                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'update.role':");
                console.log(result);
                var message = {result};
                socket.emit('update.role.result', message)
            }
        })
    });
    socket.on('delete.comment', function (data) {
        session.checkSessionId(data.session_id, "delete.comment").then((res) => {
            if (res) {
                var condition = String('COMMENT_ID = "' + data.condition + '"'),
                    choosedTable = 'Comment_on_Item';

                let sqlData = {choosedTable, condition};
                databaseRequest.delete(sqlData).then((result) => {
                    result = "Kommentar wurde gelöscht";
                    console.log("Result für 'delete.comment':");
                    console.log(result);
                    message = {result};
                    socket.emit('delete.comment.result', message)
                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'delete.comment':");
                console.log(result);
                var message = {result};
                socket.emit('delete.comment.result', message)
            }
        })
    });
};