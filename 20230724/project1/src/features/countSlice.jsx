// reducer 내용(메뉴판) 만들어서 내보내기

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // createSlice() : create 함수를 가지고 있는 객체를 만듦
import axios from 'axios'


export const countSlice = createSlice(
    {
        name : "count", // reducer 사용할 때 이름으로 구분
        initialState : {num : 0}, // 초기값
        reducers : {
            add : (state) => { // 이전 상태가 매개변수로 들어옴
                state.num += 1
            },
            remove : (state) => {
                state.num -= 1
            }
        }
    }
)


// 날씨 api 가져오기
export const temp = createAsyncThunk("/temp", async(name) => {
    // axios
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=0ae0ac07d2671f61024d0e5f3a745a3a`)
    const {data} = response;
    console.log(data);
    return data;
})

export const countSlice2 = createSlice(
    {
        name : "count2",
        initialState : {num2 : 100, value : ""},

        // 동기적인 작업 처리
        reducers : {
            add2 : (state) => {
                state.num2 += 1
            },
            remove2 : (state) => {
                state.num2 -= 1
            }
        },

        // 비동기적인 작업 처리
        extraReducers : (builder) => { // 매개변수로 reducer 들어옴
            // 상태 케이스 등록 (ex. 로딩중, 완료, 실패)
            builder.addCase(temp.pending, (state, action) => {
                state.value = "loading..."
            })
            builder.addCase(temp.fulfilled, (state, action) => {
                state.value = "finished"
                console.log(action);
            })
            builder.addCase(temp.rejected, (state, action) => {
                state.value = "rejected"
            })
        }
    }
)




// action 함수를 내보내서 dispatch로 전달하여 액션 발생시킬 예정
export const {add, remove} = countSlice.actions; // actions 라는 키 안에 만든 함수들이 들어있음
export const {add2, remove2} = countSlice2.actions;