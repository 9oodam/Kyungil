// 팝업 여는 함수
function openPopup() {
    let popup = document.querySelector('.popup-wrap');
    console.log(popup);
    
    // classList(배열 형태로) : 메소드 사용, 더 편리함
    popup.classList.add('is-active');

    // 메소드 사용 조건 추가
    if(popup.classList.contains("is-active")) { // 클래스가 있으면 제거
        popup.classList.remove("is-active");
    }else { // 클래스가 없으면 추가
        popup.classList.add("is-active");
    }


    // className(문자열로) : 문자열 그대로 대입, 누를 때마다 문자가 더해짐
    // popup.className = popup.className + " is-active"; // 띄어쓰기로 클래스 2개 가짐
   
    /*
    let strArr = popup.className.split(" ");
    console.log(strArr);
    if(strArr.indexOf("is-active") != -1) { // 클래스가 있으면
    
    }else {
        popup.className = popup.className + " is-active"; // 클래스가 없으면
    } 
    */

}

