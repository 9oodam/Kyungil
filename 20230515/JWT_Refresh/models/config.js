const mysql2 = require("mysql2/promise");

const mysql = mysql2.createPool({
    user : "root",
    password : "3102",
    database : "test7",
    host : "127.0.0.1",
    multipleStatements : true
});

mysql.getConnection((err, res) => {
    console.log(err);
});

module.exports = mysql;