// 제네시스 블록 하드 코딩 해놓기

import { IBlock } from "./interface/block.interface";

export const GENESIS : IBlock = {
    version: '1.0.0',
    height: 0,
    timestamp: new Date().getTime(),
    hash: '0'.repeat(64),
    previousHash: '0'.repeat(64),
    merkleRoot: '0'.repeat(64),
    difficulty: 0, // 블록 채굴할 때 이전 블록의 난이도로 마이닝을 함, 블록의 생성주기를 검사해서 빠르면 블록의 난이도를 상승
    nonce: 0,
    data: ['The Times 03/Jan/2009 Chancellor on brink of second bailout for banks']
}