// HTTP 프로토콜
// 브라우저에서 url을 입력하고 엔터를 누르면 HTTP 요청을 보내게 되는데
// TCP 3-way handshaking 과정을 거치게 됨

// 1) 연결 확인
// 3-way handshaking : 클라이언트와 서버가 데이터 통신을 하기 전 통신 준비가 되었다는 것을 확인하는 것
// 과정 : 클라이언트가 SYN을 서버에 연결 요청 -> 서버는 연결 요청을 받아 클라이언트에게 수락 응답(SYN + ACK)
//       -> 클라이언트는 서버로부터 수락 확인(ACK)을 보내면 연결 완료
// SYN(Synchronize sequence number), ACK(Acknowledgment)

// 2) 요청과 응답
// 클라이언트가 서버에 요청을 보내면 서버가 클라이언트에게 응답을 함

// 3) TCP 연결 종료
// 4-way handshaking : TCP 연결을 종료하기 위해 클라이언트와 서버의 상태를 서로 확인
// 서버가 종료(FIN) 메시지를 받고 클라이언트는 데이터가 없다는 것을 의미하는 메시지인 ACK를 보냄
// 서버는 데이터가 더 없으면 자신이 보내지지 않은 데이터를 확인, 전송한 후 클라이언트에게 FIN 메시지 전송
// 클라이언트는 서버가 더이상 전송할 데이터가 없다는 것을 확인하는 ACK 메시지를 보냄
// 클라이언트와 서버의 연결 종료



// HTTP 프로토콜을 사용해서 네트워크 통신을 수행하는 모듈을 가지고 웹서버 개발 해보기

// 요청과 응답을 처리하는 기능을 제공하는 모듈 (내장 모듈 http)
const http = require("http");
const server = http.createServer((req, res) => {
    // createServer() : 서버 객체를 만들어 줌, 매개변수로 전달되는 콜백 함수에 req, res를 매개변수로 전달
    // req(request) : http 요청의 정보 url, 메소드 (GET, POST 등), 요청 헤더 정보, 바디 내용이 있음
    // res(response) : http 응답의 정보를 가지고 있는 객체, 상태 코드(statusCode)에는 응답 헤더, 바디의 내용이 있음

    res.statusCode = 200; // 200 == 성공(정상적으로 요청을 처리하여 응답)

    // setHeader : 응답 헤더의 내용을 설정
    res.setHeader("Content-Type", "application/json", "charset=utf-8"); 
    // Content-Type : 응답의 내용
    // application/json : 응답의 내용을 json 형식의 데이터로 전송
    // charset=utf-8 : 응답의 문자를 utf-8로 인코딩

    // 요청한 URL이 무엇인지 확인
    const URL = req.url;
    //console.log(URL);

    // ex) 이런식으로 설정 가능
    // / : main 페이지의 경로
    // /list : 글의 목록 페이지(게시판)의 경로
    // /add : 글을 추가하는 페이지의 경로

    // 요청에 대한 응답하고 종료

    // 브라우저에 요청을 보내면 자동으로 웹사이트의 아이콘인 favicon의 url이 요청됨
    // 무시 처리 해주면 됨
    if(URL === "/favicon.ico") {
        res.end();
        return;
    }
    //res.end("응답 내용");

    switch (URL) {
        case "/" :
            res.end("main page");
            break;
        case "/list" :
            res.end("list page");
            break;
        case "/add" :
            res.end("add page");
            break;
        default :
        break;
    }


    console.log(URL);
})

// listen() : PORT - 서버를 대기상태로 만들어줌
server.listen(4000, () => {
    console.log("server opened");
})