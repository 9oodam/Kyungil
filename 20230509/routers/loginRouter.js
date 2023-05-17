const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();


// controller 에서 작성한 내용 가져오기
const {Login} = require("../controllers/controller");


// login page (로그인 페이지)
router.get('/', async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log("error(router) : 로그인 페이지 렌더 실패");
    }
});

router.post('/', async (req, res) => {
    console.log("로그인 인풋(router) : ", req.body);
    try {
        const {data} = await Login(req, res);
        console.log("로그인 데이터 : " + data);

        // 로그인 실패
        if(data === undefined) {
            res.render('loginErr');
        // 로그인 성공
        }else {
            // 1) access token 발급
            const accessToken = jwt.sign({
                user_id : data.user_id,
                mail : "user1@naver.com",
                nick : "user1"
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn : "5s"
            });

            // 2) refresh token 발급
            const refreshToken = jwt.sign({
                user_id : data.user_id
            }, process.env.REFRESH_TOKEN_KEY, {
                expiresIn : "20s"
            });

            // 중복 로그인 방지 위해
            await userRefresh(user_id, refreshToken);
            req.session.access_token = accessToken;
            req.session.refresh_token = refreshToken;

            res.render('main');
        }
    } catch (error) {
        console.log("error(router) : 로그인 실패");
        console.log(error);
    }
});

module.exports = router;