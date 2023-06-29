// ES6 문법 사용 예정
// 이전에는 require로 모듈을 가져옴
// 이제부터는 import로

class LoginBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin : false
        }
    }

    render() {
        return(
            <button onClick={() => {
                    this.setState({isLogin : !this.state.isLogin}); // 반대값으로 상태값 변경
                }
            }>
            {this.state.isLogin ? "Logout" : "Login"}
            </button>
        )
    }
}

// nodejs에서는 module exports 로 내보냄

// 지금부터는 이렇게
export default LoginBtn
// 내보낼 컴포넌트가 여러 개인 경우
// export {Login}