// 비행기 좌석 예약 시스템

// socket.io express ejs

const express = require("express");
const path = require("path");
const socketIo = require("socket.io");

const app = express();

let seats = []; // 현재 선택된 좌석
let temp1 = [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];
let temp2 = [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];
let temp3 = [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];

let seatsArr = [temp1, temp2, temp3];

let index = 0; // 선택한 비행기의 인덱스



app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : false}));

app.get('/', (req, res) => {
    res.render("main");
});

app.get('/seats/:id', (req, res) => {
    index = req.params.id;
    console.log("index : ", index);
    seats = seatsArr[index];
    console.log("seats : ", seats);
    res.send(seats);
});

const server = app.listen(9017, () => {
    console.log("server opened");
});

const io = socketIo(server);

io.sockets.on("connection", (socket) => {
    socket.on("reserve", (data) => {
        console.log("예약");
        let seatTemp = seatsArr[data.selectCount]; // data.selectCount : 0~2 (temp1, 2, 3)
        seatTemp[data.y][data.x] = 2; // data.y : 0~4 (5줄), data.x : 0~13 (14칸)
        io.sockets.emit("reserve", data);
    });
});