// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    uint256 private value;

    constructor() {}

    function setValue(uint256 _value) public {
        value = _value;
    }

    // 누르면 1 증가
    function increment() public {
        value += 1;
    }

    // 누르면 1 감소
    function decrement() public {
        value -= 1;
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}
