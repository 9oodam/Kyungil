const bcrypt = require("bcrypt");
const {User} = require("../models");

exports.signup = async (req, res) => {
    try {
        const {name, age, user_id, user_pw} = req.body;

        const user = await User.findOne({where : {user_id}}); // 중복 체크를 위해 유저 조회
        if(user != null) {
            return res.send("중복 아이디");
        }

        // 회원가입
        const hash = bcrypt.hashSync(user_pw, 10); // hashSync() : 동기적으로 실행
        User.create({
            name,
            age,
            user_id,
            user_pw : hash
        });

        res.redirect('/login');

    } catch (error) {
        console.log("signupCon", error);
    }
}