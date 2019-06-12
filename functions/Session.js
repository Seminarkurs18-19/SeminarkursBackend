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

this.checkSessionId = function (SessionID, Type) {
    return new Promise((resolve, reject) => {
        console.log('SessionID: ' + SessionID);
        app.connection.query('SELECT Benutzer_Nr FROM Sitzungen WHERE SITZUNGS_ID = ?', [SessionID], function (e, UserID) {
            if (e) reject(e);
            if (UserID.length > 0) {
                app.connection.query('SELECT Rollen_Nr FROM Benutzer WHERE Benutzer_Nr = ?', [UserID.Benutzer_Nr], function (er, rows) {
                    if (er) reject(er);
                    var neededRole = 0, role = 0, result = false;
                    switch (rows.Rollen_Nr) {
                        case 1:
                            role = 1;
                            break;
                        case 2:
                            role = 2;
                            break;
                        case 3:
                            role = 3;
                            break;
                        case 4:
                            role = 4;
                            break;
                        default:
                            alert("Keine Rolle ist an diesen Benutzer vergeben");
                            result = false;
                            resolve(result);
                    }
                    switch (Type) {
                        case "Suche":
                            neededRole = 0;
                            break;
                        case "Ticketanfrage":
                            neededRole = 0;
                            break;
                        case "...":
                            neededRole = 0;
                            break;
                        default:
                            alert("Anfragentype ist nicht vergeben");
                            result = false;
                            resolve(result);
                    }
                    if (role === neededRole) {
                        console.log("Zugriff erlaubt");
                        result = true;
                        resolve(result);
                    } else {
                        console.log("Zugriff nicht erlaubt");
                        result = false;
                        resolve(result);
                    }
                })
            } else {
                alert("Fehler bei der Benutzerindentifikation");
                result = false;
                resolve(result);
            }
        })
    });
};