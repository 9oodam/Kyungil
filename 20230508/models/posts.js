const mysql = require("./config"); // config.js 에서 내보낸 모듈을 가져옴

// 모듈화 잘 되었는지 확인 node ./models/posts.js
// console.log(mysql); 

// 게시판 기능 (추가, 수정, 삭제) 작성
const posts = {
    // 테이블을 초기화 (있는지 없는지 체크, 없으면 생성)
    initTable : async function() {
        try {
            // 배열의 스프레드 연산자 -> 0번째부터 순서대로 담김
            const [result] = await mysql.query("SELECT * FROM posts"); // await 비동기
            console.log(result);
        } catch (error) {
            console.log("error 발생 (테이블 없음)");
            await mysql.query("CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20), content VARCHAR(100))");
        }
    },

    // 테이블에 있는 데이터를 모두 조회
    viewPostAll : async function() {
        try {
            const [result] = await mysql.query("SELECT * FROM posts"); // 글에 대한 내용을 result에 담아서
            return result; // 반환
        } catch (error) {
            console.log("error 발생 (글 전체 조회 불가)");
        }
    },

    // 글을 선택했을 때 글 하나를 보여줌
    selectPost : async function(id) { // 매개변수로 id를 받아서
        try {
            const [result] = await mysql.query("SELECT * FROM posts WHERE id = ?", [id]); // id를 조회
            console.log("선택한 게시글 : ", result[0]); // 반환값이 배열로 넘어오는데 그 첫 번째 값
            return result[0];
        } catch (error) {
            console.log("error 발생 (글 선택 조회 불가)");
        }
    },

    // 글 추가
    insert : async function(title, content) {
        try {
            await mysql.query("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content]);
            console.log("글 추가 완료");
        } catch (error) {
            console.log("error 발생 (글 추가 실패)");
        }
    },

    // 글 수정
    update : async function(id, title, content) {
        try {
            await mysql.query("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, id]);
            console.log("글 수정 완료");
        } catch (error) {
            console.log("error 발생 (글 수정 실패)");
        }
    },

    // 글 삭제
    delete : async function(id) {
        try {
            await mysql.query("DELETE FROM posts WHERE id = ?; SET @CNT = 0; UPDATE posts SET posts.id = @CNT:=@CNT+1; ALTER TABLE posts AUTO_INCREMENT = 0;", [id]);
            console.log("글 삭제 완료");
        } catch (error) {
            console.log("error 발생 (글 삭제 실패)");
        }
    }
}

posts.initTable();
// posts.selectPost(1);
// posts.insert("배고파파", "밥 뭐먹지이이");
// posts.update(1, "얍얍", "이이이이야압");
// posts.delete(2);

module.exports = posts;