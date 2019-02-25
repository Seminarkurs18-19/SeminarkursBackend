const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
    host: "alexkutschera.de",
    user: "seminarkurs",
    password: "?2Jyrl04",
    database: "seminarkurs"
}).connect((e) => {
    if (e) throw e;
    console.log('connected');
});

app.get('/', (req, res) => {
    res.end('LOL');
});

app.listen(3000, () => {
    console.log('3000')
});
