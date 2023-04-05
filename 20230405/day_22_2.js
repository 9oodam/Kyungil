// closure (클로저) : 내부 함수에서 외부 함수의 변수에 접근 가능
// 함수의 외부 변수와 변수 선언 기준으로 어디까지 변수를 활용 가능한지에 대해 숙지 필요

/*
function fun1() {
    for(var i = 0; i < 5; i++) {
        debugger; // 브라우저에서 브레이크를 포인트를 설정 (개발자 모드에서 확인 가능)
        setTimeout(() => {
            console.log(i);
            debugger;
        }, i * 1000);
    }
}
fun1(); // 5 5 5 5 5
*/

// var로 선언한 변수는 함수 스코프를 가지고 함수의 어느 곳에서든 접근 가능
// for문이 함수 내부에서 실행되고 for문에 선언한 var 변수는 함수의 어디서든 접근이 가능
// for문 안에서 비동기 처리 함수가 호출되고 for문은 이미 다 종료되고 함수가 실행되기 때문에
// 전부 증가한 5가 찍힘
// 5로 이미 증가된 상태로 함수스코프로 접근하기 때문

// 함수 스코프 : 변수가 선언된 함수에서 유효
// 함수에서 선언된 변수는 함수가 호출되고 종료되면 해제


// let: 블록 스코프
// 블록 스코프 : 변수가 선언된 블록에서 블록이 종료될 때 사라짐
// 자바스크립트 실행 context 중요

/*
function fun2() {
    if(true) {
        var a = 45; // 함수 스코프에서 선언
        let b = 54; // 블록 스코프에서 선언
    }
    console.log(a); // 45
    console.log(b); // not defined (호출이 안됨)
}
fun2();
*/


function fun3() {
    let value = ""; // 1) 외부함수에서 변수 선언
    function fun4() {
        if(value == "") { // 2) 내부 함수에서 변수 불러와 사용
            value = "closure 배우는 중";
            return value; // 3) 값 밖으로 반환
        }
    }
    return fun4;
}
let closure = fun3();
console.log(closure);
let a = closure();
console.log(a);

// 함수의 변수를 참조해주고 메모리상에 변수가 유지 되도록 함
// fun4 함수가 fun3 함수의 value 변수를 참조
// fun4 함수가 실행되면 value를 선언
// fun4 함수는 fun3 실행 컨텍스트에 생성된 value 값을 변경 가능
// 자바스크립트가 함수를 생성할 때 함수나 변수 선언 위치를 기억해서
// 함수를 반환한 이후에도 참조가 가능