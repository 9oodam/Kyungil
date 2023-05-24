const router = require("express").Router();
const {boardView, boardInsert, boardSelect, boardUpdate, boardDelete} = require("../controllers/boardCon");
const {commentView, commentInsert, commentDelete} = require("../controllers/commentCon");
const { gradeCheck } = require("../middleware/gradeMid");
const {isLogin} = require("../middleware/loginMid");

// 게시글 페이지
router.get('/', isLogin, boardView);
// 게시글 추가
router.post('/', isLogin, boardInsert);

// 수정 페이지
router.get('/update/:id', isLogin, boardSelect);
// 게시글 수정
router.post('/update/:id', isLogin, boardUpdate);

// 게시글 삭제
router.get('/delete/:id', isLogin, boardDelete);

// 댓글 페이지
router.get('/commentView/:id', isLogin, commentView);
// 댓글 추가
router.post('/insertC/:id', gradeCheck, commentInsert);
// 댓글 삭제
router.get('/deleteC/:id', gradeCheck, commentDelete);

module.exports = router;