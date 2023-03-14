let playerSelect;
let computerSelect;

let count = 0;
let maxCount = 20;

let bettingmoney;
let restmoney = 20000;

win_lose = "";

let muck = "묵";
let chi = "찌";
let ba = "빠";

function rsp(player, computer) {
    switch (player) {
        case 0:
            if(computer == 1) {
                alert(`player: ${playerSelect, muck} | computer: ${computerSelect, chi} => 이김`);
                win_lose = "win";
            } else if(computer == 2) {
                alert(`player: ${playerSelect, muck} | computer: ${computerSelect, ba} => 짐`);
                win_lose = "lose";
            }
            break;
        case 1:
            if(computer == 0) {
                alert(`player: ${playerSelect, chi} | computer: ${computerSelect, muck} => 짐`);
                win_lose = "lose";
            } else if(computer == 2) {
                alert(`player: ${playerSelect, chi} | computer: ${computerSelect, ba} => 이김`);
                win_lose = "win";
            }
            break;
        case 2:
            if(computer == 0) {
                alert(`player: ${playerSelect, ba} | computer: ${computerSelect, muck} => 이김`);
                win_lose = "win";
            } else if(computer == 1) {
                alert(`player: ${playerSelect, ba} | computer: ${computerSelect, chi} => 짐`);
                win_lose = "lose";
            }
            break;
    }
}

function mcbing(player, computer) {
    if (player == 0 && computer == 1) {
        win_lose = "win";
        alert(`player: ${playerSelect, muck} | computer: ${computerSelect, chi} => 주도권: player`);
    } else if (player == 0 && computer == 2) {
        win_lose = "lose";
        alert(`player: ${playerSelect, muck} | computer: ${computerSelect, ba} => 주도권: computer`);
    } else if (player == 1 && computer == 0) {
        win_lose = "lose";
        alert(`player: ${playerSelect, chi} | computer: ${computerSelect, muck} => 주도권: computer`);
    } else if (player == 1 && computer == 2) {
        win_lose = "win";
        alert(`player: ${playerSelect, chi} | computer: ${computerSelect, ba} => 주도권: player`);
    } else if (player == 2 && computer == 0) {
        win_lose = "win";
        alert(`player: ${playerSelect, ba} | computer: ${computerSelect, muck} => 주도권: player`);
    } else if (player == 2 && computer == 1) {
        win_lose = "lose";
        alert(`player: ${playerSelect, ba} | computer: ${computerSelect, chi} => 주도권: computer`);
    }
}

function mcbend(whowin) {
    if(whowin == "win") {
        restmoney = restmoney + (bettingmoney * 2);
        alert(`묵찌빠 승리!\n ${bettingmoney * 2}원 획득!\n 한판 끝!`);
    }else if(whowin == "lose") {
        restmoney = restmoney - (bettingmoney * 2);
        alert(`묵찌빠 패배..\n ${bettingmoney * 2}원 소진...\n 한판 끝!`);
    }
}


while(count < maxCount && restmoney > 0) {
    bettingmoney = parseInt(prompt(`얼마 걸래? (최소 2,000원) | 소지금 ${restmoney} | 남은횟수 ${maxCount-count}`));
    if(bettingmoney < 2000) {
        continue;
    }

    playerSelect = parseInt(prompt(`가위바위보! \n0: 바위, 1: 가위, 2: 보`));
    if(isNaN(playerSelect)) {
        continue;
    }
    computerSelect = parseInt(Math.random() * 3);

    
    if(playerSelect == computerSelect) {
        alert(`player: ${playerSelect} | computer: ${computerSelect} => 비김`);
        continue;
    }else if(playerSelect == 0 || playerSelect == 1 || playerSelect == 2) {
        rsp(playerSelect, computerSelect);
    }else {
        alert(`0: 바위, 1: 가위, 2: 보 중에 고르시오. 다시.`);
        continue;
    }

    while(count < maxCount && restmoney > 0) {
        playerSelect = parseInt(prompt(`묵찌빠! \n0: 묵, 1: 찌, 2: 빠`));
        if(isNaN(playerSelect)) {
            continue;
        }
        computerSelect = parseInt(Math.random() * 3);

        if(playerSelect !== computerSelect) {
            mcbing(playerSelect, computerSelect);
            continue;
        }else if(playerSelect == computerSelect) {
            mcbend(win_lose);
            break;
        }
    }

    count++;

    if(count >= maxCount || restmoney <= 0) {
        console.log("게임 끝");
        console.log(`남은 소지금: ${restmoney}`);
        console.log(`시도 횟수: ${count}`);
    }

}