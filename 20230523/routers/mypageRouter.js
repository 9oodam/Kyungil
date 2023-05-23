const router = require("express").Router();
const {isLogin} = require("../middleware/loginMid");

router.get('/', isLogin, (req, res) => {
    res.render("mypage");
});