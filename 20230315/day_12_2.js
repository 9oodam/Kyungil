let str = "가나다라마바사";

// 문자열 함수 //

// 문자열은 배열이 아니지만 인덱스로 값에 접근은 가능
console.log(str.indexOf("다")); // 2번째 인덱스

// 문자열 길이
console.log(str.length); // 7개

// slice : 문자열을 잘라줌, 매개변수는 시작점과 끝점 2개
console.log(str.slice(1, 5)); // 나다라마

// split : 매개변수로 전달한 값을 기준으로 자름, 배열의 형태로 변경
console.log(str.split("라")); // ['가나다', '마바사']
console.log(str.split(""));   // ['가', '나', '다', '라', '마', '바', '사']
console.log(str.split(" "));   // ['가나다라마바사']

// 대소문자 변경
let str2 = "abcdefg";
console.log(str2.toUpperCase()); // ABCDEFG

let str3 = "ABCDEFG";
console.log(str3.toLowerCase()); // abcdefg

