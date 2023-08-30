# tsconfig.js

- include : 컴파일을 진행할 폴더를 지정
- exclude : 컴파일에서 제외할 폴더를 지정
- compilerOptions : 컴파일 진행시 어떤 형태로 컴파일 진행할지 속성을 정의
    - module : 모듈 시스템 지정
    - outDir : 내보낼 경로 지정
    - target : 번들링 문법 지정 (ex. es5, es6, ...)
    - esModuleInterop : import/export 문법을 자연스럽게 변경 (true/false로 지정, 웬만하면 true로)
    <br />
    commontjs 형식과 es6 형식의 혼용을 자연스럽게
    - strict : true
    - baseUrl : 모듈의 상대 경로를 지정 (ex. ./src)
    - paths : "baseUrl"에 지정된 default 경로를 기준으로 상대 위치를 가져오는 매핑 값 (경로를 변수처럼 사용)



### 순서
```sh
npm init -y
npx tsc --init
```
```json
// tsconfig.json
{
    "compilerOptions": {
        "module": "CommonJS",
        "outDir": "./dist",
        "target": "ES6",
        "esModuleInterop": true,
        "strict": true,
        "baseUrl": "./src",
        "paths": {
            "@user/*": ["user/*"]
        }
    },
    "include": ["src/**/*"],
    "exclude": ["**/*.test.ts"] // 모든 폴더에서 .test.ts 확장자가 붙은 파일은 모두 제외
}
```
```json
// package.json 추가
{
    "build": "tsc"
}
```
```sh
npm run build
```

### 문제! 컴파일 후에 @user(별칭) 이 변환되지 않고 그대로 들어가 javaScript에서 오류남
- const user_service_1 = __importDefault(require("@user/server/user.service"));
- tsc-alias 라이브러리로 별칭으로 지정했던 경로 변환
- const user_service_1 = __importDefault(require("./user/server/user.service"));
```sh
npm install -D tsc-alias
```
```json
// package.json 수정
{
    "build": "tsc && tsc-alias"
}
```