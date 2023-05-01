const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    // createServer() : 서버 객체 만듦
    // req : 요청 내용을 가지고 있는 객체
    // res : 응답 내용을 가지고 있는 객체

    res.setHeader("Content-Type", "application/json", "charset=utf-8");

    const URL = req.url; // 브라우저에서 요청한 객체의 url

    if(URL === "/favicon.ico") {
        res.end(); // 응답 후 종료 (응답 내용은 있어도 되고 없어도 되지만 종료는 꼭 시켜줘야 함)
        return;
    }

    // 요청한 URL 내용에 따라서 응답
    switch (URL) {
        case "/":
            fs.readFile("./views/main.html", (err, data) => {
                if(err) {
                    res.statusCode = 404; // 파일 불러오지 못했을 때 에러 코드
                    res.end("404: main.html 없음");
                }else {
                    res.statusCode = 200; // 성공
                    res.setHeader("Content-Type", "text/html"); // 전달하는 컨텐츠의 내용은 html 파일이다
                    res.end(data); // 읽어온 데이터 응답하고 종료
                }
            });
            break;
        case "/list":
            fs.readFile("./views/list.html", (err, data) => {
                if(err) {
                    res.statusCode = 404; // 파일 불러오지 못했을 때 에러 코드
                    res.end("404: list.html 없음");
                }else {
                    res.statusCode = 200; // 성공
                    res.setHeader("Content-Type", "text/html"); // 전달하는 컨텐츠의 내용은 html 파일이다
                    res.end(data); // 읽어온 데이터 응답하고 종료
                }
            });
            break;
        case "/add":
            fs.readFile("./views/add.html", (err, data) => {
                if(err) {
                    res.statusCode = 404; // 파일 불러오지 못했을 때 에러 코드
                    res.end("404: add.html 없음");
                }else {
                    res.statusCode = 200; // 성공
                    res.setHeader("Content-Type", "text/html"); // 전달하는 컨텐츠의 내용은 html 파일이다
                    res.end(data); // 읽어온 데이터 응답하고 종료
                }
            });
            break;
    
        default:
            break;
    }
});

server.listen(8000, () => {
    console.log("server opened");
});