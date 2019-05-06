const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");
const script = require('./script.js');
const login = require('./public/js/login.js');

const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const connection = mysql.createConnection({
    host: "alexkutschera.de",
    user: "seminarkurs",
    password: "?2Jyrl04",
    database: "seminarkurs"
});
connection.connect((e) => {
    if (e) throw e;
    console.log('connected');
});

connection.query('SELECT * FROM Artikel WHERE ARTIKEL_ID="7-1234.01"', function (e, rows) {
    if (e) throw e;
    //console.log('Data received from Db:\n');
    //console.log(rows);
});

io.on("connection", (socket) => {
    console.log('Beim Server angekommen (io.on)');


    //Abfrage der Tabellensuche//
    socket.on('ask_table', function (table) {
        console.log(table);

        //Verarbeitung
        script.ask_table(table, connection).then((result) => {
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('get_table', result);
        }).catch((e) => {
            throw e;
        });
    });

    //Löschen der Tabelle/Spalte//
    socket.on('delete', function (data) {
        console.log(data);

        //Verarbeitung
        script.delete(data, connection).then((result) => {
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('get_delete', result);
        }).catch((e) => {
            throw e;
        });
    });

    //Update der Tabelle//
    socket.on('ask_table', function (data) {
        console.log(data);

        //Verarbeitung
        script.update(data, connection).then((result) => {
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('get_update', result);
        }).catch((e) => {
            throw e;
        });
    });

    //Einfügen von Daten in Tabelle//
    socket.on('insert', function (data) {
        console.log("line:78\n" + data);

        //Verarbeitung
        script.insert(data, connection).then((result) => {

            console.log(result);
            console.log("line:82" + result);
            //Ergebnisse zurücksenden
            socket.emit('get_insert', result);
        }).catch((e) => {
            throw e;
        });
    });

    //Regestrierung
    socket.on('registration', function (data) {
        console.log(data);

        //Verarbeitung
        login.setPW(data, connection).then((result) => {
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('registration_result', result);
        }).catch((e) => {
            throw e;
        });
    });

    //LOGIN
    socket.on('login', function (data) {
        console.log(data);

        //Verarbeitung
        login.getPW(data, connection).then((result) => {
            console.log(result);


            //Ergebnisse zurücksenden
            socket.emit('login_result', result);
        }).catch((e) => {
            throw e;
        });

    });
    socket.on('item', (data) => {
        console.log(data);
        connection.query('SELECT Item_from_Artikel.ITEM_ID, Artikel.ARTIKEL_ID, Artikel.Art_Bez FROM Item_from_Artikel INNER JOIN Artikel ON Item_from_Artikel.ARTIKEL_ID = Artikel.ARTIKEL_ID WHERE Item_from_Artikel.ITEM_ID = ' + data.ITEM_ID, (e, rows) => {
            if (e) throw e;
            socket.emit('item', rows);
        })
    });
    socket.on('pdf', (data) => {
        console.log(data);
        connection.query('SELECT PDF_link FROM ARTIKEL WHERE ARTIKEL_ID = ' + data.artikel_id, (e, rows) => {
            if (e) throw e;
            socket.emit('pdf', rows);
        })
    });
});
app.use(express.static('public'));

http.listen(3000);
