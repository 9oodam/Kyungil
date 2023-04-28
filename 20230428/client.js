// net 모듈 가져오기
const net = require("net");

// 포트의 내용을 설정해 줄 객체 담기
const config = {port : 8080}

// connect 메소드로 TCP 소켓을 만들고 지정할 포트로 연결 시도
const socket = net.connect(config)

socket.on("connect", () => {
    // 연결되면 connect 이벤트 실행
    console.log("connected")

    socket.write("send data")
})

socket.on("data", (data) => {
    // TCP 소켓에서 데이터를 받으면 콜백 함수 실행
    console.log("received data", data)
    socket.end(); // TCP 연결 종료
})

// HTTP 는 기본적으로 TCP 통신(쌍방향 통신 가능)을 함
// HTTP 프로토콜은 규격을 
// 브라우저 http//127.0.0.1.8080