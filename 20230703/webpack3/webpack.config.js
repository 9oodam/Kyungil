// html-webpack-plugin
// html 파일을 만들어줌
// 애플리케이션에 포함된 번들을 관리하는 프로세스를 만들어줌
// 주로 react 같은 SPA(Single Page Application) 작성할 때 사용

const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");


// webpack 구성 객체 내보내기
module.exports = {
    // 개발 모드 설정
    // 빌드할 때 최적화단계를 건너뜀
    mode : "development",

    entry : "./src/index.js",

    module : {
        rules : [
            {
                // .js, .jsx 확장자를 가진 파일에 대한 규칙 설정
                test : /\.(js|jsx)$/,
                // node_modules 제외
                exclude : /node_modules/,
                // babel-loader를 이용해서 번들링
                use : ["babel-loader"]
            }
        ]
    },

    // 플러그인 설정
    plugins : [
        // HtmlWebPackPlugin 을 사용해서 index.html 번들링 폴더에 생성
        new HtmlWebPackPlugin({
            template : "src/index.html",
            filename : "index.html"
        })
    ],

    // 번들링 내보낼 속성
    output : {
        // 번들 파일 이름
        filename : "bundle.js",
        path : path.join(__dirname, "dist")
    }
}