// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract Pokemon is ERC20 {
    constructor() ERC20("Pokemon", "POK", 10000) {
    }

    // 포켓몬 객체
    struct Poke {
        string url; // 이미지 주소
        string name; // 이름
    }

    // 구매자 객체
    struct User {
        address account; 
    }

    // ERC20 토큰을 지불해서 구매
    uint256 private tokenPrice = 1000 ether; // 한 개 == 1000 POK

    // 이름 배열
    string[] pokemonName = ["Pikachu", "Kobuk", "Charmander"];

    // 이미지 배열
    string[] pokemonUrl = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JfECC4oc1cHR9hzF4PCCsigqs4M0uJ_fRg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6_avwlenENwRVYTGJmcHc0jjIHnmDX4bSzLR0BoQYfVHNdRixKtJuXKlA5POeX0dPPY&usqp=CAU",
        "https://i.namu.wiki/i/wkwHbl319sCFlTR6pt9P4AnhauWeYt9a28QtGf50DbR2hAUrZ7hcabdwI3KvPSHJd6JoLJ9PZMONNXcdE0sOqg.webp"
    ];

    // 어떤 계정이 어떤 포켓몬들을 가지고 있는지
    mapping(address => Poke[]) public pokemons;

    // 한 번이라도 구매한 사람들의 주소
    User[] public users;



    // 해당 계정이 가지고 있는 포켓몬 조회
    function getPokemon() public view returns (Poke[] memory) {
        return pokemons[msg.sender];
    }

    // 구매한 사람들 모두 조회
    function getPokemonUsers() public view returns (User[] memory) {
        return users;
    }

    // 구매하면 실행할 함수
    function buyPokemon() public {
        require(balances[msg.sender] >= tokenPrice);
        balances[msg.sender] -= tokenPrice;
        totalSupply -= tokenPrice;

        uint random = uint(keccak256(
            abi.encodePacked(block.timestamp, block.coinbase, block.number)
        ));
        random = uint(random % 3); // 0~2 사이의 숫자

        // Poke 구조체 형태로 객체를 만들어 push
        pokemons[msg.sender].push(Poke(
            pokemonUrl[random], // 꼭 키 순서대로 써줘야함
            pokemonName[random]
        ));

        // 유저가 이전에 포켓몬 빵을 산적이 있는지? (소유권 중복 추가 안되게)
        bool isUser = false;
        for(uint256 i = 0; i < users.length; i++) {
            if(users[i].account == msg.sender) {
                isUser = true;
                break;
            }
        }
        if(!isUser) users.push(User(msg.sender));
    }

    // 포켓몬 소유권 이전
    function movePokemon(address who, uint which) public {
        require(pokemons[msg.sender].length > 0, "There is no pokemon which can be moved");
        
        // 보내는 사람에게서 해당 포켓몬을 제외하기 위해 Swap
        uint lastIndex = pokemons[msg.sender].length - 1;
        require(which <= lastIndex, "Invalid index to remove");
        pokemons[msg.sender][which] = pokemons[msg.sender][lastIndex];
        pokemons[msg.sender].pop();
        
        // 소유군 이전 받은 사람에게 추가
        pokemons[who].push(Poke(
            pokemonUrl[which],
            pokemonName[which]
        ));

        bool isUser = false;
        for(uint256 i = 0; i < users.length; i++) {
            if(users[i].account == who) {
                isUser = true;
                break;
            }
        }
        if(!isUser) users.push(User(who));
    }
}