// 외부 모듈 설치 받기

// npm init
// 메타데이터 설명(프로젝트의 정보)을 가지고 있는 json 파일 초기화 명령어
// package.json 파일 만들어줌

// 파일을 만들 때 속성을 입력해야 함

// 메타데이터 : 데이터를 설명해주는 속성
// ex) 책이 한 권 있다고 가정하면 제목, 저자, 출판사 등등의 정보

// 모든 설정을 기본값으로 세팅하는 명령어
// npm init -y
/*
Wrote to /Users/damin/Desktop/Kyungil/20230501/package.json:
{
  "name": "20230501", // 패키지의 이름
  "version": "1.0.0", // 패키지의 버전
  "description": "",  // 패키지의 설명, 어떤 작업을 진행한 프로젝트인지, 문자열로 작성
  "main": "day_26_1.js", // 모듈화를 시킬 때 메인 파일
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
    // 실행시킬 때 스크립트 명령어
    // 자주 실행할 것 같은 명령어를 작성
    // npm 명령어로 실행 가능 (ex. npm run test)
  "keywords": [], // 프로젝트 검색 키워드 (배열의 형태로 넣어줌)
  "author": "", // 제작자
  "license": "ISC" // 패키지의 라이센스
}
*/