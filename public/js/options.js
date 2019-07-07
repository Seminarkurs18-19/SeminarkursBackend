var divOption = document.getElementById('divOption');

//////////////////////////////////////////////////////Benutzerverwaltung/////////////////////////////////////////////////////////
function optRegistration() {
    divOption.innerHTML = " ";
    divOption.innerHTML =
        "<div>" +
        "<h1>Benutzer-Registration</h1>" +
        "<input id='iptBenutzername' placeholder='Benutzername' type='text'><br>" +
        "<input id='iptPasswort' placeholder='Passwort' type='password'><br>" +
        "<button id='btnLogin' onclick='registration()'>Registrieren</button>" +
        "<br>" +
        "<div id='divResult'>" +
        "</div>"
}

function optChangeUsername() {
    divOption.innerHTML = "";
    divOption.innerHTML =
        '<div>' +
        '<div id="divLogin" style="margin: 0px auto; top: 0; left:0;">' +
        '<h1>Benutzer-Log-In</h1>' +
        '<input id="iptBenutzername" placeholder="Benutzername" type="text"><br>' +
        '<input id="iptPasswort" placeholder="Passwort" type="text"><br>' +
        '</div><div style="margin: 0px auto">' +
        '<h1>Neuer Benutzername</h1>' +
        '<input id="iptNewUsername" placeholder="neuer Benutzername" type="text">' +
        '<button id="btnNewUsername" onclick="newUsername()">Senden</button>' +
        '</div>' +
        '<br>' +
        '<div id="divResult">' +
        '</div>' +
        '</div>'

}

function optChangePassword() {
    divOption.innerHTML = "";
    divOption.innerHTML =
        '<div>' +
        '<div id="divLogin" style="margin: 0px auto; top: 0; left:0;">' +
        '<h1>Benutzer-Log-In</h1>' +
        '<input id="iptBenutzername" placeholder="Benutzername" type="text"><br>' +
        '<input id="iptPasswort" placeholder="Passwort" type="text"><br>' +
        '</div><div style="margin: 0px auto">' +
        '<h1>Neues Passwort</h1>' +
        '<input id="iptNewPassword" placeholder="neues Passwort" type="text">' +
        '<button id="btnNewPassword" onclick="newPassword()">Senden</button>' +
        '</div>' +
        '<br>' +
        '<div id="divResult">' +
        '</div>' +
        '</div>'

}


function optChangeDepartment() {
    divOption.innerHTML = "";
    divOption.innerHTML =
        '<div>' +
        '<div id="divLogin" style="margin: 0px auto; top: 0; left:0;">' +
        '<h1>Benutzer-Log-In</h1>' +
        '<input id="iptBenutzername" placeholder="Benutzername" type="text"><br>' +
        '<input id="iptPasswort" placeholder="Passwort" type="text"><br>' +
        '</div><div style="margin: 0px auto">' +
        '<h1>Neue Abteilung</h1>' +
        '<input id="iptNewDepartment" placeholder="neue Abteilung" type="text">' +
        '<button id="btnNewDepartment" onclick="newDepartment()">Senden</button>' +
        '</div>' +
        '<br>' +
        '<div id="divResult">' +
        '</div>' +
        '</div>'
}

function optDeleteUser() {
    divOption.innerHTML = "";
    divOption.innerHTML =
        '<div style="margin: 0px auto">' +
        '<h1>Benutzername des Benutzers</h1>' +
        '<input id="iptUsername" placeholder="Benutzername" type="text">' +
        '<button id="btnUsername" onclick="deleteUser()">Löschen</button>' +
        '</div>' +
        '<br>' +
        '<div id="divResult">' +
        '</div>' +
        '</div>'
}

