const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();


// controller 에서 작성한 내용 가져오기
const {Signup} = require("../controllers/controller");


// signup page (회원가입 페이지)
router.get('/', (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.log("error(router) : 회원가입 페이지 렌더 실패");
    }
});

router.post('/', async (req, res) => {
    console.log("회원가입 인풋(router) : ", req.body);
    try {
        const data = await Signup(req, res);
        console.log("회원가입 데이터 : " + data);
        if(data == true) {
            res.redirect('/login');
        }else {
            res.render('signupErr');
        }
    } catch (error) {
        console.log("error(router) : 회원가입 실패");
    }
});


module.exports = router;