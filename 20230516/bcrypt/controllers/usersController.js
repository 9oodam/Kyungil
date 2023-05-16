const {userSelect, userInsert} = require("../models");
const bcrypt = require("bcrypt");

// bcrypt 모듈 사용
// 강력한 암호화를 지원하고 쉽게 사용 가능
// 반복횟수를 늘려 연산속도를 늦출 수 있기 때문에 연산능력이 증가해도 공격에 대비 할 수 있음
// 암호화 된 문자열 중에서 일부분을 salt 값으로 사용
// 보안에 집착하기로 유명한 OpenBSD에서 사용

// $2a$[cost]$[salt][hash]
// $2a$ : 사용 알고리즘 (고정)
// [cost] : 키 스트레칭 횟수, 입력한 값이 2의 ^으로 들어감 (ex. 10을 입력 => 2^10), 10을 가장 많이 사용하고 그 이상은 많이 느려짐
// [salt] : 인코딩된 salt 값, 문자열의 일부분을 satl 값으로 사용
// [hash] : 비밀번호와 salt 값을 합하고 해시해서 인코딩 된 값

const createHash = (password) => {
    return new Promise((resolve, reject) => {
        // hash() : 해시 값 만들어줌
        // hash(암호화 할 문자열, 키 스트레칭 횟수, 콜백함수)
        bcrypt.hash(password, 10, (err, data) => { 
            if(err) reject(err);
            resolve(data);
        }); 
    });
};

// 데이터베이스의 비밀번호와 입력한 값 비교
const compare = (password, hash) => {
    return new Promise((resolve, reject) => {
        // compare() : 문자열과 해시값 비교
        bcrypt.compare(password, hash, (err, same) => {
            resolve(same);
        });
    });
}

// 회원가입
exports.SignUp = async (req, res) => {
    const {user_id, user_pw} = req.body;
    try {
        const hash = await createHash(user_pw);
        console.log(hash)
        await userInsert(user_id, hash);
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
}

// 로그인
exports.LogIn = async (req, res) => {
    const {user_id, user_pw} = req.body;
    try {
        const data = await userSelect(user_id);
        if(!data?.user_id) {
            return res.send("아이디 없음");
        }
        
        const compare_pw = await compare(user_pw, data.user_pw); // true or false
        if(!compare_pw) {
                return res.send("비밀번호 틀림");
        }

        res.send("로그인 성공");

    } catch (error) {
        console.log(error);
    }
}