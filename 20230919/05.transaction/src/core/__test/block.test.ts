import { Block } from "@core/block/block";
import { GENESIS } from "@core/config";
import { Chain } from "@core/chain/chain";

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


// 20230912 (화)
// 지갑 주소, 계정 만들기 (개인키, 공개키, 서명을 이용한 신원 인증 방식 활용)
// 분산 원장 : 장부를 모두가 관리하는 것, 데이터 합의 기술

// 사용할 library
// crypto, elliptic, crypto-js
// npm i -D crypto
// npm i -D elliptic @types/elliptic
// npm i -D crypto-js @types/crypto-js

import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";

const ec = new elliptic.ec("secp256k1");
// 사용할 알고리즘 secp256k1 : 타원 곡선 알고리즘의 별명, 비트코인과 이더리움에서 사용
// 키 생성 및 디지털 서명, 주소 생성에 사용
// 송신자와 수신자 모두는 공통적으로 타원 곡선의 한 점(기준점 G)을 알고 있어야 함
// 기준점 좌표에 따라 타원 곡선 별명을 붙여줌

// y^2 = x^3 + ax + b

// a = 0;
// b = 7;
// G = 02 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798 (x|y 좌표를 16진수로 표현한 값);

// y^2 = x^3 + 7

// A가 트랜젝션(서명)을 만듦
// 각자의 볼펜(개인키)을 준비 - 타원 곡선의 지정 범위(1 ~ n-1 정수) 내 값으로 정함
// secp256k1의 n = 1.157920892373162e+77
// n을 16진수로 변환 = FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
// secp256k1의 범위 (1 ~ FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140)

// 전자 서명을 만들 때 2개의 서명이 필요
// 서명 r : 트랜젝션을 보낼 때 개인키처럼 정수(k)를 뽑음 -> r = k * G
// 서명 s : k⁻¹ = (z + r * private key) mod n == k -> k를 역수 계산 
            // k : 서명 r 만들 때 뽑은 랜덤 값
            // z : 만든 트랜젝션 정보
            // r : 서명 r
            // private key : 범위 내에서 지정하고 본인만 알고 있는 개인키 (중요한 것은 서명 s를 만들 때 개인키를 사용했다는 것)
            // mod n : n으로 나눈 나머지 값
// 서명 검증 : U1 * G + U2 + 공개키 == 서명 r
            // U1 : z * w mod n
            // U2 : r * w mod n
                    // w : s⁻¹ mod n (동일한 서명을 만들지 않기 위해 추가한 임의의 값)


// 결론
// 개인키로 서명을 만듦
// 공개키를 통해 서명 검증



// 데이터 전송 순서

// 송신자
// 1. 트랜젝션 생성
// 2. 개인키 생성
// 3. 서명 r, 서명 s 생성

// 수신자
// 1. 서명 검증 (공식과 서명 r 비교 검증)

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
        /*
        Signature {
            r: BN {                     // Big Number (무척 큰 값)
                negative: 0,            // 양수
                words: [                // 서명 r, 서명 s의 값을 32bit 정수 배열로 표시한 값
                7475719, 42436182,
                43505185, 42210281,
                44360516,  8381982,
                66308473,    73637,
                65190268,  2950954
                ],
                length: 10,             // 배열의 길이
                red: null               // 중복
            },
            s: BN {
                negative: 0,
                words: [
                22631362, 24918459, 57558085, 35178429,
                20998547, 50238649, 39531614,  2915117,
                12296329,  2320956,        0,        0,
                        0,        0,        0,        0,
                        0,        0,        0,        0,
                        0,        0,        0,        0,
                        0,        0,        0,        0,
                        0,        0
                ],
                length: 10,
                red: null
            },
            recoveryParam: 0
        }
        */
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
})





// 20230918 (월)
import Transaction from "@core/transaction/transaction";

describe("Transaction", () => {
    let transaction : Transaction;

    // beforEach : 테스트케이스 실행 전에 실행되는 코드
    beforeEach(() => {
        transaction = new Transaction();
    })

    describe("createTxOut", () => {
        const account = "0".repeat(40);
        it("txOut 생성", () => {
            const amount = 50; // 임시 보내는 값
            const txOut = transaction.createTxOut(account, amount);
            console.log(txOut);

            expect(txOut.account).toBe(account);
            expect(txOut.amount).toBe(amount);
        })
    })
})