this.ask_table = function (table, connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ' + table,
            function (e, rows) {
                if (e) reject(e);
                resolve(rows);
            });
    });
};


this.insert = (data, connection) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO ' + data.insert_table + '(' + insert_columns + ') ' +
            'VALUES (' + insert_values + ')', function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    })
};

//TODO delete_condition muss vorab erstellt werden
this.delete = (data, connection) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM ' + data.delete_table + ' WHERE "' +
            data.delete_condition + '"', function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    })
};
//TODO update_rowa_values zusammenngesetzter Befehl aus n * (Spalte = "Value") muss vorab abgefragt werden
//TODO update_condition ist "not needed", deshalb das WHERE innerhalb des Befehls, WENN es nötig ist!

this.update = (data, connection) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE ' + data.update_table + ' SET ' +
            data.update_rows_values + ' '/*WHERE + */ + data.update_condition, function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    })
};


const a = {
    insert_table: ['A', 'B', 'C'],
    insert_columns: ['A', 'B', 'C']
};
a.insert_columns = ['A', 'B', 'C'];