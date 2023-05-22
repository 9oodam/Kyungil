const Sequelize = require("sequelize");
const config = require("../config");
const User = require("./users");
const Post = require("./posts");

const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
)

const db = {}
db.sequelize = sequelize;
db.User = User;
db.Post = Post;

// 테이블 생성
User.init(sequelize);
Post.init(sequelize);
// 관계형
User.associate(db);
Post.associate(db);

module.exports = db;