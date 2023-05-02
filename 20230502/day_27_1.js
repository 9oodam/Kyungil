// express 모듈 (외장 모듈)
// http 요청과 응답을 더 편하게 사용할 수 있도록 도와주는 모듈
// nodejs 프레임워크
// 가장 기본적인 기능만 포함 == 자유도가 높음
// 라우팅 미들웨어 등 개발자가 원하는 방식으로 구성 가능
// 본인만의 보일러 플레이팅 가능
// 보일러 플레이팅 :반복적인 작업을 피할 수 있도록 미리 작성하여 개발의 생산성 향상

// 1) 설치
// npm init -y
// npm i express

// 2) 모듈 가져오기
const express = require("express");

// 3) 서버 객체 생성
const app = express(); // express 실행

// 4) express의 메소드
// 요청의 url에 따라
app.get('/', (req, res) => {
    // send() 로 응답 후 종료
    res.send("hello nodejs");
});

app.listen(9000, () => {
    console.log("server opened");
})

// 5) package.json 에서 스크립트 명령어 작성
// start 명령어 == npm start
// "start": "node day_27_1.js"
// dev라는 별도 지정 명령어 == npm run dev