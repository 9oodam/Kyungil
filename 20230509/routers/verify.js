const router = require("express").Router();
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post('/', (req, res) => {
    const token = req.session.token;
    const key = process.env.KEY;
    
    // verify() : 토큰이 유효한지 검증
    // verify(토큰, key, 콜백함수(err, 해석된 객체))
    jwt.verify(token, key, (err, decoded) => { // key를 기준으로 가져온 token을 분석 == 복호화
        if(err) {
            console.log("썩은 토큰", err);
            res.render('loginErr');
        }else {
            console.log("정상 토큰", decoded);
            res.render('list');
        }
    });
});

module.exports = router;