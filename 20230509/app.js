// 모듈 불러오기
const express = require("express");
const path = require("path");
const router = require("./routers/router"); // routers 폴더의 모듈

// 인스턴스 생성
const app = express();

// 파일 경로 설정
app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

// 정적 파일 이용을 위한 미들웨어 추가
app.use("/css", express.static(path.join(__dirname, "public")));

// routers 폴더의 모듈을 불러와 경로 지정
app.use("/posts", router);

// 서버 대기 상태
app.listen(9006, () => {
    console.log("server opened");
});