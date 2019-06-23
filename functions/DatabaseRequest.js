const app = require('../app.js');

this.select = (data) => { //Funktion für Select Abfragen auf der Datenbank
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT ' + data.choosedColumns + ' FROM ' + data.choosedTable + ' WHERE ' + data.condition, function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    })
};

this.insert = (data) => { //Funktion für Inserts auf die Datenbank
    return new Promise((resolve, reject) => {
        app.connection.query(`INSERT INTO ${data.choosedTable} (${data.columns}) VALUES (${data.values})`, function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    });
};

this.delete = (data) => { //Funktion für Datenlöschung
    return new Promise((resolve, reject) => {
        app.connection.query(`DELETE FROM ${data.choosedTable} WHERE ${data.condition}`, function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    });
};

this.update = (data) => { //Funktion für Datenupdate
    return new Promise((resolve, reject) => {
        app.connection.query(`UPDATE ${data.choosedTable} SET ${data.columnsAndValues} WHERE ${data.condition}`, function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    })
};
