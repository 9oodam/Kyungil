const router = require("express").Router();
const {viewProfile, modifyProfile} = require("../controllers/profileCon");
const {isLogin} = require("../middleware/isLogin");
const {Upload} = require("../middleware/imgUpload");

router.get('/', isLogin, viewProfile);

router.post('/upload', isLogin, Upload.single("upload"), modifyProfile);

module.exports = router;