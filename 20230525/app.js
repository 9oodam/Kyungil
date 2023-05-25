// 채팅방 만들기 (방을 따로 만들어서 유저간 귓속말 가능)

const express = require("express");
const path = require("path")
const socketIo = require("socket.io");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("main");
});

const server = app.listen(9018, () => {
    console.log("server opened");
});

const io = socketIo(server);

let userId = [];
let userName = [];

io.on("connection", (socket) => {
    //console.log("유저 연결 : ", socket.id);
    userId.push(socket.id);
    console.log("접속 중인 유저 아이디 : ", userId);

    // 접속 중인 유저
    socket.on("userIn", (name) => {
        userName.push(name);
        console.log("접속 중인 유저 이름 : ", userName);
        io.emit("userIn", userId, userName);
    });

    // 방에 유저가 접속하면 (2)
    socket.on("joinRoom", (room, name) => {
        // join() : 방에 입장
        socket.join(room);

        // 현재 방에 있는 유저에게 이벤트 push
        io.to(room).emit("joinRoom", room, name);
    });

    // 방에서 유저가 떠나면
    socket.on("leaveRoom", (room, name) => {
        // leave() : 방에서 제외
        socket.leave(room);

        // 어느 방에서 누가 나갔는지 알림
        io.to(room).emit("leaveRoom", room, name);
    });

    // 유저 연결 해제
    socket.on("disconnect", () => {
        let index = userId.indexOf(socket.id);
        console.log(userName);
        console.log(index);
        console.log("유저 연결 해제 : ", userName[index], socket.id);

        userId = userId.filter((value) => value != socket.id);
        userName = userName.filter((value) => value != userName[index]);

        console.log(userId);
        console.log(userName);

        io.emit("userIn", userId, userName);
    });

    // 일반 채팅
    socket.on("chat", (room, name, msg) => {
        io.to(room).emit("chat", name, msg);
    });

    // 귓속말
    socket.on("chat2", (id, name, msg) => {
        io.to(id).emit("chat", name, "귓속말 : " + msg);
    });
});