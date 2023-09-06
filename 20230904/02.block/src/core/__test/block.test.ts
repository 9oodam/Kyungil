// test 코드를 작성하면 단위별 테스트가 가능해짐
// 시간은 조금 더 걸리지만 코드의 품질을 높일 수 있음

// 절차적 테스트 진행
// 1단계 코드 실행 -> 2단계 코드 실행 -> ...


import { Block } from "@core/block/block";
import { GENESIS } from "@core/config";
import Chain from "@core/chain/chain";

// describe : 테스트들의 그룹화 가능
// describe(그룹 이름, 테스트들을 실행시키는 콜백 함수)
// describe("block 테스트 코드 그룹", () => {
//     // it : 하나의 테스트 단위
//     // it(테스트 이름, 테스트의 동작을 가지고 있는 콜백 함수)
//     it("제네시스 블록 테스트", () => {
//         console.log(GENESIS);
//     })

//     // it("오류 테스트", () => {
//     //     console.log(GENESIS2);
//     // })
// })

describe("block 검증", () => {
    let newBlock : Block;
    let newBlock2 : Block;

    let newChain : Chain;
    let newChain2 : Chain;

    it("블록 추가", () => {
        const data = ['졸려'];
        newBlock = Block.generateBlock(GENESIS, data);
        // 블록의 난이도에 따른 마이닝을 동작해서
        // 조건에 맞을 때까지 연산을 반복한 뒤 생성된 블록을 newBlock에 받아옴
        // 이전 블록은 GENESIS
        // console.log(newBlock);

        const data2 = ['죽겠다'];
        newBlock2 = Block.generateBlock(newBlock, data2);
        // console.log(newBlock2);
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
        for (let i = 0; i < 20; i++) {
           let block = new Block(GENESIS,[`${i}`]); // 이전 블록, data 넘겨서 새로운 블록 생성
           newChain.addToChain(block); // [{GENESIS}, {block}]
        }
        // console.log("머고 : ", newChain.get());
        console.log("이전 10번째 블록 or 최초의 블록 : ", newChain.getAdjustmentBlock())
    })
})