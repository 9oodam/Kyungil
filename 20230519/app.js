// Sequelize (시퀄라이즈)
// ORM (객체 관계 매핑) 모듈
// 객체와 데이터베이스를 ORM 라이브러리가 매핑 시켜줌 -> 자바스크립트 구문으로 SQL 제어 가능

// 설치 할 모듈 : express ejs sequelize mysql2 dotenv
const express = require("express");
const path = require("path");
const dot = require("dotenv").config();

const {sequelize, User, Post} = require("./models"); // index.js 에서 내보낸 모듈 중 구조분해 할당으로 sequalize 만

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : false}));

// Sequelize 구성 연결 매핑
// sync() : 데이터베이스를 동기화
sequelize.sync({focus : true}).then(() => {
    // 연결 성공
    console.log("연결 성공");
}).catch(() => {
    // 연결 실패
    console.log(err);
}); 

app.get('/', (req, res) => {
    res.render("create");
});

app.get('/main', (req, res) => {
    // findAll({검색 조건}), 전체 조회는 매개변수 필요 없음
    User.findAll({}).then((e) => {
        // 성공
        res.render("main", {data : e});
    }).catch((err) => {
        res.send("유저 조회 실패");
    });
});

app.post('/create', (req, res) => {
    const {name, age, msg} = req.body;
    // create() == INSERT
    // create({컬럼 내용})
    User.create({
        name : name,
        age : age,
        msg : msg
    });

    res.send("유저 값 추가 완료");
});

app.post('/create_post', (req, res) => {
    const {name, itemInput} = req.body;

    // findOne({검색 조건}) : 한 개의 값을 조회
    User.findOne({
        where : {name : name}
    }).then((e) => {
        Post.create({
            msg : itemInput,
            user_id : e.id
        })
    })
    res.send();
});

app.get('/view/:name', (req, res) => {
    console.log(req.params.name);
    User.findOne({
        // 해당 이름의 유저를 조회하면서
        where : {name : req.params.name},
        // raw : 관계형으로 불러온 값을 다 풀어서 볼 수 있음
        // raw : true,
        // 해당 유저의 id로 참조된 user_id가 있는 posts 테이블의 값을 같이 조회
        include : [{model : Post}] // 조회 할 모듈 posts 모델
    }).then((e) => {
        e.dataValues.Posts = e.dataValues.Posts.map((i) => i.dataValues);
        const Posts = e.dataValues;
        console.log(Posts);
        res.render("view", {data : Posts});
    });
});


app.listen(9012, () => {
    console.log("server opened");
});