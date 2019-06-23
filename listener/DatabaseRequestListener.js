const app = require('../app.js');
const databaseRequest = require('../functions/DatabaseRequest.js');
const login = require('../functions/Login.js');
const session = require('../functions/Session.js');

this.listenForItems = function (socket) {

    socket.on('artikel.get', function (data) {              //Funktion artikel.get
        /**
         * Inputs = condition = ArtikelID
         * Output = Der gesuchte Artikel
         */
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
    socket.on('item.get', function (data) {                 //Funktion item.get
        /**
         * Inputs = condition = ItemID
         * Output = Das gesuchte Item
         */
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
    socket.on('item.search', function (data) {              //Funktion item.search
        /**
         * Inputs = condition = ItemID oder ArtikelID oder Artikelbezeichnung
         * Output = Alle Ergebnisse
         */
        session.checkSessionId(data.session_id, "item.search").then((res) => {
            if (res) {
                var condition = String('i.ITEM_ID LIKE "%' + data.condition + '%" ' +
                    'OR i.ARTIKEL_ID LIKE "%' + data.condition + '%" ' +
                    'OR a.Art_Bez LIKE "%' + data.condition + '%"' +
                    'AND i.ARTIKEL_ID = a.ARTIKEL_ID'),
                    choosedColumns = '*',
                    choosedTable = 'Item_from_Artikel i, Artikel a';

                let sqlData = {choosedColumns, choosedTable, condition};

                databaseRequest.select(sqlData).then((result) => {
                    if (result.length === 0) result = "Keine Ergebnisse";
                    console.log("Result für 'item.search':");
                    console.log(result);
                    socket.emit('item.search.result', result)

                }).catch((e) => {
                    throw e;
                });
            } else {
                var result = "Nicht ausreichende Berechtigung";
                console.log("Result für 'item.search':");
                console.log(result);
                var message = {result};
                socket.emit('item.search.result', message)
            }
        })
    });
    socket.on('get.comment.item', function (data) {       //Funktion get.comment.item
        /**
         * Inputs = condition = ItemID
         * Output = Alle Kommentare zu diesem Item
         */
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
};
