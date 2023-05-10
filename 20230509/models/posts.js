const mysql = require("./config"); // config.js 에서 내보낸 모듈을 가져옴

const posts = {
    initTable : async function() {
        try {
            const [result] = await mysql.query("SELECT * FROM posts"); // await 비동기
            console.log(result);
        } catch (error) {
            console.log("error(model) :테이블 없음");
            await mysql.query("CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(30), details VARCHAR(200), name VARCHAR(10), thumbs INT)");
        }
    },

    viewPostAll : async function() {
        try {
            const [result] = await mysql.query("SELECT * FROM posts");
            return result;
        } catch (error) {
            console.log("error(model) : 글 조회 실패");
        }
    },

    selectPost : async function(id) {
        try {
            const [result] = await mysql.query("SELECT * FROM posts WHERE id = ?", [id]);
            console.log("선택된 게시글 : ", result[0]);
            return result[0];
        } catch (error) {
            console.log("error(model) : 글 상세 조회 실패");
        }
    },

    insert : async function(title, details) {
        console.log(title, details);
        try {
            await mysql.query("INSERT INTO posts (title, details) VALUES (?, ?)", [title, details]);
            console.log("글 추가 성공");
        } catch (error) {
            console.log("error(model) : 글 추가 실패");
        }
    },

    update : async function(id, title, details) {
        try {
            await mysql.query("UPDATE posts SET title = ?, details = ? WHERE id = ?", [title, details, id]);
            console.log("글 수정 성공");
        } catch (error) {
            console.log("error(model) : 글 수정 실패");
        }
    },

    delete : async function(id) {
        try {
            await mysql.query("DELETE FROM posts WHERE id = ?; SET @CNT = 0; UPDATE posts SET posts.id = @CNT:=@CNT+1; ALTER TABLE posts AUTO_INCREMENT = 0", [id]);
            console.log("글 삭제 성공");
        } catch (error) {
            console.log("error(model) : 글 삭제 실패");
        }
    },

    thumbs : async function(id, thumbs) {
        try {
            await mysql.query("UPDATE posts SET thumbs = thumbs + 1 WHERE id = ?", [thumbs, id]);
            console.log("좋아요 증가");
        } catch (error) {
            console.log("error(model) : 좋아요 증가 실패");
        }
    }
}

module.exports = posts;