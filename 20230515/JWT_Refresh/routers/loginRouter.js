const router = require("express").Router();
const { LogIn, verifyLogin } = require("../controllers/usersController");

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', LogIn);

// 로그인 상태에서만 요청해야 하는 작업
router.get('/mypage', verifyLogin, (req, res) => {
    res.send("로그인 상태로 마이페이지 이동");
});

module.exports = router;