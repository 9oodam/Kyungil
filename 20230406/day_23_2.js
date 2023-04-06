// 배열 메소드

// Array.of(); : 전달된 인자를 요소로 가지는 배열을 생성
const arr1 = Array.of(1, 2, 3, 4, 5, 6);
console.log(arr1); // [1, 2, 3, 4, 5, 6]


// push : 원본 배열의 값을 수정
arr1.push(10);
console.log(arr1); // [1, 2, 3, 4, 5, 6, 10]

// push 대신 배열에 추가하는 방법
// 자바스크립트에서는 정해진 사이즈가 없어서 index 에러가 따로 뜨지 않기 때문에 가능
const arr2 = ['a', 'b', 'c'];
arr2[arr2.length] = 'd';
console.log(arr2); // ['a', 'b', 'c', 'd']
arr2[arr2.length + 1] = 'f';
console.log(arr2); // ['a', 'b', 'c', 'd', empty, 'f']

// pop : 원본 배열의 마지막 요소 제거
const arr3 = [1, 2, 3, 4, 5];
console.log(arr3.pop()); // 5
console.log(arr3); // [1, 2, 3, 4]

// shift : 원본 배열의 첫 번째 요소 제거
console.log(arr3.shift()); // 1
console.log(arr3) // [2, 3, 4]

// splice : 원본 배열의 중간 값을 제거 및 추가
const arr7 = [1, 2, 3, 4];
const result2 = arr7.splice(1, 2, 20, 30); // 1번 2번 인덱스 제거, 20 30 추가
console.log(arr7); // [1, 20, 30, 4]
console.log(result2); // [2, 3]

const arr8 = [1, 2, 3, 4];
const result3 = arr8.splice(1, 2); // 1번 2번 인덱스 제거
console.log(arr8); // [1, 4]
console.log(result3); // [2, 3]

// 배열에서 특정 요소를 제거하는 함수
const arr9 = [1, 20, 3, 0, 50, 6];
function remove(arr, item) {
    const index = arr.indexOf(item); // 제거할 item의 인덱스
    if(index !== -1) { // 있으면
        arr.splice(index, 1); // 해당 인덱스에서 1개 제거
    }
    return arr;
}
remove(arr9, 0); // arr9의 0을 찾아서 제거
console.log(arr9); // [1, 20, 3, 50, 6]


// slice : 매개변수로 전달받은 범위의 아이템을 복사해서 배열을 반환, 원본 배열 X
const arr10 = [1, 5, 10];
console.log(arr10.slice(0, 2)); // [1, 5]



// concat : 원본 배열이 아닌 새로운 배열을 생성하며 값을 수정
const result1 = arr1.concat(20);
console.log(arr1); // [1, 2, 3, 4, 5, 6, 10]
console.log(result1); // [1, 2, 3, 4, 5, 6, 10, 20]

console.log(arr1 == result1); // false

// concat 사용하여 배열과 배열을 연결
const arr4 = [1, 2];
const arr5 = [3, 4];
const arr6 = arr4.concat(arr5);
console.log(arr6); // [1, 2, 3, 4]


// indexOf : 배열의 인덱스를 찾아줌
const foods = ["apple", "orange"];
if(foods.indexOf("banana") === -1) { // -1 : 없으면
    foods.push("banana");
}
console.log(foods); // ['apple', 'orange', 'banana']

// includes : 배열 안에 해당 값이 있는지 확인 (true/false), ES7에서 도입
console.log(foods.includes("banana")); // true
if(!foods.includes("banana")) {
    foods.push("banana");
}


// join : 원본 배열의 모든 요소를 문자열로 변환
const arr11 = [1, 2, 3, 4];
console.log(arr11.join()); // 1,2,3,4

// reverse : 배열을 뒤집어줌
console.log(arr11.reverse()); // [4, 3, 2, 1]

// fill : 인자로 전달 받은 값을 배열의 전체에 채워줌
//        배열의 갯수를 유지하면서 값을 초기화
const arr12 = [1, 2, 3, 4, 5];
arr12.fill(1);
console.log(arr12); // [1, 1, 1, 1, 1]

// flat : 중첩 배열을 하나의 배열로 만들어줌, 인자로 들어가는 뎁스씩 올려서 변환, 원본 배열 X
const arr13 = [1, [2, 3, 4], 5, [6, 7]];
console.log(arr13.flat()); // [1, 2, 3, 4, 5, 6, 7]

const arr14 = [1, [2, 3, [4, 5], 6], 7];
console.log(arr14.flat(2)); // [1, 2, 3, 4, 5, 6, 7] // 인자로 뎁스 크기 전달

const arr15 = [[[[[[1]]]]]].flat(Infinity); // 뎁스가 몇개든 다 꺼내줌
console.log(arr15); // [1]


/*
// (번외) 레퍼런스 타입
let a = [1, 2, 3];
let b = a; // 주소가 참조됨
b.push(10); // b를 수정해도 a가 같이 수정됨
console.log(a); // [1, 2, 3, 10]
console.log(b); // [1, 2, 3, 10]
console.log(a == b); // true (주소 같음)

let c = [4, 5, 6];
let d = [4, 5, 6]; // 값이 아닌 주소를 비교
console.log(c == d); // false (주소 다름)

let e = [7, 8, 9];
let f = [...e]; // 값만 복사해서 새로운 배열 생성
f.push(10);
console.log(e); // [7, 8, 9]
console.log(f); // [7, 8, 9, 10]
console.log(e == f); // false (주소 다름)
*/