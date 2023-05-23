const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name : {
                type : Sequelize.STRING(10),
                allowNull : false
            },
            user_id : {
                type : Sequelize.STRING(20),
                allowNull : false
            },
            user_pw : {
                type : Sequelize.STRING(64),
                allowNull : false
            },
            grade : {
                type : Sequelize.INTEGER,
                allowNull : false
            }
        }, {
            sequelize,
            timestamps : true,
            paranoid : true,
            modelName : "User",
            tableName : "users",
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post, {foreignKey : "user_id", sourceKey : "id"}); // users.id == posts.user_id
        db.User.hasMany(db.Comment, {foreignKey : "user_id", sourceKey : "id"}); // users.id == comments.user_id
    }
}

module.exports = User;