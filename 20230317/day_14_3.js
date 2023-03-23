// 생성자 함수를 만들기
let objArr = [];

function create(_name, _age, _content) {
    this.name = _name;
    this.age = _age;
    this.content = _content;
}


// 객체 만들기 //

// 버튼 누르면 실행시킬 함수
function divBtn() {
    console.log('눌렸음');
    addArr();
    render(); // 화면 업데이트
}

function addArr() {
    // input 태그명으로 querySelectorAll 메소드 매개변수로 전달해서
    // input 태그들을 배열로 가져옴
    // 가져온 배열을 inputs 변수에 담고
    let inputs = document.querySelectorAll("input");
    console.log(inputs); // input 창에 입력한 값이 value 키에 값으로 담김
    console.log(inputs[0].value);
    console.log(inputs[1].value);
    console.log(inputs[2].value);

    // new 키워드로 빈객체를 만들고 함수에서 this로 그 객체를 참조해서
    // name 키에는 값을 _name 매개변수로 "김이름" | age 키에는 값을 _age 매개변수로 10 | content 키에는 값을 _content 매개변수로 "컨텐츠"
    // 만든 객체를 obj라는 변수에 넣어줌
    
    let obj = new create(inputs[0].value, inputs[1].value, inputs[2].value);
    objArr.push(obj); // 배열 안에 객체를 넣음
    console.log(objArr); // 객체와 배열은 레퍼런스 타입이기 때문에 값이 아니라 주소를 들고 있음
                         // 주소를 console에 찍기 때문에 주소를 보면 마지막으로 변한 값을 확인할 수 있음
}



// 무언가를 그려주는 함수
function render() {
    // 문자열 초기화
    let text = "";

    objArr.forEach(function(i) {
        // += : 원래 있는 값에 덧붙임
        text += `<li>이름: ${i.name} | 나이: ${i.age} | 내용: ${i.content}</li>`
    });

    document.querySelector('#tables').innerHTML = text;
}