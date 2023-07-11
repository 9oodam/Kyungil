import { createStore, applyMiddleware } from "redux";

// 메뉴판
import rootReducer from './reducer' // login, weather의 reducer가 들어있음

// thunk를 미들웨어로 전달
import thunk from 'redux-thunk'

// 음식점
export const store = createStore(rootReducer, applyMiddleware(thunk));