import { UserParams } from "../interface/login.req";
import { AuthenticationResponse, Authenticator } from "./Authenticator";

// 검증 객체 구조 상속 받기

// 구글 로그인 로직
export class GoogleAuthenticator implements Authenticator {
    async authenticate(credentials: UserParams): Promise<AuthenticationResponse> {
        console.log("google 로그인")
        console.log(credentials)
        // 반환값의 객체는 AuthenticationResponse interface로 정의 해놓은 구조를 따름
        return {success : true}
    }
}