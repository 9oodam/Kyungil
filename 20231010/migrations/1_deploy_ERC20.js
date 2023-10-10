const ERC20 = artifacts.require("ERC20");

module.exports = (deployer) => {
    // truffle에서 배포 시
    // constructor(생성자 함수)의 매개변수는 deploy() 에
    deployer.deploy(ERC20, "DamToken", "DAM", 10000);
}