const crypto = require('crypto');
const app = require('../app.js');

this.generateSessionId = function (BenutzerNr) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) reject(err);
            app.connection.query('SELECT SITZUNGS_ID FROM Sitzungen WHERE SITZUNGS_ID = ?', [buf.toString('hex')], function (e, db_res) {
                if (e) reject(e);
                if (db_res.lenght >= 0) {
                    console.log("Vergeben");
                    this.generateSessionId().then((res) => {
                        resolve(res);
                    }).catch((e) => {
                        reject(e);
                    })
                } else {
                    app.connection.query('INSERT INTO Sitzungen (Sitzungs_ID, Benutzer_Nr) VALUES(?, ?)', [buf.toString('hex'), BenutzerNr], function (e, db_res) {
                        if (e) reject(e);
                    });
                    resolve(buf.toString('hex'));
                }
            })
        });
    });
};

this.checkSessionId = function (SessionID) {
    let result = {};
    return new Promise((resolve, reject) => {
        console.log('SessionID: ' + SessionID);
        app.connection.query('SELECT Benutzer_Nr FROM Sitzungen WHERE SITZUNGS_ID = ?', [SessionID], function (e, UserID) {
            if (e) reject(e);
            if (UserID.length > 0) {
                console.log(UserID);
                app.connection.query('SELECT Rollen_Nr FROM Benutzer WHERE Benutzer_Nr = ?', [UserID[0]['Benutzer_Nr']], function (e, db_res) {
                    if (e) reject(e);
                    switch (db_res[0]['Rollen_Nr']) {
                        case "1":
                            result.Rolle = "Admin";
                            break;
                        case "2":
                            result.Rolle = "Support";
                            break;
                        case "3":
                            result.Rolle = "Arbeiter";
                            break;
                        case "4":
                            result.Rolle = "Gast";
                            break;
                        default:
                            result.Rolle = "Konnte nicht vergeben werden. Wenden sie sich an einen Supporter";
                    }
                    resolve(result);
                })
            }
        })
    });
};