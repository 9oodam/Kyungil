-- 데이터 베이스
-- 데이터를 저장하는 공간으로 보면된다.

-- sql 명령어를 사용해서 
-- 구현된 기능을 실행시키기 위해 사용하는 특정한 언어이다.
-- 데이터를 보관하거나 저장하거나 삭제 또는 수정을 할 수 있다.

--관계형 데이터 베이스
-- mysql
-- oracle
--mariaDB

-- 비관계형 데이터 베이스
-- mongoDB


--CLI로 mysql에 접속 방법
--mysql -u root -p
-- 비밀번호 입력

--show databases
--스키마 전부 확인

--sql문은
--데이터 정의어(DDL)
--데이터 조작어(DML)
--데이터 제어어(DCL)

--데이터 정의어
--CREATE
-- SHOW
-- DROP
-- ALTER

-- 데이터베이스 만들어 보자
CREATE DATABASE test10_Mysql;

-- 데이터베이스들 확인하는 명려어
SHOW DATABASES;

-- 데이터 베이스를 삭제하는 명령어
DROP DATABASE test10_Mysql;

-- 사용할 데이터 베이스 지정
USE test10_Mysql;

-- 데이터베이스 안에 있는 테이블 확인
SHOW TABLES;

-- 테이블 생성
-- 테이블에 PRIMARY KEY: 고유키는 한개만 들어갈 수 있고 중복이 되지않는 값.
CREATE TABLE store(id INT AUTO_INCREMENT PRIMARY KEY,tel VARCHAR(20));
CREATE TABLE store2(id INT AUTO_INCREMENT PRIMARY KEY,tel VARCHAR(20));

-- 테이블에서 필드명과 타입을 확인할 수 있는 명령
DESC store;

-- 데이터 타입
-- 숫자형,문자형,날짜형,이진 데이타 타입

-- 숫자형
-- INT:4byte -21억

-- 문자형
-- VARCHAR:255byte:가변 데이터(우리가 선언한 범위보다 작으면 자기가 알아서 맞춰줌)
-- CHAR: 255byte:고정데이터(우리가 선언한 범위를 다 먹는다)
-- TEXT:65535byte

-- 날짜형
-- DATE:년 월 일
-- TIME:시간
-- DATETIME:년 월 일 시간(YYYY-MM-DD-HH:MM:SS)
-- TIMESTAMP:년 월 일 시간(INTEGER) 4byte

-- 이진 데이터 타입
-- BLOB:이미지

--KEY
-- PRIMARY KEY:중복 입력 안됨x 테이블에 하나만 넣을 수 있다. null값도 안됨(고유키)
-- UNIQUE:중복 입력 불가인데 키를 여러개 줄 수 있다.null값도 됨.

CREATE TABLE user(user_id VARCHAR(20) PRIMARY KEY,user_pw VARCHAR(20) NOT NULL,user_name VARCHAR(20) NOT NULL,
-- 따로 값을 추가하지 않으면 DEFAULT 값이 들어감
gender CHAR(4) DEFAULT '남자',
-- now()는 현재시간을 만들어주는 함수
date DATETIME DEFAULT  now());

DESC user;

-- 데이터 조작어
-- SELECT 
-- INSERT
-- UPDATE
-- DELETE

-- 테이블에 값을 추가
INSERT INTO user(user_id,user_pw,user_name,gender) VALUES('asd1','dsa','mumu','남자');

SELECT * FROM user;

INSERT INTO user(user_pw,user_name) VALUES('123','zero');

-- 테이블 열 검색
-- WHERE 문으로 테이블을 조회해서 해당 필드가 userid2인 값을 찾아서 조회
SELECT * FROM user WHERE user_id='asd1';
SELECT * FROM user WHERE gender='남자';

-- 테이블 열 수정
-- SET 해당값을 수정할 때 사용
-- UPDATE문과 짝으로 사용한다.
UPDATE user SET gender='여자'  WHERE user_id='asd1';
UPDATE user SET user_pw='000',user_name='none',gender='남자' WHERE user_id='asd1';

-- 테이블 삭제
DELETE FROM user WHERE user_id='asd1';


-- 게시판 테이블 만들어보기 (테이블 이름 board)
-- column : id, content, writer, date, likes
-- id = INT 11자 자동증가 고유키
-- content = TEXT null가능
-- writer = VARCHAR(40) not NULL
-- likes = int 11자 기본값 0
CREATE DATABASE test11_MySQL;
USE test11_MySQL;
CREATE TABLE board (id INT(11) AUTO_INCREMENT PRIMARY KEY, content TEXT, writer VARCHAR(40) NOT NULL, date DATETIME DEFAULT now(), likes INT(11) DEFAULT 0);
-- 여러 줄 한 번에 추가
INSERT INTO board(content, writer) VALUES('blahblah1','박아무개'), ('blahblah2', '최아무개');

SELECT * FROM board;
DESC board;



-- mysql -u root -p : CLI 환경에서 mysql 접속
-- create database [데이터베이스 명] : 데이터베이스 생성
-- drop database [데이터베이스 명] : 데이터베이스 삭제
-- show database : 모든 데이터베이스 조회
-- use [데이터베이스 명] : 사용할 데이터베이스 선택

-- create table [테이블 명] ([필드명 데이터 타입], ...) : 테이블 생성
-- insert into [테이블 명] (필드1, 필드2) values (값1, 값2) : 테이블에 값 추가
-- delete from [테이블 명] where [필드명] = "값" : 필드가 값인 줄을 삭제
-- delete from [테이블 명] where [필드 값] = "값" : 조건에 맞는 모든 값 삭제
DELETE FROM board WHERE writer = "김아무개";
-- update [테이블 명] set [필드명1] = "수정할 값" [필드명2] = "수정할 값" where 필드 = "값" : 새로운 값으로 수정

-- select * from [테이블 명] : 테이블 내용 전체 조회
-- select 필드1, 필드2 from [테이블 명] : 원하는 필드에 대한 테이블 내용 조회
-- select * from [테이블명] where [필드] like "%AB" : 필드에서 해당되는 내용 중 AB~로 시작하는 데이터 조회
-- select * from [테이블명] where [필드] like "AB%" : 필드에서 해당되는 내용 중 ~AB로 끝나는 데이터 조회

-- alter table [기존 테이블명] rename [새로운 테이블명] : 테이블 명 변경
-- alter table [테이블명] change [기존 컬럼명][새로운 컬럼명] type : 컬럼 명 변경
-- alter table [테이블명] modify [컬럼명] type : 컬럼의 타입 변경
-- alter table [테이블명] drop [필드명] : 해당 필드 제거
-- alter table [테이블명] auto_increment = 0 : 해당 테이블의 자동증가 속성을 초기화
ALTER TABLE board AUTO_INCREMENT = 0;
-- alter table [테이블명] add [필드명] type : 해당 테이블 맨 뒤에 필드 추가
-- alter table [테이블명] add [필드명] type first: 해당 테이블 맨 앞에 필드 추가

-- show tables : 모든 테이블 조회
-- desc [테이블 명] : 테이블의 필드를 한줄로 확인



USE test11_MySQL;

CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);
CREATE TABLE posts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20)
);
show TABLES;

ALTER TABLE posts ADD COLUMN userID INT;

DESC user;
SELECT * FROM user;
DESC posts;
SELECT * FROM posts;

-- ADD CONSTRAINT : 제약 조건 명령어 (오류가 나면 확인 하기 위해)
-- FOREIGN KEY : 참조키를 지정
-- REFERENCES : 참조키가 참조하는 테이블의 열을 지정
ALTER TABLE posts ADD CONSTRAINT fk_user FOREIGN KEY (userID) REFERENCES user (id);

INSERT INTO user (name) VALUES ("C씨");
INSERT INTO posts (title, userID) VALUES ("title4", 2);

-- INNER JOIN : 참조키를 가지고 관계가 맺어져 있는 테이블 조회
SELECT * FROM user INNER JOIN posts ON user.id = posts.userID WHERE user.id = 2;
SELECT user.id, posts.title FROM user INNER JOIN posts ON user.id = posts.userID WHERE user.id = 2;





-- 게시판에 유저가 글을 등록하고 해당 유저가 작성한 글을 볼 수 있는 페이지 만들어보기