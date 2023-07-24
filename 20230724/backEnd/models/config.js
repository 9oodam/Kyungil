const dot = require("dotenv").config();

const config = {
    dev : {
        username : process.env.USERNAME,
        password : process.env.PASSWORD,
        database : process.env.DBNAME,
        host : process.env.HOST,
        dialect : "mysql"
    }
}

module.exports = config;