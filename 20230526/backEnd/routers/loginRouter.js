const router = require("express").Router();
const {Login, viewUser} = require("../controllers/loginCon");
const {isLogin} = require("../middleware/loginMid");

router.post('/', Login);

router.get('/view', isLogin, viewUser);

module.exports = router;