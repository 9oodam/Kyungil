let gameArr = ["scissors", "rock", "paper"]; // 클래스의 이름으로 사용과 동시에 결과에서도 사용할 문자열 배열
let playerBtns = document.querySelectorAll(".player-btn"); // 버튼
let playerSelect = document.querySelector(".player-select"); // 선택한 결과를 보여줄 태그

let win_lose = ""; // 승패 저장

let winCount = 0; // 이긴 횟수
let loseCount = 0; // 진 횟수

let restmoneyP = document.querySelector(".restmoneyP"); // 플레이어 소지금
let bettingP = document.querySelector(".bettingP"); // 플레이어 배팅금액
let winCntP = document.querySelector(".win-cntP"); // 플레이어 이긴 횟수
let loseCntP = document.querySelector(".lose-cntP"); // 플레이어 진 횟수

let restmoneyC = document.querySelector(".restmoneyC");
let bettingC = document.querySelector(".bettingC");
let winCntC = document.querySelector(".win-cntC");
let loseCntC = document.querySelector(".lose-cntC");

function createObj(_restmoney, _betting, _win, _lose) {
    this.restmoney = _restmoney;
    this.betting = _betting;
    this.win = _win;
    this.lose = _lose;
}

let player = new createObj(0, 3000, 0, 0);
let computer = new createObj(0, 3000, 0, 0);

function level(id) {
    this.id = id;
    choiceLevel(id);
}

// 레벨 선택
function choiceLevel(choice_num) {
    let num = choice_num;
    if(num == 1) {
        player.restmoney = 100000;
        computer.restmoney = 100000;
        console.log("난이도: 쉬움");
    }else if(num == 2) {
        player.restmoney = 50000;
        computer.restmoney = 50000;
        console.log("난이도: 어려움");
    }else if(num == 3) {
        player.restmoney = 10000;
        computer.restmoney = 10000;
        console.log("난이도: 매우어려움");
    }
    restmoneyP.innerHTML = player.restmoney;
    restmoneyC.innerHTML = computer.restmoney;
    bettingP.innerHTML = player.betting;
    bettingC.innerHTML = computer.betting;

    init();
}

// 초기화
function init() {
    gameArr.forEach(function(item, index) {
        playerBtns[index].addEventListener('click', function() {
            // player 선택한 이미지 보여주는 태그
            playerSelect.className = "player-select " + item; // player-select 클래스를 유지하면서 새로운 클래스 추가

            restmoneyP.innerHTML = player.restmoney;
            restmoneyC.innerHTML = computer.restmoney;
            bettingP.innerHTML = player.betting;
            bettingC.innerHTML = computer.betting;
            winCntP.innerHTML = winCount;
            loseCntP.innerHTML = loseCount;
            winCntC.innerHTML = loseCount;
            loseCntC.innerHTML = winCount;

            gameStart(item, player.restmoney, computer.restmoney); // 키를 구조분해 할당으로 받음
        })
    })
    console.log("init 끝");
}

function gameStart(playerSelect, restmoneyP, restmoneyC) {
    item = playerSelect;
    player.restmoney = restmoneyP;
    computer.restmoney = restmoneyC;
    console.log(player.restmoney, computer.restmoney);

    let comSelect = gameArr[Math.floor(Math.random() * gameArr.length)];
    document.querySelector(".com-select").className ="com-select " + comSelect;

    console.log(`플레이어 선택 : ${playerSelect} | 컴퓨터 선택 : ${comSelect}`);

    if(playerSelect == comSelect) {
        document.querySelector(".result").innerHTML = "무승부";
        document.querySelector(".log").innerHTML = "다시 시작하세요";
        console.log("가위바위보 무승부");  
    }else if(playerSelect == "rock" && comSelect == "scissors" ||
            playerSelect == "scissors" && comSelect == "paper" ||
            playerSelect == "paper" && comSelect == "rock") {
            document.querySelector(".result").innerHTML = "가위바위보 승리";
            document.querySelector(".log").innerHTML = "묵찌빠 진행 시작";
            win_lose = "win";
            console.log("가위바위보 승리");
            gameMCB(playerSelect);
    }else {
        document.querySelector(".result").innerHTML = "가위바위보 패배";
        document.querySelector(".log").innerHTML = "묵찌빠 진행 시작";
        win_lose = "lose";
        console.log("가위바위보 패배");
        gameMCB(playerSelect);
    }
}

function gameMCB(playerSelect) {
    while(player.restmoney > 0 && computer.restmoney > 0) {
        console.log("묵찌빠 시작");
        init();
        let comSelect = gameArr[Math.floor(Math.random() * gameArr.length)];
        document.querySelector(".com-select").className ="com-select " + comSelect;
        
        console.log(`플레이어 선택 : ${playerSelect} | 컴퓨터 선택 : ${comSelect}`);

        if(playerSelect !== comSelect) {
            mcbing(playerSelect, comSelect);
            continue;
        }else if(playerSelect == comSelect) {
            mcbend(win_lose);
            break;
        }
    }
}

function mcbing(player, computer) {
    if (player == "rock" && computer == "scissors" ||
        player == "scissors" && computer == "paper" ||
        player == "paper" && computer == "rock") {
        document.querySelector(".result").innerHTML = `Player: "${player}" | Computer: "${computer}"`;
        document.querySelector(".log").innerHTML = "묵찌빠 계속 진행";
        win_lose = "win";
        console.log("win - 묵찌빠 계속 진행");
    }
    else {
        document.querySelector(".result").innerHTML = `Player: "${player}" | Computer: "${computer}"`;
        document.querySelector(".log").innerHTML = "묵찌빠 계속 진행";
        win_lose = "lose";
        console.log("lose - 묵찌빠 계속 진행");
    }
}

function mcbend(whowin) {
    if(whowin == "win") {
        player.restmoney = player.restmoney + (player.betting * 2);
        computer.restmoney = computer.restmoney - (computer.betting * 2);
        document.querySelector(".result").innerHTML = "Player 승리!";
        console.log(player.restmoney, computer.restmoney);
    }else if(whowin == "lose") {
        player.restmoney = player.restmoney - (player.betting * 2);
        computer.restmoney = computer.restmoney + (computer.betting * 2);
        document.querySelector(".result").innerHTML = "Player 패배...";
        console.log(player.restmoney, computer.restmoney);
    }

    if(win_lose == "win") {
        winCount++;
    }else if(win_lose == "lose") {
        loseCount++;
    }
    
    if(player.restmoney <= 0 || computer.restmoney <= 0) {
        document.querySelector(".log").innerHTML = "게임 끝";

        restmoneyP.innerHTML = player.restmoney;
        restmoneyC.innerHTML = computer.restmoney;
        bettingP.innerHTML = player.betting;
        bettingC.innerHTML = computer.betting;
        winCntP.innerHTML = winCount;
        loseCntP.innerHTML = loseCount;
        winCntC.innerHTML = loseCount;
        loseCntC.innerHTML = winCount;

        console.log(player.restmoney, computer.restmoney);
    }
}



while(player.restmoney > 0 && computer.restmoney > 0) {
    console.log("가위바위보 시작");

    // playerBtns.onclick = function(index) {
    //     if(playerBtns[index] == 0) {
    //         playerSelect.className = "player-select scissors";
    //     }else if(playerBtns[index] == 1) {
    //         playerSelect.className = "player-select rock";
    //     }else if(playerBtns[index] == 2) {
    //         playerSelect.className = "player-select paper";
    //     }
    // }

    init();
    let comSelect = gameArr[Math.floor(Math.random() * gameArr.length)];
    document.querySelector(".com-select").className ="com-select " + comSelect;
    
    console.log(`플레이어 선택 : ${playerSelect} | 컴퓨터 선택 : ${comSelect}`);


    gameMCB(playerSelect);


}

