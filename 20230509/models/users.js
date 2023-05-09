const mysql = require("./config"); // config.js 에서 내보낸 모듈을 가져옴

const users = {
    signup : async function(user_id, user_pw) {
        try {
            const [result] = await mysql.query("INSERT INTO users (user_id, user_pw)VALUES(?, ?)", [user_id, user_pw]);
            console.log(`회원가입 성공 | ${result}`);
            return result;
        } catch (error) {
            console.log("error(model) : 회원가입 실패");
        }
    },

    login : async function(user_id, user_pw) {
        try {
            const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ? AND user_pw = ?", [user_id, user_pw]);
            console.log(`로그인 성공 | ${result}`);
            return result;
        } catch (error) {
            console.log("error(model) : 로그인 실패");
        }
    }
}

module.exports = users;