// mysql 설치

// workbench 편하게 gui로 조작해서 추가 가능

// but, 오늘은 cli 로 먼저 작성해보기
// 1) mysql 접속
// 1-1) C드라이브 - Program file - mysql - mysql server - bin
// 1-1) exe 파일이 이 경로에 있기 때문에 복잡하게 들어가야 함
// 1-2) 환경변수를 설정 해버리자
// 1-2) mysql -u root -p 하면 비밀번호 입력하고 접속하라고 뜸

// 1-2) 돋보기 - sysdm.cpl


// 쿼리문 : 데이터베이스에서 원하는 데이터를 추가 수정 삭제를 할 수 있는 명령어
// 현재 있는 데이터베이스 확인 : show databases;
// CREATE DATABASE (데이터베이스의 이름) CHARACTER SET utf8; : 데이터베이스 추가
// use (데이터베이스의 이름); : 사용할 데이터베이스 선택

// 테이블이라는 곳에 저장
// ex) 유저, 게시판, 등등

/*
테이블 추가
CREATE TABLE (데이터베이스 이름).(테이블의 이름)(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL
);
*/

// 테이블 리스트 확인 : show tables;
// 테이블 내용 확인 : SELECT * FROM (조회할 테이블의 이름);

// 테이블 내용 추가
// INSERT INTO (데이터베이스의 이름).(테이블의 이름) ('id', 'content') VALUES ('1', 'hi');
// INSERT INTO test1.aa (id, content) VALUES ('1', 'hi');