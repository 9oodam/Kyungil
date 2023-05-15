const mysql = require("./config");

// 유저 테이블 생성
exports.userInit = async () => {
    try {
        await mysql.query("SELECT * FROM users");
    } catch (error) {
        const sql = "CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(20), refresh VARCHAR(255))";
        await mysql.query(sql);
    }
}

// 유저 전체 조회
exports.userList = async () => {
    try {
        const [result] = await mysql.query("SELECT * FROM users");
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

// 유저 1개 조회
exports.userSelect = async (user_id) => {
    try {
        const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

// 유저 추가
exports.userInsert = async (user_id, user_pw) => {
    try {
        // 가입 전 이미 존재하는 아이디인지 확인
        const [user] = await mysql.query("SELECT * FROM users WHERE user_id = ?", [user_id]); // 있으면 검색 됨
        if(user.length != 0) {
            // 이미 아이디가 존재함 => 에러 객체 new 동적할당으로 생성
            let err = new Error("중복 id");
            console.log(err);
            return err;
        }else {
            // 통과 => 회원가입 성공
            await mysql.query("INSERT INTO users (user_id, user_pw) VALUES(?, ?)", [user_id, user_pw]);
        }
    } catch (error) {
        console.log(error);
    }
}

// 비밀번호 변경
exports.userPwUpdate = async (user_id, user_pw) => {
    try {
        await mysql.query("UPDATE users SET user_pw = ? WHERE user_id = ?", [user_pw, user_id]);
    } catch (error) {
        console.log(error);
    }
}

// refresh token 바꿔주기
exports.userRefresh = async (user_id, refresh) => {
    try {
        await mysql.query("UPDATE users SET refresh = ? WHERE user_id = ?", [refresh, user_id]);
    } catch (error) {
        console.log(error);
    }
}

// 유저 삭제
exports.userDelete = async (user_id) => {
    try {
        await mysql.query("DELETE FROM users WHERE user_id = ?; SET @CNT = 0; UPDATE users SET users.id = @CNT:=@CNT+1; ALTER TABLE users AUTO_INCREMENT = 0", [user_id]);
    } catch (error) {
        console.log(error);
    }
}