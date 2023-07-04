const path = require("path");

module.exports = {
    entry : "./src/index.js", // 진입점(시작점) 설정
    
    module : { // 모듈의 규칙 설정
        rules : [
            {
                // test : 파일 확장자와 일치하는 정규식 키
                test : /\.css$/,
                // use : 확장자에 맞는 파일을 처리할 때 사용할 로더 지정
                use : ["style-loader", "css-loader"]
            }
        ]
    },
    
    output : { // 번들링 된 파일 내보내기 속성
        filename : "bundle.js",
        path : path.join(__dirname, "dist")
    }
}