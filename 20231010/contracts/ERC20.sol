// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import './IERC20.sol'; // 여기서 만든 인터페이스 상속 (is == implements)

contract ERC20 is IERC20 {
    // ERC20 토큰 규약
    string public name; // 토큰의 이름
    string public symbol; // 토큰의 단위 (ETH 등)
    uint8 public decimals = 18; // 토큰의 소수점 자리 (기본 18단위)

    // interface 함수는 기본 선언하면 virtual 함수로 되어있음
    // override로 상속받은 함수를 새로 정의하여 사용
    uint public override totalSupply; // 토큰의 총 발행량
    address private owner; // 컨트랙트 배포자 (현재 ERC20에서는 이 컨트랙트에 작성할 필요가 없어서 사용하지 않음)
    
    // 컨트랙트 배포자가 실행
    // memory : 메모리 영역에서 사용 후 해제
        // uint는 메모리 영역 크기가 정해져있음 (ex. 256byte)
        // string 처럼 가변적인 변수에는 memory를 붙임
    constructor(string memory _name, string memory _symbol, uint256 _amount) {
        // 어떤 이름의 토큰을 발행하고, 어떤 단위를 사용할지, 처음 총 발행량을 얼마나 설정할지
        
        owner = msg.sender;
        name = _name;
        symbol = _symbol;

        // 최초 토큰 발행
        mint(_amount * (10 ** uint256(decimals)));
    }

    // 토큰을 누가 얼마만큼 가지고 있는지의 내용을 담을 객체
    // key : address, value : uint
    mapping(address => uint) public balances;
    /*
        balances = {
            ox1243899073401851034789 : 100,
            ox0912039487182930498374 : 200,
        }
    */

    // 토큰의 권한을 위임받은 내용이 들어있는 객체
    mapping(address => mapping(address => uint)) public override allowance;
        /*
        allowance = {
            ox1243899073401851034789 : { // 얘가
                ox0912039487182930498374 : 50, // 얘한테 50 위임
            }
        }
    */

    // 전달받은 매개변수(계정 주소)로 토큰의 잔액을 조회
    function balanceOf(address account) external view override returns (uint) {
        return balances[account];
    }

    // 토큰을 다른 계정으로 전송
    function transfer(address to, uint amount) external override returns (bool) {
        // 전달하는 사람의 잔액이 감소
        balances[msg.sender] -= amount;
        // 전달받은 사람의 잔액이 증가
        balances[to] += amount;
        // transfer 이벤트를 실행시킨 로그를 트랜잭션에 기록
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    // 소유권 제3자에게 위임
    function approve(address spender, uint amount) external override returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approveal(msg.sender, spender, amount);
        return true;
    }

    // 권한을 가지고 있는 제3자가 토큰을 보낼 때 사용하는 함수
    function transferFrom(address spender, address to, uint amount) external override returns (bool) {
        // 권환을 가지고 있는지 토큰 양 검사
        require(allowance[spender][msg.sender] >= amount);
        allowance[spender][msg.sender] -= amount;
        balances[spender] -= amount;
        balances[to] += amount;
        return true;
    }

    // 토큰 발행
    // internal : 컨트랙트 내부에서만 실행
    function mint(uint amount) internal {
        balances[msg.sender] += amount;
        totalSupply += amount;
    }

    // 토큰이 너무 많아지면 가치 하락을 막기위해 소각
    function burn(uint amount) external {
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }
}