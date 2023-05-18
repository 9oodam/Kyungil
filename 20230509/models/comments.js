const mysql = require("./config"); // config.js 에서 내보낸 모듈을 가져옴

const comments = {
    viewComment : async function(id) {
        try {
            const [result] = await mysql.query("SELECT c.* FROM comment AS c JOIN posts AS p ON c.postsID = p.id WHERE p.id = ?", [id]);
            //console.log(result);
            return result;
        } catch (error) {
            console.log("error(model) : 댓글 조회 실패");
        }
    },

    insertComment : async function(id, content, name) {
        try {
            await mysql.query("INSERT INTO comment (postsID, content, name) VALUES ((SELECT id FROM posts WHERE id = ?), ?, ?)", [id, content, name.user_id]);
            console.log("댓글 추가 성공");
        } catch (error) {
            console.log(id, content);
            console.log("error(model) : 댓글 추가 실패");
            console.log(error);
        }
    },

    deleteComment : async function(id2) {
        try {
            const [result] = await mysql.query("SELECT postsID FROM comment WHERE id2 = ?", [id2]);
            console.log(result[0]);
            await mysql.query("DELETE FROM comment WHERE id2 = ?; SET @CNT = 0; UPDATE comment SET comment.id2 = @CNT:=@CNT+1; ALTER TABLE comment AUTO_INCREMENT = 0", [id2]);
            console.log("댓글 삭제 성공");
            return result[0];
        } catch (error) {
            console.log("error(model) : 댓글 삭제 실패");
        }
    }
}

module.exports = comments;