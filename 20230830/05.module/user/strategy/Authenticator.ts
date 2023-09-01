import { UserParams } from "../interface/login.req"

// 응답 정보 객체의 구조 정의
export interface AuthenticationResponse {
    success : boolean
    message? : string
}

// 검증 객체 구조 정의
export interface Authenticator {
    // 로그인 검증을 할 함수 구조 선언
    authenticate(credentials : UserParams) : Promise<AuthenticationResponse>
}