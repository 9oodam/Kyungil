const {User} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.Login = async (req, res) => {
    try {
        const {user_id, user_pw} = req.body;

        // 아이디 중복 확인
        const user = await User.findOne({where : {user_id : user_id}});
        if(user == null) {
            return res.send("계정이 없습니다");
        }

        // 비밀번호 확인
        const same = bcrypt.compareSync(user_pw, user.user_pw);
        if(same) {
            let token = jwt.sign({
                user_id
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn : "20m"
            });

            req.session.access_token = token;

            // / : 백엔드의 도메인 경로 루트를 뜻함
            // 배포된 프론트의 경로를 작성해야함
            return res.redirect('http://127.0.0.1:5500/20230526/frontEnd/main.html');

            // 리다이렉트 할 게 아니면 프론트에서 응답 받은 값으로 조건 분기 처리해서 페이지를 전환
            // return res.send("로그인 완료");
        }else {
            return res.send("비밀번호가 틀렸습니다");
        }
    } catch (error) {
        console.log(error);
    }
}

exports.viewUser = async (req, res) => {
    const {acc_decoded} = req;
    console.log(acc_decoded);

    try {
        const user = await User.findOne({where : {user_id : acc_decoded.user_id}});
        res.json(user); // json 형태로 데이터를 응답
    } catch (error) {
        console.log(error);
    }
}