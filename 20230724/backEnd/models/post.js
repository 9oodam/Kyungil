const Sequelize = require("sequelize");

class Post extends Sequelize.Model{
    static init(seq) {
        return super.init({
            title : {
                type : Sequelize.STRING(100),
                allowNull : false
            },
            detail : {
                type : Sequelize.STRING(300),
                allowNull : false
            },
            writer : {
                type : Sequelize.STRING(30)
            }
        },{
            sequelize : seq,
            timestamps : true,
            modelName : "Post",
            tableName : "posts",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
}

module.exports = Post