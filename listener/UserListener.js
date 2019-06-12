const app = require('../app.js');
const script = require('../functions/DatabaseRequest.js');
const login = require('../functions/Login.js');

this.listenForUser = function (socket) {

    socket.on('registration', function (data) {
        console.log(data);

        //Verarbeitung
        login.setPW(data).then((result) => {
            console.log(result);

            //Ergebnisse zurücksenden
            socket.emit('get_registration', result);
        }).catch((e) => {
            throw e;
        });
    });

    socket.on('login', function (data) {
        console.log(data);

        //Verarbeitung
        login.getPW(data).then((result) => {
            console.log(result);


            //Ergebnisse zurücksenden
            socket.emit('get_login', result);
        }).catch((e) => {
            throw e;
        });

    });
};



