const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");

const app = express();
var server = require('https').createServer({
    key: '-----BEGIN PRIVATE KEY-----\n' +
        'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDU2Ll2+t+RS2n3\n' +
        'owEYKUFNoxUzOa8DiZw0/dPtuRKjjGxzTJ5YzMFKQfTwc+LPaJPPopk+YZwT92HN\n' +
        'DB3wnFxQrb+GSo9n1ahxJtd89L8t98J271V5u6VfamsEPKEVDbpUdEXQzQBkUZe0\n' +
        'qTWvq+a7ou3rXQjtxgXU5KUx59ThYGGIlUQSWDFnTQxdA8Uht4af7pEoxYULX8CL\n' +
        'yvoxPw3y5AiFmEKahgGOr6bUYPAWGVqOyV0ZwILJ+VZDhDT135WwNFu+HcmpCwGE\n' +
        'd31M1LCD44Wr4HjYZb56kmQC8QqiYGcUOm4z8VQumhKE4+7JUc+Y18BvWMMgQkMp\n' +
        'raGFd5L9AgMBAAECggEAHT7uNPABuigfllw6cURx6aYH6rL5XkYRRaK+9QIiEoDg\n' +
        'AfO8Kj1wLbDkZAm4V4FqFfSkk9K7rG6obJFGp+IEOT22fFBQZhcQfwO0RkIm5r0N\n' +
        'ZmQ6XXCwJ20q6TkfdRIe0S3szeTtMduYOcWqT8oR+SRJBrcQ3AMCmB8Wp8XQFWt1\n' +
        's9FZLg+XtRtaROeAOEG7n+q9CGED6qORGyzpVnbSOi+CeSEoJvLyK6t/0pD38yV/\n' +
        'v8WonLyiOOXlSrq0IuWJKJUAILrzgQb6yBsnb7Uk/ZaI5OBo1VBWDVsfsIED0noa\n' +
        '+/XBUQT0ZFrT9+wS971Cw+9HuAHLyJRMnEpGj7OfbQKBgQDsm0vil0NHLtH1dXSN\n' +
        'DDPD3BS8opi8s+A/j1nKEjWz+Qz2gW0WJl9VV9d5jWe+tYvAz4sjtEk66rv6ejC3\n' +
        'fJloPqITUOA8Wxssk724rFgBL9ljp0uUtDYGCFLrJFSQckdwH92+vLwWdugOKqa/\n' +
        '3efu8Km6MDYwrux566HI7hyLJwKBgQDmSt9QRRLf6Nm3vxytMER0HOhUiPWmqeYj\n' +
        'dpI1HS8kVLSf4rCx7Fg4b21FaUrwYtCNkmZE7VkP8BDrTg9D434uLe9lHm8YsNOM\n' +
        '/Cfin4EDvZSJzJjSlI9fXBGO/2XbSUJJbJgfMliYOcANM27EFwuJdfHvoz8Bs6gj\n' +
        'dUlQImUXOwKBgQDqzS5gfjXw1SDdEyOHub1BOA2IKV+jnGoFCXBUnP+YS6Y2lrg3\n' +
        'y/q9ib+2y8JRun4m6I+u7gHiKwJDDrF71XWzwrw6qP7uRodQFImpU7a97sswHtxd\n' +
        'hP07vVT0LwiQlCgauDTpTQjmzjd5n4/9Re0d7MyyjZepdl4Mm+7gpJPE7wKBgD4+\n' +
        'BEdcs/JCq/2GsMh6YDYFziFy9vn5t5LkLDYg0in+nucLzPf5ygpOy3jUMYXxHy70\n' +
        'X6HHiKfPGbOPYH7X0LXIgoiRBjPlLvhO+rS8qZEKP0hTPQbFUk7SwogkrTHshfb0\n' +
        'W9UqtVlHWon22bw0AlE/yIkdVR0vooUa4RrAgRQbAoGAIuu0jcnHSlN3P2++Ng7t\n' +
        'Xw5moiDCTCYShmcDZ6T/M66Tjqnc6VUibsodGCj3v7gleLD8Y1KMbWmfs7EY3a7R\n' +
        'mi3/hKRyDCum1/UfiGU7nEtNfu8cf0+qZmSh80ARtlWPSb4l51AG8mEtG+K3XdMV\n' +
        'ePDIwjvWBtapJaa7rS16Pp0=\n' +
        '-----END PRIVATE KEY-----',
    cert: '-----BEGIN CERTIFICATE-----\n' +
        'MIIFbzCCBFegAwIBAgISAziR61t59rNczvkDIQkpEoS/MA0GCSqGSIb3DQEBCwUA\n' +
        'MEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQD\n' +
        'ExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xOTAyMjIwNjIyMzlaFw0x\n' +
        'OTA1MjMwNjIyMzlaMCcxJTAjBgNVBAMTHHNlbWluYXJrdXJzLmFsZXhrdXRzY2hl\n' +
        'cmEuZGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDU2Ll2+t+RS2n3\n' +
        'owEYKUFNoxUzOa8DiZw0/dPtuRKjjGxzTJ5YzMFKQfTwc+LPaJPPopk+YZwT92HN\n' +
        'DB3wnFxQrb+GSo9n1ahxJtd89L8t98J271V5u6VfamsEPKEVDbpUdEXQzQBkUZe0\n' +
        'qTWvq+a7ou3rXQjtxgXU5KUx59ThYGGIlUQSWDFnTQxdA8Uht4af7pEoxYULX8CL\n' +
        'yvoxPw3y5AiFmEKahgGOr6bUYPAWGVqOyV0ZwILJ+VZDhDT135WwNFu+HcmpCwGE\n' +
        'd31M1LCD44Wr4HjYZb56kmQC8QqiYGcUOm4z8VQumhKE4+7JUc+Y18BvWMMgQkMp\n' +
        'raGFd5L9AgMBAAGjggJwMIICbDAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYI\n' +
        'KwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFKlaYuPz\n' +
        'xMD8s9uYhr/CPbWrrijTMB8GA1UdIwQYMBaAFKhKamMEfd265tE5t6ZFZe/zqOyh\n' +
        'MG8GCCsGAQUFBwEBBGMwYTAuBggrBgEFBQcwAYYiaHR0cDovL29jc3AuaW50LXgz\n' +
        'LmxldHNlbmNyeXB0Lm9yZzAvBggrBgEFBQcwAoYjaHR0cDovL2NlcnQuaW50LXgz\n' +
        'LmxldHNlbmNyeXB0Lm9yZy8wJwYDVR0RBCAwHoIcc2VtaW5hcmt1cnMuYWxleGt1\n' +
        'dHNjaGVyYS5kZTBMBgNVHSAERTBDMAgGBmeBDAECATA3BgsrBgEEAYLfEwEBATAo\n' +
        'MCYGCCsGAQUFBwIBFhpodHRwOi8vY3BzLmxldHNlbmNyeXB0Lm9yZzCCAQMGCisG\n' +
        'AQQB1nkCBAIEgfQEgfEA7wB1AHR+2oMxrTMQkSGcziVPQnDCv/1eQiAIxjc1eeYQ\n' +
        'e8xWAAABaRQVsQEAAAQDAEYwRAIgTxgOimz0Q9S4ASt2ak4EN1eq4weXL42WLuc/\n' +
        '+G34jAYCIHwHjJ+BtqG/kRflsc6vdHyufxwIPQy9LrND9OnzKXEUAHYAY/Lbzeg7\n' +
        'zCzPC3KEJ1drM6SNYXePvXWmOLHHaFRL2I0AAAFpFBWxBgAABAMARzBFAiBKPIIy\n' +
        'W0x9Yb21NsfH8z6xkKvrFBWcaP+aZlcnmGnYXgIhAKZ0XdlP0NLdHtkKKQJekoCs\n' +
        'd9+NQcy8OIccVlXtVlmuMA0GCSqGSIb3DQEBCwUAA4IBAQBz/yk6h+zI1L0pYCHY\n' +
        'vzLeEgqe+j6Ke5rYUxggMMEea6o1zHBwn9sEeYHNAcpmtXDrI1vV6iVYSHbf8rWw\n' +
        'Qe+PQxAfcPk99u9+7GKuey4k3nrLiE7HGtTnFw8aByGN/KkRZQt+3gX/Z08ELjM1\n' +
        'sKYTsHxRvLMCBiD/Z0ibu+l1AwpZodU6H4dJcfVCsNaRn84kTMQVc1FvUCa8dmbM\n' +
        'C5It7mmeauHfsaJpvBIQRwMZDbDsY5lPBNvp2plRDDwz+rEeAYoxSndqT7Byf1/L\n' +
        'xKiBD2yxd1OOjftPHncqURFEfgjgmK9DpoEaW+jZGErOKcvmn60oiz6HJLw9d1GZ\n' +
        'GLlu\n' +
        '-----END CERTIFICATE-----'
});
var io = require('socket.io')(server);
server.listen(3002);

const connection = mysql.createConnection({
    host: "alexkutschera.de",
    user: "seminarkurs",
    password: "?2Jyrl04",
    database: "seminarkurs"
});
connection.connect((e) => {
    if (e) throw e;
    console.log('connected');
});

connection.query('SELECT * FROM Artikel',function(e,rows) {
    if (e) throw e;
    console.log('Data received from Db:\n');
    console.log(rows);
});

io.on("connection", (socket) => {
    console.log('socket connected')
    socket.on('item', (data) => {
       connection.query('SELECT i.ITEM_ID, a.ARTIKEL_ID, a.Art_Bez FROM Item_from_Artikel, Artike WHERE i.ITEM_ID = ' + data.ITEM_ID + ' AND a.ARTIKEL_ID = i.ARTIKEL_ID', (e, rows) => {
           if (e) throw e;
           console.log(rows);
       })
    });
});

app.get('/', (req, res) => {
    res.end('LOL');
});

app.listen(3001);