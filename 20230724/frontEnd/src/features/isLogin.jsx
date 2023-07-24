import {createSlice} from '@reduxjs/toolkit'

export const isLogin = createSlice(
    {
        name : "isLogin",
        initialState : {
            isLogin : false
        },
        reducers : {
            tryLogin : (state) => {
                state.isLogin = true
            },
            tryLogout : (state) => {
                state.isLogin = false
            }
        }
    }
)

export const {tryLogin, tryLogout} = isLogin.actions;