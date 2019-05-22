const session = require('./session.js');
const app = require('../app.js');

this.ask_table = function (table) {
    return new Promise((resolve, reject) => {
        console.log(table);
        session.checkSessionId(table.Sitzungs_ID).then((res) => {
            if (res == 1 || res == 2 || res == 3) {
                app.connection.query('SELECT * FROM ' + table,
                    function (e, rows) {
                        if (e) reject(e);
                        resolve(rows);
                    });
            } else {
                table.result = "Zugriff nicht erlaubt";
            }
        }).catch((e) => {
            reject(e);
        });
    });
};


this.insert = (data) => {
    return new Promise((resolve, reject) => {
        session.checkSessionId(data.Sitzungs_ID).then((res) => {
            if (res == 1 || res == 2 || res == 3) {
                app.connection.query('INSERT INTO ' + data.insert_table + '(' + data.insert_columns + ') ' +
                    'VALUES(' + data.insert_values + ')', function (e, rows) {
                    if (e) reject(e);
                    resolve(rows);
                });
            } else {
                data.result = "Zugriff nicht erlaubt";
            }
        }).catch((e) => {
            reject(e);
        });
    });
};

//TODO delete_condition muss vorab erstellt werden
this.delete = (data) => {
    return new Promise((resolve, reject) => {
        session.checkSessionId(data.Sitzungs_ID).then((res) => {
            if (res == 1 || res == 2 || res == 3) {
                app.connection.query('DELETE FROM "' + data.delete_table + '" WHERE "' +
                    data.delete_condition + '"', function (e, rows) {
                    if (e) reject(e);
                    resolve(rows);
                });
            } else {
                data.result = "Zugriff nicht erlaubt";
            }
        }).catch((e) => {
            reject(e);
        });
    })
};

//TODO update_rowa_values zusammenngesetzter Befehl aus n * (Spalte = "Value") muss vorab abgefragt werden
//TODO update_condition ist "not needed", deshalb das WHERE innerhalb des Befehls, WENN es nötig ist!

this.update = (data) => {
    return new Promise((resolve, reject) => {
        session.checkSessionId(data.Sitzungs_ID).then((res) => {
            if (res == 1 || res == 2 || res == 3) {
                app.connection.query('UPDATE ' + data.update_table + ' SET ' +
                    data.update_rows_values + ' '/*WHERE + */ + data.update_condition, function (e, rows) {
                    if (e) reject(e);
                    resolve(rows);
                });
            } else {
                data.result = "Zugriff nicht erlaubt";
            }
        }).catch((e) => {
            reject(e);
        });
    })
};
