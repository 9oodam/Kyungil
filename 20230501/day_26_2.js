// fs 모듈 : 파일 생성, 삭제, 읽기, 쓰기 등 작업을 할 수 있는 내장 모듈
const fs = require("fs");


// existSync() : 폴더가 있는지 확인, 반환 값은 true/false
// 첫 번째 매개변수 - 폴더의 경로, 두 번째 매개변수 - 
// Sync 구문이 있는 메소드는 동기적으로 동작
let folder = fs.existsSync("./Test");
console.log(folder);


// mkdir() : 폴더 생성, 비동기적으로 동작
// mkdir(생성할 폴더의 경로, 폴더 생성시 호출할 콜백함수(에러 내용의 객체))
// mkdirSync() : 동기적으로 동작
if(!folder) {
    fs.mkdir("./Test", (err) => {
    if(err) {
        console.log("에러 발생");
    }else {
        console.log("Test 폴더 생성 완료");
    }
    });
}


// writeFile() : 파일에 데이터 작성, 비동기적으로 동작
// writeFile(파일의 이름, 작성할 내용, 콜백함수(에러 내용의 객체))
fs.writeFile("./Test/temp.txt", "hello", (err) => {
    if(err) {
        console.log("에러 발생");
    }else {
        console.log("temp.txt 파일 생성 완료");
    }
});

fs.writeFileSync("./Test/temp2.txt", "hellohello");
console.log("temp2.txt 파일 생성 완료");


// readFile() : 파일 읽기
// readFile(읽어올 파일의 경로, 인코딩 방식, 콜백함수(에러 내용의 객체, 읽어온 파일의 내용))
// 인코딩 방식 작성 안하면 null로 들어감 -> buffer 객체로 읽어옴
fs.readFile("./Test/temp.txt", "utf-8", (err, data) => {
    if(err) {
        console.log(err);
    }else {
        console.log(data);
    }
});

// readFileSync() : 메소드의 반환값으로 읽어온 data가 나옴
let data = fs.readFileSync("./Test/temp2.txt", "utf-8");
console.log(data);


// rm() : 폴더 삭제
// rm(삭제할 폴더의 경로, 옵션 객체, 콜백함수(에러 내용의 객체))
// 옵션 객체 : {recursive : true} recursive : 키의 값에 따라 true/false, 폴더 안의 내용까지 다 제거할지 말지
fs.rm("./Test", {recursive : true}, (err) => {
    if(err) {
        console.log(err);
    }else {
        console.log("Test 폴더 삭제 완료");
    }
});