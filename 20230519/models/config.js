const dot = require("dotenv").config();

const config = {
    dev : {
        username : process.env.USERNAME,
        password : process.env.PASSWORD,
        database : process.env.DATABASE,
        host : process.env.HOST,
        dialect : "mysql" // 사용할 데이터베이스
    }
}

module.exports = config;