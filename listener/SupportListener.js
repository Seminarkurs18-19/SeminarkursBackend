const app = require('../app.js');
const script = require('../functions/DatabaseRequest.js');
const login = require('../functions/Login.js');


this.listenForSupport = function (socket) {

    socket.on('chat_emit', function (data) {
        app.io.sockets.emit('chat_send', data);
    });
};