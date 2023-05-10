const mysql = require("./config"); // config.js 에서 내보낸 모듈을 가져옴

const users = {
    signup : async function(user_id, user_pw) {
        try {
            const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
            if (result.length==0) {
                await mysql.query("INSERT INTO users (user_id, user_pw) VALUES(?, ?)", [user_id, user_pw]);
                return true;
            }else{
                return false
            }
        } catch (error) {
            console.log("error(model) : 회원가입 실패",error);
        }
    },

    login : async function(user_id, user_pw) {
        try {
            const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ? AND user_pw = ?", [user_id, user_pw]);
            console.log(`로그인 성공 | ${result[0]}`);
            return result[0];
        } catch (error) {
            console.log("error(model) : 로그인 실패");
        }
    }
}

module.exports = users;