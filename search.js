this.itemSearch = (data, connection) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Artikel WHERE ARTIKEL_ID="' + data.ARTIKEL_ID + '"', function (e, rows) {
            if (e) reject(e);
            resolve(rows);
        });
    })
};
this.articleSearch = (data, connection) => {
    return new Promise((resolve, reject) => {
        console.log(data);
        connection.query('SELECT * FROM Item_from_Artikel i, Artikel a WHERE i.ITEM_ID="' + data.ITEM_ID + '" AND a.Art_BEZ="'
            + data.Art_BEZ + '"', (e, rows) => {
            if (e) reject(e);
            console.log("Rows: " + rows);
            resolve(rows);
        });
    })
};