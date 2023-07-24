import {configureStore} from '@reduxjs/toolkit'
import { isLogin } from '../features/isLogin'

export const store = configureStore(
    {
        reducer : {
            login : isLogin.reducer
        }
    }
)