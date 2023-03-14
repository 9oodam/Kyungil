// 함수
// 반복 사용할 코드를 묶어서 이름을 지어주고 관리
// function 함수이름() { 실행시킬 코드 }

// 원시타입 : string, number, boolean, ...
// 레퍼런스 타입 : object, array, function


// 함수 선언
function fun() {
    console.log("fun 함수 실행");
    console.log("fun 함수 실행");
    console.log("fun 함수 실행");
    console.log("fun 함수 실행");
}

// 함수 실행 (괄호 = 함수를 실행시키겠다)
fun(); // 함수를 실행시키면 stack이라는 곳에 함수 실행이 쌓이고 순서대로 실행됨




// 변수에는 전역 스코프와 지역 스코프가 있음
// 전역 스코프: 모든 곳에서 접근 가능한 범위
//              전역 스코프에 너무 많은 변수를 선언하면 관리하기 힘듦 (특히 협업할 때)
//              접근이 안된다고 너무 남발하면 안됨, 최소한만 전역으로
// 지역 스코프: 특정 영역(함수) 내에서만 접근 가능한 범위
let temp = "전역"; // 전역 변수이기 때문에 어디서나 사용 가능
function con() {
    let temp = "지역"; // 지역 변수이기 때문에 함수의 실행이 끝나면 해제
}

let temp2 = "접근 될까?";
function con2() {
    let temp3 = "접근 될까??";
    console.log(temp2);
}
//console.log(temp3); // 호이스팅 에러: 변수가 선언 되기 전에 호출했을 때 발생
                    // 변수는 항상 코드 최상단에 작성하기!
con2();




// 매개변수: 전달받은 매개변수에 따라 작업을 다르게 하고 싶을 때 사용
function fun2(apple) {
    console.log(`fun2의 매개변수 : ${apple}`);
}

function fun3(banana) {
    console.log(`fun3의 매개변수 : ${banana}`);
}

let a = 1;
let b = 2;
fun2(a);
fun3(b);
fun3(3);

// ex) 컵이라는 함수에 음료를 담음
function cup(drink) {
    console.log(`컵에 ${drink}를 담음`);
    console.log(`${drink}를 이 컵에 담아 마시니 좋다`);
}
cup("홍차");
cup("커피");
let juice = "오렌지 주스";
cup(juice);


// 거스름돈 자판기
function vending(paper, coin) {
    console.log(coin + "짜리 " + paper / coin + "개");
}
vending(1000, 500); // 1000원 넣고 500원 짜리로 거스름
vending(1000, 100);

let changes = vending; // changes라는 변수에 vending이라는 함수 값이 들어있기 때문에 함수 실행식처럼 사용 가능
//let f = vending(); // 함수 실행식을 담으면 X (return이 없기 때문에 undefined가 뜸)
console.log(changes);

changes(1000, 10);


// return : 함수 안에서 필요한 값을 내보낼 수 있게 도와주는 식
function fun4() {
    return "반환값"; // return에 도달하면 함수가 종료되면서 return값 반환
    console.log("이건 안보일거야");
}
let r = fun4();
console.log(r);



// 함수 심화
function sum(num1, num2) {
    return num1 + num2;
}
console.log(sum(1, 2));

function forfor(num) {
    for (let i = 1; i < 10; i++) {
        console.log(`${num}단 ${num} X ${i} = ${num*i}`);
    }
}
forfor(19); // 코드의 재사용성을 높임

function type(value) {
    switch (value) {
        case 1:
            return "분노조절 잘해"
        case 2:            
            return "과묵하지만 상냥해"
        case 3:      
            return "조용하지만 대범해"
    }
}
console.log(type(1));