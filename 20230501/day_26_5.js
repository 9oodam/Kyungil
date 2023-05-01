// mysql 연결하기
// node_modules는 올리면 안됨❗️❗️❗️ 파일 짱 큼❗️❗️❗️

// npm으로 외부 모듈 설치 받아서 사용

// 방법1) npm i mysql2
// mysql2 모듈 설치
// mysql 모듈은 콜백 기반이라 promise 기반으로 사용하기 어려움
// -> promise 기반 지원하는 mysql2 모듈 사용

// 방법2) npm i
// package.json 파일의 dependencies에 있는 모듈을 다 설치
// "dependencies": {"mysql2": "^3.2.4"}
// ^ : 해당 버전이 있는지 찾고, 없으면 다른 버전을 찾아서 설치 받겠다
// 실제 설치받은 버전은 package-lock.json 에서 참고


// mysql2 모듈 가져오기
const mysql = require("mysql2");

// createConnection() : 연결
// host : 연결할 호스트를 나타냄
// post : 연결할 포트, 3306이 기본
// user : 사용자의 이름
// password : 사용자 비밀번호
// database : 어떤 데이터베이스를 연결 시킬건지
const temp = mysql.createConnection({
    user : "root",
    password : "3102",
    database : "test2",
    host : "127.0.0.1"
});

// temp에 연결한 mysql 객체를 반환
// 이 객체 안에는 쿼리문을 작성해서 데이터베이스 쿼리 작업을 시켜줄 수 있는 메소드가 있음

// query 메소드 : 쿼리문을 매개변수로 전달해서 데이터베이스의 쿼리 작업을 시킬 수 있음
// product 테이블이 있는지 확인
temp.query("SELECT * FROM products", (err, res) => {
    if(err) {
        console.log("테이블 없음");

        // product라는 이름의 테이블을 만듦
        const sql = "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
        // id 숫자형 자동증가 고유키, name 문자열(20자까지), number 문자열(20자까지), series 문자열(20자까지)
        // PRIMARY KEY : 테이블에는 고유한 값을 가지고 있는 컬럼 하나가 무조건 필요한데 고유한 값을 설정하는데 PRIMARY KEY로 설정
        
        temp.query(sql);
        console.log("테이블 없어서 만들었음");
    }else {
        console.log(res);
        console.log("테이블 있음");
    }
})