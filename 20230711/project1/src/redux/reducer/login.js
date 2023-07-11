// 초기값
let init = {
    id : "",
    pw : "",
    isLogin : false
}

// 첫 번째 매개변수 : 초기값
// 두 번째 매개변수 : 넘긴 객체
function reducer(state = init, action) {
    // reducer함수는 무조건 반환값이 있어야 함
    // 해당 반환값을 가지고 저장소에 값을 최신화 시켜줌
    // 값만 변경될 경우 알아채지 못함, 새로운 주소로 변해야 업데이트를 시켜줌

    const {type, payload} = action;
    // payload = {id : "", pw : "", isLogin : false}

    switch (type) {
        case "LOGIN":
            // 기존값에 덮어씌우기
            return {...state, id : payload.id, pw : payload.pw, isLogin : true};

        case "LOGOUT":
            return {...state, id : "", pw : "", isLogin : false};
    
        default:
            return state;
    }
}

export default reducer;