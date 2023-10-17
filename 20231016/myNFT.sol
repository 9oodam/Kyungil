// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 public tokenIdNum = 21;

    struct MyNftArr {
        uint256 tokenId;
        string tokenURI;
    }

    mapping (uint256 tokenId => string tokenURI) _tokenURI;
    mapping (address => MyNftArr[]) public _myNftArr;
    mapping (uint256 tokenId => address) _tokenApprovals;
    
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {

    }


    // 민팅
    function minting(string memory _hash) public returns (bool) {
        _tokenURI[tokenIdNum] = _hash; // tokenId -> tokenURI 매핑
        _myNftArr[msg.sender].push(MyNftArr( // address -> tokenId, tokenURI 매핑
            tokenIdNum,
            _hash
        ));

        _mint(msg.sender, tokenIdNum);
        tokenIdNum += 1;
        return true;
    }

    // 삭제
    function burn(uint256 _tokenId) public returns (bool) {
        _tokenURI[_tokenId] = '';

        _burn(_tokenId);
        return true;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return string.concat(_baseURI(), _tokenURI[_tokenId]);
    }

    function _baseURI() internal view override returns (string memory) {
        return "https://crimson-generous-ant-395.mypinata.cloud/ipfs/";
    }

    function getMyNft(address owner) public returns (MyNftArr[] memory) {
        return _myNftArr[msg.sender];
    }



    // NFT 판매 권한 부여
    function setAppAll(address owner, address operator, bool approved) public {
        _setApprovalForAll(owner, operator, approved);
    }

    // NFT 소유권 및 권한 설정은 여기서
}