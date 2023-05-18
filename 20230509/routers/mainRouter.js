const express = require("express");
const router = express.Router();

const {UserReset, CheckLoggedUser} = require("../controllers/controller");

// main page (메인 페이지)
router.get('/', async (req, res) => {
    try {
        const data = await CheckLoggedUser(req, res);
        console.log("(router) 로그인 된 유저", data);
        if(data) {
            res.render('main', {data});
        }else {
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