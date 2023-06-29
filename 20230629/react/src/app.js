// LoginBtn 을 가져올 것
// nodejs 에서는 require 사용
// ES6 문법에서는 import 사용

// 받을 컴포넌트가 한 개인 경우 (이름 다르게 지정해줘도 됨 LoginBtn -> Login)
import Login from './components/LoginBtn';
// 받을 컴포넌트가 여러 개인 경우
//import {LoginBtn} from './components/LoginBtn';

// 루트 요소 가상 DOM으로 생성
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Login></Login>);