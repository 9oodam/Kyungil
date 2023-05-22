const bcrypt = require("bcrypt");
const {User} = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const {user_id, user_pw} = req.body;

        const user = await User.findOne({where : {user_id : user_id}});
        if(user == null) {
            return res.send("계정 없음");
        }

        const same = bcrypt.compareSync(user_pw, user.user_pw);
        if(same) {
            let token = jwt.sign({
                id : user.id,
                name : user.name,
                age : user.age
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn : "5m"
            });

            req.session .access_token = token;
            res.redirect('/board');
        }else {
            res.send("비밀번호 틀림");
        }

    } catch (error) {
        console.log("loginCon", error);
    }
}