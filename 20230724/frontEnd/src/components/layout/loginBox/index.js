import React from 'react'
import {LoginBoxWrap, Box} from './Login.styled'
import { useState, useEffect } from 'react';

const LoginBox = () => {
  const [user_id1, setID1] = useState();
  const [user_pw1, setPW1] = useState();

  const [user_id2, setID2] = useState();
  const [user_pw2, setPW2] = useState();

  function trySignup() {
    console.log(user_id1, user_pw1)
    console.log("회원가입 시도")
  }

  function tryLogin() {
    console.log(user_id2, user_pw2)
    console.log("로그인 시도")
  }

  return (
    <>
      <LoginBoxWrap>
        <Box>
          <div>Signup</div>
          <label>ID</label>
          <input onChange={(e) => {setID1(e.target.value)}}></input>
          <br/><br/>
          <label>PW</label>
          <input onChange={(e) => {setPW1(e.target.value)}}></input>
          <br/><br/>
          <button onClick={trySignup}>Signup</button>
        </Box>

        <Box>
          <div>Login</div>
          <label>ID</label>
          <input onChange={(e) => {setID2(e.target.value)}}></input>
          <br/><br/>
          <label>PW</label>
          <input onChange={(e) => {setPW2(e.target.value)}}></input>
          <br/><br/>
          <button onClick={tryLogin}>Login</button>
        </Box>
      </LoginBoxWrap>
    </>
  )
}

export default LoginBox
