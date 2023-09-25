# 컨트랙트 실행
- 컨트랙트 영역 데이터(contract storage data)를 영구적으로 저장할 수 있음
- storage에서 상태(블록체인 스마트 컨트랙트)를 저장하여 영구적으로 유지

<br>

### code 작성은 js 클래스 문법과 유사

- javaScript의 class 인스턴스는 new 키워드를 사용하여 생성
- new로 생성된 인스턴스들은 각각 다른 메모리 주소를 참조하고 있기 때문에 동일한 객체가 아님
    ```javascript
    class Counter {
        value : number;

        constructor() {}
        
        setValue() {}
        getValue() {}
    }
    ```
    ```javascript
    const _counter1 = new Counter();
    const _counter2 = new Counter();
    ```
<br>

- solidity의 컨트랙트는 컴파일된 코드의 내용이 EVM을 통해서 실행되고, CA가 생성될 때 하나의 인스턴스 생성
- 이후에 생성된 인스턴스를 CA로 참조해서 컨트랙트에 접근
- 사용하는 데이터는 같은 데이터를 참조 (singleton 패턴)
- singleton : 인스턴스 객체를 하나 생성해서 어디서든 해당 인스턴스만 참조하는 디자인 패턴

    ```
    // 라이센스 버전
    // SPDX-License-Identifier:MIT

    // 솔리디티 버전
    // pragma solidity ^0.8.0;

    // 컨트랙트 코드
    contract Counter {
        uint256 value;

        constructor() {}

        // 상태변수 수정 (가스비 발생)
        // 매개변수에 타입과 변수명, 함수는 퍼블릭
        function setValue(uint256 _value) public {
            value = _value;
        }

        // view : 상태변수를 변경하지 않고 조회
        // returns (uint256) : 반환값의 타입 지정
        function getValue() public view returns (uint256) {
            return value;
        }
    }
    ```

<br>

### 스마트 컨트랙트 프로세스
1. 컨트랙트 코드 작성
2. 컨트랙트 코드 컴파일
3. 스마트 컨트랙트 배포(트랜잭션 생성)
4. node에게 전송(트랜잭션 발생)
5. 블록이 생성되면 트랜잭션 풀에 있던 트랜잭션이 처리
6. 어카운트(CA) 생성
7. EVM에서 Solidity코드 실행 -> 인스턴스 생성
8. storage에 데이터 영구 저장

<br>

### 스마트 컨트랙트 코드 구현 (간단한 카운터)
- 스마트 컨트랙트 코드가 실행될 때 EVM에서 연산을 얼마나 할지와 가스비를 측정
- 네트워크 상황과 코드의 복잡성에 따라 연산 (직접 연산은 어렵고 추정만 해보기)
- getValue() : 상태 변수의 값을 조회하는 함수는 연산 과정이 없기 때문에 가스비 발생 X
- setValue() : 상태 변수의 값을 수정하는 함수는 연산 과정이 포함되기 때문에 가스비 발생 O (한정된 네트워크 자원 사용)
- 연산 과정에서 무한 루프(과도한 코드 실행)되면 gasLimit이 초과되고 트랜잭션 블록에 담기지 않음
- Counter.sol

<br>

### 개발 환경 구축
- npm i solc@0.8.13
- npm i ganache-cli
- npx ganache-cli
- index.html