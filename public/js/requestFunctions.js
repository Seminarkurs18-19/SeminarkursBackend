var data = {};
var divResult = document.getElementById('divResult');


//////////////////////////////////////////////////////Benutzerverwaltung/////////////////////////////////////////////////////////
function registration() {
    var reg_BN = document.getElementById('iptBenutzername').value,
        reg_PW = document.getElementById('iptPasswort').value;
    data = {reg_BN, reg_PW};
    this.connection.emit('user.registration', data);
}

this.connection.on('user.registration.result', (data) => {
    divResult.innerHTML = '<p>' + data.result + '</p>';
});

function changeUsername() {
    var session_id = sessionStorage.getItem('session'),
        newUsername = document.getElementById('iptNewUsername').value,
        log_BN = document.getElementById('iptBenutzername').value,
        log_PW = document.getElementById('iptPasswort').value;
    data = {session_id, newUsername, log_BN, log_PW};
    this.connection.emit('user.username.change', data);
}

this.connection.on('user.username.change.result', (data) => {
    divResult.innerHTML = '<p>' + data.result + '</p>';
});

function changePassword() {
    var session_id = sessionStorage.getItem('session'),
        newPassword = document.getElementById('iptNewPassword').value,
        log_BN = document.getElementById('iptBenutzername').value,
        log_PW = document.getElementById('iptPasswort').value;
    data = {session_id, newPassword, log_BN, log_PW};
    this.connection.emit('user.password.change', data);
}

this.connection.on('user.password.change.result', (data) => {
    divResult.innerHTML = '<p>' + data.result + '</p>';
});

function changeDepartment() {
    var session_id = sessionStorage.getItem('session'),
        newDepartment = document.getElementById('iptNewDepartment').value,
        log_BN = document.getElementById('iptBenutzername').value,
        log_PW = document.getElementById('iptPasswort').value;
    data = {session_id, newDepartment, log_BN, log_PW};
    this.connection.emit('user.department.change', data);
}

this.connection.on('user.department.change.result', (data) => {
    divResult.innerHTML = '<p>' + data.result + '</p>';
});

function deleteUser() {
    var session_id = sessionStorage.getItem('session'),
        Benutzername = document.getElementById('iptUsername').value,
        data = {session_id, Benutzername};
    this.connection.emit('user.delete', data);
}

this.connection.on('user.delete.result', (data) => {
    divResult.innerHTML = '<p>' + data.result + '</p>';
});

//////////////////////////////////////////////////////Datenbankverwaltung/////////////////////////////////////////////////////////
function userTable() {
}

function roleTable() {
}

function articleTable() {
}

function sessionTable() {
}

function newArticle() {
}