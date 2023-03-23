// 쿠키, 세션, 로컬 스토리지

// 쿠키 : 웹사이트를 방문하면 해당 pc에 기록(간단한 데이터)이 저장되어있다가 값을 호출하여 사용 가능
//        브라우저가 종료되어도 남아있음
//        키와 값이 있음, 문자열로 저장
function createCookie(name, value, time) { // 이름, 값, 유지 시간
    // 시간, 날짜, 년도 정보 제공 객체, 생성자로 구현 가능
    let date = new Date();
    console.log(date);

    // 1시간 이후에 쿠키 제거
    let _day = 1;
    // getTime : 현재 시간
    console.log(date.getTime() + _day * 24 * 60 * 60 * 1000);
    
    // set : 변경할 때 네이밍으로 많이 사용
    // get : 정보를 호출할 때 많이 사용, 객체 만들어서 정보를 가져오는 경우 
    date.setTime(date.getTime() + _day * 24 * 60 * 60 * 1000);


    // 쿠키를 추가
    // 쿠키이름 = 값;expires 만료일;path=/
    // path=/ : 페이지 경로에 대한 설정, 쿠키를 다루는 경로
    // toUTCString : 날짜시간 표시 방법을 변경해주는 메소드
    console.log(date.toUTCString());
    document.cookie = name + "=" + value + ";expires" + date.toUTCString() + ";path=/";
}
// createCookie("팝업", "true", "");
console.log(document.cookie);



// 야매로 작성한 것
// function getCookie() {
//     let value = document.cookie.split("="); // "="제거하고 배열로 변경
//     console.log(value);
//     return value[1];
// }
// console.log(getCookie());

// 정규식
function getCookie2(name) {
    let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    console.log(value);
    return value ? value[2] : null; // value값이 있으면 인덱스 2번을 반환 없으면 null반환
}
console.log(getCookie2("팝업"));


// 쿠키 제거
function deleteCookie(name) {
    document.cookie = name +"=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
}
deleteCookie("팝업");




// 세션 : 브라우저가 동작되는 동안(종료 시점까지 유지)에 남아있는 데이터
//        ex) 로그인 상태

// 로컬 스토리지 : 브라우저에 데이터를 저장하는 방법, pc에 데이터가 저장
//                쿠키/세션과 다른점: 만료일 없음
// 브라우저 기능을 사용해야하니까 window 객체 안에 있는 메소드를 사용
// day_15_4.html & day_15_5.html 참조

// window.localStorage.setItem("user_id", "Damin") // setItem : 값을 키와 함께 저장해주는 메소드
// let a = window.localStorage.getItem("user_id"); // getItem : 값을 호출할 때 사용하는 메소드
// console.log(a);




// 쿠키, 로컬스토리지 같은 저장소에 민감한 값을 저장하면 안됨, 보안이슈