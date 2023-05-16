const mysql2 = require("mysql2/promise");

const mysql = mysql2.createPool({
    user : "root",
    password : "3102",
    database : "test9",
    host: "127.0.0.1",
    multipleStatements : true
});

module.exports = mysql;