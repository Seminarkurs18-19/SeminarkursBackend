var divOption = document.getElementById('divOption');
var divResult = document.getElementById('divResult');

//////////////////////////////////////////////////////Benutzerverwaltung/////////////////////////////////////////////////////////
function optRegistration() {
    divResult.innerHTML = " ";
    divOption.innerHTML = " ";
    divOption.innerHTML =
        "<div>" +
        "<h1>Benutzer-Registration</h1>" +
        "<input id='iptBenutzername' placeholder='Benutzername' type='text'><br>" +
        "<input id='iptPasswort' placeholder='Passwort' type='text'><br>" +
        "<button id='btnLogin' onclick='registration()'>Registrieren</button>" +
        "</div>"

}

function optChangeUsername() {
    divResult.innerHTML = " ";
    divOption.innerHTML = "";
    divOption.innerHTML =
        '<div id="divLogin">' +
        '<h1>Benutzerdaten</h1>' +
        '<input id="iptBenutzername" placeholder="Benutzername" type="text"><br>' +
        '<input id="iptPasswort" placeholder="Passwort" type="text"><br>' +
        '</div><div style="margin: 0px auto">' +
        '<h1>Neuer Benutzername</h1>' +
        '<input id="iptNewUsername" placeholder="neuer Benutzername" type="text">' +
        '<button id="btnNewUsername" onclick="changeUsername()">Senden</button>' +
        '</div>'

}

function optChangePassword() {
    divResult.innerHTML = " ";
    divOption.innerHTML = " ";
    divOption.innerHTML =
        '<div id="divLogin">' +
        '<h1>Benutzerdaten</h1>' +
        '<input id="iptBenutzername" placeholder="Benutzername" type="text"><br>' +
        '<input id="iptPasswort" placeholder="Passwort" type="text"><br>' +
        '</div><div style="margin: 0px auto">' +
        '<h1>Neues Passwort</h1>' +
        '<input id="iptNewPassword" placeholder="neues Passwort" type="text">' +
        '<button id="btnNewPassword" onclick="changePassword()">Senden</button>' +
        '</div>'
}

function optChangeDepartment() {
    divResult.innerHTML = " ";
    divOption.innerHTML = " ";
    divOption.innerHTML =
        '<div id="divLogin">' +
        '<h1>Benutzerdaten</h1>' +
        '<input id="iptBenutzername" placeholder="Benutzername" type="text"><br>' +
        '<input id="iptPasswort" placeholder="Passwort" type="text"><br>' +
        '</div><div style="margin: 0px auto">' +
        '<h1>Neue Abteilung</h1>' +
        '<input id="iptNewDepartment" placeholder="neue Abteilung" type="text">' +
        '<button id="btnNewDepartment" onclick="changeDepartment()">Senden</button>' +
        '</div>'
}

function optDeleteUser() {
    divResult.innerHTML = " ";
    divOption.innerHTML = " ";
    divOption.innerHTML =
        '<div>' +
        '<h1>Benutzername des Benutzers</h1>' +
        '<input id="iptUsername" placeholder="Benutzername" type="text">' +
        '<button id="btnUsername" onclick="deleteUser()">Löschen</button>' +
        '</div>'
}

//////////////////////////////////////////////////////Datenbankverwaltung/////////////////////////////////////////////////////////

function optUserTable() {
    userTable();
}

function optRoleTable() {
    roleTable();
}

function optArticleTable() {
    articleTable();
}

function optSessionTable() {
    sessionTable();
}

function optNewArticle() {

}