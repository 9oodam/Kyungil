// babel
// javascript 코드의 변환 (컴파일)을 도와주는 도구
// ES5 -> ES6 문법 개발 되었는데 ES5에서 개발한 것들을 모두 변환하기엔 어렵기 때문에
// babel로 문법을 쉽게 고쳐 사용


// 모듈 시스템

// --- commonjs = (require, module.exports) --- //
// a.js 에서 내보냄
// const text = "hi";
// module.exports = {text};

// b.js 에서 받음
// const {text} = require("a.js");
// console.log(text); // hi
// -------------------------------------------- //

// --- ES6 ------------------------------------ //
// a.js 에서 내보냄
// const text = "hi";
// export {text}; // 내보내는 방법 1 (여러 개)
// export default text // 내보내는 방법 2 (단일)

// b.js 에서 받음
// import {text} from "a.js" // 받는 방법 1
// import something from "a.js" // 받는 방법 2 (단일로 받을 때는 원하는 이름으로 바꿀 수 있음)
// -------------------------------------------- //



// babel 기본 사용법 //
// 기본적으로 javascript로 구성 되어있음
// npm을 통해서 설치 가능

// 1. babel 기본 구성 설치
// npm init -y => package.json 기본 설정
// npm install @babel/core @babel/cli @babel/preset-env

// 2. babel 환경 구성
// .babelrc 파일 만들기 (rc : run commands, run controller)
/*
    json으로 설정
    {
        "presets" : ["@babel/preset-env"]
    }
*/

// 3. babel 실행
// npx babel [변환할 파일명] --out-file [내보낼 경로]




// babel1 폴더 (자바스크립트 문법 변환)
// npm init -y
// npm install @babel/core @babel/cli
// npm install @babel/preset-env
/*
    {
        "presets" : ["@babel/preset-env"]
    }
*/
// npx babel app.js --out-file dist/app.js


// babel2 폴더 (모듈 시스템 변환 ES6 -> ES5)
// npm init -y
// npm install @babel/core @babel/cli
// npm install @babel/plugin-transform-modules-commonjs
/*
{
    "plugins" : ["@babel/plugin-transform-modules-commonjs"]
}
*/
// npx babel server.js --out-file dist/server.js


// babel3 폴더 (JSX 문법 변환)
// npm init -y
// npm install @babel/core @babel/cli
// npm install @babel/preset-react
/*
{
    "presets" : ["@babel/preset-react"]
}
*/
// npx babel app.js --out-file dist/app.js