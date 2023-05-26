const {User} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.Signup = async (req, res) => {
    try {
        const {name, age, user_id, user_pw} = req.body;
        const user = await User.findOne({where : {user_id : user_id}});
        if(user != null) {
            return res.send("이미 존재하는 아이디입니다");
        }

        const hash = bcrypt.hashSync(user_pw, 10);
        await User.create({
            name,
            age,
            user_id,
            user_pw : hash
        });

        res.redirect('http://127.0.0.1:5500/20230526/frontEnd/login.html');

    } catch (error) {
        console.log(error);
    }
}