const express = require("express");
const router = express.Router();

const {UserReset, CheckLoggedUser, CheckRemainTime} = require("../controllers/controller");

// main page (메인 페이지)
router.get('/', async (req, res) => {
    try {
        const data = await CheckLoggedUser(req, res);
        console.log("(router) 로그인 된 유저", data);
        
        if(data) { // 로그인 된 유저가 있으면
            const {remainTimeM, remainTimeS} = await CheckRemainTime(req, res);
            console.log("(router) 유효시간: ", remainTimeM, remainTimeS);
            res.render('main', {data, remainTimeM, remainTimeS});
        }else { // 없으면
            res.render('main', {data : null});
        }
    } catch (error) {
        console.log("error(router) : 메인 페이지 렌더 실패");
    }
});

router.get('/logout', async (req, res) => {
    try {
        await UserReset(req, res);
    } catch (error) {
        console.log("error(router) : 로그아웃 실패");
    }
})

module.exports = router;