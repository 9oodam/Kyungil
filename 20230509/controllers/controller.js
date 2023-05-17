const users = require("../models/users");
const posts = require("../models/board");
const comments = require("../models/comments");

const jwt = require("jsonwebtoken");

// users
exports.UserList = async function(req, res) {
    try {
        const data = await userList(); // 함수 실행해서 반환값 받아옴
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.Signup = async function(req, res) {
    const {user_id, user_pw} = req.body;
    try {
        const data = await users.userInsert(user_id, user_pw);
        return data;
    } catch (error) {
        console.log("error(controller) : 회원가입 실패");
    }
}

exports.Login = async function(req, res) {
    const {user_id, user_pw} = req.body;
    try {
        const data = await users.userSelect(user_id);
        return data;
    } catch (error) {
        console.log("error(controller) : 로그인 실패");
    }
}

exports.verifyLogin = async function(req, res, next) {
    // 세션 값 가져오기
    const {access_token, refresh_token} = req.session;
    
    // 검증
    jwt.verify(access_token, process.env.ACCES_TOKEN_KEY, (err, acc_decoded) => {
        if(err) {
            // access token이 썩었으면 refresh token도 확인
            jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY, async (err, ref_decoded) => {
                if(err) {
                    // refresh token도 썩었으면
                    console.log("refresh token 만료");
                    res.send("refresh token 만료 | 다시 로그인 하세요");
                }else {
                    const data = await userSelect(ref_decoded.user_id); // 해석된 payload 값에 해당 user_id가 있으면
                    console.log(ref_decoded.user_id);
                    console.log(data.refresh);
    
                    if(data.refresh == refresh_token) { // 접속했던 사람인지 확인
                        const accessToken = jwt.sign({ // access token 재발급
                            user_id : ref_decoded.user_id,
                            mail : "user1@naver.com",
                            nick : "user1"
                        }, process.env.ACCESS_TOKEN_KEY, {
                            expiresIn : "5s"
                        });
    
                        req.session.access_token = accessToken;
                        console.log("access token 재발급");
    
                        next(); // 다음 미들웨어 실행
    
                    }else {
                        res.send("중복 로그인 | 다시 로그인 하세요");
                    }
                }
            });
        }else {
            // access token이 정상이면
            console.log("로그인 정상 유지 중");
            next(); // 다음 미들웨어 실행
        }
    });
}


// posts
exports.ViewPostAll = async function(req, res) {
    try {
        const data = await posts.viewPostAll();
        return data;
    } catch (error) {
        console.log("error(controller) : 글 조회 실패");
    }
}

exports.SelectPost = async function(req, res) {
    const {id} = req.params;
    try {
        const data = await posts.selectPost(id);
        return data;
    } catch (error) {
        console.log("error(controller) : 글 상세 조회 실패");
    }
}

exports.Insert = async function(req, res) {
    const {title, details} = req.body;
    try {
        await posts.insert(title, details);
    } catch (error) {
        console.log("error(controller) : 글 추가 실패");
    }
}

exports.Update = async function(req, res) {
    const {id} = req.params;
    const {title, details} = req.body;
    try {
        await posts.update(id, title, details);
    } catch (error) {
        console.log("error(controller) : 글 수정 실패");
    }
}

exports.Delete = async function(req, res) {
    const {id} = req.params;
    try {
        await posts.delete(id);
    } catch (error) {
        console.log("error(controller) : 글 삭제 실패");
    }
}

exports.ThumbsUp = async function(req, res) {
    const {id} = req.params;
    try {
        await posts.thumbsUp(id);
        return id;
    } catch (error) {
        console.log("error(controller) : 좋아요 증가 실패");
    }
}


// comments
exports.ViewComment = async function(req, res) {
    const {id} = req.params;
    try {
        const data2 = await comments.viewComment(id);
        console.log(data2);
        return data2;
    } catch (error) {
        console.log("error(controller) : 댓글 조회 실패");
    }
}

exports.InsertComment = async function(req, res) {
    const {id} = req.params;
    const {content} = req.body;
    console.log(id, content);
    try {
        await comments.insertComment(id, content);
        return id;
    } catch (error) {
        console.log("error(controller) : 댓글 추가 실패");
    }
}

exports.DeleteComment = async function(req, res) {
    const {id2} = req.params;
    try {
        const postsID = await comments.deleteComment(id2);
        return postsID;
    } catch (error) {
        console.log("error(controller) : 댓글 삭제 실패");
    }
}