// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

contract ERC20 is IERC20 {
    string public name; // 토큰 이름
    string public symbol; // 토큰 단위
    uint8 public decimals = 18; // 소숫점 자리
    uint public override totalSupply; // 토큰 총량
    address private owner; // 컨트랙트 배포자
    mapping(address => uint) public balances; // 누가 얼만큼 가지고 있는지 정보가 들어있는 객체
    mapping(address => mapping(address => uint)) public override allowance; // 소유권 위임 받은 정보

    // receive : 익명함수, CA로 이더가 전송됐을 때 자동으로 실행
    receive() external payable {
        // 배포자가 토큰의 발행량을 관리, 다른 이용자가 토큰을 가지고 싶으면 배포자가 정한 비율에 따라 토큰을 가져갈 수 있게
        uint amount = msg.value * 200; // 1ETH == 200TOKEN 
        require(balances[owner] >= amount);
        balances[owner] -= amount;
        balances[msg.sender] += amount;

        // 만약 모든 토큰의 소유권을 넘겼을 경우,
        // 배포자가 이더를 전송했을 경우 토큰 추가 발행
        if(msg.sender == owner) {
            _mint(amount);
        }
    }

    constructor(string memory _name, string memory _symbol, uint256 _amount) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;

        _mint(_amount * (10 ** decimals));
    }

    // 토큰 발행
    function _mint(uint amount) internal {
        balances[msg.sender] += amount;
        totalSupply += amount;
    }

    // 매개변수로 전달한 계정의 토큰 잔액 확인
    function balanceOf(address account) external view override returns (uint) {
        return balances[account];
    }

    // 토큰 전송
    function transfer(address to, uint amount) external override returns (bool) {
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }

    // 토큰 위임
    function approve(address spender, uint amount) external override returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    // 위임 받은 토큰을 전송
    function transferFrom(address sender, address to, uint amount) external override returns (bool) {
        require(allowance[sender][msg.sender] >= amount);
        allowance[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[to] += amount;
        return true;

        // sender === A
        // msg.sender === B
        // to === C

        /*
        {
            A : {
                B : 100
            }
        }

        { A : 
            {
                B : 50
            }
        }

        {
            A : 950,
            C : 50
        }
         */
    }

    // 토큰 태우기
    function burn(uint amount) external {
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }
}