const {User} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
    try {
        const {user_id, user_pw} = req.body;

        const user = await User.findOne({where : {user_id}});
        if(user == null) {
            return res.send("아이디 없음");
        }

        if(user.grade == 0) {
            return res.send("관리자 승인이 필요합니다");
        }else {
            const same = bcrypt.compareSync(user_pw, user.user_pw);
            if(same) {
                let token = jwt.sign({
                    id : user.id,
                    name : user.name,
                    user_id : user.user_id
                }, process.env.ACCESS_TOKEN_KEY, {
                    expiresIn : "10m"
                });
    
                req.session.access_token = token;
                res.redirect('/');
                return user.grade;
    
            }else {
                res.send("비밀번호 틀림 로그인 실패");
            }
        }

    } catch (error) {
        console.log(error);
    }
}