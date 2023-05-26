const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static init(seq) {
        return super.init({
            title : {
                type : Sequelize.STRING(50),
                allowNull : false
            },
            detail : {
                type : Sequelize.STRING(200),
                allowNull : false
            }
        }, {
            sequelize : seq,
            timestamps : true,
            underscored : false,
            modelName : "Post",
            tableName : "posts",
            paranoid : false,
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User, {foreignKey : "users_id", targetKey : "id"});
    }
}

module.exports = Post;