const Sequelize = require("sequelize");

// User 클래스에 sequalize 안의 Model 클래스를 상속시켜줌
class User extends Sequelize.Model {
    static init(sequelize) {
        // super : 상속받은 부모의 함수를 실행
        return super.init({
            // 매개변수 1) 컬럼에 대한 설정 값
            name : {
                type : Sequelize.STRING(20), // VARCHAR == STRING
                allowNull : false, // Null을 허용할지 말지 여부
                unique : true // 고유키
            },
            age : {
                type : Sequelize.INTEGER, // INT == INTEGER
                allowNull : false
            },
            msg : {
                type : Sequelize.TEXT
            }

        }, {
            // 매개변수 2) 테이블 자체 설정 값
            sequelize, // 매개변수로 전달받은 _sequalize 먼저 작성

            timestamps : true, // 테이블에 컬럼을 추가시 생성시간과 업데이트 시간을 표기 (created_at, updated_at 컬럼 자동 추가)
            underscored : false, // 기본적으로 스네이크 표기법으로 설정, true면 카멜 표기법으로 변경 (created_at -> createdAt)
            modelName : "User", // 노드 프로젝트에서 사용할 모델 이름 설정
            tableName : "users", // 테이블 이름
            paranoid : false, // true로 설정시 deleted_at 컬럼 자동 추가, 삭제해도 값은 남아있고 삭제 시간이 표기

            charset : "utf8", // 인코딩 방식 (*필수 작성)
            collate : "utf8_general_ci" // 인코딩 방식 (*필수 작성)
        });
    }

    static associate(db) {
        // 1 : N 관계 맺기
        // hasMany() : 테이블의 관계를 정의 해줌
        // 첫 번째 매개변수 : foreignKey와 연결이 되는 테이블
        // 두 번째 매개변수 : sourceKey (users 테이블 안에 어떤 키를 foreignKey와 연결 해줄지 결정)
        db.User.hasMany(db.Post, {foreignKey : "user_id", sourceKey : "id"});
    }
}

module.exports = User;