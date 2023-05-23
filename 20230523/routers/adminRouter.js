const router = require("express").Router();
const {isLogin} = require("../middleware/loginMid");
const {gradeCheck} = require("../middleware/gradeMid");
const {adminView, gradeUpgrade, gradeDowngrade} = require("../controllers/adminCon");

router.get('/', isLogin, async (req, res) => {
    const grade = await gradeCheck(req, res);
    console.log(grade);
    if(grade == 3) {
        adminView(req, res);
    }else {
        res.send("접근 권한이 없습니다")
    }
});

router.get('/upgrade/:id', gradeUpgrade);
router.get('/downgrade/:id', gradeDowngrade);

module.exports = router;