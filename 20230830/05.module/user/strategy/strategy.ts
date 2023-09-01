import { UserParams } from "../interface/login.req";
import { AuthenticationResponse, Authenticator } from "./Authenticator";

// 전략 패턴 객체 구조 정의
interface IStrategy {
    // key를 문자열로 지정
    // key가 동적으로 추가될 수 있기 때문에
    [key : string] : Authenticator
}

// 서비스 로직들을 가질 객체 구조 정의
class Strategy {
    private strategy : IStrategy = {}

    // 서비스 로직을 객체에 추가하는 함수
    public set(key : string, authenticate : Authenticator) {
        // key를 받아서 서비스 로직 추가
        this.strategy[key] = authenticate;
    }

    public async login(type : string, credentials : UserParams) : Promise<AuthenticationResponse> {
        const result = await this.strategy[type].authenticate(credentials);
        return result;
    }
}

export default Strategy