const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");

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

connection.query('SELECT * FROM Artikel',function(e,rows) {
    if (e) throw e;
    console.log('Data received from Db:\n');
    console.log(rows);
});

io.on("connection", (socket) => {
    console.log('socket connected')
    socket.on('item', (data) => {
        console.log(data);
       connection.query('SELECT Item_from_Artikel.ITEM_ID, Artikel.ARTIKEL_ID, Artikel.Art_Bez FROM Item_from_Artikel INNER JOIN Artikel ON Item_from_Artikel.ARTIKEL_ID = Artikel.ARTIKEL_ID WHERE Item_from_Artikel.ITEM_ID = ' + data.ITEM_ID, (e, rows) => {
           if (e) throw e;
           socket.emit('item', rows);
       })
    });
});

app.get('/', (req, res) => {
    res.end('LOL');
});

http.listen(3000);