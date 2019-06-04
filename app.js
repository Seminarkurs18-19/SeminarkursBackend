const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");
const script = require('./functions/script.js');
const login = require('./functions/login.js');

const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

this.connection = mysql.createConnection({
    host: "alexkutschera.de",
    user: "seminarkurs",
    password: "?2Jyrl04",
    database: "seminarkurs"
});

this.connection.connect((e) => {
    if (e) throw e;
    console.log('connected');
});

this.connection.query('DELETE FROM Sitzungen WHERE Benutzer_Nr > 0', function (e) {
    if (e) throw e;
    console.log('Sessions wurden gelöscht');
});


io.on("connection", (socket) => {
    console.log('Beim Server angekommen (io.on)');

    //Input= Item_ID (durch Scannen) Output= Daten zum Item
    socket.on('get_item_by_item', function (data) {
        console.log(data);
        this.connection.query('SELECT ARTIKEL_ID FROM Item_from_Artikel WHERE ITEM_ID = ?', [data.ITEM_ID], (e, rows) => {
            if (e) throw e;
            console.log(rows);
            this.connection.query('SELECT * FROM Artikel WHERE ARTIKEL_ID = ?', [rows.ARTIKEL_ID], (e, result) => {
                if (e) throw e;
                console.log(result);
                socket.emit('send_item_by_item', result);
            });
        });
    });

    //Nachricht weiterleiten (An alle)
    socket.on('chat_emit', function (data) {
        io.sockets.emit('chat_send', data);
    });

    //Abfrage der Tabellensuche//
    /* Benötigt data.table */
    socket.on('ask_table', function (table) {
        console.log(table);

        //Verarbeitung
        script.ask_table(table, this.connection).then((result) => {
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('get_table', result);
        }).catch((e) => {
            throw e;
        });
    });

    //Löschen der Tabelle/Spalte//
    /* Benötigt data.delete_table und data.delete_condition */
    socket.on('delete', function (data) {
        console.log(data);

        //Verarbeitung
        script.delete(data, this.connection).then((result) => {
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('get_delete', result);
        }).catch((e) => {
            throw e;
        });
    });

    //Einfügen von Daten in Tabelle//
    /* Benötigt data.insert_table, data.insert_columns und data.insert_values */
    socket.on('insert', function (data) {
        console.log("line:78\n" + data);

        //Verarbeitung
        script.insert(data, this.connection).then((result) => {

            console.log(result);
            console.log("line:82" + result);
            //Ergebnisse zurücksenden
            socket.emit('get_insert', result);
        }).catch((e) => {
            throw e;
        });
    });

    //REGISTRIERUNG
    /*  data.reg_BN = Benutzername und data.reg_PW = Passwort */
    /* Gibt data.result zurück */
    socket.on('registration', function (data) {
        console.log(data);

        //Verarbeitung
        login.setPW(data, this.connection).then((result) => {
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('get_registration', result);
        }).catch((e) => {
            throw e;
        });
    });

    //LOGIN
    /* Benötigt data.log_BN = Benutzername und data.log_PW = Passwort */
    /* Gibt data.result zurück */
    socket.on('login', function (data) {
        console.log(data);

        //Verarbeitung
        login.getPW(data, this.connection).then((result) => {
            console.log(result);


            //Ergebnisse zurücksenden
            socket.emit('get_login', result);
        }).catch((e) => {
            throw e;
        });

    });

    //PDF Abfrage
    /* Benötigt data.artikel_id */
    /* Gibt data.pdf_link zurück */
    socket.on('pdf', (data) => {
        console.log(data);
        this.connection.query('SELECT PDF_link FROM ARTIKEL WHERE ARTIKEL_ID = ' + data.artikel_id, (e, rows) => {
            if (e) throw e;
            socket.emit('pdf', rows);
        })
    });
});
app.use(express.static('public'));

http.listen(3000);
