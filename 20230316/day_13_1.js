// callback 함수
// 함수의 매개변수로 함수를 전달해서 함수에 코드를 작성하면서 필요한 순간에
// 매개변수로 받은 함수를 실행

function test1(callBack) {
    console.log("1번 작업 끝");
    console.log("2번 작업 끝");
    if(true) {
        callBack();
    }
}   

function test2() {
    console.log("콜백 함수");
}

test1(test2);


// 배열 함수 map
let arr1 = [1, 2, 3, 4];
arr1.map(function(i, v) {
    console.log(i); // item
    console.log(v); // index
})

// map 흉내내보기
let arr2 = {
    map : function(callBack) {
        // callBack.length : callBack으로 받은 함수에 매개변수가 몇 개 들어가는지 알 수 있음
        // 매개변수 안 받은 함수인데 전달하면 터짐
        if(callBack.length == 1) {
            let a = 10;
            console.log("map 함수 | 콜백 함수에서 매개변수 1개 받음 | 결과 : " + a);
            callBack(a);
        } else if(callBack.length == 2) {
            let a = 10;
            let b = 20;
            console.log("map 함수 | 콜백 함수에서 매개변수 2개 받음 | 결과 : " + a + b);
            callBack(a, b);
        } else {

        }
    }
}
arr2.map(function(a, b) {
    console.log("콜백 함수 | 전달 받은 매개변수 : " + a + b); // 문자로 형변환
    console.log("콜백 함수 | 전달 받은 매개변수 : ", a + b); // 숫자 타입 유지
});


// ex)
function temp1(callBack) {
    if(callBack.length === 0) {
        callBack();
    }else if(callBack.length === 1) {
        let c = "사과";
        callBack(c);
    }else if(callBack.length === 2) {
        let c = "사과";
        let d = "딸기";
        callBack(c, d);
    }else {
        console.log("Error : 매개변수 초과 (2개까지 가능)");
    }
}

function temp2(i, v) {
    console.log("콜백 함수 |", i + "와 " + v + "를 매개변수로 받음");
}

temp1(temp2);


// 콜백 함수 만들어보기
// 1. 메소드로 만들기 (객체 안에 함수를 만들고 콜백함수 만들기)
// 2. 키 값은 원하는대로
// 3. 매개변수 3개까지 받을 수 있게
// 4. 구구단 보여줌 (매개변수 1개: 2단, 2개: 2단 3단, 3개: 2단 3단 4단)
let mymethod1 = {
    gugudan : function(callBack) {
        switch(callBack.length) {
            case 1:
                callBack(2);
                break;
            case 2:
                callBack(2);
                callBack(3);
                break;
            case 3:
                callBack(2);
                callBack(3);
                callBack(4);
                break;
            default:
                console.log("Error : 매개변수 초과 (3개까지 가능)");
                break;
        }
    }
}

function mymethod2(a, x, y) {
    for(let i = 1; i < 10; i++) {
        console.log(`${a} X ${i} = ${a*i}`)
    }
}

mymethod1.gugudan(mymethod2);




// 함수가 실행되면 stack에 쌓임
// stack: 후입 선출
// que: 선입 선출

// 콜 스택 : 스택은 데이터를 사용하기 위해서 잠시 저장 해놓는 것
//          데이터들을 쌓아놓음
//          후입 선출로 마지막에 추가된 데이터부터 제거
//          함수 실행 context: 함수를 실행하게되면 스택에 추가되고 반환될 때 스택에서 제거
//                            함수가 실행될 때마다 생성, 함수의 실행 정보를 가지고 있음
//          함수가 실행되면 실행 컨텍스트 저장하는 스택 구조
//          컴퓨터의 메모리 크기나 운영체제(OS)에 따라 크기가 다른데 콜 스택이 쌓여 크기가 초과하면 스택 오버플로우(에러) 발생
//              ex) 함수를 무한으로 실행할 때 나올 수 있음

function fun1() {
    fun2();
}

function fun2() {
    fun3();
}

function fun3() {
    console.log("fun3");
}

fun1();
// 1) 전역 실행 컨텍스트 : javaScript 코드를 전체 실행
// 2) fun1 함수 실행 구문에서 fun1 함수의 실행 컨텍스트가 생성
// 3) fun2 함수 실행 컨텍스트 생성
// 4) fun3 함수 실행 컨텍스트 생성
// 5) 마지막에 추가된 fun3 함수의 실행 컨텍스트 제거
// 6) fun2 함수 실행 컨텍스트 제거
// 7) fun1 함수 실행 컨텍스트 제거


// 콜 스택 확인 방법
// 1) 개발자모드(F12)
// 2) 디버깅 모드 활성화(ctrl + F8)
// 3) 소스 - 함수나 코드줄의 왼쪽 코드줄 번호에 브레이크 포인트 걸기
// 4) 포인트를 찍으면 코드가 실행되다가 포인트에 도달했을 때 일시정지
// 5) 재생버튼 누르면 다음 포인트가 있는 곳가지 실행되다가 일시정지
// 6) 작업의 디버깅에 써먹기



// 화살표 함수 : 화살표 모양(=>)으로 함수를 선언
// ES6에 새로 나온 함수 방식
// ES6 템플릿 리터럴

let temp3 = () => {
    console.log("화살표 함수");
}
temp3();

// 일반함수와의 차이 //

// 1) return식 없이도 값 반환 가능
/*
let temp4 = () => {
    return 5;
}
*/
let temp4 = () => 3+5;

let ab = temp4();
console.log(ab);

// 2) this 키워드 : 자바스크립트 객체를 참조하는 특별한 구문
//                  가장 큰 차이점 (중요)
//                  일반함수와 화살표함수는 this가 가르키는 대상이 다름
//                  (일반함수: 함수가 실행될 때 위치(스코프)에서 this를 가져옴(다이나믹 스코프) | 화살표함수: 함수를 선언한 위치에서 this를 가져옴(렉시컬 스코프))
let d = () => { 
    console.log(this); // 선언된 곳에서 this를 가져옴
}

let obj = {
    a : function() {
        b();
        console.log(this);
        let c = () => {
            console.log(this);
        }
        c();
        d();
    }
}
function b() {
    console.log(this); // 호출된 곳에서 this를 가져옴
}
obj.a();


// 전역 공간에서 this를 쓰면 window객체(BOM)가 뜸
// BOM(browser object model) : 브라우저의 기능에 접근할 수 있는 객체
console.log(this);






let a = "";
function temp6() {
    let b = "";
    c = "aa";   // let을 안붙이면 지역변수인데 전역이 되어버림
                // window 객체에 키값으로 추가되어서 어디서든 접근 가능해짐
                // 나중에 찾을 수가 없음
}
temp6();

console.log(window.c)
console.log(c);

console.log(c);
console.log(b); // 지역변수라 안찍힘






// 동기 함수 : 순차적으로 실행, 하나의 작업이 끝나고 다음 작업 진행
// 비동기 함수 : 다른 코드들과 동기적으로 실행되지 않음, 비순차적, 작업을 하는 도중에도 다른 작업 가능
// ex) 서버에서 값을 가져오는 동안(비동기) 페이지가 멈춰있지 않고 다른 작업들 정상적으로 진행(동기)

// 비동기 함수 //
// setTimeout : 특정 시간 뒤 특정 작업이 실행, 매개변수 (함수, 시간값을 숫자로)
setTimeout(function() {
    console.log("비동기, 2초 뒤 실행");
}, 2000);
console.log("동기");