const mysql = require("./config");

exports.usersInit = async () => {
    try {
        await mysql.query("SELECT * FROM users");
    } catch (error) {
        await mysql.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(128))");
    }
}

exports.userSelect = async (user_id) => {
    try {
        const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

exports.userInsert = async (user_id, user_pw) => {
    try {
        // 중복 아이디인지 확인
        const [user] = await mysql.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
        if(user.length != 0) {
            // 이미 존재
            let err = new Error("중복 아이디");
            console.log(err);
            return err;
        }else {
            // 중복이 아니면 정상적인 회원가입 진행
            await mysql.query("INSERT INTO users (user_id, user_pw) VALUES (?, ?)", [user_id, user_pw]);
        }
    } catch (error) {
        console.log(error);
    }
}