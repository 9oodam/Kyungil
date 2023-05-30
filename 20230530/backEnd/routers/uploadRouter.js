const router = require("express").Router();
const {Upload} = require("../middleware/imgUpload");

// single(form에서 정한 input 이름)
router.post('/', Upload.single("upload"), (req, res) => {
    const {file, body} = req;
    console.log("file : ", file);
    console.log("body : ", body);

    // http://localhost:9020/img/KakaoTalk_Photo_2023-04-27-23-50-13 005_1685410748343.jpeg
    res.send("파일 저장 완료");
});

module.exports = router;