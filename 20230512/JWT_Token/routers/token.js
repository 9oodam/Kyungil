const router = require("express").Router(); // express 실행해서 서버 객체 만들고 그 안의 Router 실행
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post('/logedIn', (req, res) => {
    const name = "koo";
    const key = process.env.KEY;

    let token = jwt.sign({
        type : "JWT",
        name : name
    }, key, {
        expiresIn : "3m",
        issuer : name
    });

    req.session.token = token;
    res.render("loginSuc");
});

// 다른 곳에서 로그인 했으면 중복 로그인 방지
// DB에 엑세스 토큰을 저장하고 로그인 하면 엑세스 토큰을 갱신

module.exports = router;