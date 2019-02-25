const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const connection = mysql.createConnection({
    host: "alexkutschera.de",
    user: "seminarkurs",
    password: "?2Jyrl04",
    database: "seminarkurs"
}).connect((e) => {
    if (e) throw e;
    console.log('connected');
});

io.on("connection", (socket) => {
    console.log('socket connected')
    socket.emit('welcome', 'from the server');
});

app.get('/', (req, res) => {
    res.end('LOL');
});

app.listen(3001, () => {
    console.log('3001')
});
