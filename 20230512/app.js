// 사용할 모듈 express, jsonwebtoken, dotenv

// dotenv
// 어플리케이션 만들면서 설정값을 작성하는 공간
// 민감한 정보의 보안성을 높이기 위해 탈취하기 쉬운 소스코드가 아닌 .env 파일에 작성
// ex) 비밀 키, 암호, API 토큰 등

const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const dot = require("dotenv").config(); // dotenv 모듈에서 config 메소드 실행 == .env 파일을 읽어서 적용

// JWT를 만들 때 비밀키를 가지고 토큰을 만들어서 암호화 시킬 예정 -> 비밀키는 탈취되면 안되기 때문에 .env 파일에 작성
const KEY = process.env.KEY; // process.env 객체에 .env파일에 설정한 이름으로 키가 들어있음

// 서버 인스턴스 생성
const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : false}));

app.get('/', (req, res) => {
    res.render('main');
});

app.post('/login', (req, res) => {
    // 로그인이 정상적으로 됐다 가정하고 토큰 발급

    // 유저 정보
    const name = "user1";
    const key = process.env.KEY;
    // sign() : JWT 토큰 생성
    // sign(header 객체, 비밀 키, payload)
    let token = jwt.sign({
        type : "JWT",
        name : name
    }, key, {
        // 토큰을 유지시킬 유효시간(만료시간)
        expiresIn : "5m", // 5분
        issuer : name // 토큰 발급한 유저
    });

    res.send(JSON.stringify(token));
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwibmFtZSI6InVzZXIxIiwiaWF0IjoxNjgzODU4NTcwLCJleHAiOjE2ODM4NTg4NzAsImlzcyI6InVzZXIxIn0.rC_rYKfPHajp27KY8OkhTVGXXgQHQXpHEtxFo9C9-ik"
    // header : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    // payload : eyJ0eXBlIjoiSldUIiwibmFtZSI6InVzZXIxIiwiaWF0IjoxNjgzODU4NTcwLCJleHAiOjE2ODM4NTg4NzAsImlzcyI6InVzZXIxIn0
    // signature : rC_rYKfPHajp27KY8OkhTVGXXgQHQXpHEtxFo9C9-ik
});

// JWT (JSON Web Token)

// 웹표준으로 두 객체의 JSON객체를 사용해서 정보를 안전성 있게 전달
// JWT를 생성하면 사용할 모듈이 인코딩과 해싱 작업을 수행
// HMAC : 해싱 기법을 적용해서 메시지의 위변조를 방지하는 기법
// SHA256 : 해싱 알고리즘, 임의의 길이 메시지를 256bit의 축약된 메시지로 만들어냄

// 사용할 기본 정보를 자체적으로 가지고 있음 (ex. 유저 정보, 프로필)
// 토큰이 정상인지 검증(서명)을 포함하고 있음

// 주로 로그인이 정상적인지 회원 인증 권한에서 사용 (로그인이 유지되고 있는지, 만료 되었는지)
// 정상적인 루트로 로그인을 요청한 유저면 토큰을 발급해서 전달
// 유저가 서버에 요청을 할 때 JWT를 포함해서 요청 -> 서버가 요청을 받고 토큰이 썩은 토큰인지 검사 -> 정상 토큰이면 유저가 요청한 작업 수행 후 응답


// 접속을 유지하기 위한 access 토큰 만들기
// 구조

// header : 타입과 알고리즘의 정보
// let header = {
//     alg : "SHA256", // 사용하는 해싱 알고리즘
//     type : "JWT" // 토큰의 타입
// }

// // payload : 유저의 정보와 만료 기간
// let payload = {
//     sub : "12345", // 토큰의 이름(제목)
//     name : "Kim", // 유저의 이름(프로필)
//     lat : "12345687" // 토큰 발급된 시간(발급 후 얼마나 지났는지)
// }

// // signature : header와 payload 값을 64로 인코딩하고 합쳐서 해싱해 비밀키로 만듦
// let signature = HMACSHA256(BASE64(header) + BASE64URL(payload)); // 64로 인코딩하여 합치고 해싱






// 서버 대기 상태
app.listen(9007, () => {
    console.log("server opened");
});