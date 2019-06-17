const app = require('../app.js');
const script = require('../functions/DatabaseRequest.js');
const login = require('../functions/Login.js');

this.listenForUser = function (socket) {

    socket.on('user.registration', function (data) {
        console.log(data);

        //Verarbeitung
        login.setPW(data).then((result) => {
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('user.registration.result', result);
        }).catch((e) => {
            throw e;
        });
    });

    socket.on('user.login', function (data) {
        console.log("1. data:");
        console.log(data);

        //Verarbeitung
        login.getPW(data).then((result) => {
            console.log("2. data:");
            console.log(result);


            //Ergebnisse zurücksenden
            socket.emit('user.login.result', result);
        }).catch((e) => {
            throw e;
        });

    });
};



