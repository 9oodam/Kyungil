let playerSelect;
let playerSelect2;
let computerSelect;
let computerSelect2;

let bettingmoney;
let restmoney = 20000;

let subText = ""; // 컴퓨터가 알려줄 문구
let maxCount = 20; // 게임 횟수 20번
let count = 0; // 지금까지 시도한 게임 횟수

let win_lose = "";


while(count < maxCount && restmoney > 0) {

    bettingmoney = parseInt(prompt(`${subText}\n얼마를 거시겠습니까? (최소 2000원) | 소지금: ${restmoney}`));
    if(bettingmoney < 2000) {
        subText = "2000원 이상 거세요. 다시."
        continue;
    }
    playerSelect = parseInt(prompt(`${subText}\n0: 바위, 1: 가위, 2: 보자기 | 소지금: ${restmoney} | 남은횟수: ${maxCount-count}`));
    computerSelect = parseInt(Math.random() * 3);

    if(playerSelect == computerSelect) {
        subText = "비겼습니다. 다시하세요."
        continue;
    } else {
        if (playerSelect == 0 && computerSelect == 1) {
            win_lose = "win";
        } else if (playerSelect == 0 && computerSelect == 2) {
            win_lose = "lose";
        } else if (playerSelect == 1 && computerSelect == 0) {
            win_lose = "lose";
        } else if (playerSelect == 1 && computerSelect == 2) {
            win_lose = "win";
        } else if (playerSelect == 2 && computerSelect == 0) {
            win_lose = "win";
        } else if (playerSelect == 2 && computerSelect == 1) {
            win_lose = "lose";
        }
        console.log("당신:", playerSelect, "컴퓨터:", computerSelect, "가위바위보:", win_lose);

        while(count < maxCount && restmoney >= 0) {
            playerSelect2 = parseInt(prompt(`0: 묵, 1: 찌, 2: 빠 | 소지금: ${restmoney} | 남은횟수: ${maxCount-count}`));
            computerSelect2 = parseInt(Math.random() * 3);

            if (playerSelect2 !== computerSelect2) {
                if (playerSelect2 == 0 && computerSelect2 == 1) {
                    win_lose = "win";
                    console.log("당신:", playerSelect2, "컴퓨터:", computerSelect2, "묵찌빠:", win_lose);
                } else if (playerSelect2 == 0 && computerSelect2 == 2) {
                    win_lose = "lose";
                    console.log("당신:", playerSelect2, "컴퓨터:", computerSelect2, "묵찌빠:", win_lose);
                } else if (playerSelect2 == 1 && computerSelect2 == 0) {
                    win_lose = "lose";
                    console.log("당신:", playerSelect2, "컴퓨터:", computerSelect2, "묵찌빠:", win_lose);
                } else if (playerSelect2 == 1 && computerSelect2 == 2) {
                    win_lose = "win";
                    console.log("당신:", playerSelect2, "컴퓨터:", computerSelect2, "묵찌빠:", win_lose);
                } else if (playerSelect2 == 2 && computerSelect2 == 0) {
                    win_lose = "win";
                    console.log("당신:", playerSelect2, "컴퓨터:", computerSelect2, "묵찌빠:", win_lose);
                } else if (playerSelect2 == 2 && computerSelect2 == 1) {
                    win_lose = "lose";
                    console.log("당신:", playerSelect2, "컴퓨터:", computerSelect2, "묵찌빠:", win_lose);
                }
                continue;
            } else {
                if (win_lose == "win") {
                    restmoney = restmoney + (bettingmoney * 2);
                    console.log(`묵찌빠 승리`);
                } else if (win_lose == "lose") {
                    restmoney = restmoney - (bettingmoney * 2);
                    console.log(`묵찌빠 패배`)
                } 
                count++;
            }
            break;
        }

        if(count >= maxCount || restmoney <= 0) {
            console.log("게임 끝");
            console.log(`남은 소지금: ${restmoney}`);
            console.log(`시도 횟수: ${count}`);
        }
    }
}