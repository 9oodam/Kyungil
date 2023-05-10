const users = require("../models/users");
const posts = require("../models/posts");
const comments = require("../models/comments");

// users
exports.Signup = async function(req, res) {
    const {user_id, user_pw} = req.body;
    try {
        const data = await users.signup(user_id, user_pw);
        return data;
    } catch (error) {
        console.log("error(controller) : 회원가입 실패");
    }
}

exports.Login = async function(req, res) {
    const {user_id, user_pw} = req.body;
    try {
        const data = await users.login(user_id, user_pw);
        return data;
    } catch (error) {
        console.log("error(controller) : 로그인 실패");
    }
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