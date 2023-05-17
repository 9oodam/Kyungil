// 모듈 불러오기
const express = require("express");
const path = require("path");
const session = require("express-session"); // 세션 사용을 위한 모듈

const dot = require("dotenv");
const jwt = require("jsonwebtoken");

const mainRouter = require("./routers/mainRouter"); // routers 폴더의 모듈
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const listRouter = require("./routers/listRouter");


// 인스턴스 생성
const app = express();

// 파일 경로 설정
app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

// 정적 파일 이용을 위한 미들웨어 추가
app.use("/css", express.static(path.join(__dirname, "public")));

// body 객체 사용 위한 미들웨어
app.use(express.urlencoded({extended : false}));

// application Cookies 생성
app.use(session({
    // 세션을 발급할 때 사용할 키
    // 나중에는 소스코드에 노출 안되게 바꿀 예정
    secret : process.env.SESSION_KEY,
    // 세션이 변경되거나 저장하거나 불러올 때 다시 저장할지 여부
    resave : false,
    // 세션에 저장할 때 초기화 여부
    saveUninitialized : true
}));

// routers 폴더의 모듈을 불러와 경로 지정
app.use("/", mainRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/list", listRouter);


// 서버 대기 상태
app.listen(9006, () => {
    console.log("server opened");
});