// 0 : 승인 대기 중인 유저
// 1 : 승인 완료된 유저 (게시글 작성 가능)
// 2 : 승인 완료된 유저 (게시글 작성 + 댓글 작성 가능)
// 3 : 관리자

const {User} = require("../models");

exports.gradeCheck = async (req, res, next) => {
    try {
        const {acc_decoded} = req;
        const user = await User.findOne({where : {user_id : acc_decoded.user_id}});
        return user.grade;
    } catch (error) {
        console.log(error);
    }
}