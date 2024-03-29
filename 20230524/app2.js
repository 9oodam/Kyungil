const express = require("express");
const path = require("path");
const socketIo = require("socket.io");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");""

const server = app.listen(9016, () => {
    console.log("server opened");
});

// socket 객체 생성
const io = socketIo(server);

app.get('/', (req, res) => {
    res.render("main2");
});

io.sockets.on("connection", (socket) => {
    // 클라이언트 접속 시
    socket.on("message", (data) => {
        // 모든 클라이언트에게 이벤트 push
        io.sockets.emit("message", data);
    });
});