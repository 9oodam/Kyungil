const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            msg : {
                type : Sequelize.STRING(100),
                allowNull : false
            }
        }, {
            sequelize,
            timestamps : true,
            modelName : "Post",
            tableName : "posts",
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }

    static associate(db) {
        // 1 : N 관계 맺기
        // belongsTo() : 테이블의 관계를 정의 해줌
        // 첫 번째 매개변수 : foreignKey로 연결이 되는 테이블
        // 두 번째 매개변수 : targetKey (users 테이블 안에 어떤 키를 따라갈지 결정)
        db.Post.belongsTo(db.User, {foreignKey : "user_id", targetKey : "id"});
    }
}

module.exports = Post;