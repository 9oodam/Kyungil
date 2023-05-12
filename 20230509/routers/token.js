const router = require("express").Router(); // express 실행해서 서버 객체 만들고 그 안의 Router 실행
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post('/logedIn', (req, res) => {
    const name = "koo";
    const key = process.env.KEY; // 토큰을 암호화

    let token = jwt.sign({
        // payload : 사용자가 받는 정보
        type : "JWT",
        name : name // 유저 이름
    }, key, {
        // header : 설정값
        expiresIn : "15m",
        issuer : name // 발급자 이름
    });

    req.session.token = token; // application Cookies를 변경하는 부분
    res.render("loginSuc");
});

// 다른 곳에서 로그인 했으면 중복 로그인 방지
// DB에 엑세스 토큰을 저장하고 로그인 하면 엑세스 토큰을 갱신

module.exports = router;