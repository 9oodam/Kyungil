import React from 'react'
import {Body, Header} from '../components'

const Login = ({login, setLogin}) => {
  return (
    <div>
        <Header name={'Login'}></Header>

        {/* 자바스크립트 코드를 읽는 과정에서 함수에 괄호가 있으면 함수 실행식으로 받아들여서 함수를 바로 실행시킴 (클릭 안해도 바로 실행됨)
            => 매개변수가 필요한 경우 익명함수로 감싸기
        */}
        <button onClick={() => {setLogin(!login)}}>login / logout</button>
        <br></br>
        <Body path={'/'} name={'Main'} login={login} />
    </div>
  )
}

export default Login
