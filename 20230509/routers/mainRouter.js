const express = require("express");
const router = express.Router();

// main page (메인 페이지)
router.get('/', async (req, res) => {
    try {
        res.render('main');
    } catch (error) {
        console.log("error(router) : 메인 페이지 렌더 실패");
    }
});

module.exports = router;