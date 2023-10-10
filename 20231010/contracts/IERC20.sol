// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// OpenZepplin에서 제공하는 ERC20 인터페이스
// OpenZepplin : solidity 기반의 스마트 컨트랙트를 개발할 때 사용하는 표준 프레임워크
// 표준 토큰 규약을 지키면서 안전성 있고 빠르게 구현할 수 있음

interface IERC20 {
    // 토큰의 현재 총 발행량 조회
    // external : public과 유사, 외부(EOA or CA)에서 접근(호출) 가능, 내부에서는 불가
    // public보다 가스비가 저렴
        // public : 함수의 변수를 메모리에 복사 해놓고 사용
        // external : CALLDATA를 직접 읽어서 사용 (복사 X)
    function totalSupply() external view returns (uint);

    // 전달받은 매개변수(계정 주소)로 토큰의 잔액을 조회
    function balanceOf(address account) external view returns (uint);

    // 토큰을 다른 계정으로 전송
    function transfer(address to, uint amount) external returns (bool);

    // 소유권을 위임받은 토큰을 관리하는 공간
    function allowance(address owner, address spender) external returns (uint);

    // 소유권을 제3자에게 위임
    function approve(address spender, uint amount) external returns (bool);

    // 위임받은 소유권이 있는지 확인 후 토큰을 보냄
    function transferFrom(address spender, address to, uint amount) external returns (bool);

    // event 함수 (실행하면 트랜잭션 내용에 로그를 만들어서 이더스캔 등에서 로그 확인 가능)
    event Transfer(address from, address to, uint value);

    event Approveal(address owner, address spender, uint value);
}