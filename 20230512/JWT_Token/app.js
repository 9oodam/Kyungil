const express = require("express");
const path = require("path");

const session = require("express-session"); // 세션 사용을 위한 모듈

const pageRouter = require("./routers/page");
const tokenRouter = require("./routers/token");
const verifyRouter = require("./routers/verify");


const app = express();


app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : false}));

app.use(session({
    // 세션을 발급할 때 사용할 키
    // 나중에는 소스코드에 노출 안되게 바꿀 예정
    secret : process.env.KEY2,
    // 세션이 변경되거나 저장하거나 불러올 때 다시 저장할지 여부
    resave : false,
    // 세션에 저장할 때 초기화 여부
    saveUninitialized : true
}));

app.use(pageRouter);
app.use(tokenRouter);
app.use('/userVerify', verifyRouter);


app.listen(9008, () => {
    console.log("server opened");
});