const app = require('../app.js');
const databaseRequest = require('../functions/DatabaseRequest.js');
const login = require('../functions/Login.js');

this.listenForItems = function (socket) {


    socket.on('artikel.get', function (data) {

        var condition = String('ARTIKEL_ID = "' + data.condition + '"'),
            choosedColumns = '*',
            choosedTable = 'Artikel';
        console.log(condition);
        let sqlData = {choosedColumns, choosedTable, condition};
        databaseRequest.select(sqlData).then((result) => {
            if (result.length === 0) result = "Keine Ergebnisse";
            console.log("Result für 'artikel.get':");
            console.log(result);
            socket.emit('artikel.get.result', result)

        }).catch((e) => {
            throw e;
        });
    });
    socket.on('item.get', function (data) {

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