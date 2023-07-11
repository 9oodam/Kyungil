// login.js & weather.js 에 reducer 2개

// 리듀서 함수를 하나로 합쳐주는 함수
// redux 라이브러리에서 제공
import { combineReducers } from "redux";
import login from './login' // login.js의 reducer 함수
import weather from './weather' // weather.js의 reducer 함수

const rootReducer = combineReducers({login, weather}); // 매개변수 객체로 전달

export default rootReducer;