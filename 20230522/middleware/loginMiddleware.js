const jwt = require("jsonwebtoken");

exports.isLogin = (req, res, next) => {
    const {access_token} = req.session;
    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded) => {
        if(err) {
            res.send("로그인 만료");
        }else {
            // 정상이면 req에 acc_decoded 키와 값을 추가하여 전달
            req.acc_decoded = acc_decoded;
            // 토큰이 유효한 동안은 로그인 되어있는 것
            // 유저의 필요한 정보도 payload 안에 있기 때문에 복호화해서 사용 가능
            
            next(); // 다음 미들웨어 실행
        }
    });
}