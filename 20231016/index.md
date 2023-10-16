# ERC721 (NFT)
- 대체불가능토큰 (Non-Funcgible Token)
    - 내용이 불가능한 것이 아니고, 토큰 자체가 고유의 값을 가지고 있기 때문에 대체 불가능
- 디지털 자산의 소유권을 보장함

<br>

### NFT 구조
```javascript
const nft = {
    tokenId : "0x0000000100111011", // 고유 식별자
    url : "https://nfturl.com/data.json", // NFT에 담을 내용이 담긴 객체 경로
}
```
### url 내용
```json
{
    "name" : "NFT 이름",
    "description" : "NFT 설명",
    "image" : "NFT 이미지 경로",
    "attributes" : [
        // 원하는 추가 속성 (ex. 레어도)
    ]
}
```

### 분산 파일 시스템(IPFS)
- url 객체의 내용을 DB에 저장해도 NFT 민팅을 할 수는 있지만 탈중앙화가 아님
- P2P 네트우크인 분산 파일 시스템(IPFS)에 저장
- IPFS에서 NFT를 조회하면 저장된 객체의 내용으로 NFT를 보여줌
- IPFS에 파일을 업로드하면 분산 네트워크, 중앙화 서버 없이 여러 노드들이 분산 네트워크에 파일을 저장 -> 무결성 및 보안 유지
- 업로드하면 파일의 경로는 고유한 주소(hash 기반)를 가지게 됨
- NFT에 담을 객체의 내용을 IPFS ㅈ장소에 저장하고 url 값을 NFT 객체에 담아 놓음

```sh
npm i @openzeppelin/contracts
```


# Pinata
- IPFS Provider로 사용
- pinata로 IPFS에 직접 파일을 업로드하고 업로드 한 파일의 해시 주소를 가져옴
- 이 해시주소로 IPFS에 업로드 된 파일을 다운로드 하거나 확인할 수 있음
- 이미지 업로드
- json 파일 업로드

- myNFT.sol

remixd -s . --remix-ide https://remix.ethereum.org