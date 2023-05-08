// 게시글의 라우터만 모아놓을 파일
const express = require("express");
const router = express.Router(); // Router() : 라우터를 나눠서 관리할 수 있음, 라우팅의 내용을 작성 해놓고 app.use로 추가

// controllers에 작성한 내용 가져오기
const {ViewPostAll, SelectPost, Insert, Update, Delete} = require("../controllers/posts");

router.get('/', async (req, res) => {
    try {
        const data = await ViewPostAll(req, res);
        res.render('main', {data});
    } catch (error) {
        console.log("error 발생 (router에서 게시글 리스트 전체 화면 그리기 실패)");
    }
});

// 게시글 상세 페이지
router.get('/details/:id', async (req, res) => {
    try {
        const data = await SelectPost(req, res);
        res.render('details', {data});
    } catch (error) {
        console.log("error 발생 (router에서 게시글 상세 화면 그리기 실패)");
    }
});

// 게시글 추가 페이지
router.get('/insert', (req, res) => {
    res.render('insert');
});

// 게시글 추가 요청이 들어올 시
router.post('/insert', async (req, res) => {
    try {
        await Insert(req, res);
        res.redirect("/posts"); // 추가 후 메인 페이지로
    } catch (error) {
        console.log("error 발생 (router에서 게시글 추가 실패)");
    }
});

// 게시글 수정 페이지
router.get('/edit/:id', async (req, res) => {
    try {
        const data = await SelectPost(req, res);
        res.render('edit', {data});
    } catch (error) {
        console.log("error 발생 (router에서 게시글 수정 화면 그리기 실패)");
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        await Update(req, res);
        res.redirect('/posts');
    } catch (error) {
        console.log("error 발생 (router에서 게시글 수정 실패)");
    }
});

// 게시글 삭제 처리
router.get('/delete/:id', async (req, res) => {
    try {
        await Delete(req, res);
        res.redirect('/posts');
    } catch (error) {
        console.log("error 발생 (router에서 게시글 삭제 실패)");
    }
});


module.exports = router;