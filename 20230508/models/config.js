const mysql2 = require("mysql2/promise");

// createConnection() : 가장 기본적인 연결을 해주는 메소드, 테스트 할 때 사용, 단일 클라이언트 접속에 용이, 콜백함수 기반이기 때문에 promise 객체를 반환하지 않음
// createPool() : 커넥션 풀을 생성하고 관리할 수 있는 메소드, promise 객체를 반환함,
//                여러 명의 클라이언트가 데이터베이스와 통신할 때 동시에 요청이 많이 들어와도 성능이 유지되고 여러 개의 요청을 처리하는 데 용이

const mysql = mysql2.createPool({
    user : "root",
    password : "3102",
    database : "test5",
    host : "127.0.0.1",
    multipleStatements : true // 다중 쿼리문 사용 가능한 옵션
});

mysql.getConnection((err, res)=> {
    // 연결이 정상적으로 되지 않으면
    console.log(err);
    // 연결이 정상적으로 되면 res객체에 연결 인스턴스가 넘어옴
});

module.exports = mysql; // 모듈로 해당 파일을 밖으로 내보냄