// 1) npm init -y
// 2) package.json 스크립트에 start 추가
// 3) npm i express
// 4) npm i ejs

// express, ejs, mysql2, path 사용
const express = require("express");
const mysql2 = require("mysql2");
const path = require("path");

// 서버 인스턴스
let app = express();

// mysql 연결
const _mysql = mysql2.createConnection({
    user : "root",
    password : "3102",
    database : "test4",
    host : "127.0.0.1",
    multipleStatements : true // 다중 쿼리문 사용 가능한 옵션
});


// express의 views 속성 설정 (파일들의 경로)
// 서버사이드 렌더링을 지원하기 위해 view 엔진 사용
// view 엔진 : 템플릿 파일을 보여주는 역할

// console.log(app); // views: '/Users/damin/Desktop/Kyungil/20230503/views'
app.set("views", path.join(__dirname, "page"));
// console.log(app); // views: '/Users/damin/Desktop/Kyungil/20230503/page'


// view 엔진으로 ejs 사용할 수 있게 설정
app.set("view engine", "ejs");

// express에서 body-parser 지원
app.use(express.urlencoded({extended : false}));


// 페이지 설정
app.get("/", (req, res) => {
    // render() : view 엔진이 문자열을 html로 브라우저에 송출 == 렌더링
    // render(파일의 이름, 전달할 데이터)
    res.render("main");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/login", (req, res) => {
    res.render("login");
});


// 로그인 페이지
app.post('/login', (req, res) => {
    // 요청에 대한 내용은 req 객체에 들어있음
    // 요청을 하면서 보낸 데이터는 body 객체에 들어있음 : {user_id : 인풋 밸류, user_pw : 인풋 밸류}
    const {user_id, user_pw} = req.body;

    // 전달받은 데이터와 database 에 동일한 id 와 pw가 있으면 로그인 성공
    const sql = "SELECT * FROM users WHERE user_id = ? AND user_pw = ?";
    _mysql.query(sql, [user_id, user_pw], (err, result) => {
        if(err) {
            // 로그인 실패시
            res.render("mypage");
        }else {
            // 로그인 성공시
            console.log(result);
            res.render("mypage", {data : result[0]});
        }
    });

    //res.send(`user_id : ${user_id} | user_pw : ${user_pw}`);
});

// 회원가입 페이지
app.post('/signup', (req, res) => {
    const {user_id, user_pw} = req.body;
    console.log(user_id, user_pw);

    const sql = "INSERT INTO users (user_id, user_pw)VALUES(?, ?)"; // table에 만든 column
    _mysql.query(sql, [user_id, user_pw], (err) => {
        if(err) {
            // 회원가입 실패시 signupErr page 띄워줌
            res.render("signupErr");
        }else {
            // 회원가입 성공시 login url 로 변경
            res.redirect("login");
        }
    });
});

// 게시판 목록 페이지
app.get('/list', (req, res) => {
    const sql = "SELECT * FROM products";
    _mysql.query(sql, (err, result) => {
        res.render("list", {data : result});
    });
});

// 게시판 등록 페이지
app.get('/insert', (req, res) => {
    res.render("insert");
});

app.post('/insert', (req, res) => {
    const {name, number, series} = req.body;
    const sql = "INSERT INTO products (name, number, series)VALUES(?, ?, ?)";
    _mysql.query(sql, [name, number, series], () => {
        res.redirect('/list');
    });
});


// 삭제
app.get('/delete/:id', (req, res) => {
    // :id : parameter 값
    // /delete/1 == req.params = {id : 1}
    // req.params.id == 1 이 값을 가지고 데이터베이스에 글 조회를 해서 보여줄 수도 있음

    // 다중 쿼리문 사용
    const sql = "DELETE FROM products WHERE id = ?; SET @CNT = 0; UPDATE products SET products.id = @CNT:=@CNT+1; ALTER TABLE products AUTO_INCREMENT = 0;";
    // DELETE FROM products WHERE id = ? => 값을 제거하는 명령어 (테이블 products의 행에 ? 값을 넣어주고 넘겨준 id값을 가지고 있는 행을 찾아서 제거)
    // SET @CNT = 0; => 카운트 0으로 초기화
    // UPDATE products SET products.id = @CNT:=@CNT+1 => 값을 수정하는 명령어 (테이블 products의 행을 id를 다시 갱신)
    // ALTER TABLE products AUTO_INCREMENT = 0; => 자동증가 속성을 0으로 변경
    
    _mysql.query(sql, [req.params.id], () => {
        res.redirect('/list');
    });
});

// 수정
app.get('/edit/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    const id = req.params.id;

    _mysql.query(sql, [id], (err, result) => {
        res.render("edit", {data : result[0]});
    });
});

app.post('/edit/:id', (req, res) => {
    const {name, number, series} = req.body;
    const sql = "UPDATE products SET name = ?, number = ?, series = ? WHERE id = ?";
    _mysql.query(sql, [name, number, series, req.params.id], () => {
        res.redirect('/list');
    });
});


// 서버 대기 상태
app.listen(9004, () => {
    console.log("server opened");
});