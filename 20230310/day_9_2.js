// 빈도 최다 구문
// 개발자는 객체를 잘 사용해야 함

// if문 (비교)
if(false) {
    console.log()   // 불이 꺼져있으면 실행 될 일이 없음
}

if(true) {
    console.log()   // 불이 켜져있으면 실행 될 수 있음
}

let age1 = 10;
let age2 = 1;
if(age1 > age2) {
    console.log("age1이 나이가 더 많아")
} else if(age1 == age2) {
    console.log("age1과 age2가 같아")
} else {
    console.log("age2가 나이가 더 많아")
}

// for문 (반복)
    // 1. 변수 선언, 2. 비교, 3. for문 안에 구문 실행, 4. 값을 증가
    //              5. 비교, 6. for문 안에 구문 실행, 7. 값을 증가 ...
    //              8. 비교(false), 9. 종료
let b = 5;
for(let a = 1; a < b; a++) {
    console.log(a);
}