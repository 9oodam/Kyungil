// 업다운 게임

/*
    1. 플레이어 & 컴퓨터
    2. 플레이어는 선택 & 컴퓨터는 랜덤값
    3. 플레이어가 선택할 수 있는 제어문
    4. 게임의 종료시점을 정해야 함
*/

let playerSelect;
let computerSelect = parseInt(Math.random() * 99 + 1); // 1~100 랜덤숫자

let max = 50; // 플레이어가 선택이 가능한 최대의 숫자
let min = 0;   // 플레이어가 선택이 가능한 최소의 숫자

let subText = ""; // 컴퓨터가 알려줄 문구
let maxCount = parseInt(prompt("게임 몇 번 할래요?")) // 게임 횟수
let count = 0; // 지금까지 시도한 게임 횟수

while(playerSelect !== computerSelect && count < maxCount) {
    // ES6에서 문자열을 사용할 때 편하게 사용할 수 있는 기법
    // 템플릿 리터럴 : 문자를 다룰 때 줄바꿈 등을 편하게 사용 가능
    // ` : 백틱 (줄내림을 하거나 변수와 문자열을 합칠 때 사용)
    // ex) `${변수}문자열`
    // \n : 줄내림
    playerSelect = prompt(`${subText}\n숫자를 입력하세요 \n 최소: ${min} | 최대: ${max} | 남은횟수: ${maxCount-count}`);

    // 입력된 값이 숫자인지 확인
    // isNAN : 숫자가 아닌 값을 입력했는지 확인
    // playerSelect = parseInt(playerSelect);
    if(isNaN(playerSelect)) {
        subText = "문자 안됨 숫자 입력하세요"
        continue; // 게임 다시 시작 (반복문 시작점으로 돌아감)
    }

    // 최소와 최대 사이의 값인지 확인
    if(min >= playerSelect || max <= playerSelect) {
        subText = `입력값을 다시 확인하세요 최소: ${min} | 최대: ${max}`;
        continue; // 다시 입력
    }

    if(playerSelect > computerSelect) {
        max = playerSelect;
        subText = "Down↓";
    }else if(playerSelect < computerSelect) {
        min = playerSelect;
        subText = "Up↑";
    }else {
        count = count + 1;
        console.log(`${count}번 시도해서 맞춤 축하!`);
        break; // 게임 끝
    }

    // 게임 횟수 증가
    count++;
    if(count >= maxCount) {
        console.log("게임 오버 실패ㅠ");
    }
}