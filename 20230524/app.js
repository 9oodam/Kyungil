// 웹 소켓
// 양방향 통신
// 단방향으로 요청 응답을 받는 구조
// 서버에서 데이터를 push 하는 경우

// 장점
// 한 번 연결할 때 헤더 값을 전송 하기 때문에 많은 데이터가 전송(오버헤드)되지 않음
// 효율적인 데이터 통신 가능
// ex) 실시간으로 채팅 구현, 가상화폐 거래소 같은 데이터 전송이 자주 일어나는 작업

// soket.io 라이브러리 사용

// 페이지에서 댓글을 달았다고 가정했을 때 페이지를 새로고침해야 글이 보이는 현상
// => 웹소켓으로 양방향 통신을 제공하면 실시간으로 글이 보이게 처리 가능

const express = require("express");
const path = require("path");
const socketIo = require("socket.io");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

// 유저 A, B가 접속을 하고 유저끼리 실시간으로 채팅을 주고 받을 수 있게 
app.get('/', (req, res) => {
    res.render("main");
});

// 서버 대기
const server = app.listen(9015, () => {
    console.log("server opened");
});

// socket 객체 생성
// 대기시켜놓은 서버 객체를 매개변수로 전달
const io = socketIo(server); // 소켓 연결

// 유저를 저장하는 배열
let userId = [];

// 접속한 소켓들에 이벤트 등록 (io 안에 sockets 라는 키가 있음)
// connection : 접속시 실행되는 이벤트
// 접속한 클라이언트의 socket이 매개변수로
// 유저 한 명이 접속했다는 의미
io.sockets.on("connection", (socket) => {
    console.log("유저 접속 ", socket.id); // socket.id : 유저를 판별하기 위한 아이디
    userId.push(socket.id);
    console.log(userId);

    // 클라이언트 측에서 이벤트가 push 되면 실행시킬 이벤트
    socket.on("hi", (data) => {
        // 1) 자기 자신에게 이벤트 push
        console.log(data, "클라이언트에서 이벤트를 보냄");

        // 2) 모든 대상에게 이벤트 push
        // io.sockets.emit("hi", "모두에게 이벤트 보냄");
        
        // 3) 자기 제외 모든 대상에게 이벤트 push (ex. 방송)
        // socket.broadcast.emit("hi", data.msg);

        // 4) 비밀 대화 (ex. 채팅방)

        // 5) 특정 대상에게 이벤트 push
        // 이벤트를 보낼 유저의 아이디값을 매개변수로
        io.sockets.to(data.id).emit("hi", data.msg);

    });

    // 유저가 접속을 해제 시
    socket.on("disconnect", () => {
        console.log("유저 접속 해제");
        userId = userId.filter((value) => value != socket.id); // 지금 접속했던 유저를 제외하고 배열에 다시 저장
        console.log(userId);
    });
});
