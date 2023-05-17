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
        const data = await Login(req, res);
        console.log("로그인 데이터 : ", data);

        // 로그인 실패
        if(data === undefined) {
            res.render('loginErr');
        // 로그인 성공
        }else {
            res.render('main');
        }
    } catch (error) {
        console.log("error(router) : 로그인 실패");
        console.log(error);
    }
});

module.exports = router;