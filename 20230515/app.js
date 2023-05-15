// 1. 사용자가 로그인 시도
// 2. 서버에서 사용자를 확인하고 입장 토큰 발행 (JWT 인증정보를 payload에 할당하고 생성)
// 3. 생성한 토큰을 클라이언트에 반환 -> 클라이언트는 해당 입장권을 가지고 있음
// 4. 클라이언트가 서버에 요청을 할 때 해당 입장권을 함께 보내서 요청 시도
// 5. 서버는 받아서 해당 입장권이 유효한지 확인 후 요청에 대한 응답
// 6. 입장권이 정상적인지 썩었거나 변조 되었는지 확인 -> 비정상이면 재로그인 유도 (입장권 새로 발급)


// Access token만 사용하는 경우 인증 보안이 취약 -> 다른 사람이 토큰을 악위적으로 탈취했을 때 유효기간이 끝날 때까지 막을 수 없음
// -> 유효기간을 짧게 주고 로그인을 재시도 하게끔 (번거로움)
// -> Refresh token을 같이 사용하면서 Refresh token의 유효기간을 길게
// -> ex) Refresh token (20분) & Access token (5분) -> 엑세스 토큰이 만료되면 리프레시 토큰이 다시 재발급 해주게끔

// 1. 클라이언트가 로그인
// 2. 서버에서 사용자를 확인하고 입장권 권한 인증 정보를 payload에 할당하고 생성
// 3. Refresh token을 만들어서 데이터베이스에 저장해두고 2개의 토큰을 전부 클라이언트에 전달
// 4. 클라이언트가 요청할 때 Access token을 전달해서 요청
// 5. 서버는 전달 받은 토큰을 확인하고 Access token을 디코딩 해서 사용자 정보를 확인
// 6. 토큰이 정상적인지 확인 -> 비정상이면 재로그인 유도
// 7. 만약 날짜가 지난 토큰이면 Refresh token으로 다시 재발급


// 오늘 사용할 모듈 : dotenv, express, ejs, cookie-parser, jsonwebtoken
const express = require("express");
const dot = require("dotenv").config();
const path = require("path");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : false}));
app.use(cookie());


// 유저 dummy 객체 (나중에 데이터베이스로 만들자)
const user = {
    id : "123",
    pw : "123"
}

// login
app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    // 요청 객체의 body에 user_id, user_pw
    const {user_id, user_pw} = req.body; // login.ejs 인풋에서 name으로 설정한 게 키 / 요청객체의 body (인풋 밸류)
    if(user_id === user.id && user_pw === user.pw) {
        // access token 발급
        const accessToken = jwt.sign({
            // payload
            id : user.id
        }, process.env.ACCESS_TOKEN_KEY, {
            expiresIn : "20s"
        });

        // refresh token 발급
        const refreshToken = jwt.sign({
            id : user.id
        }, process.env.REFRESH_TOKEN_KEY, {
            expiresIn : "1d"
        })

        // cookie 생성
        res.cookie("refresh", refreshToken, {maxAge : 24 * 60 * 60 * 1000});

        // 로그인 성공시 join 페이지로
        res.render('join', {accessToken});
    }
});

app.post('/refresh', (req, res) => {
    // 옵션 체이닝
    // refresh 라는 키가 있는지 확인하고 req.cookies 값을 호출
    if(req.cookies?.refresh) { 
        const refreshToken = req.cookies.refresh;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
            // err가 있으면 재로그인
            // 정상이면 access token 재발급
            if(err) {
                res.send('Please try login again');
            }else {
                const accessToken = jwt.sign({
                    id : user.id
                }, process.env.ACCESS_TOKEN_KEY, {
                    expiresIn : "20s"
                });
                
                res.render('join', {accessToken});
            }
        });
    }else {
        res.send('Please try login');
    }
});



app.listen(9009, () => {
    console.log("server opened");
});