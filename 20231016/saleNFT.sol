// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./myNFT.sol";


// myNFT CA와 상호작용 할 contract
contract SaleNFT {
    MyNFT public _nft; // MyNFT 타입의 변수 (CA를 담음)

    // 판매등록을 한 NFT
    mapping (uint => string[]) salingNFTs;
    // 판매 금액

    constructor(address _nftCA) {
        _nft = MyNFT(_nftCA);
    }

    function saleNftMint(string memory _hash) public {
        // CA에서 CA로 메시지를 전송하여 메서드 실행
        _nft.minting(_hash);
    }


    // myNFT 에서 권한 부여하는 함수 작성
    // saleNFT -> myNFT 메시지 전송하여 권한을 위임받음
    function setApprovalForAll() public {
        _nft.setAppAll(msg.sender, address(this), true);
    }

    // 실행시킨 사람이 판매 컨트랙트에 NFT 군한을 위임했는지 확인
    function salesNFT() public view returns (bool) {
        // owner / msg.sender : 위임한 사람
        // operator / address(this) : 위임받은 사람
        return _nft.isApprovedForAll(msg.sender, address(this));
    }

    // 판매 내용은 여기서
    // 누가 판매 등록 했는지 담을 상태변수
    // 금액 얼마로 산정할지
    // 판매에 대한 시기
    // 구매자가 요청하면 판매자가 수락/거절 이더를 받고 소유권 넘김
    // 구매 신청하면 판매 CA로 이더를 보내서 담아놓음
    // 판매자가 수락하면 판매 CA에서 판매자에게 이더리움 보내고 소유권을 구매자게에 넘김
}