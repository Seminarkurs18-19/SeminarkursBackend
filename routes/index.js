var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var mysql = require("mysql");

    var connection = mysql.createConnection({
        host: "alexkutschera.de",
        user: "seminarkurs",
        password: "7S_oz7b8",
        database: "seminarkurs"
    });
    connection.connect((error) => {
        if (error) throw error;
        console.log("connected");
    });
});

module.exports = router;
