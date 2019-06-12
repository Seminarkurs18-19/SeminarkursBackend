const app = require('../app.js');
const databaseRequest = require('../functions/DatabaseRequest.js');
const login = require('../functions/Login.js');

this.listenForItems = function (socket) {

    socket.on('get_item_by_item', function (data) {
        console.log(data);
        app.connection.query('SELECT ARTIKEL_ID FROM Item_from_Artikel WHERE ITEM_ID = ?', [data.ITEM_ID], (e, rows) => {
            if (e) throw e;
            console.log(rows);
            app.connection.query('SELECT * FROM Artikel WHERE ARTIKEL_ID = ?', [rows.ARTIKEL_ID], (e, result) => {
                if (e) throw e;
                console.log(result);
                socket.emit('send_item_by_item', result);
            });
        });
    });

    socket.on('ask_table', function (data) {
        console.log("55:");
        console.log(data);

        //Verarbeitung
        script.ask_table(data, app.connection).then((result) => {
            console.log("60:");
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('get_table', result);
            console.log("65:");
            console.log(result);
        }).catch((e) => {
            throw e;
        });
    });
    socket.on('item.get', function (data) {

        var condition = String('i.ITEM_ID = "' + data.condition + '" ' +
            'OR i.ARTIKEL_ID = "' + data.condition + '" ' +
            'OR a.Art_Bez = "' + data.condition + '"' +
            'AND i.ARTIKEL_ID = a.ARTIKEL_ID'),
            choosedColumns = '*',
            choosedTable = 'Item_from_Artikel i, Artikel a';

        let sqlData = {choosedColumns, choosedTable, condition};
        databaseRequest.select(sqlData).then((result) => {
            if (result.length === 0) result = "Keine Ergebnisse";
            console.log("Result für 'item.get':");
            console.log(result);
            socket.emit('item.get.result', result)

        }).catch((e) => {
            throw e;
        });
    });
    socket.on('item.search', function (data) {

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
    });
};