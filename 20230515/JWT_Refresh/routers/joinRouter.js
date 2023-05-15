const router = require("express").Router();
const {SignUp} = require("../controllers/usersController");

router.get('/', (req, res) => {
    res.render("join");
});

router.post('/', SignUp); // SignUp 함수 실행 값이 저장

module.exports = router;