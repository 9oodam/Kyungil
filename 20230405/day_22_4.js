// 이터러블 / 이터레이터 : 반복이 가능한 객체
// ES6에서 추가됨

// 이터러블을 반복하는 반복문
// forEach : 배열을 순회하면서 아이템의 갯수만큼 아이템을 반복 실행
// for of : 이터러블 아이템을 반복 실행


// Symbol : 값이 겹치지 않고 선언 이후 변경 불가능
// 객체의 속성에 접근하기 위해 사용
// ES6에 추가된 원시타입

// 반복자 Symbol.iterator : 이터러블 객체를 나타내는 메소드 이름으로 사용
// 해당 객체가 이터러블이라는 뜻
// Symbol.iterator 메소드가 이터레이터 객체를 반환
// 이터레이터 : 이터러블 객체의 각 아이템에 접근하기 위한 기능
//              이터러블(반복 가능한 객체)를 순차적으로 접근할 수 있는 기능
//              next 메소드 : {value, done} 객체를 반환
//                            반복중인 아이템을 value에, done은 끝났는지를 알려줌

// 자바스크립트의 배열이나 문자열 등도 이터러블임


// 이터러블 비슷하게 구조 만들어보기
/*
const Arr = [1, 2, 3];
const objIterator = {
    index : 0,
    next : function() {
        if(this.index < Arr.length) {
            return {value : Arr[this.index++], done : false}; // 마지막 요소가 맞는지 확인
        }else {
            return {done : true}; // done 마지막 요소 끝
        }
    }
}
let result = objIterator.next();
console.log(result.value, result.done); // 1 false
result = objIterator.next();
console.log(result.value, result.done); // 2 false
result = objIterator.next();
console.log(result.value, result.done); // 3 false
result = objIterator.next();
console.log(result.value, result.done); // undefined true
*/

// 이터러블로 작성
/*
const Arr2 = [4, 5, 6];
const iter2 = Arr2[Symbol.iterator]();
    // Symbol.iterator : 객체에 속성으로 접근
    // Arr2[Symbol.iterator]() : 이터레이터 객체 반환

let result2 = iter2.next();
console.log(result2); // {value: 4, done: false}
result2 = iter2.next();
console.log(result2); // {value: 5, done: false}
result2 = iter2.next();
console.log(result2); // {value: 6, done: false}
result2 = iter2.next();
console.log(result2); // {value: undefined, done: true}
*/


// reduce : 값을 바꾸는데 편하고 적합한 함수
// ex) 이터러블 이터레이터를 따르는 이터레이터 value가 숫자라면 문자로 바꾸는 등 여러가지 방법으로 값 변경 가능
// ex) 배열이나 객체와 같으 데이터를 줄일 수 있음
// 첫 번째 매개변수 : 콜백 함수, 두 번째 매개변수 : 초기값
// 초기값을 안 넣으면 배열의 0번째 값이 들어감

const Arr3 = [1, 2, 30, 4, 5, 15, 10];

// 두 값을 더하면서 반환 시키는 기능
/*
const temp = Arr3.reduce(function(prevValue, curValue) {
    console.log("previous : ", prevValue);
    console.log("current : ", curValue);

    if(prevValue === 33) {
        return 50;
    }else {
        return prevValue + curValue; // 이 값이 prevValue에 들어감
    }
}, 0); // 초기값 0
*/

// 배열을 순회하면서 제일 큰 값을 반환 시켜주는 기능
const max = Arr3.reduce(function(prevValue, curValue) {
    console.log("previous : ", prevValue);
    console.log("current : ", curValue);
    // 비교해서 맞으면 왼쪽 틀리면 오른쪽 반환 (큰 값을 반환)
    return prevValue > curValue ? prevValue : curValue;
});
console.log(max); // 30

// 배열을 순회하면서 제일 작은 값을 반환 시켜주는 기능
const min = Arr3.reduce(function(prevValue, curValue) {
    console.log("previous : ", prevValue);
    console.log("current : ", curValue);
    // 비교해서 맞으면 왼쪽 틀리면 오른쪽 반환 (작은 값을 반환)
    return prevValue < curValue ? prevValue : curValue;
});
console.log(min); // 1

