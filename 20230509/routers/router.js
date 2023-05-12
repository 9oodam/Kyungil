const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();


// controller 에서 작성한 내용 가져오기
const {ViewPostAll, SelectPost, Insert, Update, Delete, InsertComment, Signup, Login, Thumbs, ViewComment, ThumbsUp, DeleteComment} = require("../controllers/controller");

// main page (메인 페이지)
router.get('/', async (req, res) => {
    try {
        res.render('main');
    } catch (error) {
        console.log("error(router) : 메인 페이지 렌더 실패");
    }
});

// signup page (회원가입 페이지)
router.get('/signup', (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.log("error(router) : 회원가입 페이지 렌더 실패");
    }
});

router.post('/signup', async (req, res) => {
    console.log("회원가입 인풋(router) : ", req.body);
    try {
        const data = await Signup(req, res);
        console.log("회원가입 데이터 : " + data);
        if(data !== true) {
            res.render('signupErr');
        }else {
            res.redirect('/posts/login');
        }
    } catch (error) {
        console.log("error(router) : 회원가입 실패");
    }
});

// login page (로그인 페이지)
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log("error(router) : 로그인 페이지 렌더 실패");
    }
});

router.post('/login', async (req, res) => {
    console.log("로그인 인풋(router) : ", req.body);
    try {
        const data = await Login(req, res);
        console.log("로그인 데이터 : " + data);

        if(data === undefined) {
            res.render('loginErr');
        }else {
            const name1 = req.body.user_id;
            const name2 = "koo";
            const key = process.env.KEY; // 토큰을 암호화

            let token = jwt.sign({
                // payload : 사용자가 받는 정보
                type : "JWT",
                name : name1 // 유저 이름
            }, key, {
                // header : 설정값
                expiresIn : "15m",
                issuer : name2 // 발급자 이름
            });

            req.session.token = token; // application Cookies를 변경하는 부분

            console.log(token);
            res.render('main');
        }
    } catch (error) {
        console.log("error(router) : 로그인 실패");
        console.log(error);
    }
});

function verify(req, res, next) {
    const token = req.session.token;
    const key = process.env.KEY;
    try {
        jwt.verify(token, key, (err, decoded) => { // key를 기준으로 가져온 token을 분석 == 복호화
            if(err) {
                console.log("썩은 토큰", err);
            }else {
                console.log("정상 토큰", decoded);
                next();
            }
        });
    } catch (error) {
        console.log("error");
    }
}

// list page (게시판 페이지)
router.get('/list', verify, async (req, res) => {
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
        res.redirect('/posts/detail/' + data);
    } catch (error) {
        console.log("error(router) : 좋아요 실패");
    }
});

// 댓글 추가
router.post('/detail/:id', async (req, res) => {
    try {
        const data = await InsertComment(req, res);
        res.redirect('/posts/detail/' + data);
    } catch (error) {
        console.log("error(router) : 댓글 추가 실패");
    }
});

// 댓글 삭제
router.get('/deleteComment/:id2', async (req, res) => {
    try {
        const {postsID} = await DeleteComment(req, res);
        res.redirect('/posts/detail/' + postsID);
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
        res.redirect('/posts/list'); // 추가 후 게시판 페이지로
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
        res.redirect('/posts/list');
    } catch (error) {
        console.log("error(router) : 글 수정 실패");
    }
});

// delete page (게시글 삭제 페이지)
router.get('/delete/:id', async (req, res) => {
    try {
        await Delete(req, res);
        res.redirect('/posts/list');
    } catch (error) {
        console.log("error(router) : 글 삭제 실패");
    }
});

module.exports = router;