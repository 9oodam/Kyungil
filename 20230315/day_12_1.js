// 배열 심화
// 배열 : 인덱스의 순서로 해당 값에 접근할 수 있음, 리스트 형태, 레퍼런스 타입
//        인덱스는 0부터 시작

// C, C++, C## 등 : list타입
//                  ex) int a[0][1];
// javaScript : Array타입
//              사용자가 편하게 접근하기 위해서 조금 허술한 부분이 있음
//              배열 = 객체
//              javaScript의 배열 안의 배열은 객체 배열이다 (이중배열)
//              대부분 이중배열까지만 사용 (그 이상은 X)
let a = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
console.log(a[0]);      // [0, 1, 2]
console.log(a[0][0]);   // [0]
console.log(a[1]);      // [3, 4, 5]
console.log(a[1][1]);   // [4]
console.log(a[2][0]);   // [6]

console.log(a.length);  // 3개
                        // 0 ~ (배열의 길이 - 1)


let b = [0, 1, 2, 3, 4, 5, 6]
b.push(7);  // push : 배열 타입의 method(함수)
b.push(8);

for (let i = 0; i < b.length; i++) {
    console.log(b[i]);
}


// 객체 (키 + 값)
const obj = { // const : 한 번 선언하면 값을 바꿀 수 없음, 재선언 X
    a : "객체",
    push : function(num) { // 익명함수
        console.log("object 객체 안에 push라는 키값에 있는 함수");
        console.log(num + "를 매개변수로 받음");
    }
}
console.log(obj.a);
obj.push(2);


// 배열 함수 //
// indexOf : 배열의 값을 찾아서 인덱스 위치를 리턴
let c = [0, 10, 20, 30, 40];
let returned = c.indexOf(40); // 인덱스 4번에 위치
console.log(returned);

let d = ["사과", "딸기", "포도", "딸기", "딸기"];
let returned2 = d.indexOf("딸기"); // 인덱스 1번에 위치
console.log(returned2);


// find : 검색, 매개변수로 함수를 전달 받음
let returned3 = d.find(function(item){
    // 배열의 값이 item 매개변수에 순서대로 들어옴
    console.log("item : " + item);
    // return의 값이 true가 반환되면 find 함수에서 해당 item을 반환해줌
    return item === "딸기";
    // true가 나온 첫 번째 값을 반환
    // 값을 내보내면 함수 종료
});
console.log(returned3);


// findIndex : 해당 배열을 반복시키면서 값을 찾고 그 값의 인덱스를 반환
let returned4 = d.findIndex(function(item) {
    return item === "딸기"; // 인덱스 1번에 위치
});
console.log(returned4);


// filter : 원하는 값을 모두 찾아서 반환 (ex. 검색창 알고리즘)
let e = ["이사과", "김딸기", "이포도"];
let returned5 = e.filter(function(item) {
    return item[1] === "딸";
});
console.log(returned5);

// 문자열도 인덱스로 접근 가능
let str = "가나다";
console.log(str[1]);

// 다른 방법
function filterItems(query) {
    return e.filter(function(item) {
        return item.indexOf(query) > -1
    })
}
console.log(filterItems('사'));


// map : 반환 값(true or false)을 배열의 형태로 리턴
let return6 = e.map(function(item) {
    console.log(item);
    return item[0] === "이"; // [true, false, true]
});
console.log(return6);


// forEach : 해당 배열의 길이만큼 반복해서 값을 순차적으로 반환 (for문 돌리는 것처럼)
e.forEach(function(item) {
    console.log(item);
});


// join : 배열을 문자열로 변경시켜줌, 매개변수로 전달한 문자열로 값을 구분
console.log(e.join(" : "));


// 함수 //
// split : 문자열을 배열로 변경
let str2 = e.join(", ");
console.log(str2);
console.log(str2.split(", "));