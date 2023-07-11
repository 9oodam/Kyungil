import React from 'react'
import {LoginBoxWrap, LoginBoxInput} from './Login.styled'

const LoginBox = () => {
  return (
    // LoginBoxWrap은 스타일 컴포넌트이기 때문에 일반적인 태그처럼 스타일을 줄 수 없음
    // width키의 1000px값으로 props가 넘어감
    // 동적으로 스타일 값을 주고 싶으면 해당 컴포넌트에서 props를 받아서 사용
    <div>
        <LoginBoxWrap width={'1000px'}>
            <p className='login-title'>로그인 박스</p>
            <LoginBoxInput>버튼</LoginBoxInput>
        </LoginBoxWrap>
    </div>
  )
}

export default LoginBox
