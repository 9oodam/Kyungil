// TCP server 만들기 (nodejs 사용)
// net 이라는 내장모듈을 사용하면 TCP 소켓을 만들어서 사용 가능
// TCP 연결을 맺어주는 프로토콜
// TCP 소켓을 생성하고 서버와 클라이언트 간의 응답 요청을 맺을 수 있음

// 내장모듈 net 가져오기
const net = require("net")
const PORT = 4000;

// 서버 객체 생성
// createServer 메소드로 콜백함수 전달
const server = net.createServer((client) => {
    // 클라이언트가 접속시 실행
    // 클라이언트가 데이터를 보내서 데이터를 받았을 때
    client.on('data', (data) => {
        // 클라이언트가 보낸 데이터
        // 네트워크를 통해 전송되는 데이터
        // 바이너리 형식으로 전송
        // -> 클라이언트가 보낸 데이터는 buffer 형태로 전송이 되면
        // 서버는 해석해서 문자열로 변환 해주면 됨
        // 출력된 데이터는 buffer 형식으로 인코딩 해서
        // 밑에 우리가 보낸 데이터처럼 보이는 것
        console.log(JSON.stringify(data));
    })
}) // TCP의 내용을 만들어 준 것

// 서버를 대기 상태로
server.listen(PORT, () => {
    console.log("server opened");
})