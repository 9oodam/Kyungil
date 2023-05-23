const router = require("express").Router();
const {boardView, boardInsert, boardSelect, boardUpdate, boardDelete} = require("../controllers/boardCon");
const {commentView} = require("../controllers/commentCon");
const {isLogin} = require("../middleware/loginMid");

router.get('/', isLogin, boardView);

router.post('/', isLogin, boardInsert);

router.get('/update/:id', isLogin, boardSelect);

router.post('/update/:id', isLogin, boardUpdate);

router.get('/delete/:id', isLogin, boardDelete);

router.get('/comment/:id', isLogin, commentView);



module.exports = router;