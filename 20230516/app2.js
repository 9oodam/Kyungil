const crypto = require("crypto");

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


// 간단한 회원가입 만들어보기 (각각의 회원마다 고유의 salt 값을 부여)

// npm i express mysql2 ejs

const express = require("express");
const path = require("path");
const mysql2 = require("mysql2/promise");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : false}));

const mysql = mysql2.createPool({
    user : "root",
    password : "3102",
    host: "127.0.0.1",
    database : "test8",
    multipleStatements : true
})

// 테이블 초기화
const usersInit = async () => {
    try {
        await mysql.query("SELECT * FROM users");
    } catch (error) {
        await mysql.query("CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(128), salt VARCHAR(128))");
    }
}

app.get('/', (req, res) => {
    res.render("join");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/join', async (req, res) => {
    const {user_id, user_pw} = req.body;
    const salt = await createSalt();
    const hash = await createHash(salt, user_pw);
    await mysql.query("INSERT INTO users (user_id, user_pw, salt) VALUES(?, ?, ?)", [user_id, hash, salt]);
    res.redirect("/login");
});

app.post('/login', async (req, res) => {
    const {user_id, user_pw} = req.body;
    const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
    if(result[0]?.salt) {
        const salt = result[0].salt;
        const hash = await createHash(salt, user_pw);
        if(hash == result[0].user_pw) {
            res.send("로그인 성공");
        }else {
            res.send("비밀번호 틀림");
        }
    }else {
        res.send("유저 없음");
    }
});


app.listen(9011, () => {
    console.log("server opened");
});