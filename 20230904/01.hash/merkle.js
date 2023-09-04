// merkle tree
// 데이터의 암호화 구조가 트리 형태

const merkle = require("merkle");

const data = ['A', 'B', 'C', 'D', 'E'];
// 데이터의 무결성 검증에 사용되는 트리 구조
// 블록의 필수 요소
// 데이터들을 해시화하여 더한 후 해시화 반복
// 트리처럼 뻗어서 마지막 루트 해시값을 구하여 사용 (머클 루트)
// 데이터 갯수가 홀수일 경우 마지막 데이터를 X2

const merkleTree = merkle('sha256').sync(data);
const Root = merkleTree.root();
console.log(Root); // AE4F3A195A3CBD6A3057C205DEF94520930F03F51F73C5A540D8FDAB05163FEF

// A hash + B hash = AB
// C hash + D hash = CD
// E hash + E hash = ee

// AB hash + CD hash = ABCD
// EE hash + EE hash = EEEE

// ABCD hash + EEEE hash + ABCDEEEE