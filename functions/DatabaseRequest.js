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

this.insert = (table, columns, values) => {
    return new Promise((resolve, reject) => {
        app.connection.query('INSERT INTO ? (?) VALUES (?)', [table, columns, values], function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    });
};

this.delete = (table, condition) => {
    return new Promise((resolve, reject) => {
        app.connection.query(`DELETE FROM ${table} WHERE ?`, [condition], function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    });
};

this.update = (table, columnsAndValues, condition) => {
    return new Promise((resolve, reject) => {
        app.connection.query(`UPDATE ${table} SET ${columnsAndValues} WHERE ?`, [condition], function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    })
};
