const {posts} = require("../models"); // 경로를 폴더까지만 지정하면 자동으로 index.js 를 찾음

// 글 전체 조회
exports.ViewPostAll = async function(req, res) { // 여기서 req, res는 요청 응답 객체가 아닌 그냥 매개변수, 다른 파일에서 요청 응답 객체를 직접 넣을 예정
    try {
        const data = await posts.viewPostAll();
        return data;
    } catch (error) {
        console.log("error 발생 (controller에서 전체 글 조회 실패)");
    }
}

// 글 하나 조회
exports.SelectPost = async function(req, res) { // 여기서 req, res는 요청 응답 객체가 아닌 그냥 매개변수, 다른 파일에서 요청 응답 객체를 직접 넣을 예정
    const { id } = req.params;
    try {
        const data = await posts.selectPost(id);
        return data;
    } catch (error) {
        console.log("error 발생 (controller에서 글 조회 실패)");
    }
}

// 글 추가
exports.Insert = async function(req, res) {
    const {title, content} = req.body; // body객체 안에 있는 title, content 인풋밸류
    try {
        await posts.insert(title, content);
    } catch (error) {
        console.log("error 발생 (controller에서 글 추가 실패)");
    }
}

// 글 수정
exports.Update = async function(req, res) {
    const { id } = req.params;
    const {title, content} = req.body;
    try {
        await posts.update(id, title, content);
    } catch (error) {
        console.log("error 발생 (controller에서 글 수정 실패)");
    }
}

// 글 삭제
exports.Delete = async function(req, res) {
    const { id } = req.params;
    try {
        await posts.delete(id);
    } catch (error) {
        console.log("error 발생 (controller에서 글 삭제 실패)");
    }
}