const router = require("express").Router();
const {viewAllList, insertList} = require("../controllers/listCon");
const {isLogin} = require("../middleware/loginMid");

router.get('/', isLogin, viewAllList);

router.post('/insert', isLogin, insertList);

module.exports = router;