const crypto = require('crypto');
const app = require('../app.js');

this.generateSessionId = function(BenutzerNr) {
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
    })
};