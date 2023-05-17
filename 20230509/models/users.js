const mysql = require("./config"); // config.js 에서 내보낸 모듈을 가져옴

const users = {
    userList : async function() {
        try {
            const [result] = await mysql.query("SELECT * FROM users");
            return result[0];
        } catch (error) {
            console.log(error);
        }
    },

    userInsert : async function(user_id, user_pw) {
        try {
            const [user] = await mysql.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
            if (user.length == 0) {
                await mysql.query("INSERT INTO users (user_id, user_pw) VALUES(?, ?)", [user_id, user_pw]);
                return true;
            }else{
                let err = new Error("중복 user_id");
                return err;
            }
        } catch (error) {
            console.log("error(model) : 회원가입 실패",error);
        }
    },

    userSelect : async function(user_id) {
        try {
            const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
            console.log(result[0]);
            return result[0];
        } catch (error) {
            console.log("error(model) : 로그인 실패");
        }
    },

    userPwUpdate : async function(user_id, user_pw) {
        try {
            await mysql.query("UPDATE users SET user_pw = ? WHERE user_id = ?", [user_pw, user_id]);
        } catch (error) {
            console.log(error);
        }
    },

    userRefresh : async function(user_id, refresh) {
        try {
            await mysql.query("")
        } catch (error) {
            console.log("error(model) : refresh token 갱신 실패");
        }
    },

    userDelete : async function(user_id) {
        try {
            await mysql.query("DELETE FROM users WHERE user_id = ?; SET @CNT = 0; UPDATE users SET users.id = @CNT:=@CNT+1; ALTER TABLE users AUTO_INCREMENT = 0", [user_id]);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = users;