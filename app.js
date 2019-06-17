const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");
const UserListen = require('./listener/UserListener.js');
const SupportListen = require('./listener/SupportListener.js');
const DatabaseRequestListen = require('./listener/DatabaseRequestListener.js');

const app = express();
var http = require('http').Server(app);

this.io = require('socket.io')(http);
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
/*
this.connection.query('DELETE FROM Sitzungen WHERE Benutzer_Nr > 0', function (e) {
    if (e) throw e;
    console.log('Sessions wurden gelöscht');
});
*/
this.io.on("connection", (socket) => {
    console.log('Beim Server angekommen (io.on)');
    UserListen.listenForUser(socket);
    DatabaseRequestListen.listenForItems(socket);
    SupportListen.listenForSupport(socket);
});

app.use(express.static('public'));

app.get('/pdf/:artikel_id', (req, res) => {
    if (req.query.session_id !== undefined && checkSession(req.query.session_id)) {
        fs.readFile('path', (err, data) => {
            if (err) res.end();
            res.contentType('application/pdf');
            res.send(data);
        })
    }
});
http.listen(3001);
