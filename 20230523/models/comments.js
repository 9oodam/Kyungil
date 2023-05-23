const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content : {
                type : Sequelize.STRING(300)
            },
            name : {
                type : Sequelize.STRING(10)
            }
        }, {
            sequelize,
            timestamps : true,
            paranoid : true,
            modelName : "Comment",
            tableName : "comments",
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, {foreignKey : "user_id", targetKey : "id"}); // users.id == comments.user_id
        db.Comment.belongsTo(db.Post, {foreignKey : "post_id", targetKey : "id"}); // posts.id == comments.post_id
    }
}

module.exports = Comment;