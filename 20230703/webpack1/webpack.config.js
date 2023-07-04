const path = require("path");

// webpack 구성 객체 만들어서 내보내기
module.exports = {
    entry : "./src/start.js", // 진입점(시작점) 설정
    output : { // 번들링 파일의 내보낼 방법
        filename : "bundle.js", // 파일의 이름
        path : path.join(__dirname, "dist") // 파일의 폴더
    }
}