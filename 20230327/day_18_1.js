// ES5 문법에서 배열의 값을 호출해 변수에 담거나 사용할 때
let one;
let two;

let arr = [1, 2, 3, 4, 5];

one = arr[0]; // 인덱스를 사용해 값을 하나씩 할당
two = arr[1];
console.log(one, two);



// ES6 문법에서 구조분해 할당 도입
// 배열이나 객체의 값을 구조분해 하여 순서대로 할당
// 코드 작성시 시간 절약, 길이 축소 가능


// 배열 //

// 방법1
// let arr2 = [1, 2, 3];
// let [oneone, twotwo, three, empty] = arr2; // 가져올 값이 없으면 undefined
// console.log(oneone, twotwo, three, empty); // 1 2 3 undefined

// // 방법2
// let [a, b] = [1, 2];
// console.log(a, b); // 1 2

// // 방법2-1
// let [c, d] = [1]; // 앞에서부터 순서대로 할당, 가져올 값이 없으면 undefined
// console.log(c, d); // 1 undefined

// // 방법2-2
// let [e, f] = [1, 2, 3]; // 앞에서부터 순서대로 할당, 초과되는 값은 할당 안됨
// console.log(e, f); // 1 2

// // 방법 2-3
// let [a, b, c=1] = [1, 2]; // 디폴트 값 추가 가능
// console.log(a, b, c); // 1 2 1

// let [a, b, c=1] = [1, 2, 3];
// console.log(a, b, c); // 1 2 3


// 객체 //
// 객체의 각 키를 뽑아서 값을 변수에 할당

// 방법1
let name1 = {firstName : "Damin", lastName : "Koo"};
// let name2 = name1.firstName;
// let name3 = name1.lastName;
// console.log(name2, name3); // Damin Koo

// 방법2
// 순서X
// 키를 기준으로 구조분해 할당이 이루어지기 때문에 키 순서가 바껴도 상관없음
// let {lastName, firstName} = name1;
// console.log(firstName, lastName); // Damin Koo

// 방법3
let name4 = {firstName = "Damin", lastName} = {firstName : "Damdam", lastName : "Koo"}; // 디폴트 값 추가 가능
console.log(firstName, lastName); // Damdam Koo



// 문자열을 담은 변수에서
let str = "abcdefg";
// 문자열 길이 구하기를 구조분해 할당으로 변수에 할당
let {length} = str; // str.length
console.log(length); // 7



// 작업할 때 객체화 시켜서 작업을 하다가 객체 안에 필요한 값만 호출해서 사용
let list1 = [{id : 11, content: "blahblah", isActive : true},
            {id : 22, content: "blahblah", isActive : true},
            {id : 33, content: "blahblah", isActive : true},
            {id : 44, content: "blahblah", isActive : true}];
// id 값만 뽑아오기
list1.forEach(function(i) {
    let {id, content} = i; // list1 객체에서 원하는 키의 값만 구조분해 할당으로 가져옴
    console.log(id, content);
});


let user = {
    name : "Damin",
    address : {
        city : "Seoul",
        country : "Korea"
    }
}
// city 값만 뽑아오기
let {address : {city}} = user;
console.log(city); // Seoul




// 스프레드 연산자
// 본 객체를 변경하지 않고 새로운 객체를 생성
let temp1 = [1, 2, 3];
let temp2 = [4, 5, 6, 7];

let temp3 = [...temp1, ...temp2]; // 값만 참조하여 새로운 객체 생성 (주소 참조 X)
console.log(temp3); // [1, 2, 3, 4, 5, 6, 7]



let obj1 = {
    a : 1,
    b : 2
}
let obj2 = {
    a : 3,
    b : 4,
    c : 5
}

let obj3 = {...obj1, ...obj2}; // 키 값이 동일한 경우 뒤에 걸로 덮어씌워짐
console.log(obj3); // {a : 3, b : 4, c : 5}

let obj4 = {...obj2, ...obj1};
console.log(obj4); // {a : 1, b : 2, c : 5}