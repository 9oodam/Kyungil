// 복호화 : 암호문을 원본으로 변경 해주는 것

// 단방향 암호화 : 복호화 불가능 == 원본 값을 알 수 없음 == 안전 (비밀번호 만들 때 사용)
// 원본 값을 알 수 없게 복잡한 알고리즘으로 암호화 함
// ex) 비밀번호 찾기를 누르면 원본을 알려주는 게 아니라 변경할 수 있게 유도

// 양방향 암호화 : 복호화 가능 == 원본으로 돌아갈 수 있음 (데이터를 안전하게 전송할 때 사용)



// crypto 모듈 사용 암호화
// nodejs 내장모듈이고 기본적인 암호화 알고리즘 기능 제공
const crypto = require("crypto");

// 임의의 비밀번호 생성
const pw = "admin1234";

// 해시 객체 생성
// 해시화 : 알고리즘을 통해 데이터를 고정된 크기의 고유한 값으로 바꿔주는 것
//let hashA = crypto.createHash("sha256");
// sha256 암호 알고리즘 : 데이터를 256bit(32byte)의 고정 크기 해시 값으로 변환해줌, 원본 데이터 길이와 상관 없음
// 64자리 16진수로 표현 (ex. 16진수 포토샵 색상 코드 암호화)
// 1 2 3 4 5 6 7 8 9 A B C D E F 10
// 10진수 -> 16진수
// 10 % 16 => 나머지를 16진수로 표현 => 몫이 0이 될 때까지 반복

// 비밀번호를 해시 객체에 넣기
//let hashing = hashA.update(pw); // 매개변수로 암호화시킬 문자열

//console.log(hashing); // 객체 확인 해보면 false 값이 있는데 아직 인코딩이 완료되지 않은 상태
/*
Hash {
    _options: undefined,
    [Symbol(kHandle)]: Hash {},
    [Symbol(kState)]: { [Symbol(kFinalized)]: false }
  }
*/

// digest() 를 사용해서 해시 값을 반환 매개변수로 반환 받을 인코딩 방식 지정
//let hashString = hashing.digest("hex"); // hex == 16진수로 변경

//console.log(hashString); // ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270

// 단점 : 똑같은 비밀번호를 해시화 하면 끝에 일정한 문자열이 나와서 유추 가능 (불안전)


// 해결방법 1) salt 값 사용해서 예측 불가능하게
// salt : 랜덤한 값을 직접 만들어서 원본의 데이터에 추가하여 암호화 시켜주는 것
// 난수 생성 메소드를 사용해서 salt 값을 만들고 .env에 넣어두기
// randomBytes(byte 길이, 콜백함수)
/*
crypto.randomBytes(32, (err, result) => {
    if(err) {
        console.log(err);
    }else {
        console.log(result.toString("hex")); // result는 버퍼객체 => 16진수로 변경
        // 할 때마다 랜덤으로 바뀜
        // 65644d592ddfc31bd01cfd982b2f1a0169ca7834b2d1fe900bcafe731ab61515
        // fc023871892f18027ea9ad2d2538fa4ff9b1fccfedcf6625a340f2b7841f7686
    }
});
*/

// 회원가입 할 때 계정마다 salt값 부여 (데이터베이스에 같이 저장) => 모든 패스워드가 고유의 salt값을 가지게 됨
const createSalt = () => {
    // 암호화에 시간이 좀 걸리기 때문에 promise 로 비동기 처리
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, result) => {
            if(err) {
                reject(err); // 실패하면 err 객체를 reject 메소드로 반환
            }else {
                resolve(result.toString("hex")); // 성공하면 result 를 16진수로 반환한 뒤 resolve 메소드로 반환
            }
        });
    });
}



// 해결방법 2) 키 스트레칭 기법 : 해시 함수를 여러 번 반복 시켜서 시간을 일부러 오래 걸리게 만드는 기법
// 해킹을 시도할 때 비밀번호들을 대입해서 해킹을 시도하는 경우 암호화 작업을 일부러 오래 걸리게 만들어서 해킹을 어렵게 함
// 무차별로 비밀번호를 대입하는 공격을 힘들게 만듦
// pbkdf2()
const createHash = (salt, password) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            password, // 해싱 할 값을 문자열로
            salt,     // salt 값
            165165,   // 키 스트레칭 반복 횟수 (많아질수록 더 복잡하게 암호화, 시간 오래걸림)
            64,       // 해시 값 64byte
            "sha256", // 해시화 알고리즘
            (err, hash) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(hash.toString("hex"));
                }
            }
        );
    });
}

const test = async() => {
    const salt = await createSalt();
    const hash = await createHash(salt, pw);
    console.log(hash);
}
test(); // a2e5aa8222a3cf6aa11a6d42ac4287265bf349ac1c84cd5a3e5614b0baceec8b4aac111d2c889f189e717509a068b9391120c70743b1dbe5d2eee97c35f87324