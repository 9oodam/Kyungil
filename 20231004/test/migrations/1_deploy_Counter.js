// artifacts : truffle에서 제공하는 글로벌 명령어
// 컴파일된 파일을 불러옴
const Counter = artifacts.require("Counter");

// deployer : 배포하는 내용의 객체를 매개변수로 받음
module.exports = (deployer) => {
    // deploy() : 컴파일된 내용을 네트워크에 배포 진행
    deployer.deploy(Counter);
}