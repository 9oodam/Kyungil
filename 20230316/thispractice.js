// 기본 바인딩

var a = 10;                 // window.a = 10 과 같음
console.log(this.a);        // 10

let b = 30;
console.log(this.b);        // undefined

function something() {
    this.temp2 = "봄";
    console.log(this);      // window 객체
}

console.log(this.temp1);    // undefined
console.log(this.temp2);    // undefined

this.temp1 = "여름";

console.log(this.temp1);    // 여름
console.log(this.temp2);    // undefined

something();                // 함수실행

console.log(this.temp1);    // 여름
console.log(this.temp2);    // 봄


// 암시적 바인딩

function test() {
    console.log(this.c);
}

let obj = {
    c : 20,
    func1 : test,
    func2 : function() {
        console.log(this.c);
    }
};

obj.func1();                // 20
obj.func2();                // 20






let arr = ["사과","딸기","포도"];

let temp1 = arr.find(function(i){
    return i[0] === "포"
})
console.log(temp1);
console.log(arr.length);

// 풀어서 표현해보면 
let obj2 = {
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

let temp2 = obj2.find(function(i){
    return i[0] === "포"
})
console.log(temp2);





function cry() {
    console.log("cry");
}
function sing() {
    console.log("sing");
}
function dance() {
    console.log("dance");
}


function checkMood(mood, goodCallBack, badCallBack) {
    if(mood === "good") {
        goodCallBack();
    }else {
        badCallBack();
    }
}

checkMood("good", dance, cry);
checkMood("Not bad", dance, sing);




function test(waitingCallBack) {
    setTimeout(waitingCallBack, 2000);
    console.log("Hi");
}

test(() => {
    console.log("wait 2 seconds");
})