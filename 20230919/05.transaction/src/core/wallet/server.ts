// 지갑 서버

import express from "express";
import Wallet from "./index";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false})); // body 객체 사용

// 페이지 접속시
app.get('/', (req, res) => {
    const page = fs.readFileSync(path.join(__dirname, "/view/index.html"), "utf-8");
    res.send(page);
})
// 지갑 생성시
app.post('/newWallet', (req, res) => {
    res.json(new Wallet());
})
// 지갑 정보 가져오기
app.post('/walletList', (req, res) => {
    const list = Wallet.getWalletList();
    res.json(list);
})
// 주소로 지갑 찾기
app.post('/walletSelect', (req, res) => {
    const {account} = req.body;
    const privateKey = Wallet.getWalletPrivateKey(account);
    res.json(new Wallet(privateKey));
})

app.listen(4000, () => {
    console.log("서버 오픈")
})