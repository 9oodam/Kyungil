const {User} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            user_id,
            user_pw : hash,
            img : ""
        });

        res.redirect('http://127.0.0.1:5500/20230530/profile/frontEnd/login.html');

    } catch (error) {
        console.log(error);
    }
}

exports.Login = async (req, res) => {
    try {
        const {user_id, user_pw} = req.body;

        const user = await User.findOne({where : {user_id}});
        if(user == null) {
            return res.send("아이디 없음");
        }

        const same = bcrypt.compareSync(user_pw, user.user_pw);
        if(same) {
            let token = jwt.sign({
                id : user.id,
                user_id : user.user_id
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn : "30m"
            });

            req.session.access_token = token;
            res.send("로그인 성공");
            //res.redirect('/profile');

        }else {
            res.send("비밀번호 틀림 로그인 실패");
        }

    } catch (error) {
        console.log(error);
    }
}

exports.modifyProfile