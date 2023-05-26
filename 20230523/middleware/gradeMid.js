// 0 : 승인 대기 중인 유저
// 1 : 승인 완료된 유저 (게시글 작성 가능)
// 2 : 승인 완료된 유저 (게시글 작성 + 댓글 작성 가능)
// 3 : 관리자

const {User, Post} = require("../models");

exports.adminCheck = async (req, res, next) => {
    try {
        const {acc_decoded} = req;
        const user = await User.findOne({where : {user_id : acc_decoded.user_id}});
        if(user.grade == 3) {
            next();
        }else {
            res.send("접근 권한이 없습니다");
        }
    } catch (error) {
        console.log(error);
    }
}

exports.gradeCheck = async (req, res, next) => {
    try {
        const {acc_decoded} = req;
        const user = await User.findOne({where : {user_id : acc_decoded.user_id}});
        if(user.grade == 2) {
            next();
        }else {
            res.send("댓글 쓰기 권한이 없습니다");
        }
    } catch (error) {
        console.log(error);
    }
}

exports.countPosts = async (req, res, next) => {
    try {
        const {acc_decoded} = req;
        const user = await User.findOne({where : {user_id : acc_decoded.user_id}});


    } catch (error) {
        console.log(error);
    }
}