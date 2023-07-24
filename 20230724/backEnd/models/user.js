const Sequelize = require("sequelize");

class User extends Sequelize.Model{
    static init(seq) {
        return super.init({
            user_id : {
                type : Sequelize.STRING(30),
                allowNull : false
            },
            user_pw : {
                type : Sequelize.STRING(100),
                allowNull : false
            }
        },{
            sequelize : seq,
            timestamps : true,
            modelName : "User",
            tableName : "users",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
}

module.exports = User