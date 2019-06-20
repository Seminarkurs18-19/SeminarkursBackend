const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");
const UserListen = require('./listener/UserListener.js');
const SupportListen = require('./listener/SupportListener.js');
const DatabaseRequestListen = require('./listener/DatabaseRequestListener.js');
const session = require('./functions/Session.js');
var fs = require('fs');

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
    res.contentType('application/pdf');
    if (req.query.session_id !== undefined && session.checkSessionId(req.query.session_id, "pdf.get")) {
        fs.readFile(`pdf/${req.params.artikel_id}.pdf`, (err, data) => {
            if (err) {
                console.error(err);
            }
            res.write(data);
            console.log("Result für 'pdf.get':");
            console.log("Zugriff erfolgreich");
            res.send();
        })
    } else {
        res.write();
        console.log("Result für 'pdf.get':");
        console.log("Session verweigert");
        res.send();
    }
});
http.listen(3000);
