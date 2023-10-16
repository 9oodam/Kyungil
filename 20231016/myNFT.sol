// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {

    }

    uint256 public tokenNumber;

    struct MyNftArr {
        uint256 tokenId;
        string tokenURI;
    }

    mapping (uint256 tokenId => string tokenURI) _tokenURI;
    mapping (address => MyNftArr[]) public _myNftArr;
    mapping (uint256 tokenId => address) _tokenApprovals;

    // 토큰 아이디 겹치지 않게 부여
    function getTokenId() public returns (uint256) {
        tokenNumber += 1;
        return tokenNumber;
    }
    
    // 민팅
    function minting(uint256 _tokenId, string memory imageHash) public returns (bool) {
        _tokenURI[_tokenId] = imageHash; // tokenId -> tokenURI 매핑
        _tokenApprovals[_tokenId] = msg.sender; // tokenId -> address 매핑
        _myNftArr[msg.sender].push(MyNftArr( // address -> tokenId, tokenURI 매핑
            _tokenId,
            imageHash
        ));
        
        _mint(msg.sender, _tokenId);
        return true;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return string.concat(_baseURI(), _tokenURI[_tokenId]);
    }

    function _baseURI() internal view override returns (string memory) {
        return "https://crimson-generous-ant-395.mypinata.cloud/ipfs/";
    }
}