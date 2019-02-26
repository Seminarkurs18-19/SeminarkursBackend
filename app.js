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
    socket.emit('welcome', 'from the server');
});

app.get('/', (req, res) => {
    res.end('LOL');
});

http.listen(3000, () => {
    console.log('3000')
});