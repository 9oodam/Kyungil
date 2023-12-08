1) 프로그램 시작 -> 렉시컬 환경에 글로벌실행컨텍스트 생성
1-1) 선언되어 있는 변수와 함수를 글로벌실행컨텍스트에 저장
    const obj, const obj2, function inner, const fn
1-2) 문제 inner함수 2개 => 동일한 이름의 function이 순차적으로 읽히면서 아래의 inner가 저장 (함수 호이스팅)

2) obj2.getName 함수가 호출되면서 함수실행컨텍스트 생성
2-1) getName 함수 평가 (this: 글로벌, 외부환경 : obj)
2-2) console.log 호출되면서 함수실행컨텍스트 생성
2-3) 실행되어 obj 객체의 프로퍼티 name인 ingoo를 출력하고 컨텍스트 삭제
2-4) getName() 종료 컨텍스트 삭제

3) 25번줄 inner 함수 호출되면서 29-42번줄 inner 함수의 함수실행컨텍스트 생성
3-1) inner 함수 평가 (this: 글로벌, const outer)
3-2) inner 함수 실행
3-3) console.log 호출되면서 함수실행컨텍스트 생성
3-4) console.log의 외부환경인 inner의 this를 출력하고 컨텍스트 삭제
3-5) outer 함수 호출되면서 함수실행컨텍스트 생성
3-6) outer 함수 평가 (this: 글로벌, const hello)
3-7) console.log 호출되면서 함수실행컨텍스트 생성
3-8) console.log의 외부환경인 outer의 this를 출력하고 컨텍스트 삭제
3-9) hello 함수 호출되면서 함수실행컨텍스트 생성
3-10) console.log 호출되면서 함수실행컨텍스트 생성
3-11) console.log의 외부환경인 hello의 this를 출력하고 컨텍스트 삭제
3-12) function을 return시키고 inner 함수실행컨텍스트 삭제

4) 27번줄 call로 this가 수정된 새로운 함수 뒤 호출 및 함수실행컨텍스트 생성
4-1) 위와 순서 동일
4-2) 30번줄 : 외부환경인 inner.this(name:'ingoo) 가 찍히고 console.log 실행컨텍스트 삭제
4-3) 32번줄 : 외부환경인 outer.this(본인 게 없어서 하나 더 위 inner.this)
4-4) 34번줄 : 외부환경인 hello.this(본인 게 없어서 타고 올라가서 inner.this)

5) fn 함수 호출되면서 함수실행컨텍스트 생성
5-1) 함수 평가 (this: name:'ingoo', const outer)
5-2) 위와 동일하게 실행
5-3) fn은 inner.call({name:'ingoo'})을 호출한 값을 저장하는 것이기 때문에 return 안의 내용이 출력 (return 안의 this 또한 외부환경을 참조하기 때문에 결국 inner.this 출력)