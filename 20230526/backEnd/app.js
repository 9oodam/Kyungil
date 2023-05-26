// 로그인 페이지 복습
// 폴더를 나누기 (프론트 & 백엔드)

// express express-session cors

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dot = require("dotenv").config();

const {sequelize} = require("./models");

const mainRouter = require("./routers/mainRouter");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
const listRouter = require("./routers/listRouter");

const app = express();

app.use(express.urlencoded({extended : false}));

app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : false
}));

sequelize.sync({force : false}).then(() => {
    console.log("sequelize 연결 성공");
}).catch((err) => {
    console.log(err);
});

// 다른 도메인에서 악의적으로 접근 할 수 없도록 도메인 접근시 발생하는 보안 정책
// 통신을 안전하게 유지 시킴
// cors 모듈로 미들웨어를 추가하여 도메인을 허용해주면 접근 가능해짐
// Access-control-Allow-origin 을 헤더에 포함
// 허용이 되었다는 것(응답)을 브라우저에서 받고 헤더값을 확인해서 접근을 허용 or 차단
app.use(cors({
    // 도메인 허용 옵션
    origin : "http://127.0.0.1:5500", // 1) 접근을 허용할 도메인 (여러 개의 도메인을 허용하려면 배열의 형태로)
    credentials : true // 2) 클라이언트의 요청에 쿠키를 포함할지
}));

// test
app.get('/', (req, res) => {
    res.send("응답");
});

app.use('/list', listRouter);
app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.listen(9019, () => {
    console.log("server opened");
});