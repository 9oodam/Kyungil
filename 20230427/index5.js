// 우리가 window를 생략해서 작성하던 것과 같이
// window.console.log()
// console.log()
// global과 module을 생략해서 작성할수 있다~

// console.log(module.exports === exports);
// true 생략을 해도 된다.

exports.obj = {a : 1};
exports.add = () =>{
    return 2;
}
function add2(){
    console.log("난 함수임");
}
exports.add2 = add2;