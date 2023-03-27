let _target = null;

document.onclick = function(e) {
    if(e.target.classList.contains("box")) {
        e.target.style.backgroundColor = "black";
        _target.classList.add("item");
        console.log(_target);

    } else if(e.target.classList.contains("item")) {
        console.log("흠");
        e.target.style.backgroundColor = "transparent";
    }
}

_button.addEventListener("click", function() {
    console.log("클릭 이벤트 구독 중 1");
});
_button.addEventListener("click", function() {
    console.log("클릭 이벤트 구독 중 2");
});



// ondragstart : 드래그가 시작될 때
document.ondragstart = function(e) {
    if(e.target.classList.contains("item")) { // 드래그 한 e.target에 item 클래스가 있으면
        console.log(e.target);
        _target = e.target; // 드래그 할 태그를 전역공간에 담기

        console.log(e.target.style);
        e.target.style.backgroundColor = "red"; // 태그의 스타일 값을 추가
                                                // 하이픈(-) 대신 카멜 표기법 사용
    }
}
// ondragend : 드래그가 끝났을 때
document.ondragend = function(e) {
    _taget = null;
    if(e.target.classList.contains("item")) {
        e.target.style.backgroundColor = "rgb(248, 248, 152)";
    }
}
// ondragenter : 드래그 하고 위에 올려졌을 때
document.ondragenter = function(e) {
    if(e.target.classList.contains("box") && _target !== null) { // 드래그 한 e.target에 box 클래스가 있고 _target이 비어있지 않을 때
        e.target.style.backgroundColor = "rgb(248, 248, 152)";
    }
}
// ondragleave : 드래그 하고 빠져나올 때
document.ondragleave = function(e) {
    if(e.target.classList.contains("box") && _target !== null) {
        e.target.style.backgroundColor = "transparent"; // 투명
    }
}
// ondragover : 드롭 가능 여부 설정
document.ondragover = function(e) {
    if(e.target.classList.contains("box") && _target !== null) {
        e.preventDefault(); // preventDefault : 브라우저 기본 동작(ex. 새로고침)을 제거 하는 메소드
    }
}

// ondrop : 드래그를 하다가 마우스 키를 떼면 드롭
document.ondrop = function(e) {
    if(e.target.classList.contains("box") && _target !== null) {
        e.target.style.backgroundColor = "transparent";
        e.target.append(_target);
    }
}