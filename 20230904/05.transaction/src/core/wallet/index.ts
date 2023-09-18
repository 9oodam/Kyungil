import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";

import fs from "fs";
import path from "path";

// 지갑 생성하고 페이지에서 확인

// elliptic instance 생성
const ec = new elliptic.ec("secp256k1");

// 파일 저장 경로
const dir = path.join(__dirname, "../../data");

// 지갑 class 정의
class Wallet {
    public account : string
    public privateKey : string
    public publicKey : string
    public balance : number

    constructor (privateKey : string = "") {
        this.privateKey = privateKey || this.getPrivateKey() // 전달 받은 게 있으면 전달 받은 것으로 사용, 없으면 생성해서 사용
        this.publicKey = this.getPublicKey()
        this.account = this.getAccount()
        this.balance = 0

        if(privateKey == "") {
            Wallet.createWallet(this);
        }
    }

    // 지갑을 생성하면 파일로 저장
    static createWallet(myWallet : Wallet) {
        const fileName = path.join(dir, myWallet.account);
        const fileContent = myWallet.privateKey;
        fs.writeFileSync(fileName, fileContent);
    }

    // 저장된 지갑 불러오기
    static getWalletList() : string[] {
        const files : string[] = fs.readdirSync(dir); // readdirSync : 폴더를 읽어서 안의 파일 이름을 문자열로 가져옴
        return files;
    }

    // data 폴더 안에 해당하는 지갑 주소를 찾아서 반환
    static getWalletPrivateKey(account : string) : string {
        const fileName = path.join(dir, account);
        const fileContent = fs.readFileSync(fileName).toString();
        return fileContent;
    }

    // 개인키 생성 함수
    public getPrivateKey() : string {
        return randomBytes(32).toString("hex");
    }
    // 공개키 생성 함수
    public getPublicKey() : string {
        const keyPair = ec.keyFromPrivate(this.privateKey); // 개인키 사용
        return keyPair.getPublic().encode("hex", false);
    }
    // 지갑 주소 생성 함수
    public getAccount() : string {
        return `0x${this.publicKey.slice(26).toString()}`;
    }
}

export default Wallet