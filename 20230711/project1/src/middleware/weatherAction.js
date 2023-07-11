// 요청 응답을 처리할 때 axios 사용
// npm i axios

import axios from 'axios'

const api_key = '0ae0ac07d2671f61024d0e5f3a745a3a';

function getWeather(name) {
    return async (dispatch) => {
        // API 작업 (데이터 요청)
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}`)
        // 요청에 대한 처리가 끝나면 응답
        dispatch({type : "GET_WEATHER", payload : data})
    }
}

export const weather = {getWeather}