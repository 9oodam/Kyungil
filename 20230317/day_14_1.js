// 생성자 함수 : 객체를 생성할 때 사용하는 함수

// 생성자 함수
function createObj(_name, _atk, _def, _speed) {
    this.name = _name; // 매개변수로 받은 _name을 this.name 변수에 저장
    this.atk = _atk;
    this.def = _def;
    this.speed = _speed;
}

// 객체 생성하는 방법
// new : 동적할당(새로운 객체를 생성하기 위한 메모리 공간을 동적으로 사용할 수 있게 해줌)
//       new 키워드를 사용하면 빈 객체를 만들어주고 생성자 함수를 실행시켜서
//       this(빈 객체)에 키값을 추가하고 새로운 객체를 만들어줌

// 하나의 객체를 사람이라 표현했을 때 정보를 키와 값으로 담는다 (오브젝트화)
// 전역변수만으로 프로그램을 관리하기에는 너무 힘들기 때문에 오브젝트화 시킴

let obj1 = new createObj("고블린", 100, 100, 10);
console.log(obj1);

let obj2 = new createObj("트롤", 200, 100, 10);
console.log(obj2);

// 객체의 값에 접근하는 방법
console.log(obj1.name);
console.log(obj1["name"]);


// 전역변수로 만들었을 때 (관리하기 힘듦)
/*
let obj1_name = "고블린";
let obj1_atk = 100;
let obj1_def = 100;
*/




let arr1 = [1, 2, 3, 4];
arr1.forEach((i) => {
    console.log(i);
});

for (let i = 0; i < arr1.length; i++) {
    console.log(arr1[i])
}

// for in
// 자동완성 했을 때 object에 순회하고 싶은 객체 이름 넣기]

for (const key in obj1) {
    // 키 값이 key 변수에 순서대로 담김
    console.log(key);
    
    // console.log(obj1);       // key 개수만큼 전체가 다 뜸
    console.log(obj1[key]);     // 이렇게 작성하기
    // console.log(obj1.key);   // 이렇게 쓰면 X
}






// BOM 브라우저 객체 모델 : 브라우저의 기능들을 객체로 사용할 수 있게 해준 것
console.log(window);

// onload 메소드 : 브라우저의 랜딩이 끝나고 보여줄 준비가 되었을 때 실행되는 함수
// window.onload라는 키 값에 함수 값을 전달
window.onload = function() {
    console.log("랜더링 끝");
}


// DOM 문서 객체 모델 : 문서를 객체의 모양으로 만든 것, 문서의 접근을 가능하게 함
//                     페이지에 있는 태그들을 객체로 표현한 것

// document : 객체를 이용해 찾고 싶은 태그를 javaScript로 가져와서 사용 가능
console.log(document);


// 태그 선택자 //

// ID 찾기
// getElementById 메소드로 태그의 아이디를 찾아서 태그를 가져올 수 있음
let div1_1 = document.getElementById("div1");
// id값이 있는 태그는 그냥 변수처럼 사용 가능
let div1_2 = div1;
// 제일 많이 씀!!! 만능
let div1_3 = document.querySelector('#div1');

console.log(div1_1);
console.log(div1_2);
console.log(div1_3);

// CLASS 찾기
// class값이 있는 태그는 변수처럼 사용 안됨, 중복 가능하기 때문
// console.log(div2); // not defined
// querySelector는 문서를 읽다가 처음으로 발견한 태그 하나만 가져옴
let div2_1 = document.querySelector('.div2');
// querySelectorAll : 해당하는 전체 태그를 배열의 형태로 가져옴
let div2Arr = document.querySelectorAll('.div2');

console.log(div2_1);
console.log(div2Arr);
console.log(div2Arr[2]);

// 태그 이름 선택자
let div3 = document.querySelector('div');
console.log(div3);




// 텍스트를 태그에 넣어보기 //
div1.innerHTML = "<ul><li>리스트</li></ul>";
console.log(div1.innerHTML);

let div2_2 = document.querySelector('.div2');
div2_2.innerHTML = "div2 태그 중 첫 번째";

div2Arr[3].innerHTML = "div2 태그 중 네 번째";


// 버튼에 기능 넣어보기 //
// 버튼을 누르면 함수를 실행
function btnFn() {
    // div2 클래스를 가지고 있는 태그들을 div2Arr2 변수에 배열로 담고
    let div2Arr2 = document.querySelectorAll('.div2');
    // 그 배열을 forEach로 순회하면서 아이템을 매개변수로 받음
    div2Arr2.forEach(function(i) {
        i.innerHTML = "버튼 눌림";
    })
}