// 제네시스 블록 (최초의 블록)

const {SHA256} = require("crypto-js");
const merkle = require("merkle");

// 블록 header
// 블록의 버전, 높이, 생성 시간, 이전 해시값 등
class Header {
    constructor(_height, _prevHash) {
        this.version = Header.getVersion(); // 버전
        this.height = _height; // 높이
        this.timestamp = Header.getTimestamp(); // 타임스탬프
        this.prevHash = _prevHash || '0'.repeat(64); // 이전 해시값
    }

    getName() {
        return 'first block'
    }

    // static으로 메서드 선언하면 전역으로 사용할 수 있고
    // 이 클래스로 객체를 동적 생성했을 때 이 메서드가 그 객체에 생성되지 않음
    static getVersion() {
        return '1.0.0'
    }

    static getTimestamp() {
        return new Date().getTime();
    }
}


class Block {
    // block _header, data 헤더 객체와 내용을 받아서 생성
    constructor(_header, _data) {
        this.version = _header.version;
        this.height = _header.height;
        this.timestamp = _header.timestamp;
        this.prevHash = _header.prevHash;
        this.data = _data;
        this.merkleRoot = Block.getMerkleRoot(_data);
        this.hash = Block.createBlockHash(_header, Block.getMerkleRoot(_data)) // 블록의 해시
    }

    static getMerkleRoot(_data) {
        const merkleTree = merkle('sha256').sync(_data);
        return merkleTree.root();
    }

    static createBlockHash(_header, _merkleRoot) {
        // header 객체 안의 값을 배열로 가져옴
        const values = Object.values(_header);
        // values를 join으로 연결하여 문자열로 만듦
        const data = values.join('') + _merkleRoot;
        return SHA256(data).toString();
    }
}


// 블록 생성해보기
const data = ['집에 가고 싶다 진짜'];
const header = new Header(0);
const block = new Block(header, data);

console.log(block);
/*
Block {
  version: '1.0.0',
  height: 0,
  timestamp: 1693791278556,
  prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
  data: [ '집에 가고 싶다 진짜' ],
  merkleRoot: '413A322A85447D215B7318F1523FC5121CFA3D3ED556AD5B31AA43BFDBE100B8',
  hash: '752430ab905275ed792bb0e5895bd3adb2faa1cab93e8c5b66af6adc18ac52fb'
}
*/

const header2 = new Header(1, block.hash);
const block2 = new Block(header2, ['졸려']);
console.log(block2);
/*
Block {
  version: '1.0.0',
  height: 1,
  timestamp: 1693791278561,
  prevHash: '752430ab905275ed792bb0e5895bd3adb2faa1cab93e8c5b66af6adc18ac52fb',
  data: [ '졸려' ],
  merkleRoot: '7C96CEF853AB6456DAC6E5C60FF1F9E1F6E846F417DE6ECBC75ABC237F75C9DA',
  hash: 'ecc5f8ee4fa9bcc99650379bc7727b11b41e892d021e4df3f6800d554b1e06bc'
}
*/