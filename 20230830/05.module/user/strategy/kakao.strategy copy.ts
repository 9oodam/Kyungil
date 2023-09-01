import { UserParams } from "../interface/login.req";
import { AuthenticationResponse, Authenticator } from "./Authenticator";

// 검증 객체 구조 상속 받기

// 카카오 로그인 로직
export class KakaoAuthenticator implements Authenticator {
    async authenticate(credentials: UserParams): Promise<AuthenticationResponse> {
        console.log("kakao 로그인")
        console.log(credentials)
        return {success : true}
    }
}