import type { Config } from "@jest/types";

const config : Config.InitialOptions = {
    // 1. 모듈 파일 확장자 설정 : typeScript, javaScript 둘 다 테스트 파일로 지정
    moduleFileExtensions : ["ts", "js"],

    // 2. 테스트 파일 매치 설정 : 파일 이름의 패턴
    testMatch : ["<rootDir>/**/*.test.(js|ts)"],
    // root 경로에서 모든 폴더의 확장자가 .test.js | .test.ts 인 모든 파일

    // 3. 모듈 이름에 대한 별칭 설정 : @core
    moduleNameMapper : {
        "^@core/(.*)$" : "<rootDir>/src/core/$1"
    },
    // ^@core == @core/**/*
    // root 경로에서 src/core 의 경로까지
    
    // 4. 테스트 환경 설정 : node환경에서 실행
    testEnvironment : "node",

    // 5. 자세한 로그 설정 출력 : 터미널에 로그들을 더 자세히 출력할지 여부
    verbose : true,

    // 6. 프리셋 설정 : typeScript에서 사용할 jest / ts-jest
    preset : "ts-jest"
}

export default config;