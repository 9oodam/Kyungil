const mysql = require("./config"); // config.js 에서 내보낸 모듈을 가져옴

const comments = {
    insertComment : async function(content) {
        try {
            await mysql.query("INSERT INTO comment (content) VALUES (?)", [content]);
            console.log("댓글 추가 성공");
        } catch (error) {
            console.log("error(model) : 댓글 추가 실패");
        }
    }
}


module.exports = comments;