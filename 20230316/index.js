// 오늘 콜백 함수
// 콜백 함수가 뭐지?
// 함수도 값이라했는데

// 함수의 매개변수로 함수를 전달해서
// 내가 함수에 코드작성하다가 필요한 순간에 매개변수로 받은
// 함수를 실행시킨다.
// 콜백 함수를 한번 만들어보자

function test(callBack){
    console.log("1번 작업끝");
    console.log("2번 작업끝");
    if(true){
        callBack();
    }
}

function test2() {
    console.log('나는 콜백함수야');
}

test(test2);

// 배열 매소드
let arr = [1,2,3,4];
arr.map(function(i,v){
    console.log(i);
    console.log(v);
})

// 배열 메소드 map을 좀 흉내내보자
// 우리가 만든 객체
let arr2 = {
    map : function(callBack){
        // 함수의 매개변수 갯수
        // 그 함수에 매개변수가 몇개들어가나?
        // 매개변수 안받는 함수인데 매개변수 전달하면 터짐 ㅎㅎ
        if(callBack.length == 1)
        {
            let a = 2;
            console.log("나는 map 함수야 매개변수가 한개라고 알고있어 ㅎㅎ" + a + "결과야")
            callBack(a);
        }else if(callBack.length == 2)
        {
            let a = 2;
            let b = 3;
            console.log("나는 map함수야 내가 받은 콜백함수에는 매개변수 두개를 넣는다고 전달받았어")
            callBack(a,b);
        }else{

        }
    }
}
arr2.map(function(a,b){
    console.log("나는 콜백 함수야 전달받은 매개변수는 ",a + b ,"이거야",true)
});


function temp(callBack){
    if(callBack.length === 0){
        callBack();
    }else if(callBack.length === 1){
        let temp = "사과";
        callBack(temp);
    }else if(callBack.length === 2){
        let temp = "딸기";
        let temp2 = "포도";
        callBack(temp, temp2);
    }else{
        console.log("너 매개변수 초과야 난 두개만 받을수 있어. Err임 ㅎ");
    }
}

function temp2(v,b){
    console.log("난 콜백 함수야", v + "를 받았어", b + "도 같이 받았어");
}

temp(temp2);

// 콜백 함수 한번씩 만들고 넘어가자
// function 함수명 : 일반함수
// 메소드 : 객체 안에 있는 함수
// 객체 안에다가 함수를 만들고 콜백함수를 만들면된다.
// 키값은 원하는데로 이름 지정해도 괜찮고
// 매개변수 3개 까지 받을수 있는 함수를 만드는데
// 연습겸 하나 더 전달받은 콜백함수는 구구단을 보여주는 함수다.
// 구구단 기능을 보여주는함수
// 매개변수 1개 받으면 2단을 보여주고 2개 받으면 2,3단 다보여주고
// 3개받으면 2,3,4단 다보여주면 됩니다.

// 객체를 선언하고
let obj2 = {
    gugu : function(callBack){
        switch (callBack.length) {
            case 1:
                callBack(2);
                break;
            case 2:
                callBack(2);
                callBack(3);
                break;
            case 3:
                callBack(2);
                callBack(3);
                callBack(4);
                break;
            default:
                console.log("너 매개변수 갯수 확인해")
                break;
        }
    } 
}

// 어떻게 만들어도 상관은 없지만 
// 기능단위로 함수를 만드는 습관은 가지는게 좋다.
function temp3(a,b,c) {
    for (let i = 1; i < 10; i++) {
        console.log(`${a} x ${i} = ${a * i}`)
    }
}

obj2.gugu(temp3);

// 콜백중요하니까 오늘 정리 잘해놓고 연습 공부 하셔야합니다.

// 함수가 실행되면 스택이라는 곳에 쌓인다고 했는데.

// 스택 : 후입 선출!
// 큐 : 선입 선출!

// 콜 스택 개념을 알아보자!
// 스택은 데이터를 사용하기 위해서 잠시 저장 해놓는것.
// 데이터들을 쌓아놓는다 보면 된다.
// 후입 선출 마지막에 추가된 데이터부터 제거.
// 우리가 이사를 가는데 상자에 짐을 넣어놓고 위에서부터 짐을 꺼내는 형태처럼 보면된다.
// 함수 실행 컨텍스트 함수를 실행하게되면 스택에 추가가 되고 반환될때 스택에서 제거된다.
// 함수 실행 컨텍스트 : 함수가 실행될때마다 생성된다. 함수의 실행 정보를 가지고있다.
// 콜 스택은 함수가 실행되면 실행 컨텍스트 저장하는 스택의 구조
// 콜 스택은 컴퓨터의 메모리 크기나 운영체제에 따라 크기가 다르다.
// 콜 스택이 쌓이게되서 크기가 초과하면 스택 오버플로우 에러 발생 (더이상 실행을 할수없어.)
// 예) 함수를 무한으로 실행할때 나올수있다.

// 함수를 만들어보자
function fun1(){
    fun2();
}

function fun2(){
    fun3();
}

function fun3(){
    console.log("난 3번 안녕 마지막으로 실행한 함수야.")
}

fun1();

// 자바스크립트 코드 전체를 실행하고 전역 실행 컨텍스트가 실행되고
// fun1 함수 실행 구문에서 fun1 함수의 실행 컨텍스트가 생성 -> 
// fun2 함수 실행 컨텍스트 생성 -> fun3 실행 컨텍스트 생성
// 이렇게 스택에 쌓이고
// 마지막에 추가된 fun3 함수의 실행 컨텍스트 제거 -> fun2 함수의 실행 컨텍스트 제거 ->
// fun1 함수의 실행 컨텍스트 제거
// 이렇게 제거가 된다. // 브라우저에서 확인 해보자.

// 콜 스택 확인 해보자 
// 확인하는 방법 : 브라우저 개발자 모드 열고 f12눌러서 디버깅 모드 활성화(컨트롤 + f8)
// 함수나 코드줄의 옆에 왼쪽에 코드줄 번호에 클릭하면 브레이크 포인트가 찍히는데
// 포인트를 찍으면 코드가 실행되다가 그 포인트에 도달하면 잠시 실행을 멈춘다.
// 재생버튼을 누르면 다음 포인트가 있는곳까지 실행하다가 또 멈춘다.
// 작업의 디버깅도 용이하다.

// 정리 잘해야하고

// 일반함수를 알고있어 이제 잘씁니다. 못쓰고있으면 계속 만들어보는게 중요해요
// 일상에서 코드가 보이기 시작하면 이제 개발자가 된거야.

// 화살표 함수라는게 있어.. 화살표
// function 함수명(){}
// 3기 취업을 했는데 다른친구가 취업을했고 뒤에 그친구가 들어갔는데
// 사수 없어 한글로 써도 오류는 정상 작동은 되는데 정말 예측하지못하는문제생길수있어서.
// 자바스크립트이기 때문에 한글명 쓰지마라.

// 화살표 함수
// ES6에 새로 나온 함수의 방식
// ES6 템플릿 리터럴

// 우리가 사용하던 일반함수의 모양과 다르게 생겼다.
// => 화살표 모양으로 함수를 선언한다.
// 선언 방식
let temp4 = () => console.log("나는 화살표 함수야")


// 함수 실행
temp4();

// 화살표함수는 일반함수와 차이들이 있는데
// 함수에서 값을 반환할때 return식을 사용해서 반환했는데
// return식 없이도 반환 시킬수있다.
// 함수와 똑같이 매개변수는 괄호에 넣으면 된다.
let temp5 = () => 3 + 5;

let ab = temp5();
console.log(ab);

// 연결된 개념을 좀 설명할거라 머리가 좀 아플수 있다.

// 제일 중요하고 큰 차이점 면접에서 질문으로 나올수 있다.
// this라는 개념
// this 키워드 : 자바스크립트 객체를 참조하는 특별한 구문
// 일반 함수와, 화살표 함수의 차이는 this의 차이 this가 가르키는 대상이 달라요.
// 일반 함수 this : 함수가 실행될때 위치(스코프)에서 this를 가져온다.(다이나믹 스코프)
// 화살표 함수의 this : 화살표 함수 내부의 this는 화살표 함수를 선언한 위치에서 this를 가져온다.
// (렉시컬 스코프)
let d = () =>{
    console.log(this);
}
let obj = {
    a : function(){
        //b();
        //console.log(this);
        let c = () => {
            console.log(this);
        }
        //c();
        //d();
    }
}

function b() {
    console.log(this);
}

obj.b = b; // 일반 함수
obj.d = d; // 화살표 함수
//obj.a();
obj.b(); // 일반 함수
obj.d(); // 화살표 함수
// 전역 공간에서 this를 쓰면
// window객체
// BOM(브라우저 오브젝트 모델) : 브라우저를 객체 모델로 표현한것.
// BOM은 브라우저 기능들을 접근할수있는 객체
// window객체
console.log(this);

// 비동기 함수
// 동기 함수 

// 비동기 함수는 다른 코드들과 함께 동기적으로 실행되지 않아요.
// 동기 : 순차적으로 실행된다. 작업이 끝나고 다음작업 진행 끝나고 다음작업 진행
// 비동기 : 순차적으로 실행되지 않고 작업을 하는 도중에도 다른 작업이 가능하다.
// nodejs들어갔을때 더 잡힐거예요  예) 서버에서 값을 가져오는동안 페이지가 멈춰있지 않고 다른 
// 작업들은 정상적으로 돌아간다. (서버에서 값을 가져오는 작업이 비동기)(페이지가 돌아가는게 동기)

// 비동기 함수는 뭐가 있을까
// setTimeout 비동기 함수고 매개변수를 2개 받고 첫번째 매개변수가 함수
// 두번째는 시간 값을 숫자타입으로 넘겨주면 된다.
// 1000 == 1초
// 2000 == 2초
setTimeout(function(){
    console.log("나는 2초뒤에 실행되고 나는 비동기 함수에서 실행됬어.");
}, 2000);

console.log("나는 동기임 ㅎㅎ");

// 오늘 정말 정리 잘해야해요 중요한 개념들만 모여있다.
// 지금 힘들어하는게 정상이예요 이상한게 아니예요
// 지나고보면 추억

// let var const꼭 써야한다고 했는데
// window객체

let a = "";
function temp6() {
    let b = "";
    c = "aa";
}
temp6();

// 이것도 블로그 정리
// 블로그에 잘못알고있다. var
// window 키값으로 추가된다.
// 이러면 정말 큰일나고 찾을수가 없어.
console.log(window.c)
console.log(c);

console.log(c);
console.log(b);















let arr3 = ["사과","딸기","포도"];
// 본 메소드

function temp7(){
    console.log("fdsfsd");
}

console.log(temp7);
// 선언해놓고 계속 사용할 함수가 아니여서
// 익명함수로 한번 쓸라고 값처럼
// 우리가 함수에 2나 3 이런 값을 넣는것처럼
// 메모리에 안남는 값
let temp9 = arr3.find(function(i){
    return i[0] === "포"
})
console.log(temp9);
console.log(arr3.length)
// 풀어서 표현해보면 
let obj3 = {
    value : ["사과","딸기","포도"],
    length : 3,
    find : function(callBack){
        if(callBack.length == 1){
            // length : 3
            // this.length == 3
            for (let i = 0; i < this.length; i++) {
                if(callBack(this.value[i]))
                {
                    // 반복문 돌다가 콜백함수의 반환값이 true가 나온 경우
                    // 값을 찾았다고 받아들여서 진행중인 인덱스에 해당하는
                    // 아이템을 반환한다.
                    return this.value[i];
                }
            }
        }
    }
}

let temp8 = obj3.find(function(i){
    return i[0] === "포"
})
console.log(temp8);