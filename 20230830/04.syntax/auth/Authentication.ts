// 로그인 / 회원가입 관련된 작업
// 카카오, 네이버, 구글 인증 시스템

import {Strategy} from './tryAuth'


// 입력할 값
export interface AuthProps {
    email : string
    password : string
}

// 성공 여부, 메시지
interface AuthenticationResponse {
    success : boolean
    message? : string
}

// 검증
interface Authenticator {
    authenticate(credentials : AuthProps) : Promise<AuthenticationResponse>
}



// 이메일 로그인 로직 클래스
export class EmailAuthenticator implements Authenticator {
    async authenticate(credentials: AuthProps) : Promise<AuthenticationResponse> {
        // 로직은 아직 없음, 요청 응답 코드가 들어갈 부분
        console.log("email 로그인")
        return {success : true}
    }
}

// 카카오 로그인 로직 클래스
export class KakaoAuthenticator implements Authenticator {
    async authenticate(credentials: AuthProps) : Promise<AuthenticationResponse> {
        console.log("kakao 로그인")
        return {success : true}
    }
}

// 로그인에 대한 서비스를 처리할 구조
export interface LoginService {
    login(type : string, credentials : AuthProps) : Promise<AuthenticationResponse>
}

// 로그인 서비스 상속 받는 클래스
export class Login implements LoginService {
    constructor(private readonly strategy : Strategy) {
        // strategy 타입 추가 예정
    }
    async login(type: "email" | "kakao", credentials: AuthProps): Promise<AuthenticationResponse> {
        // strategy : 로그인 로직이 들어있는 객체
        // 어떤 로그인 로직으로 처리할지 type으로 구분
        const result  = await this.strategy[type].authenticate(credentials)
        return result
    }
}