const {userList, userSelect, userInsert, userPwUpdate, userDelete, userRefresh} = require("../models"); // 자동으로 index.js 의 모듈 불러옴

const jwt = require("jsonwebtoken");


// 유저 정보 확인
exports.UserList = async (req, res) => {
    try {
        const data = await userList(); // 함수 실행해서 반환값 받아옴
        return data;
    } catch (error) {
        console.log(error);
    }
}

// 회원가입
exports.SignUp = async (req, res) => {
    const {user_id, user_pw} = req.body; // body 객체에 있는 인풋 밸류(form 에서 작성) 구조분해할당
    try {
        await userInsert(user_id, user_pw);
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
        console.log(data);

        if(!data?.user_id) { // data에 user_id 가 있는지 확인하고 없다면
            return res.send("아이디 없음");
        }

        if(data.user_pw !== user_pw) { // 입력한 pw와 user_pw가 동일하지 않으면
            return res.send("비밀번호 틀림");
        }

        // 여기까지 통과하면 로그인 성공
        // 1) access token 발급
        const accessToken = jwt.sign({
            user_id : data.user_id,
            mail : "user1@naver.com",
            nick : "user1"
        }, process.env.ACCESS_TOKEN_KEY, {
            expiresIn : "5s"
        });

        // 2) refresh token 발급
        const refreshToken = jwt.sign({
            user_id : data.user_id
        }, process.env.REFRESH_TOKEN_KEY, {
            expiresIn : "20s"
        });

        // 중복 로그인 방지 위해
        await userRefresh(user_id, refreshToken);
        req.session.access_token = accessToken;
        req.session.refresh_token = refreshToken;

        res.send({access : accessToken, refresh : refreshToken});

    } catch (error) {
        console.log(error);
    }
}

// 유저 토큰 검증
exports.verifyLogin = async (req, res, next) => { // next 함수를 실행시키면 동작 후 다음 미들웨어로 이동
    // 세션 값 가져오기
    const {access_token, refresh_token} = req.session;
    
    // 검증
    jwt.verify(access_token, process.env.ACCES_TOKEN_KEY, (err, acc_decoded) => {
        if(err) {
            // access token이 썩었으면 refresh token도 확인
            jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY, async (err, ref_decoded) => {
                if(err) {
                    // refresh token도 썩었으면
                    console.log("refresh token 만료");
                    res.send("refresh token 만료 | 다시 로그인 하세요");
                }else {
                    const data = await userSelect(ref_decoded.user_id); // 해석된 payload 값에 해당 user_id가 있으면
                    console.log(ref_decoded.user_id);
                    console.log(data.refresh);

                    if(data.refresh == refresh_token) { // 접속했던 사람인지 확인
                        const accessToken = jwt.sign({ // access token 재발급
                            user_id : ref_decoded.user_id,
                            mail : "user1@naver.com",
                            nick : "user1"
                        }, process.env.ACCESS_TOKEN_KEY, {
                            expiresIn : "5s"
                        });

                        req.session.access_token = accessToken;
                        console.log("access token 재발급");

                        next(); // 다음 미들웨어 실행

                    }else {
                        res.send("중복 로그인 | 다시 로그인 하세요");
                    }
                }
            });
        }else {
            // access token이 정상이면
            console.log("로그인 정상 유지 중");
            next(); // 다음 미들웨어 실행
        }
    });
}