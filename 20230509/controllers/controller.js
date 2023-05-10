const users = require("../models/users");
const posts = require("../models/posts");
const comments = require("../models/comments");

exports.Signup = async function(req, res) {
    console.log(req.body);
    const {user_id, user_pw} = req.body;
    try {
        await users.signup(user_id, user_pw);
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

exports.Thumbs = async function(req, res) {
    const {id} = req.params;
    const {thumbs} = req.body;
    try {
        await posts.Thumbs(id, thumbs);
    } catch (error) {
        console.log("error(controller) : 좋아요 증가 실패");
    }
}

exports.InsertComment = async function(req, res) {
    const {content} = req.body;
    try {
        await posts.insert(content);
    } catch (error) {
        console.log("error(controller) : 댓글 추가 실패");
    }
}