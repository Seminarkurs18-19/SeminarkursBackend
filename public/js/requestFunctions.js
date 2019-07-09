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
    var session_id = sessionStorage.getItem('session');
    data = {session_id};
    this.connection.emit('usertable.get', data);
}

this.connection.on('usertable.get.result', (data) => {
    divResult.innerHTML = '<p>' + data + '</p>';
});

function roleTable() {
    var session_id = sessionStorage.getItem('session');
    data = {session_id};
    this.connection.emit('roletable.get', data);
}

this.connection.on('roletable.get.result', (data) => {
    divResult.innerHTML = '<p>' + data + '</p>';
});

function articleTable() {
    var session_id = sessionStorage.getItem('session');
    data = {session_id};
    this.connection.emit('articletable.get', data);
}

this.connection.on('articletable.get.result', (data) => {
    divResult.innerHTML = '<p>' + data + '</p>';
});

function sessionTable() {
    var session_id = sessionStorage.getItem('session');
    data = {session_id};
    this.connection.emit('sessiontable.get', data);
}

this.connection.on('sessiontable.get.result', (data) => {
    var a;
    for (var i = 0; i === a; i++) {
        divResult.innerHTML = '<p>' + data[i]['RowDataPacket'] + '</p>';
        if (data[i]['RowDataPacket'].length <= 0) a = i;
    }
    divResult.innerHTML = '<p>' + data + '</p>';
});

function newArticle() {
    var session_id = sessionStorage.getItem('session'),
        artikel_id = document.getElementById('iptArtikel_id').value,
        art_Bez = document.getElementById('iptArt_Bez').value,
        pdf_link = document.getElementById('iptPdf_link').value,
        material = document.getElementById('iptMaterial').value,
        kunde = document.getElementById('iptKunde').value,
        erstellung = document.getElementById('iptErstellung').value,
        gewicht = document.getElementById('iptGewicht').value,
        zulieferer = document.getElementById('iptZulieferer').value;
    data = {session_id, artikel_id, art_Bez, pdf_link, material, kunde, erstellung, gewicht, zulieferer};
    this.connection.emit('article.insert', data);
}

this.connection.on('article.get.result', (data) => {
    divResult.innerHTML = '<p>' + data.result + '</p>';
});