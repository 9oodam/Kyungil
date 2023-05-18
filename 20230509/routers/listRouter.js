const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();


// controller 에서 작성한 내용 가져오기
const {Login, ViewPostAll, SelectPost, Insert, Update, Delete, InsertComment, ViewComment, ThumbsUp, DeleteComment, verifyLogin} = require("../controllers/controller");


// list page (게시판 페이지)
router.get('/', verifyLogin, async (req, res) => {
    try {
        const data = await ViewPostAll(req, res);
        res.render('list', {data});
    } catch (error) {
        console.log("error(router) : 글 조회 실패");
    }
});

// detail page (상세 페이지)
router.get('/detail/:id', async (req, res) => {
    try {
        const data = await SelectPost(req, res);
        const data2 = await ViewComment(req, res);
        res.render('detail', {data, data2});
    } catch (error) {
        console.log("error(router) : 글 상세 조회 실패");
    }
});

// 좋아요
router.get('/thumbs/:id', async (req, res) => {
    try {
        const data = await ThumbsUp(req, res);
        res.redirect('/list/detail/' + data);
    } catch (error) {
        console.log("error(router) : 좋아요 실패");
    }
});

// 댓글 추가
router.post('/detail/:id', async (req, res) => {
    try {
        const data = await InsertComment(req, res);
        res.redirect('/list/detail/' + data);
    } catch (error) {
        console.log("error(router) : 댓글 추가 실패");
    }
});

// 댓글 삭제
router.get('/deleteComment/:id2', async (req, res) => {
    try {
        const {postsID} = await DeleteComment(req, res);
        res.redirect('/list/detail/' + postsID);
    } catch (error) {
        console.log("error(router) : 글 삭제 실패");
    }
});

// insert page (게시글 추가 페이지)
router.get('/insert', (req, res) => {
    res.render('insert');
});

router.post('/insert', async (req, res) => {
    try {
        await Insert(req, res);
        res.redirect('/list'); // 추가 후 게시판 페이지로
    } catch (error) {
        console.log("error(router) : 글 추가 실패");
        console.log(error);
    }
});

// edit page (게시글 수정 페이지)
router.get('/edit/:id', async (req, res) => {
    try {
        const data = await SelectPost(req, res);
        res.render('edit', {data});
    } catch (error) {
        console.log("error(router) : 글 수정 화면 그리기 실패");
    }
});

router.post('/edit/:id', async (req, res) => {
    console.log(req.body);
    try {
        await Update(req, res);
        res.redirect('/list');
    } catch (error) {
        console.log("error(router) : 글 수정 실패");
    }
});

// delete page (게시글 삭제 페이지)
router.get('/delete/:id', async (req, res) => {
    try {
        await Delete(req, res);
        res.redirect('/list');
    } catch (error) {
        console.log("error(router) : 글 삭제 실패");
    }
});

module.exports = router;