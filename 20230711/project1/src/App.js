import './App.css';
import LoginBox from './components/layout/loginBox'

import {useDispatch, useSelector} from 'react-redux'
import {logins, weather} from './middleware' // 미들웨어

import {useEffect, useState} from 'react'


function App() {
  const dispatch = useDispatch();

  // 날씨 관련
  const [name, setName] = useState('');
  const weatherData = useSelector(state => state.weather.weatherData);

  // 로그인 관련
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const isLogin = useSelector(state => state.login.isLogin);
  const userName = useSelector(state => state.login.id);


  const login = () => {
    dispatch(logins.login(id, pw)); // 미들웨어로 가져온 action 함수 실행
  }
  const logout = () => {
    dispatch(logins.logout());
  }

  const getWeather = () => {
    dispatch(weather.getWeather(name));
  }


  useEffect(() => {
    console.log(`id : ${id} | pw : ${pw}`);
  }, [id, pw]);

  useEffect(() => {
    console.log(isLogin, userName);
  }, [isLogin, userName]);

  useEffect(() => {
    console.log(`city : ${name}`);
  }, [name]);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);


  return (
    <div className="App">
      {/* <LoginBox></LoginBox> */} <br />

      <label>CITY</label>
      <input onChange={(e) => {setName(e.target.value)}}></input>
      <button onClick={getWeather}>SEARCH</button> <br /><br />

      <div>{weatherData && weatherData.data?.name}의 날씨는 {weatherData && weatherData.data?.weather[0]?.main}</div> <br /><br />

      <label>ID</label> <br />
      <input onChange={(e) => {setId(e.target.value)}}></input> <br />
      <label>PW</label> <br />
      <input onChange={(e) => {setPw(e.target.value)}}></input> <br />
      <button onClick={login}>LOGIN</button> <br /><br />

      <div>LOGGED IN?</div>{isLogin ? <>Y ({userName}) <button onClick={logout}>LOGOUT</button></> : <>N</>}
    </div>
  );
}

export default App;


// styled component
// 장점
  // 클래스명이 겹치지 않음
  // 스타일에 관련되어서 props로 값을 전달하여 스타일 값을 적용할 수 있음
// npm i styled-components


// redux
// redux 설치
  // npm i redux
  // npm i react-redux
// 2) 저장소 구성 (스토어)


// API 가져와서 스토어의 상태값을 바꿀 때 비동기 처리를 하기 위해 미들웨어 추가해야 함 (dispatch를 지연?)
// redux-thunk : api를 요청하고 처리가 된 뒤에 상태를 업데이트하기 위해 actions라는 함수로 dispatch를 지연
// dispatch 함수를 실행할 때 객체를 넘기는지 (dispatch 상태 업데이트로 바로) or 함수를 넘기는지 (actions 함수)
// thunk는 Action Creators라는 함수를 만들어주고 이 함수는 함수를 반환함
// thunk는 단순히 dispatch를 딜레이 시켜주는 역할

// npm i redux-thunk

// OpenWeather (https://openweathermap.org/current)
// 0ae0ac07d2671f61024d0e5f3a745a3a
// https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=0ae0ac07d2671f61024d0e5f3a745a3a


// npm start : 개발할 때 사용하는 개발 환경
// npm run build : 빌드된 파일을 배포