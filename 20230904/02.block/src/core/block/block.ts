import { SHA256 } from "crypto-js";
import merkle from "merkle";
import { BlockHeader } from "./blockHeader"
import { IBlock } from "@core/interface/block.interface";
import { Failable } from "@core/interface/failable.interface";
import { CryptoModule } from "@core/crypto/crypto.module";

// block 형태
export class Block extends BlockHeader implements IBlock {
    merkleRoot: string;
    hash: string;
    nonce: number;
    difficulty: number;
    data: string[];

    constructor(_previousBlock : Block, _data : string[]) {
        // 부모 클래스 생성자 호출
        super(_previousBlock);
        this.merkleRoot = Block.getMerkleRoot(_data);
        this.hash = Block.createBlockHash(this);
        this.nonce = 0; // 채굴은 뒤에 추가할 예정
        this.difficulty = 3;
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
    static generateBlock(_previousBlock : Block, _data : string[]) : Block {
        const generateBlock = new Block(_previousBlock, _data);
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
}