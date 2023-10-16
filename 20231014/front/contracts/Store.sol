// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract Store is ERC20 {
    constructor() ERC20("DaminToken", "DAM", 100000) {
    }

    // 상품 객체
    struct Goods {
        string url; // 이미지 주소
        string name; // 상품 이름
        uint256 price; // 상품 가격
        address seller; // 판매자 계정
    }
    // 구매자 객체
    struct User {
        address account; 
    }

    // 판매 등록된 상품 목록
    Goods[] public goodsForSale;

    // 등록한 상품들
    mapping(address => Goods[]) public goodsUserRegister;

    // 어떤 계정이 어떤 상품을 구매했는지
    mapping(address => Goods[]) public goodsUserBuy;


    // 1. 상품 등록
    function registerGoods(
        string memory _url, string memory _name, uint256 _price
        ) public {
            Goods memory newGoods = Goods(_url, _name, _price, msg.sender);
            goodsUserRegister[msg.sender].push(newGoods);
    }

    // 2. 내가 등록한 상품 조회
    function showMyGoods() public view returns (Goods[] memory) {
        return goodsUserRegister[msg.sender];
    }

    // 3. 등록한 상품 삭제 (등록한 상품 배열의 인덱스 받아와서)
    function removeMyGoods(uint index) public {
        uint lastIndex = goodsUserRegister[msg.sender].length - 1;
        require(index <= lastIndex, "Invalid index to remove");
        goodsUserRegister[msg.sender][index] = goodsUserRegister[msg.sender][lastIndex];
        goodsUserRegister[msg.sender].pop();
    }

    // 4. 등록한 상품 판매 등록
    function makeSale(uint index) public {
        Goods storage goods = goodsUserRegister[msg.sender][index];
        goodsForSale.push(goods);

        uint lastIndex = goodsUserRegister[msg.sender].length - 1;
        goodsUserRegister[msg.sender][index] = goodsUserRegister[msg.sender][lastIndex];
        goodsUserRegister[msg.sender].pop();
    }

    // 5. 판매 등록된 상품 조회
    function showAllGoods() public view returns (Goods[] memory) {
        return goodsForSale;
    }

    // 6. 상품 구매
    function buyGoods(uint index) public {
        // 판매 등록된 상품의 가격보다 토큰이 많아야 함
        Goods storage goods = goodsForSale[index];
        require(balances[msg.sender] >= goods.price);

        // 구매자의 토큰은 깎고, 판매자의 토큰은 늘림
        balances[msg.sender] -= goods.price * (10 ** 18);
        balances[goods.seller] += goods.price * (10 ** 18);

        // 판매 목록에서 삭제
        uint lastIndex = goodsForSale.length - 1;
        goodsForSale[index] = goodsForSale[lastIndex];
        goodsForSale.pop();

        // 구매 목록에 추가
        goodsUserBuy[msg.sender].push(goods);
    }

    // 7. 구매 목록 조회
    function mypageGoods() public view returns (Goods[] memory) {
        return goodsUserBuy[msg.sender];
    }
}