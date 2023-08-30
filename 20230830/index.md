# typeScript

### 특징
- javaScript에서 타입 검사가 확장된 추가된 언어
- javaScript의 상위 집합 슈퍼셋(상위 확장)
- 대형 프로젝트를 진행할 때 오류 검사가 쉬움
- 객체지향 프로그래밍에 특화된 프로그래밍 패턴 지원
- 함수형 프로그래밍이 대세이기 때문에 타입검사나 추론 등의 기능을 사용할 예정
- 컴파일 언어이기 때문에 런타임이 존재하지 않음
    - 컴파일러 존재
    - javaScript로 한 번 변환한 뒤 런


### 장점
- javaScript로 작업할 때보다 개발에서 생기는 에러를 사전에 방지할 수 있음
- javaScript의 코드 품질과 개발 생산성을 높임


### 가이드
- javaScript는 타입이 정해져있지 않아서 자동완성이 미리 뜨지 않고 일일이 어떤 값이 있는지 확인하면서 타이핑 해야 함
- typeScript는 별칭을 통해 자동완성 및 작성이 가능, 미리 에러를 방지할 수 있어 정확하게 작업 가능
- typeScript로 작성한 코드를 브라우저가 해석할 수 있는 javaScript 코드로 변환하여 사용 (== 컴파일)


### typeScript 설치
```sh
# package.json 초기화
npm init -y
# 개발 단계에서 사용 -D => --save-dev 와 동일
npm install -D typescript
## 설치 되었는지 버전 확인
npm tsc --version
```

### typeScript의 컴파일 과정 옵션을 설정할 수 있는 파일
- tsconfig.json : 설정된 하위 경로에 규칙이 맞지 않는 구문을 발견하면 수정하라고 알림 (== 잔소리꾼)

```sh
# tsconfig.json 생성 명령어
npx tsc --init
```


### typeScript 변수의 타입 지정
- javaScript
    - 변수명 = 초기값;
- typeScript
    - 변수명 : 타입명 = 초기값;


### node 환경에서 실행 시켜보기?
- typeScript는 node가 해석을 할 수 없기 때문에 ts-node로 실행
- ts-node typeScript 실행 환경 : typeScript를 javaScript로 컴파일해서 실행 필요없이 node 환경에서 실행 가능
    - node 01.type msg.ts (X)
    - ts-node 0.1type msg.js (O)
1. typeScript를 내부 컴파일럴르 통해 javaScript 코드로 변환하여 메모리 상에만 가지고 있음 (javaScript 파일을 만드는 것은 아님)
2. 컴파일 된 javaScript 코드를 nodejs 런타임 환경으로 실행 -> 코드 실행 결과를 출력 (타입 검사로 코드에서 발생할 오류를 미리 알려줌)

### ts-node 설치 명령어
```sh
# node.js는 javaScript 런타임 환경으로 내장함수 및 모듈에 대한 type 정보가 없음
# 따라서 nodejs 타입 정보를 패키지로 설치 (@types/node)
npm install ts-node @types/node
```

### 실행 가이드
```sh
npx ts-node index.ts
# npx ts-node 01.type/msg.js
```