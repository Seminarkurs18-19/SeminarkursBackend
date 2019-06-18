const app = require('../app.js');

this.select = function (data) {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT ' + data.choosedColumns + ' FROM ' + data.choosedTable + ' WHERE ' + data.condition, function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    }).catch((e) => {
        throw e;
    });
};

this.insert = (data) => {
    return new Promise((resolve, reject) => {
        app.connection.query(`INSERT INTO ${data.choosedTable} (${data.columns}) VALUES (${data.values})`, function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    });
};

this.delete = (data) => {
    return new Promise((resolve, reject) => {
        app.connection.query(`DELETE FROM ${data.choosedTable} WHERE ${data.condition}`, function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    });
};

this.update = (data) => {
    return new Promise((resolve, reject) => {
        app.connection.query(`UPDATE ${data.choosedTable} SET ${data.columnsAndValues} WHERE ${data.condition}`, function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    })
};
