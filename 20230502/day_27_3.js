// express & 템플릿 엔진 사용 게시판 만들기

// 템플릿 엔진으로 서버사이드 렌더링 가능 (서버 쪽에서 html을 만들어서 브라우저에 보여주는 것)
// 서버사이드 렌더링 : 검색 기능 및 페이지 로딩이 빠름

// 템플릿 엔진 중 ejs 사용
// express 에서 ejs를 기본적으로 지원
// html 구문 + js 추가하여 동적인 웹페이지를 만들 수 있는 템플릿 엔진



// 사용할 모듈 : express, ejs, mysql2, body-parser, path

// body-oarser : express의 미들웨어, 요청으로 받은 body의 내용을 req(요청 객체) 안에 있는 body 객체로 담아줌
// req.body 로 호출이 가능해짐
// 미들 웨어 : 쉽게 요청과 응답을 하는 사이 중간에 동작하는 함수


// 모듈 불러오기
const express = require("express");
const mysql2 = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");

// 서버 인스턴스 생성
const app = express();


// express 메소드
// set() : express의 view 등 설정 가능, 그려줄 파일이 있는 폴더의 경로 설정 가능
// use() : 요청 또는 응답시 실행되는 미들웨어를 추가 할 수 있음

// express의 view 속성을 경로로 지정
app.set("views", path.join(__dirname, "views"));
// view 엔진(html 등의 템플릿 파일을 보여주는 역할)을 ejs로 사용하겠다
app.set("view engine", "ejs");

// express 버전 업 전
/*
app.use(
    // urlencoded() : 데이터 파싱을 도와주는 미들웨어
    bodyParser.urlencoded({
        extended : false 
    })
)
*/
// extended (권장은 false, 복잡한 데이터 다룰 때만 true)
// true - 쿼리 스트링 모듈의 기능이 좀 더 확장된 qs 모듈 사용 (깊은 객체를 지원)
// false - express 기본 내장된 쿼리 스트링 모듈을 사용 (깊은 객체를 지원 X)

// express 버전 업 후 body-parser를 지원해줌
app.use(express.urlencoded({extended : false}));


// mysql 연결
const _mysql = mysql2.createConnection({
    user : "root",
    password : "3102",
    database : "test3",
    host : "127.0.0.1"
});

_mysql.query("SELECT * FROM products", (err, res) => {
    if(err) {
        console("없어서 만듦");
        const sql = "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
        _mysql.query(sql);
    }else {
        console.log(res);
    }
})


// 라우팅
app.get("/", (req, res) => {
    _mysql.query("SELECT *FROM products", (err, result) => {
        // render() : View엔진이 문자열을 html로 브라우저에 반환해서 렌더링
        // render(view로 설정한 폴더 경로의 파일 이름을 문자열로, 템플릿 엔진에서 사용할 데이터)
        res.render("main", {data : result});
    });
});


// 리스트를 추가하는 페이지
// get 방식의 요청인지 post의 요청인지에 따라 url이 같아도 라우터가 달라짐

app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/add", (req, res) => {
    const data = req.body;
    // body 객체 안에 add.ejs 의 form에서 요청으로 보낸 데이터가 객체로 들어 있음
    // 객체 안에 있는 키 == input의 name
    // 객체 안에 있는 값 == input의 value
    console.log(data);

    // 요청한 데이터의 내용을 데이터베이스에 추가
    const sql = "INSERT INTO products (name,tel,series)VALUES(?,?,?)";
    // query 메소드 두 번째 매개변수로 value를 순서대로 전달 (배열 형태)
    _mysql.query(sql, [data.name,data.tel,data.series], () => {
        res.redirect("/"); // 추가 끝나면 redirect() 로 url 이동
    });
})


// 삭제
app.get("/delete/:id", (req, res) => {
    // :id : url 요청에서 파라미터 값
    // ex) http://localhost:9002/delete/1 == {id : 1}
    // req.params.id == 1

    const sql = "DELETE FROM products WHERE id=?";
    _mysql.query(sql, [req.params.id], () => {
        res.redirect("/");
    })
});

// 서버 대기 상태
app.listen(9002, () => {
    console.log("server opened");
});