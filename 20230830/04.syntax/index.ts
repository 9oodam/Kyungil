// javaScript
let num1 = 20;
const str1 = 'javaScript';
const nan1 = NaN;
const infinity1 = Infinity;
const bool1 = true;
const nullValue1 = null;
const undefinedValue1 = undefined;

const obj1 = {};
const arr1 = [];

const fn1 = (a:any) => { // any : 어떤 타입이든
    console.log(a);
}
const sum1 = (a:any, b:any) => {
    return a + b;
}

const any1 = "";
const unknown1 = "";


// typeScript
let num2 : number = 20;
const str2 : string = 'typeScript';
const nan2 : number = NaN;
const infinity2 : number = Infinity;
const bool2 : boolean = true;
const nullValue2 : null = null;
const undefinedValue2 : undefined = undefined;

const obj2 : object = {};
const arr2 : Array<number> = []; // <> : 제네릭 타입 (데이터 타입을 매개변수화 시킬 수 있음)
const arr3 : Array<number | string> = [];

// 매개변수와 반환값의 타입을 지정
const fn2 = (a:number):void => { // void : 함수 실행시 반환값이 없다는 것을 의미
    console.log(a);
}
const sum2 = (a:number, b:number):number => { // number : 반환값이 숫자라는 것을 의미
    return a + b;
}

// 어떤 타입이든 할당 가능
const any2 : any = ""; // 타입의 안전성 보장 X, any는 남발하지 말자
console.log(any2.length)

const unknown2 : unknown = ""; // 타입의 안전성 보장 O
// console.log(unknown2.length) // 어떤 타입인지 모르기 때문에 length 는 위험해!
if(typeof unknown2 === 'string') {
    console.log(unknown2.length)
}

