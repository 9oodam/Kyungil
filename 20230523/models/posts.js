const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title : {
                type : Sequelize.STRING(100),
                allowNull : false
            },
            detail : {
                type : Sequelize.STRING(300),
                allowNull : false
            },
            name : {
                type : Sequelize.STRING(10),
                allowNull : false
            }
        }, {
            sequelize,
            timestamps : true,
            paranoid : true,
            modelName : "Post",
            tableName : "posts",
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User, {foreignKey : "user_id", targetKey : "id"}); // posts.user_id == users.id
        db.Post.hasMany(db.Comment, {foreignKey : "post_id", sourceKey : "id"}); // posts.id == comments.post_id
    }
}

module.exports = Post;