// ES6 문법 사용해서 작성 해보기

// 화살표 함수
const test = (msg) => {
    const arr = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const arr3 = [...arr, ...arr2]; // 스프레드 연산자
    
    console.log(...arr3, msg); // 템플릿 리터럴
}

test("hihi");