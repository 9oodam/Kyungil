import { UserParams } from './interface/login.req'
import UserService from './service/user.service'

// 사용자 서비스 로직 클래스 정의
class UserController {
    constructor(private readonly userService : UserService) {

    }

    // 경로가 /login/:type 일 경우 요청이 들어왔을 때 실행할 함수
    signin(type : string) {
        // req.body 에서 유저의 정보 받아옴
        // 여기서는 req.body 값이 없기 때문에 임시 객체 만듦
        const loginParams : UserParams = {
            email : 'koo@mgmail.com',
            password : '1234'
        }

        
        this.userService.login(type, loginParams);
    }

    // 경로가 /signup 일 경우
    signup() {
        // 회원가입 로직
    }
}

export default UserController