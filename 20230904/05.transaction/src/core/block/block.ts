import { SHA256 } from "crypto-js";
import merkle from "merkle";
import { BlockHeader } from "./blockHeader"
import { IBlock } from "@core/interface/block.interface";
import { Failable } from "@core/interface/failable.interface";
import { CryptoModule } from "@core/crypto/crypto.module";

// 20230908 (금)
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
const BLOCK_GENERATION_INTERVAL = 10 * 60; // 블록의 생성시간 (1개당 10분)

// block 형태
export class Block extends BlockHeader implements IBlock {
    merkleRoot: string;
    hash: string;
    nonce: number;
    difficulty: number;
    data: string[];

    constructor(_previousBlock : Block, _data : string[], _adjustmentBlock : Block) {
        // 부모 클래스 생성자 호출
        super(_previousBlock);
        this.merkleRoot = Block.getMerkleRoot(_data);
        this.hash = Block.createBlockHash(this);
        this.nonce = 0; // 채굴은 뒤에 추가할 예정
        this.difficulty = Block.getDifficulty(this, _adjustmentBlock, _previousBlock);
        this.data = _data;
    }

    // 마이닝 작업 (채굴)
    // 연산을 통해 난이도의 값에 따른 정답을 찾는 동작
    // POW 방식의 연산을 진행
    static findBlock(generateBlock : Block) {
        let hash : string;
        let nonce : number = 0; // 블록 채굴할 때 연산 몇번 진행했는지

        while(true) {
            generateBlock.nonce = nonce;
            nonce++; // 논스를 증가시켜서 hash 값을 계속 바꿈
            hash = Block.createBlockHash(generateBlock);

            // 16진수 -> 2진수로 변환
            // 0의 갯수가 난이도의 갯수에 충족하는지 체크
            // 충족되면 채굴 권한 부여
            const binary : string = CryptoModule.hashToBinary(hash);
            console.log('binary : ', binary)

            // 연산의 결과가 난이도에 충족하는지 체크할 변수
            // startsWith : 매개변수로 전달된 문자열로 시작하는지 확인
            // "000" = 이 문자열로 시작하는지 결과 true/false 반환
            const result : boolean = binary.startsWith("0".repeat(generateBlock.difficulty));
            console.log('result : ', result)

            // 충족되면 연산을 통해 완성된 hash값과 완성된 블록을 내보냄
            if(result) {
                generateBlock.hash = hash;
                return generateBlock;
            }
        }
    }

    // 블록의 해시를 구하는 함수
    static createBlockHash(_block : Block) : string {
        const {version, timestamp, height, merkleRoot, previousHash, difficulty, nonce} = _block;
        const value : string = `${version}${timestamp}${height}${merkleRoot}${previousHash}${difficulty}${nonce}`;
        return SHA256(value).toString();
    }

    // 머클루트 구하는 함수
    static getMerkleRoot<T>(_data : T[]) : string {
        const merkleTree = merkle('sha256').sync(_data);
        return merkleTree.root();
    }

    // 블록 추가하는 함수
    static generateBlock(_previousBlock : Block, _data : string[], _adjustmentBlock : Block) : Block {
        const generateBlock = new Block(_previousBlock, _data, _adjustmentBlock);
        // 마이닝을 통해 블록의 생성 권한을 받은 블록을 만들고
        const newBlock = Block.findBlock(generateBlock);
        return newBlock;
    }

    // 블록의 유효성 검사 (정상적인지)
    static isValidNewBlock(_newBlock : Block, _previousBlock : Block) : Failable<Block, string> {
        // 1. 높이
        if(_previousBlock.height + 1 !== _newBlock.height) {
            return {isError : true, value : "height error"}
        }
        // 2. 이전 해시 값이 새로운 블록에 있는지
        if(_previousBlock.hash !== _newBlock.previousHash) {
            return {isError : true, value : "prev hash error"}
        }
        // 3. 생성된 블록의 정보를 가지고 다시 해시해서 블록의 값이 변조되지 않았는지
        if(Block.createBlockHash(_newBlock) !== _newBlock.hash) {
            return {isError : true, value : "hash error"}
        }

        // 통과
        return {isError : false, value : _newBlock}
    }


    // 20230908 (금)

    // 난이도
    static getDifficulty(_newBlock : Block, _adjustmentBlock : Block, _previousBlock : Block) : number {
        // 실제 네트워크에서는 2016개 이전 블록의 생성시간을 보고 난이도 조절
        // 우리는 일주일을 기다릴 수 없기 때문에 10개만 계산해서 테스트
        if(_newBlock.height <= 0) throw new Error('error : 높이가 0임 (최초의 블록)');

        if(_newBlock.height < 10) return 0;

        // 블록의 높이가 20이하의 경우 체크 X
        if(_newBlock.height < 21) return 1;

        // 나머지가 10으로 딱 떨어지지 않으면 이전 블록의 난이도를 반환
        if(_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) return _previousBlock.difficulty;

        // 시간의 차이 구하기
        const timeToken : number = _newBlock.timestamp - _previousBlock.timestamp;
        // 블록 10개 생성시간
        const TimeExpected : number = BLOCK_GENERATION_INTERVAL * 10 * DIFFICULTY_ADJUSTMENT_INTERVAL;

        // 생성시간이 빠르면 난이도 증가 (총소요시간 < 목표시간 / 2 = 이전블록 난이도 + 1)
        if(timeToken < TimeExpected / 2) return _previousBlock.difficulty + 1;
        // 생성시간이 느리면 난이도 하락
        if(timeToken > TimeExpected * 2) return _previousBlock.difficulty - 1;

        // 다 해당되지 않으면
        return _previousBlock.difficulty;
    }
}