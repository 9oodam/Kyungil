import { UserParams } from "../interface/lotto.req";

// 응답 정보 객체의 구조 정의
export interface LottoResponse {
    success : boolean
    result : Array<number>
}

// 추첨 객체 구조 정의
export interface LottoMachine {
    // 추첨을 할 수 있는 구조 선언
    draw(input : UserParams) : Promise<LottoResponse>
}