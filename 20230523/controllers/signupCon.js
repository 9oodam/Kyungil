const {User} = require("../models");
const bcrypt = require("bcrypt");

exports.Signup = async (req, res) => {
    try {
        const {name, user_id, user_pw} = req.body;

        const user = await User.findOne({where : {user_id}}); // 중복 체크
        if(user != null) {
            return res.send("중복 아이디");
        }

        // 회원가입
        const hash = bcrypt.hashSync(user_pw, 10);

        User.create({
            name,
            user_id,
            user_pw : hash,
            grade : 0
        });

        res.redirect('/'); // 회원가입 후 메인 페이지로

    } catch (error) {
        console.log(error);
    }
}