import { Block } from "@core/block/block";
import P2P from "./p2p";

// npm i express
// npm i -D @types/express
import express, { Express, Request, Response } from "express";

import os from "os";

import cors from "cors";

const app : Express = express();
const ws : P2P = new P2P();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/chains', (req : Request, res : Response) => {
    res.json(ws.get()); // class Chain에 있는 함수
})

app.post('/block/mine', (req : Request, res : Response) => {
    // 블록에 기록할 내용을 받음
    const {data} : {data : Array<string>} = req.body;
    const newBlock : Block | null = Block.generateBlock(ws.latestBlock(), data, ws.getAdjustmentBlock());

    if(newBlock === null) res.send("error 발생, 블록 제대로 못 만들어짐")

    ws.addToChain(newBlock);
    res.json(newBlock);
})

// post로 작성 가능하지만 오타 이슈 발생, v4 확인 귀찮음
app.get('/peer/add', (req : Request, res : Response) => {
    let v4 : string; // IPv4 주소가 담김
    const networkInterface = os.networkInterfaces();

    for (const key in networkInterface) {
        const Array = networkInterface[key];

        for (const value of Array) {
            if(!value.internal && value.family === "IPv4") v4 = value.address;
        }
    }

    ws.addToPeer(`ws://${v4}:7545`);
    res.end();
})

app.get('/peer', (req : Request, res : Response) => {
    const sockets = ws.getSockets();
    res.json(sockets);
})

app.listen(8000, () => {
    console.log("서버 오픈")
    ws.listen(7545);
})

// localhost:8000/chains -> 서버 오픈, genesis
// peer/add -> new socket 연결, 연결 성공 뜸
// peer -> ["::ffff:10.37.129.2:52026","10.37.129.2:7545"]
// peer/add -> peer -> ["::ffff:10.37.129.2:52026","10.37.129.2:7545","::ffff:10.37.129.2:52176","10.37.129.2:7545"]