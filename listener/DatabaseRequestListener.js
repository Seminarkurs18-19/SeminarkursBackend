const app = require('../app.js');
const databaseRequest = require('../functions/DatabaseRequest.js');
const login = require('../functions/Login.js');
const session = require('../functions/Session.js');

this.listenForItems = function (socket) {

    socket.on('artikel.get', function (data) {
        session.checkSessionId(data.session_id, "artikel.get").then((res) => {
            if (res) {
                var condition = String('ARTIKEL_ID = "' + data.condition + '"'),
                    choosedColumns = '*',
                    choosedTable = 'Artikel';
                let sqlData = {choosedColumns, choosedTable, condition};
                databaseRequest.select(sqlData).then((result) => {
                    if (result.length === 0) result = "Keine Ergebnisse";
                    console.log("Result für 'artikel.get':");
                    console.log(result);
                    socket.emit('artikel.get.result', result)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'artikel.get':");
                console.log(result);
                var message = {result};
                socket.emit('artikel.get.result', message)
            }
        })
    });
    socket.on('item.get', function (data) {
        session.checkSessionId(data.session_id, "item.get").then((res) => {
            if (res) {
                var condition = String('i.ITEM_ID = "' + data.condition + '" ' +
                    'AND i.ARTIKEL_ID = a.ARTIKEL_ID'),
                    choosedColumns = '*',
                    choosedTable = 'Item_from_Artikel i, Artikel a';
                console.log(condition);
                let sqlData = {choosedColumns, choosedTable, condition};
                databaseRequest.select(sqlData).then((result) => {
                    if (result.length === 0) result = "Keine Ergebnisse";
                    console.log("Result für 'item.get':");
                    console.log(result);
                    socket.emit('item.get.result', result)
                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'item.get':");
                console.log(result);
                var message = {result};
                socket.emit('item.get.result', message)
            }
        })
    });
    socket.on('artikel.search', function (data) {
        session.checkSessionId(data.session_id, "artikel.search").then((res) => {
            if (res) {
                var condition = String(
                    'a.Art_Bez LIKE "%' + data.condition + '%"'),
                    choosedColumns = 'a.*',
                    choosedTable = 'Artikel a';

                let sqlData = {choosedColumns, choosedTable, condition};

                databaseRequest.select(sqlData).then((result) => {
                    if (result.length === 0) result = "Keine Ergebnisse";
                    console.log("Result für 'artikel.search':");
                    console.log(result);
                    socket.emit('artikel.search.result', result)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'artikel.search':");
                console.log(result);
                var message = {result};
                socket.emit('artikel.search.result', [])
            }
        })
    });
    socket.on('get.comment.item', function (data) {
        session.checkSessionId(data.session_id, "get.comment.item").then((res) => {
            if (res) {
                var condition = String('c.ITEM_ID = "' + data.condition + '" AND c.Benutzer_Nr = b.Benutzer_Nr'),
                    choosedTable = 'Comment_on_Item c, Benutzer b';
                choosedColumns = 'c.*, b.Abteilung, b.Benutzername';
                let sqlData = {choosedTable, condition, choosedColumns};
                databaseRequest.select(sqlData).then((result) => {
                    console.log("Result für 'get.comment.item':");
                    message = {result};
                    console.log(message);
                    socket.emit('get.comment.item.result', message)
                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'get.comment.item':");
                console.log(result);
                var message = {result};
                socket.emit('get.comment.item.result', message)
            }
        })
    });
    socket.on('user.check.session', function (data) {
        console.log(data);
        session.checkSessionId(data.session_id, "user.check.session").then((res) => {
            var message;
            if (res) {
                message = {result: true};
                console.log(message);
                socket.emit('user.check.session.result', message)
            } else {
                message = {result: false};

                socket.emit('user.check.session.result', message)
            }
        });
    });
    socket.on('usertable.get', function (data) {
        session.checkSessionId(data.session_id, "usertable.get").then((res) => {
            if (res) {
                if(data.condition === undefined || data.condition === null){
                    data.condition = "Benutzer_Nr > 0"
                }
                var condition = data.condition,
                    choosedColumns = '*',
                    choosedTable = 'Benutzer';
                let sqlData = {choosedColumns, choosedTable, condition};
                databaseRequest.select(sqlData).then((result) => {
                    if (result.length === 0) result = "Keine Ergebnisse";
                    console.log("Result für 'usertable.get':");
                    console.log(result);
                    socket.emit('usertable.get.result', result)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'usertable.get':");
                console.log(result);
                var message = {result};
                socket.emit('usertable.get.result', message)
            }
        })
    });
    socket.on('articletable.get', function (data) {
        session.checkSessionId(data.session_id, "articletable.get").then((res) => {
            if (res) {
                if(data.condition === undefined || data.condition === null){
                    data.condition = "ARTIKEL_ID > 0"
                }
                var condition = data.condition,
                    choosedColumns = '*',
                    choosedTable = 'Artikel';
                let sqlData = {choosedColumns, choosedTable, condition};
                databaseRequest.select(sqlData).then((result) => {
                    if (result.length === 0) result = "Keine Ergebnisse";
                    console.log("Result für 'articletable.get':");
                    console.log(result);
                    socket.emit('articletable.get.result', result)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'articletable.get':");
                console.log(result);
                var message = {result};
                socket.emit('articletable.get.result', message)
            }
        })
    });
    socket.on('sessiontable.get', function (data) {
        session.checkSessionId(data.session_id, "sessiontable.get").then((res) => {
            if (res) {
                if(data.condition === undefined || data.condition === null){
                    data.condition = "Benutzer_Nr > 0"
                }
                var condition = data.condition,
                    choosedColumns = '*',
                    choosedTable = 'Sitzungen';
                let sqlData = {choosedColumns, choosedTable, condition};
                databaseRequest.select(sqlData).then((result) => {
                    if (result.length === 0) result = "Keine Ergebnisse";
                    console.log("Result für 'sessiontable.get':");
                    console.log(result);
                    socket.emit('sessiontable.get.result', result)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'sessiontable.get':");
                console.log(result);
                var message = {result};
                socket.emit('sessiontable.get.result', message)
            }
        })
    });
    socket.on('article.insert', function (data) {
        session.checkSessionId(data.session_id, "article.insert").then((res) => {
            if (res) {
                var values = String('"'+data.artikel_id +'", "'+ data.art_Bez+'", "'+ data.pdf_link +'", "'+
                                    data.material +'", "'+ data.kunde+'", "'+data.erstellung+'", "'+data.gewicht+'", "'+data.zulieferer+'"'),
                    columns = 'ARTIKEL_ID, Art_Bez, PDF_link, Material, Kunde, Erstellung, Gewicht, Zulieferer',
                    choosedTable = 'Artikel';
                let sqlData = {columns, choosedTable, values};
                databaseRequest.insert(sqlData).then((result) => {
                    result.result = "Artikel wurde hinzugefügt";
                    console.log("Result für 'article.insert':");
                    console.log(result);
                    socket.emit('article.insert.result', result)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'article.insert':");
                console.log(result);
                var message = {result};
                socket.emit('article.insert.result', message)
            }
        })
    });

};
