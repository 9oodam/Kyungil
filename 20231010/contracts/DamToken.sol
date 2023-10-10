// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DamToken is ERC20 {
    // 상속받은 부모 생성자 호출
    constructor() ERC20("DamToken", "DAM") {
        _mint(msg.sender, 10000 * (10 ** decimals()));
    }
}