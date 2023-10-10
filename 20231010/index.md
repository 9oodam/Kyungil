# Token

## ERC (Ethereum Request for Comment)
- 뒤에 붙는 숫자는 특정 생성이나 발행 등의 규칙을 식별하기 위해 붙인 번호 (ex. ERC20, ERC721, ...)
- 토큰 (메인넷 X), 코인 (메인넷 O)
- 토큰을 만들면 네트워크 안에 포함은 되어 있지만 토큰 자체의 메인넷이 구현되어 있지는 않음 === 코인이 아님

```sh
```

### ERC20
- 이더리움 네트워크에서 가장 표준이 되는 토큰
- 네트워크 안의 모두가 같은 토큰의 가치를 가지기 때문에 대체(상호 교환) 가능
- 토큰 전송 및 잔액조회, 소유자 관리를 위한 메서드가 정의
- 탈중앙화된 금융 (Defi) 등에서 사용

### ERC721
- 토큰이 단 하나만 존재하기 때문에 대체 불가능
- 토큰은 각각의 고유한 특성을 가지고 있고, 토큰의 소유권을 가질 수 있음
- 토큰의 소유권 이전(판매 및 경매), 메타데이터 조회 등의 메서드와 이벤트 정의

```sh
```

### OpenZeppelin(프레임워크)
- 제공하는 ERC20, ERC721 등 표준 토큰 규약을 상속시켜서 사용
```sh
npm init -y

npm i truffle ganache-cli
npm i @openzeppelin/contracts
# nodemodules/openzeppelin/contracts/token

npx truffle init

truffle-config.js 수정

npx truffle compile
npx ganache --chain.chainId 1337 --chain.networkId 1337 # 토큰량 확인을 위해 옵션 추가
npx truffle migrate

# Remix
npm i -g @remix-project/remixd
remixd -s . --remix-ide https://remix.ethereum.org # background에서 연결 시도
# remix.ethereum.org Workplaces 에서 localhost와 연결
# compiler version 맞춰주기 (3번째 탭)
```