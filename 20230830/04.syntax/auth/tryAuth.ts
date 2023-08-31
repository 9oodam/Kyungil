import {AuthProps, EmailAuthenticator, KakaoAuthenticator, LoginService, Login} from './Authentication'

interface IEmailSender {
    sendEmail(email : string) : void
}
class EmailSender implements IEmailSender {
    sendEmail(email: string): void {
        
    }
}


export interface Strategy {
    email : EmailAuthenticator
    kakao : KakaoAuthenticator
}


class Auth {
    constructor(
        private readonly authProps : AuthProps,
        private readonly emailSender : EmailSender,
        private readonly loginService : LoginService
    ) {
        
    }

    // 타입과 전달받은 props로 로그인
    public async login() {
        console.log(this);
        await this.loginService.login("kakao", this.authProps) // 타입은 원하는대로 바꿔주면 됨 (email or kakao)
    }

    // 이메일 인증 처리
    public register() : void {
        this.emailSender.sendEmail(this.authProps.email)
    }
}


// 유저의 email, password 임시 객체
const authProps : AuthProps = {email : "godamcity98@gmail.com", password : "1234"}
const _emailSender = new EmailSender();

// 이메일 로그인 로직 클래스 동적 할당
const _email = new EmailAuthenticator(); 
// 카카오 로그인 로직 클래스 동적 할당
const _kakao = new KakaoAuthenticator();

// 로그인 서비스 로직을 가지고 있는 객체
const _strategy : Strategy = {
    email : _email,
    kakao : _kakao
}

// 로그인 클래스 동적 할당
const _loginService = new Login(_strategy);
const auth = new Auth(authProps, _emailSender, _loginService);
auth.login();