// 로그인 & 게시판 글 작성, 수정, 삭제

const express = require("express");
const session = require("express-session");
const dot = require("dotenv").config();
const path = require("path");

const {sequelize} = require("./models");

const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const boardRouter = require("./routers/boardRouter");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : false}));
app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false, // 다시 저장할지 여부
    saveUninitialized : false // 초기화 할지 여부
}));

sequelize.sync({force : false}).then((e) => { // force : 초기화 여부
    console.log("연결 성공")
}).catch((err) => {
    console.log(err);
});

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/board", boardRouter);

app.listen(9013, () => {
    console.log("server opened");
});