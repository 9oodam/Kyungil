const Sequelize = require("sequelize");
const config = require("./config");

const User = require("./userModel");

// sequelize 연결
const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
);

// 테이블 생성, 관계형 설정
const db = {};
db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

module.exports = db;