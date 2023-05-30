const multer = require("multer");
const path = require("path");

// multer 함수 안에 메개변수로 객체 형태의 인자 전달
// storage 속성을 통해 업로드 된 파일을 어디에 저장할지 지정할 수 있음
exports.Upload = multer({
    storage : multer.diskStorage({ // diskStorage : 서버 컴퓨터 하드디스크에 업로드 파일을 저장
        destination : (req, file, done) => { // destination : 파일이 저장될 폴더를 설정
            // done(에러처리, 폴더의 이름)
            done(null, "uploads/")
        },
        filename : (req, file, done) => { // filename : 매개변수로 받은 file.originalname 은 클라이언트가 업로드 한 파일의 이름
            const ext = path.extname(file.originalname); // extname(파일의 경로) : 파일의 확장자를 추출 (ex. jpg, png)
            
            // 파일 저장시 이름이 동일하면 관리가 어려움
            // 겹치지 않게 시간을 이름에 포함하여 저장
            const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
            // basename(파일의 경로, 옵션) : 확장자를 추가/제거 할 수 있음

            // done(에러처리, 서버 컴퓨터에 실제로 저장할 파일명)
            done(null, filename);
        }
    }),

    // 최대 파일 사이즈 설정
    limits : {fileSize : 5 * 1024 * 1024} // 5MB
});