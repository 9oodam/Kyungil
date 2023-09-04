// SHA-256
// 현재 블록체인에서 가장 많이 채택하여 사용하고 있는 암호 방식
// 출력 속도가 빠르고 단방향성 암호화 방법을 제공
// 복호화 불가능
// 아직까지 큰 단점 없음
// 인증서나 블록체인에 많이 사용
// 256bit로 구성된 64자리 문자열로 암호화 해줌

const {SHA256} = require("crypto-js");

const str = '안녕하세요';
console.log('hash 결과 : ', SHA256(str).toString()); // 2c68318e352971113645cbc72861e1ec23f48d5baa5f9b405fed9dddca893eb4
console.log('hash 결과의 길이 : ', SHA256(str).toString().length); // 64