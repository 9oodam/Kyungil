// DOM 트리 : 기본 단위는 노드

// 문자열로 추가하는 방법
// document.querySelector('.add_class').innerHTML = "<div>내용1</div>";


// 노드에 직접 추가하는 방법
// 1) div를 생성해서 _div 변수에 담음
let _div = document.createElement('div'); // createElement : 태그 생성해주는 메소드, 매개변수로 태그명 작성
console.log(_div); // 생성된 태그는 메모리 공간에 있음
// 2) 생성된 태그에 내용 넣기
_div.innerHTML = "<p>내용이</p><div>어딨어?</div>";
_div.classList.add("new_tag"); // 생성된 태그에 클래스도 추가
// 3) 원하는 트리 위치에 추가
document.body.append(_div); // append : 원하는 위치에 태그를 추가

setTimeout(() => {
    document.querySelector('.add_class').append(_div);
}, 10000);

// innerHTML : 편하지만 문자로 내용이 들어가서 보안이 취약함
// append : DOM 트리의 노드이기 때문에 보안에 좋음, 태그 작업을 세분화 할 수 있음


// 태그 내용 확인
console.log(_div.innerHTML); // 태그명까지 전부 보여줌
                             // <p>내용이</p><div>어딨어?</div>
console.log(_div.innerText); // 문자만 가져옴
                             // 내용이 어딨어?

// -------------------------------------------------------------------------------

// 1) button을 생성해서 _button 변수에 담음
let _button = document.createElement('button');
// 2) 생성된 태그에 내용 넣기
_button.innerHTML = "눌러봐";

// 방법1
// 이벤트 명(onclick)으로 직접 함수를 대입해서 추가하는 방법, 이벤트 덮어씌움
_button.onclick = function() { // 태그 제거하는 함수
    
    // a) remove : 본인 제거
    // _div.remove();
    // b) removeChild : 태그의 자식태그를 제거
    // document.body.removeChild(_div); // body의 내용에서 _div를 찾아서 제거
}

_button.onclick = function() {
    console.log("onclick 이벤트1");
}
console.log(_button.onclick);
_button.onclick = function() {
    console.log("onclick 이벤트2");
}
console.log(_button.onclick);

// 방법2
// addEventListner : 이벤트를 구독 시킴, 이벤트 누적, 추가 가능
// 매개변수 (구독할 이벤트 명, 실행시킬 함수)
// onclick => click | onscroll => scroll
_button.addEventListener("click", function() {
    console.log("클릭 이벤트 구독 중 1");
});
_button.addEventListener("click", function() {
    console.log("클릭 이벤트 구독 중 2");
});

// 3) 원하는 트리 위치에 추가
document.body.append(_button);



// Event 더보기 //
// load : 페이지와 기타 요소들의 그릴 준비로 로딩이 끝났을 때 실행
window.onload = function() { // on이 붙으면 attribute 방식

}
window.addEventListener('load', function() { // 이벤트 구독

});

// resize : 브라우저의 창 크기가 바뀌면 실행
window.onresize = function() {
    console.log("창 사이즈 변환");
}
window.addEventListener('resize', function() {

});

// scroll : 사용자가 태그나 페이지에서 스크롤 했을 때, 스크롤 값이 없으면 동작하지 않음
_div.onscroll = function() {
    console.log("스크롤 되는 중");
}
document.body.addEventListener('scroll', function() {

})

// 키보드 이벤트
// keydown : 키보드를 누른 순간 발생
window.onkeydown = function() {
    // console.log("키보드 누름");
}

// keyup : 키보드를 누르고 떼는 순간 발생
window.onkeyup = function() {
    // console.log("키보드 뗌");
}

// keypress : 키보드를 누르고 있을 때 계속 발생
window.onkeypress = function() {
    // console.log("키보드 누르는 중");
}

// 마우스 이벤트
// click : 해당 태그를 클릭했을 때 발생
window.onclick = function() {
    //console.log("마우스 클릭");
}

// dblclick : 더블 클릭했을 때 발생
window.ondblclick = function() {
    //console.log("마우스 더블클릭");
}

// 마우스 키를 누르고 이동 후 키를 뗐을 때 좌표로 계산해서 동작해주는 기능 만들 때
// mousedown : 마우스 누르는 순간 발생
window.onmousedown = function() {
    //console.log("마우스 키 다운"); // click보다 먼저 발생
}

// mouseup : 마우스 누르고 떼는 순간 발생
window.onmouseup = function() {
    //console.log("마우스 키 업"); // click보다 먼저 발생
}

// mousemove : 마우스가 이동되는 동안 발생
_div.onmousemove = function() {
    //console.log("마우스 이동 중");
}

// hover 처럼 사용 가능
let _box = document.querySelector('.box')
// mouseenter : 마우스를 태그에 올렸을 때 발생
_box.onmouseenter = function() {
    console.log("마우스가 올려짐");
}

// mouseleave : 마우스가 태그에서 빠져나갔을 때 발생
_box.onmouseleave = function() {
    console.log("마우스가 나감");
}


// 모바일 환경에서 실행되는 이벤트
// touchstart : 화면을 터치한 순간 발생
window.ontouchstart = function() {
    console.log("모바일 터치됨");
}

// touchend : 화면을 터치하다가 떼는 순간 발생
window.ontouchend = function() {
    console.log("모바일 터치 뗌");
}

// touchmove : 화면을 터치한 상태로 이동할 때 발생
window.ontouchmove = function() {
    console.log("모바일 터치 이동 중");
}





// 이벤트 실행될 때 매개변수로 해당 이벤트의 내용이 전달
_box.onclick = function(e) {
    console.log(e); // 이벤트가 실행되면 이벤트의 내용이 값으로 넘어옴
    console.log(e.target); // 해당 이벤트가 일어난 타겟(태그)을 가져옴
}

// 마우스 위치 가져오기
window.onmousemove = function(e) {
    // console.log(b.type); // 이벤트 타입 확인
    console.log(e.pageX + "," + e.pageY); // 마우스의 X, Y좌표 (픽셀 단위 0~브라우저 크기)
}

// 키보드 입력
window.onkeydown = function(e) {
    console.log(e.keyCode); // ascii 코드로 표현됨
    if(e.keyCod == 65) {
        console.log("A키 입력");
    }
}



// 기본동작 제거하는 방법
let _button2 = document.querySelector(".btn_class");
_button2.onclick = function(e) {
    e.preventDefault();
}