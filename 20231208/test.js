// 1) 일반 함수
// function Foo(a,b){
//   console.log(this) // window
// 	return [a,b]
// }
// const a = Foo(1, 2) // [1,2]
// console.log(a)

// 2) 생성자 함수
// function Foo(a, b){
//     console.log(this) // Foo {}
//     this.arr = [a, b]
// }   
// const a = new Foo(1, 2) 
// console.log(a) // Foo{ arr: [1,2] }

// 일반함수 생성자 함수 차이
// function a(){}
// console.dir(a) // [Function: a]

// prototype 의 constrouctor (생성자) 에 의해 new 키워드를 만나면 생성자가 실행되어
// this = { } 를 넣어주기 때문입니다. 그리고 함수끝에 this 를 return 해줍니다.
// function Person(name, age) {
//     // this = {}
//     this.name = name
//     this.age = age
//     // return this
// }
// const person = new Person('ingoo', 32)
// console.log(person) // Person { name: 'ingoo', age: 32 }


// 3) 객체 메서드로 할당
// function Foo(a,b){
//     console.log(this) // { method: [Function: Foo] }
//     return [a,b]
// }
// const bar = {
//     method: Foo,
// }
// bar.method(5, 6)

// ----------------------------------------------------------------

// bind
// function Foo(a,b){
//     console.log(this) // window
//     return [a,b]
// }

// const fooBind = Foo.bind({name:'ingoo'}) // { name: 'ingoo' }

// const a = fooBind(1, 2) 
// console.log(a); // [1,2]

// const bar = { method: fooBind }
// const b = bar.method(5, 6) // { name: 'ingoo' }
// console.log(b); // [5,6]


// call, apply
// function Foo(a,b){
//     console.log(this)
//     return [a,b]
// }

// // 두개의 차이점은 인자를 어떻게 넣어주냐 차이가있다.
// // 그리고 바로 실행시킨다.
// Foo.call({name:'call'}, 1,2 ) // { name: 'call' }
// Foo.apply({name:'apply'}, [3,4]) // { name: 'apply' }

// ----------------------------------------------------------------

// ES5 문법
// function Foo(a, b){
//     console.log(this) // new keyword를 통해 생성자 함수가 실행되면서 this = {}
//     this.arr = [a, b]
// }
// // Method Prototype 으로 할당 (생성자 존재)
// Foo.prototype.getArr = function () {
//     return this.args
// }
// const foo = new Foo(1, 2)
// console.dir(foo) // Foo { arr: [ 1, 2 ] }

// ES6 문법
// class Bar {
//     // this = {}
//     constructor(a, b){
//         console.log(this) // Bar {}
//         this.arr = [a, b]
//     }
//     getArr() { // 생성자 없음
//         return this.arr
//     }
// }
// const bar = new Bar(1, 2)
// console.dir(bar) // Bar { arr: [ 1, 2 ] }

// ES5 : 생성자 함수 존재, 반복문 돌 수 있음
// ES6 : 생성자 함수 없음, 반복문 돌 수 없음

// new foo.getArr() // {}
// new bar.getArr() // Uncaught TypeError: a.getArr is not a constructor

// for (const prop in foo) {
// 	console.log(prop) // arr getArr
// }
// for (const prop in bar) {
// 	console.log(prop) // arr
// }
// // 만약 생성자 함수중에서 메서드를 제외한 자기 자신의 속성만 출력하고싶다면
// // 작업을 더 해줘야 합니다.
// for (const prop in foo) {
//   	if(foo.hasOwnProperty(prop)) console.log(prop) // arr
// }


// ES5
// const user1 = {
//     name:'ingoo',
//     method:function() {
//         console.log(this.name)
//     }
// }
// console.dir(user1.method)

// ES6
// const user2 = {
// 	name:'web7722',
// 	method(){
// 		console.log(this.name)
// 	}
// }
// console.dir(user2.method)


// ----------------------------------------------------------------

// 일반함수 & 화살표 함수
// function foo(arg){
//     console.log(arg) // 1
// }
// console.dir(foo) // [Function: foo]
// const a = new foo(1)
// console.log(a); // foo {}

// const bar = (arg) => {
//     console.log(arg)
// }
// console.dir(bar) // [Function: bar]
// const b = new bar(2) // bar is not a constructor
// console.log(b);

// ----------------------------------------------------------------


// generator
function* generator() {
    yield 1
    yield 2
}
console.dir(generator) // [GeneratorFunction: generator]

const gen = generator()
console.log( gen.next().value ) // 1
console.log( gen.next().value ) // 2
console.log( gen.next().value ) // undefined