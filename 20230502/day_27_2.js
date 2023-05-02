// express path 모듈 (내장 모듈)
// 경로에 대한 조작을 도와주는 모듈
// 파일 시스템의 경로를 상대경로나 절대경로로 설정할 수 있음

// 1) 모듈 가져오기
const express = require("express");
const path = require("path");

// 2) 서버 인스턴스 생성
const app = express();

// 3) 라우팅 설정하기
// get 방식: 요청해서 데이터를 가져옴
app.get('/', (req, res) => {
    const body = path.join(__dirname, "views", "main.html"); // join() : 전달 받은 경로 합쳐주기
    
    console.log(__dirname); // /Users/damin/Desktop/Kyungil/20230502
    console.log(body);      // /Users/damin/Desktop/Kyungil/20230502/views/main.html

    // sendFile() : html 파일을 브라우저에서 읽을 수 있도록 브라우저로 보내줌
    res.sendFile(body);
});

app.get('/list', (req, res) => {
    const body = path.join(__dirname, "views", "list.html"); 
    res.sendFile(body);
});

app.get('/mypage', (req, res) => {
    const body = path.join(__dirname, "views", "myPage.html");
    res.sendFile(body);
});

// 4) 서버 대기 상태
app.listen(9001, () => {
    console.log("server opened");
});