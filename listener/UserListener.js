const app = require('../app.js');
const script = require('../functions/DatabaseRequest.js');
const login = require('../functions/Login.js');

this.listenForUser = function (socket) {

    socket.on('user.registration', function (data) {
        //Verarbeitung
        login.registration(data).then((result) => {
            console.log("Result von 'user.registration'");
            console.log(result);
            //Ergebnisse zurücksenden
            socket.emit('user.registration.result', result);
        }).catch((e) => {
            throw e;
        });
    });

    socket.on('user.login', function (data) {
        //Verarbeitung
        login.login(data).then((result) => {
            console.log("Result von 'user.login'");
            console.log(result);
            //Ergebnisse zurücksenden
            socket.emit('user.login.result', result);
        }).catch((e) => {
            throw e;
        });

    });
};



