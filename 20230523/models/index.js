const Sequelize = require("sequelize");
const config = require("./config");

const User = require("./users");
const Post = require("./posts");
const Comment = require("./comments");


// sequelize 연결
const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
)

// 테이블 생성, 관계형 설정
const db = {}
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
User.associate(db);
Post.associate(db);
Comment.associate(db);

module.exports = db;