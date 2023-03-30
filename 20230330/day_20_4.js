// 정규 표현식(RegExp) 객체
// 문자의 패턴을 검색하기 위해, 규칙을 가진 문자열을 찾기 위해 사용

// ex) 회원가입에서 e-mail, id, 주소 같은 형식을 입력하기 위해 문자의 패턴을 정의


// 정규 표현식 선언
let reg1 = /a/; // 방법1
let reg2 = new RegExp('a'); // 방법2

// 문자열 규칙
let tempReg1 = /[3,6,9]/; // [] 내부 값 중에 한 개 -> 3 or 6 or 9
let tempReg2 = /[0-9]/;   // 0 ~ 9 까지
let tempReg3 = /[x|y]/;   // "|"" 로 분리된 문자 중 하나를 찾음


// 정규 표현식 메소드 //
// search() : 해당 문자열의 인덱스 위치를 찾는 메소드
let str = "Hello JavaScript Program...";
let regExp_search = str.search(/J/);
console.log(regExp_search); // 6

// replace() : 앞의 매개변수로 전달한 문자열을 뒤의 매개변수로 전달한 문자열로 바꿈
let regExp_replace = str.replace(/JavaScript/, 'CSS');
console.log(regExp_replace);

// test() : 정규식 패턴에 대한 문자열 검색, 일치하는 문자가 있는지 true/false 반환
let reg3 = /JavaScript/;
let reg4 = /CSS/;
console.log(reg3.test(str)); // true
console.log(reg4.test(str)); // false



// 플래그 : 검색에 대한 옵션 설정, 정규식 뒤에 붙임
let str2 = "The best program is \nJavaScript...";
console.log(str2);

// i : 대소문자 구분 없이 비교
let temp1 = /javascript/i;
console.log(str2.match(temp1)); // match() : 해당 문자열을 찾아서 배열의 형태로 반환
                                // str2를 temp1로 찾기

// g : 전체 문자열을 정규식과 비교, 첫 번째로 일치한 문자열과 비교
let temp2 = /JavaScript/g;
console.log(str2.match(temp2));

// m : 여러 줄의 문자열을 비교
let temp3 = /JavaScript/m;
console.log(str2.match(temp3));



// 플래그 여러 개 부여
let str3 = "The 123 best program is 456 JavaScript and HTML...";
let temp4 = /javascript/ig;
console.log(str3.match(temp4));

let temp5 = /[A-K]/ig;
console.log(str3.match(temp5));

let temp6 = /[m|p|t]/ig;
console.log(str3.match(temp6));



// 메타 문자 : 숫자만 or 알파벳만 or 숫자 제외 ...

// ^문자 : ^ 뒤의 문자로 시작하는 문자열을 찾음
let temp7 = /^t/ig;
console.log(str3.match(temp7));

// 문자$ : $ 앞의 문자로 끝나는 문자를 찾음
let temp8 = /.$/ig;
console.log(str3.match(temp8));

// \w    : 속하는 모든 문자를 찾음
let temp9 = /\w/ig;
console.log(str3.match(temp9));

// \W    : (알파벳 대소문자, 숫자, _문자)를 제외한 모든 문자를 찾음
let temp10 = /\W/ig;
console.log(str3.match(temp10));

// \d    : 속하는 모든 숫자를 찾음
let temp11 = /\d/ig;
console.log(str3.match(temp11));

// \D    : 숫자를 제외한 모든 문자를 찾음
let temp12 = /\D/ig;
console.log(str3.match(temp12));

// \s    : 공백 문자를 찾음
let temp13 = /\s/ig;
console.log(str3.match(temp13));

// \S    : 공백 문자를 제외한 모든 문자를 찾음
let temp14 = /\S/ig;
console.log(str3.match(temp14));