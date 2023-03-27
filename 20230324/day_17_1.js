let popupBtn = document.querySelector(".popup-btn");
let popupEvent = document.querySelector('.event-btn');
let popupCookie = getCookie("event-popup");


// 팝업창 열고 닫는 함수
function popupOpen(){
    let popup = document.querySelector('.popup-wrap');
    if(popup.classList.contains("is-on")){
        popup.classList.remove('is-on');
    }else{
        popup.classList.add('is-on');
    }
}
// <span> 누르면 닫히게
popupBtn.addEventListener("click",popupOpen);


// 클릭 버튼 누르면 쿠키 생성
popupEvent.addEventListener("click",function(){
    console.log("이벤트");

    // 하루동안 유지되는 쿠키 추가
    setCookie("event-popup",true,10);
})

// 쿠키나 로컬스토리지 둘 다 문자열로 저장
console.log(typeof getCookie("event-popup"));

// 쿠키 값이 없으면 팝업이 뜨게
if(popupCookie == undefined)
{
    popupOpen();
}

function getCookie(c_name)
{
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0;i<ARRcookies.length;i++)
   {
     x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
     y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
     x=x.replace(/^\s+|\s+$/g,"");
     if (x==c_name)
     {
       return unescape(y);
     }
   }
}

function setCookie(c_name,value,time){
    let date = new Date();
    date.setTime(date.getTime() + time * 10000);

    let str = c_name+"="+value+";expires="+date.toUTCString()+";path=/";
    let str2 = getCookieTime(str);

    // 문자열로 데이터를 저장하는데 값이 여러 개일 경우 배열 같은 객체를 사용
    // 여러가지의 값을 사용해야 하기 때문에 객체의 모양으로 문자열을 전달하고, 문자열을 받아서 객체로 변환
    console.log(getCookieTime(c_name+"="+value+";expires="+date.toUTCString()+";path=/"));
    document.cookie = c_name+"="+`{"value" : "${value}", "time" : "${str2}"}`+";expires="+date.toUTCString()+";path=/"
    let value2 = getCookie("event-popup");
    console.log(JSON.parse(value2));
}

function getCookieTime(cookie){
    // 쿠키 문자열을 받아서 배열로 변환
    let str = cookie.split(';');
    let str2 = str.find(function(i){
        let temp = i.trim();
        console.log(temp);
        return temp.startsWith('expires=');
    })
    if(str2){
        let str3 = str2.trim();
        console.log(str3);
        // 쿠키의 시간을 받아서 시간의 정보들을 다루는 
        // Date객체를 만들어줬다.
        return new Date(str3);
    }else{
        return null;
    }
}

// trim 메소드
let a = "   a   ";
console.log(a);
console.log(a.trim()); // 문자열 양 끝 공백 제거

// startsWith 메소드 : 해당 문자로 시작하는지 여부
// 매개변수 (시작하는 문자열)
let b = "abcd";
console.log(b);
console.log(b.startsWith("a")); // true
console.log(b.startsWith("d")); // false




// 시간 차이 계산하기
// time(밀리초)을 받아서 시간이 얼마나 남았는지 확인
// 지금 시간의 정보를 가지고 있는 Date 객체를 만들어서
// 미래 시간의 밀리초 - 지금 만든 Date 객체의 밀리초 = 차이 값
// 차이 값을 가지고 times() 함수로 남은 날짜, 시간, 분, 초 나타내줌

let dateTemp = 1000; // 1000당 1초

// setTimeout : 매개변수로 전달한 시간 이후에 함수 실행
setTimeout(() => {
    
}, 1000); // 1초 후에 실행


// setInterval : 매 초 마다 동작
// let date1 = new Date();
// date1.setTime(date1.getTime() + 1000000);

let setTime = setInterval(() => {
    let date2 = new Date();
    // // time에 객체가 아닌 값이 들어옴
    // let time = date1.getTime() - date2.getTime();
    // times(time);
    let timeTag = document.querySelector('.popup-time');
    if(popupCookie != undefined)
    {
        let time = JSON.parse(popupCookie).time;
        console.log(time);
        let date = new Date(time);
        console.log(popupTime(date,date2));
        timeTag.innerHTML = times(popupTime(date, date2));
    }else{
        timeTag.innerHTML = "시간끝";
    }
}, 1000); // 1초 마다 실행

function popupTime(date1,date2) {
    return date1.getTime() - date2.getTime();
}

function times(time){   
    // time = 밀리초
    let day = Math.floor(time / (24 * 60 * 60 * 1000));
    time %= (24 * 60 * 60 *1000);
    let hour = Math.floor(time / (60 * 60 * 1000));
    time %= (60 * 60 * 1000);
    let min = Math.floor(time /(60 * 1000));
    time %= (60 * 1000)
    let sec = Math.floor(time / 1000);
    
    console.log(`날짜 :  ${day} | 시간 : ${hour} | 분 : ${min} | 초 : ${sec}`);

    if(time < 0)
    {
        clearInterval(setTime); // setInterval 지우는 함수
        let timeTag = document.querySelector('.popup-time');
        timeTag.innerHTML = "";
    }
    return `${day}일 ${hour}시 ${min}분 ${sec}초`;
}