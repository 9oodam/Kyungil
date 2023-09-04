// test 코드를 작성하면 단위별 테스트가 가능해짐
// 시간은 조금 더 걸리지만 코드의 품질을 높일 수 있음

// 절차적 테스트 진행
// 1단계 코드 실행 -> 2단계 코드 실행 -> ...


import { Block } from "@core/block/block";
import { GENESIS } from "@core/config";

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

    it("블록 추가", () => {
        const data = ['졸려'];
        newBlock = Block.generateBlock(GENESIS, data);
        // 블록의 난이도에 따른 마이닝을 동작해서
        // 조건에 맞을 때까지 연산을 반복한 뒤 생성된 블록을 newBlock에 받아옴
        // 이전 블록은 GENESIS
        console.log(newBlock);

        const data2 = ['죽겠다'];
        newBlock2 = Block.generateBlock(newBlock, data2);
        console.log(newBlock2);
    })

    it("블록 유효성 검증", () => {
        const isValidBlock = Block.isValidNewBlock(newBlock, GENESIS);
        if(isValidBlock.isError) {
            return expect(true).toBe(false); // 성공한 결과가 맞는지 확인 (true와 false를 비교)
        }
        expect(isValidBlock.isError).toBe(false);
    })
})