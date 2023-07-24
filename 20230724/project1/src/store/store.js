import { configureStore } from '@reduxjs/toolkit' // configureStore() : 저장소를 만들어주는 함수
import { countSlice, countSlice2 } from '../features/countSlice'

// 저장소 생성
export const store = configureStore(
    {
        reducer : {
            // 메뉴판 전달
            count : countSlice.reducer,
            count2 : countSlice2.reducer
        },
        // middleware : 미들웨어로 사용할 함수
    }
)