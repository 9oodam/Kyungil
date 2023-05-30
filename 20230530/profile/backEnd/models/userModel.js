const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_id : {
                type : Sequelize.STRING(20),
                allowNull : false
            },
            user_pw : {
                type : Sequelize.STRING(64),
                allowNull : false
            },
            img : {
                type : Sequelize.STRING(300),
                defaultValue : 'profile.png'
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
}

module.exports = User;