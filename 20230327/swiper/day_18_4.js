// 클릭의 시작 위치를 가지고 있음
// 끝나면 끝난 좌표와 비교해 어느쪽(오른쪽 or 왼쪽)으로 swipe 되었는지 확인
// 인덱스를 기준으로 움직임을 제어


let _start; // 클릭의 시작 위치 (X좌표)
let _index = 0; // 현재 진행 중인 인덱스

let _swiper = document.querySelector(".swiper");
let _swiperContent = document.querySelector(".swiper-content");
let {length} = document.querySelectorAll(".swiper-item");
console.log(length);

// getComputedStyle : 적용된 스타일의 값을 가져오는 메소드
let _swiperWidth = parseInt(getComputedStyle(_swiper).width);

let _prev = document.querySelector(".prev");
let _next = document.querySelector(".next");


// 시작점 1부터 나오도록
function start() {
    _index = 1;
    _swiperContent.style.transition = "0s";
    _swiperContent.style.left = -(_index * _swiperWidth) + "px";
}
start();

_swiper.addEventListener("mousedown", function(e) {
    console.log("swiper 클릭 시작");
    
    // 클릭했을 때 X좌표 저장
    _start = e.clientX;
    console.log(_start);
});

_swiper.addEventListener("mouseup", function(e) {
    console.log("swiper 클릭 끝");

    if(_start - e.clientX >= 50) {
        console.log(`시작 : ${_start} 끝 : ${e.clientX} => 끝 좌표가 더 작음, 오른쪽으로 이동`);
        
        if(_index < (length - 1)) {
            _index++;
            swiperMove();
            if(_index == (length - 1)) {
                setTimeout(() => {
                    swiperMoveforward();
                }, 1000);
            }
        }          
    }else if(e.clientX - _start >= 50) {
        console.log(`시작 : ${_start} 끝 : ${e.clientX} => 끝 좌표가 더 큼, 왼쪽으로 이동`);

        if(_index > 0) {
            _index--;
            swiperMove();
            if(_index == 0) {
                setTimeout(() => {
                    swiperMoveEnd();
                }, 1000);
            }
        }
    }
});

// 인덱스를 기준으로 움직임
function swiperMove() {
    _swiperContent.style.transition = "1s";
    _swiperContent.style.left = -(_index * _swiperWidth) + "px";
}
function swiperMoveforward() {
    _index = 1; 
    _swiperContent.style.transition = "0s";
    _swiperContent.style.left = -500 + "px";
}
function swiperMoveEnd() {
    _index = 5;
    _swiperContent.style.transition = "0s";
    _swiperContent.style.left = -2500 + "px";
}


_prev.addEventListener("click", function(e) {
    if(_index > 0) {
        _index--;
        swiperMove();
        if(_index == 0) {
            setTimeout(() => {
                swiperMoveEnd();
            }, 1000);
        }
    }
});

_next.addEventListener("click", function(e) {
    if(_index < (length - 1)) {
        _index++;
        swiperMove();
        if(_index == (length - 1)) {
            setTimeout(() => {
                swiperMoveforward();
            }, 1000);
        }
    }   
});