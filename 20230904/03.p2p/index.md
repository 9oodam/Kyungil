## 설치
```sh
npm init -y

npm i -D typescript ts-node

# node환경에서 tsconfig-paths ts-node로 실행할 때 우리가 정해준 별칭을 경로로 변환하여 실행
npm i -D tsc-alias tsconfig-paths

npm i -D @types/merkle merkle
npm i -D @types/crypto-js

```

## tsconfig.json 수정
```sh
npx tsc --init
```


## jest
```sh
npm i -D @types/jest jest ts-jest
```
- jest.config.ts : jest로 테스트 코드를 실행할 때 옵션설정 파일
```json
  "scripts": {
    "test": "jest"
  },
```