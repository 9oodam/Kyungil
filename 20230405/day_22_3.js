// 즉시 실행 함수
// 한 번만 쓰고 사용하지 않을 것 같은 변수나 코드
// 변수명이나 함수명이 겹쳐서 충돌하지 않게 한 번 사용하고 버림

(function() {
    console.log("즉시 실행 함수");
    let a = 10; // 여기서만 쓰임
}());
// console.log(a); // not defined


// 즉시 실행 함수 변수에 할당
let result1 = (function() {
    return 1 + 2;
}());
console.log(result1);


// 매개변수, 인수 값 넣어보기
let result2 = (function(x, y) {
    return x + y;
}(3, 4));
console.log(result2);


function fun(b) { // 매개변수로 사용할 이름
    (function(c) {
        console.log("즉시 실행 함수");
        console.log(c);
    }(b)); // 전달할 매개변수
}
fun("매개변수");


