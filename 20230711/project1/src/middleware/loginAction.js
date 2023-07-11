function login(id, pw) {
    // 함수를 반환
    return (dispatch) => {
        // 이 부분에 데이터베이스 요청 응답 과정이 들어갈 예정 (async await)
        // 비동기 작업할 때 dispatch를 지연시키는 부분
        dispatch({type : "LOGIN", payload : {id, pw}});
    }
}

function logout() {
    return (dispatch) => {
        dispatch({type : "LOGOUT"});
    }
}


/*
    logins = {
        login : function,
        logout : function
    }
*/
export const logins = {login, logout}