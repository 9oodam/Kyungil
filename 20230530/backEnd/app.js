// 서버측 컴퓨터 폴더에 이미지 파일 저장
// 파일의 경로를 설정하고 서버측에서 이미지 파일을 불러와 보여줌

// express path multer cors
// multer : 파일이 저장될 경로나 파일의 확장자 이름 등을 설정해서 파일을 저장

const express = require("express");
const path = require("path");
const cors = require("cors");
const uploadRouter = require("./routers/uploadRouter");

const app = express();

app.use(cors({
    origin : "http://127.0.0.1:5500", // 허용할 도메인
    credentials : true // 요청에서쿠키를 포함시킬지 여부
}));

app.use(express.urlencoded({extended : false}));

// 정적 폴더 경로
app.use("/img", express.static(path.join(__dirname, "uploads")));


// 요청과 응답에서 json 형식의 데이터를 전달 받았을 때
// 파싱을 해서 자바스크립트 객체로 변환 시켜주는 미들웨어
app.use(express.json());

app.use("/upload", uploadRouter);



app.listen(9020, () => {
    console.log("server opened");
});