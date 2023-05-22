const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 1) 컬럼의 내용
            name : {
                type : Sequelize.STRING(20),
                allowNull : false
            },
            age : {
                type : Sequelize.INTEGER,
                allowNull : false
            },
            user_id : {
                type : Sequelize.STRING(20)
            },
            user_pw : {
                type : Sequelize.STRING(64)
            }
        }, {
            // 2) 테이블의 내용
            sequelize,
            timestamps : true, // 생성시간, 업데이트시간
            underscored : false, // 카멜 케이스 설정 유무
            modelName : "User", // 모델 이름
            tableName : "users", // 테이블 이름
            paranoid : false, // 삭제시간
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post, {foreignKey : "user_id", sourceKey : "id"});
    }
}

module.exports = User;