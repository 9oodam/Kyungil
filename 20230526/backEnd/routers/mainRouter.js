const router = require("express").Router();
const {updateUser, viewMyList} = require("../controllers/mainCon");
const {isLogin} = require("../middleware/loginMid");

router.get('/', isLogin, viewMyList);

router.post('/update', isLogin, updateUser);


module.exports = router;