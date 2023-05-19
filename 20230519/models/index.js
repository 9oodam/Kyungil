const Sequelize = require("sequelize");
const config = require("./config");
const User = require("./users");
const Post = require("./posts");


// Sequelize 객체 생성
const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
)

// 내보낼 빈 객체
const db = {};
db.sequelize = sequelize; // 객체에 키 추가
db.User = User;
db.Post = Post;

// 테이블 초기화 & 생성
User.init(sequelize);
Post.init(sequelize);
// 외래키 연결
User.associate(db);
Post.associate(db);

module.exports = db;