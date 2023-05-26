const {User, Post} = require("../models");

// 유저 정보 수정
exports.updateUser = async (req, res) => {
    try {
        const {acc_decoded} = req;
        const {user_name, user_age} = req.body;

        await User.update({name : user_name, age : user_age}, {where : {user_id : acc_decoded.user_id}});
        res.redirect('http://127.0.0.1:5500/20230526/frontEnd/main.html');

    } catch (error) {
        console.log(error);
    }
}

exports.viewMyList = async (req, res) => {
    try {
        const {acc_decoded} = req;

        const data = await Post.findAll({where : {user_id}});
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}