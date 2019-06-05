const bcrypt = require('bcrypt');
const app = require('../app.js');
const session = require('./session.js');
const saltRounds = 10;
var myPlaintextPassword = '';


this.getPW = (data) => {
    return new Promise((resolve, reject) => {
        let response = {};
        app.connection.query('SELECT * FROM Benutzer WHERE Benutzername = ?', [data.log_BN], function (e, db_res) {
            if (e || db_res.length <= 0) reject(e);
            bcrypt.compare(data.log_PW, db_res[0]['Passwort'], function (err, res) {
                if (err) reject(e);
                if (res) {
                    response.result = "Passwort stimmt überein";
                    session.generateSessionId(db_res[0]['Benutzer_Nr']).then((res) => {
                        response.session_id = res;
                        console.log(response);
                        resolve(response);
                    }).catch((e) => {
                        reject(e);
                    });
                } else {
                    response.result = "Passwort und Benutzername stimmen nicht überein";
                    console.log(response);
                    resolve(response);
                }
            });
        });
    });
};


this.setPW = (data) => {
    //Benutzer prüfen
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM Benutzer WHERE Benutzername = "' + data.reg_BN + '"', function (e, rows) {
            if (e) reject(e);
            let result = {};
            if (rows.length === 0) {
                //Passwort und Benutzer erstellen
                bcrypt.hash(data.reg_PW, saltRounds, function (err, hash) {
                    app.connection.query('INSERT INTO Benutzer (Benutzername, Passwort) VALUES(?, ?)', [data.reg_BN, hash], function (e) {
                        if (e) reject(e);
                    })
                });
                result.result = "Benutzerkonto wurde erstellt";

            } else {
                //Benutzer schon vergeben
                result.result = "Benutzername schon vergeben";
            }
            resolve(result);
        });
    });
};
