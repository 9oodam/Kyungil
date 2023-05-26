const router = require("express").Router();
const {isLogin} = require("../middleware/loginMid");
const {adminCheck} = require("../middleware/gradeMid");
const {adminView, gradeUpgrade, gradeDowngrade} = require("../controllers/adminCon");

router.get('/', isLogin, adminCheck, adminView);

router.get('/upgrade/:id', gradeUpgrade);
router.get('/downgrade/:id', gradeDowngrade);

module.exports = router;