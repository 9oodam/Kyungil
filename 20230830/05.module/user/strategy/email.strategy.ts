import { UserParams } from "../interface/login.req";
import { AuthenticationResponse, Authenticator } from "./Authenticator";

// 이메일 로그인 로직
export class EmailAuthenticator implements Authenticator {
    async authenticate(credentials: UserParams): Promise<AuthenticationResponse> {
        console.log("email 로그인")
        console.log(credentials)
        return {success : true}
    }
}