// 예외처리 try-catch문
// 코드 실행 중 예외상황이 발생해도 프로그램이 종료되지 않고 유지 가능
// 프로그램의 안전성을 높임

try {
    // 오류가 발생할 수 있는 코드
    if(5 == 5) throw "Error 발생"; // throw : 에러 메세지를 던짐
} catch (error) {
    // 오류가 발생했을 때 실행
    // 오류의 내용은 매개변수에 들어옴
    console.log(error); // Error 발생
}


function myStr() {
    let _devValue = document.querySelector(".dev").value; // input의 입력값

    try {
        if(_devValue == "") throw "empty"; // 비어있을 경우

        _devValue = Number(_devValue);
        if(isNaN(_devValue)) throw "number 아님"; // 숫자가 아닌 경우

    } catch (error) {
        document.querySelector(".message").innerHTML = error;

        console.log(typeof _devValue); // number (타입은 변함)
        console.log(_devValue); // NaN (알맹이는 그대로 문자이기 때문)
    }
}