import { Block } from "@core/block/block";
import { GENESIS } from "@core/config";
import { Chain } from "@core/chain/chain";

import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";

import Transaction, {Receipt, Sender} from "@core/transaction/transaction";


describe("block 검증", () => {
    let newBlock : Block;
    let newBlock2 : Block;

    let newChain : Chain;
    let newChain2 : Chain;

    it("블록 추가", () => {
        const data = ['졸려'];
        newBlock = Block.generateBlock(GENESIS, data, GENESIS);
        // 블록의 난이도에 따른 마이닝을 동작해서
        // 조건에 맞을 때까지 연산을 반복한 뒤 생성된 블록을 newBlock에 받아옴
        // 이전 블록은 GENESIS
        console.log(newBlock);

        const data2 = ['죽겠다'];
        newBlock2 = Block.generateBlock(newBlock, data2, GENESIS);
        console.log(newBlock2);
    })

    it("블록 유효성 검증", () => {
        const isValidBlock = Block.isValidNewBlock(newBlock, GENESIS);
        if(isValidBlock.isError) {
            return expect(true).toBe(false); // 성공한 결과가 맞는지 확인 (true와 false를 비교)
        }
        expect(isValidBlock.isError).toBe(false);
    })

    // --------------------------------

    it("블록 체인 추가",()=>{
        newChain = new Chain();
        newChain.addToChain(newBlock); // 위에서 만든 블록 추가
        // console.log("내 chain : ", newChain.get()) // [{GENESIS}, {newBlock}]
        // console.log("hash로 찾은 블록 : ", newChain.getBlockByHash(newBlock.hash))
        // console.log("height로 찾은 블록 : ", newChain.getBlockByHeight(newBlock.height))
    })

    it("네트워크 체인비교 (롱기스트 체인 룰)",()=>{
        newChain2 = new Chain()
        newChain2.replaceChain(newChain.get());
        // console.log("상대방 chain : ", newChain2.get())
    })

    it("이전 10번째 블록 or 최초의 블록",()=>{
        // 현재 블록이 생성된 시간이 이전 10번째 블록으로부터 얼마나 걸렸는지 확인
        // 블록의 정해진 주기보다 빠르면 나이도를 올리고 아니면 내림
        for (let i = 0; i < 1; i++) {
           let block = Block.generateBlock(newChain.latestBlock(), [`${i}`], newChain.getAdjustmentBlock()); // 이전 블록, data 넘겨서 새로운 블록 생성
           newChain.addToChain(block); // [{GENESIS}, {block}]
        }
        // console.log("머고 : ", newChain.get());
        console.log("이전 10번째 블록 or 최초의 블록 : ", newChain.getAdjustmentBlock())
    })
})


const ec = new elliptic.ec("secp256k1");

describe("지갑 만들기", () => {
    let privateKey : string;
    let publicKey : string;
    let signature : elliptic.ec.Signature;

    it("개인키 생성", () => {
        // 2진수 랜덤값 만들어서 16진수로
        privateKey = randomBytes(32).toString("hex");
        console.log("개인키 : ", privateKey); // c611f4c81d91e6cc26952543731edaa4664d83a53f54ffe2db321fcc1d06a75b
        console.log("길이", privateKey.length); // 64
    })

    it("공개키 생성", () => {
        const keyPair = ec.keyFromPrivate(privateKey);
        publicKey = keyPair.getPublic().encode("hex", false); // 압축할지 여부 false
        console.log("공개키 : ", publicKey); // 04b36bc6ee3855c4d6be472064975ba1d87b301f99c4ebfc38a8d14e86b4cadfed252fb3ea154eabaa1734c82baad1dad3af763d0804d72cc22249e55a05c5ad33
        console.log("길이", publicKey.length); // 130
    })

    it("전자서명 생성", () => {
        const keyPair = ec.keyFromPrivate(privateKey);
        const hash = SHA256("트랜젝션 데이터 들어갈 부분").toString();
        signature = keyPair.sign(hash, "hex"); // sign() : 서명 생성 메서드
        console.log("서명 : ", signature);
    })

    it("서명 검증", () => {
        const hash = SHA256("트랜젝션 데이터 들어갈 부분").toString();
        const verify = ec.verify(hash, signature, ec.keyFromPublic(publicKey, "hex"))
        console.log("검증 : ", verify); // true
    })

    it("지갑 주소 생성", () => {
        // 공개키에서 앞 26개 문자열을 잘라내고 남은 40자리 앞에 0x를 붙여 주소로 사용
        const address = publicKey.slice(26).toString();
        console.log("지갑 주소 : ", `0x${address}`); // 0x10f2e45a35ff4772da5bd9b18f8e15411d7e55085acf9e2c45d79aad5a48aac3b2019e8c638aa8eac00395854eea91d264816675
    })


    // ---------------------------------------------

    let transaction : Transaction;

    // beforEach : 테스트케이스 실행 전에 실행되는 코드
    beforeEach(() => {
        transaction = new Transaction();
    })

    describe("transaction", () => {
        const account = "0".repeat(40);
        const amount = 50;
        const height = 0;

        // 채굴자용?
        it("txOut 생성", () => {
            const txOut = transaction.createTxOut(account, amount);
            console.log(txOut);

            expect(txOut.account).toBe(account);
            expect(txOut.amount).toBe(amount);
        })
        it("txIn 생성", () => {
            const txIn = transaction.createTxIn(height+1)
            console.log(txIn)
        })
        it("transactionRow 생성", () => {
            const txIn = transaction.createTxIn(height+1)
            const txOut = transaction.createTxOut(account, amount);

            const transactionRow = transaction.createRow([txIn], [txOut])
            console.log(transactionRow)
        })

        // 일반용?
        const receipt : Receipt = {
            sender : {account : "0".repeat(40)},
            receiver : "1".repeat(40),
            amount : 50,
            signature : signature
        }

        it("트랜잭션 추가", () => {
            transaction.create(receipt, )
        })

        // it("트랜잭션 목록 싹 조회", () => {
        //     const list = transaction.getPool();
        //     console.log(list);
        // })
    })

})


// describe("Transaction", () => {
//     let transaction : Transaction;

//     // beforEach : 테스트케이스 실행 전에 실행되는 코드
//     beforeEach(() => {
//         transaction = new Transaction();
//     })

//     describe("createTxOut", () => {
//         const receipt : Receipt = {
//             sender : "0".repeat(40),
//             receiver : "0".repeat(40),
//             amount : 50,
//             signature : 

//         }

//         const account = "0".repeat(40);
//         const amount = 50;
//         const height = 0;

//         it("txOut 생성", () => {
//             const txOut = transaction.createTxOut(account, amount);
//             console.log(txOut);

//             expect(txOut.account).toBe(account);
//             expect(txOut.amount).toBe(amount);
//         })
//         it("txIn 생성", () => {
//             const txIn = transaction.createTxIn(height+1)
//             console.log(txIn)
//         })
//         it("transactionRow 생성", () => {
//             const txIn = transaction.createTxIn(height+1)
//             const txOut = transaction.createTxOut(account, amount);

//             const transactionRow = transaction.createRow([txIn], [txOut])
//             console.log(transactionRow)
//         })

//         it("트랜잭션 추가", () => {
//             transaction.create()
//         })

//         // it("트랜잭션 목록 싹 조회", () => {
//         //     const list = transaction.getPool();
//         //     console.log(list);
//         // })
//     })
// })