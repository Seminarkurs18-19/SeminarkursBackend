const bcrypt = require('bcrypt');
const app = require('../app.js');
const session = require('./Session.js');
const saltRounds = 10;

this.login = (data) => { //Funktion für Benutzerlogin
    /**
     * Inputs = log_BN, log_PW
     * Output = SessionID
     */
    let response = {};
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM Benutzer WHERE Benutzername = ?', [data.log_BN], function (e, db_res) {
            if (e) reject(e);
            if (db_res.length <= 0) {
                response.result = "Diesen Benutzernamen gibt es nicht";
                resolve(response);
            } else {
                bcrypt.compare(data.log_PW, db_res[0]['Passwort'], function (err, res) {
                    if (err) reject(err);
                    if (res) {
                        response.result = "Passwort stimmt überein";
                        session.generateSessionId(db_res[0]['Benutzer_Nr']).then((sessionID) => {
                            response.session_id = sessionID;
                            resolve(response);
                        });
                    } else {
                        response.result = "Passwort und Benutzername stimmen nicht überein";
                        resolve(response);
                    }
                });
            }
        });
    })
};

this.registration = (data) => { //Funktion für Registration
    /**
     * Inputs = reg_PW, reg_BN
     * Output = Benutzer angelegt
     */
    //Benutzer prüfen
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM Benutzer WHERE Benutzername = ?', [data.reg_BN], function (e, rows) {
            if (e) reject(e);
            let result = {};
            if (rows.length === 0) {
                //Passwort und Benutzer erstellen
                bcrypt.hash(data.reg_PW, saltRounds, function (err, hash) {
                    app.connection.query('INSERT INTO Benutzer (Benutzername, Passwort, Rollen_Nr, Status) VALUES(?, ?, 4, "not needed")', [data.reg_BN, hash], function (e) {
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

this.createCrypto = (Password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(Password, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        })
    });
};
