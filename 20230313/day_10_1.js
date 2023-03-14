// 복습

for (let i = 0; i < 10; i++) {
    if (i % 3 == 0) {
        console.log("주말 순삭...")
    }
}


// ctrl + 스페이스바 : 자동완성


// compiler 언어와 interpreter 언어

// compiled language: 프로그램 코드를 컴파일해서 컴퓨터가 알아들을 수 있는 기계어로 번역해줌
//                    소스코드 전체를 한번에 번역하고 실행 파일을 만들어서 실행
// 특징: 파일의 크기가 크고 실행속도가 빠름
//       전체코드를 번역해서 오류를 미리 알 수 있음
//       대신 번역 과정 시간이 비교적 오래 걸림
//       C, C++, Java, Python 등등

// interpreted language: 프로그램 코드를 한 줄씩 읽으면서 번역과 실행을 동시에
// 특징: 프로그램 실행 도중에 동적으로 소스코드를 수정 가능
//       실행하는 크기가 작고 소스코드의 수정이 용이
//       디버깅하기 편함
//       소스코드가 실행될 때마다 번역과 실행을 반복하기 때문에 속도가 비교적 느림
//       오류를 실행 중에 발견할 수 있음
//       JavaScript 등등



// 논리 연산자
/*
    || : 논리합(OR)
    a || b -> a나 b 둘 중에 하나라도 참이면 참

    0 || 0 -> false
    1 || 0 -> true
    0 || 1 -> true
    1 || 1 -> true
 */
let a = true;
let b = false;
console.log(b || b);
console.log(a || b);
console.log(b || a);
console.log(a || a);

/*
    && : 논리곱(AND)
    a && b -> a와 b 둘 다 참이여야만 참

    0 || 0 -> false
    1 || 0 -> false
    0 || 1 -> fasle
    1 || 1 -> true
*/
console.log(b && b);
console.log(a && b);
console.log(b && a);
console.log(a && a);

// ex)
let text = "집에 가고싶다";
let age = 21;
if(text === "집에 가고싶다" && age === 20); {
    console.log("왜지");
}


// 삼항 연산자
// 한줄로 코드 표현 가능, 잘쓰면 편하지만 가독성이 많이 떨어질 수 있음
// depth는 2개까지만!! 3개부터 보기싫음
// 조건 ? (앞의 조건이 참일 때) : (앞의 조건이 거짓일 때)
console.log(1 == 2 ? "이건 참" : "이건 거짓");



// switch문 (조건)
/*
switch ("조건값") {
    case 1: // if부분
        break;

    case 2: // else if
        break;

    case 3: // else if
        break;

    case 4: // else if
        break;

    default: // else
        break;
}
*/
let month = 9;
let monthName = "";
switch (month) {
    case 1:
        monthName = "January";
        break; // 여기서 코드 끝!
    case 2:
        monthName = "February";
        break;
    case 3:
        monthName = "March";
        break;
    case 4:
        monthName = "April";
        break;
    case 5:
        monthName = "May";
        break;
    case 6:
        monthName = "June";
        break;
    case 7:
        monthName = "July";
        break;
    case 8:
        monthName = "August";
        break;
    case 9:
        monthName = "September";
        // break; // break문이 없으면 조건에 맞는 case로 들어가서 break가 나올 때까지 계속 밑으로 실행
    case 10:
        monthName = "October";
        break;
    case 11:
        monthName = "November";
        break;
    case 12:
        monthName = "December";
        break;

    default:
        break;
}
console.log(monthName);


switch (2) {
    case 1:
        console.log("첫 번째");
        // break;
    case 2:
        console.log("두 번째");
        // break;
    case 3:
        console.log("세 번째");
        // break;
    default:
        console.log("끝");
        break;
}


// while문 (반복) : while에 들어간 값이 true면 무한히 반복
//                  false로 값을 변경해주어야 반복문 탈출

// false값이 될 때까지 반복
let num = 1;
while(num !== 5) { // 5가 아닐 때까지
    console.log(num);
    num++;
}

// break문으로 반복 탈출
let num2 = 6;
while(true) { // 5가 아닐 때까지
    console.log(num2);
    num2++;
    if(num2 === 10) {
        break;
    }
}

/*
// 사용자가 브라우저에 값을 간단히 입력 받을 수 있는 상태창
// prompt : 간단한 입력값을 받아올 수 있음, 문자열로 받아옴
let inputNum1 = prompt("첫 번째 숫자 입력");
let inputNum2 = prompt("두 번째 숫자 입력");

// 숫자로 형태를 변환시켜주려면 형변환 함수를 사용해야 함
// 1) parseInt("정수로 변경할 변수나 값")
// 2) Number("정수로 변경할 변수나 값")

let result = parseInt(inputNum1) + Number(inputNum2);
console.log("합은:", result);
*/


// ex)
let value = prompt("숫자를 입력하시오 (1~5)");
let play = true;

while(play) {
    switch (value) {
        case "1":
            console.log("1번: 집에 가자");
            play = false;
            break;
        case "2":
            console.log("2번: 점심 먹으러 가자");
            play = false;
            break;
        case "3":
            console.log("3번: 배고프다");
            play = false;
            break;
        case "4":
            console.log("4번: 바다 가고싶다");
            play = false;
            break;
        case "5":
            console.log("5번: 졸리다");
            play = false;
            break;
        default:
            console.log("1~5 사이만 됩니다");
            value = prompt("1~5 누르라니까");
            break;
    }
}

