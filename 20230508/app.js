// MVC 패턴 (Model View Controller)
// 많이 사용하는 기본적인 디자인 패턴
// 유지보수와 확장성을 고려하여 개발할 수 있음
// 협업 간의 코드 표준화에 용이

// Model : 데이터를 다루는 로직, 어플리케이션의 동작을 관리하는 폴더 (ex. 글 작성 등의 기능)
// View : 사용자가 볼 수 있는 화면의 데이터를 표시
// Controller : model과 view의 사이에서 동작을 제어, model의 상태를 가지고 view에 반영


// package.json 만들기
// npm init -y

// npm i express ejs mysql2
const express = require("express");
const path = require("path"); // 경로 설정, 조작 도와주는 express 내장 모듈
const app = express();
const postsRouter = require("./routers/posts");


app.set("views", path.join(__dirname, "page")); // View 엔진으로 보여줄 파일들의 경로 설정
app.set("view engine", "ejs"); // View 엔진으로 ejs 사용

app.use(express.urlencoded({extended : false})); // body 객체 사용하기 위해 미들웨어 추가


// 정적인 파일을 사용하기 위해 미들웨어 추가
// 첫 번째 매개변수로 경로를 지정 가능
app.use("/css", express.static(path.join(__dirname, "public")));
// 지정하지 않을 경우 기본적으로 / 루트경로로 지정됨 (/ == /public)
// app.use(express.static(path.join(__dirname, "public")));


// postsRouter 객체에 get()으로 / 루트경로 지정했을 때
// "/posts" 경로도 함께 추가되어서 라우팅 됨 (게시글은 "/posts" 까지 붙어야 루트경로로 요청이 됨 -> localhost:9005/posts)
app.use("/posts", postsRouter);

// 서버 대기 상태
app.listen(9005, () => {
    console.log("server opened");
});