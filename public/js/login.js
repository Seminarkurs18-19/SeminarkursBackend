const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';


this.getPW = (data, connection) => {

    function getPW(data) {

    connection.query('SELECT Passwort FROM Benutzer WHERE Benutzername = "' + data.log_BN + '"', function (e, rows) {
            if (e) reject(e);
            data(rows);
        })
    }
    rows.Passwort = hash;
    data.log_PW = myPlaintextPassword;
    bcrypt.compare(myPlaintextPassword, hash, function (err, res) {
        if (res == true) {
            result = "Passwort stimmt überein";
            data.result = result;
        } else {
            result = "Passwort und Benutzername stimmen nicht überein";
            data.result = result;
        }
        return data;
    });
};


this.setPW = (data, connection) => {
    //Benutzer prüfen
    return new Promise((resolve, reject) => {
        connection.query('SELECT Benutzername FROM Benutzer WHERE Benutzername = "' + data.reg_BN + '"', function (e, rows) {
            if (e) reject(e);
            let result = {};
            if (rows.length === 0) {
                //Passwort und Benutzer erstellen
                result.reg_PW = myPlaintextPassword;
                bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
                    connection.query('INSERT INTO Benutzer(Benutzername, Passwort) VALUES("' + data.reg_PW + '", "' + hash + '")', function (e) {
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