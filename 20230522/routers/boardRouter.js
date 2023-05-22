const router = require("express").Router();
const {isLogin} = require("../middleware/loginMiddleware");
const {boardMain, boardCreate, boardView, boardUpdate, boardDelete} = require("../controllers/boardController");

router.get('/', isLogin, boardMain);

router.get('/view/:id', isLogin, boardView);

router.post('/create_board', isLogin, boardCreate);

router.post('/update_board/:id', isLogin, boardUpdate);

router.get('/delete/:id', isLogin, boardDelete);

module.exports = router;