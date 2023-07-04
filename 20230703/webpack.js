// webpack
// babel은 단일파일의 코드 자체를 변활할 때 사용
// webpack은 모듈 번들러 (여러 파일을 하나의 파일로 구성)

// 모듈 : 프로그램을 구성할 때 구성 요소로, 관련된 데이터나 함수를 하나로 묶은 단위
// 번들러 : 의존성을 가지고 동작하는 모듈들을 하나의 파일로 만들어주는 것

// babel의 속성
// presets, plugins

// webpack의 속성
// entry : 파일의 진입점(시작점)으로 사용할 모듈을 지정
// output : 내보내는 번들링 방법 (생성한 번들링 파일의 위치, 이름 설정)
// loaders : 번들링 중에 모듈의 소스 코드에 적용되는 자바스크립트나 css, 이미지 파일을 처리
// plugins : 추가 기능 사용시 (ex. 번들 최적화, html 파일 생성, 환경변수 삽입 등)


// webpack 기본 사용
// 1. 패키지 설치
// npm init -y
// npm install webpack webpack-cli
// 2. 프로젝트 생성
// src 폴더 만들기 -> 파일 작성 -> 번들링
// 3. 설정 파일
// webpack.config.js
// 4. webpack 실행
// npx webpack


// webpack1
// npm init -y
// npm install webpack webpack-cli
/*
    module.exports = {
        entry : "./src/start.js", // 진입점(시작점) 설정
        output : { // 번들링 파일의 내보낼 방법
            filename : "bundle.js", // 파일의 이름
            path : path.join(__dirname, "dist") // 파일의 폴더
        }
    }
}*/
// npx webpack


// webpack2 (css, img 등)
// npm init -y
// npm install webpack webpack-cli css-loader style-loader


// webpack3 (html 파일 만들기)
// npm init -y
// npm install webpack webpack-cli html-webpack-plugin
// babel 설정
// npm i @babel/preset-env @babel/preset-react
// npm i @babel/core babel-loader
// .babelrc
/*
    {
        "presets": ["@babel/preset-env", "@babel/preset-react"]
    }
*/
// react 설치
// npm i react react-dom