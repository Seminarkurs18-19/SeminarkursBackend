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

io.on("connection", (socket) => {
    console.log('Beim Server angekommen (io.on)');


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

    /*socket.on('item', (data) => {
        console.log(data);
        this.connection.query('SELECT Item_from_Artikel.ITEM_ID, Artikel.ARTIKEL_ID, Artikel.Art_Bez FROM Item_from_Artikel INNER JOIN Artikel ON Item_from_Artikel.ARTIKEL_ID = Artikel.ARTIKEL_ID WHERE Item_from_Artikel.ITEM_ID = ' + data.ITEM_ID, (e, rows) => {
            if (e) throw e;
            socket.emit('item', rows);
        })
    });*/ //TODO Was das?

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
