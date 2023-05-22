const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 1) 컬럼의 내용
            msg : {
                type : Sequelize.STRING(20),
                allowNull : false
            }
        }, {
            // 2) 테이블의 내용
            sequelize,
            timestamps : true, // 생성시간, 업데이트시간
            modelName : "Post", // 모델 이름
            tableName : "posts", // 테이블 이름
            paranoid : false, // 삭제시간
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User, {foreignKey : "user_id", targetKey : "id"});
    }
}

module.exports = Post;