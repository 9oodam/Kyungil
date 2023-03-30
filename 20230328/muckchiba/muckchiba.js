let gameArr = ["scissors", "rock", "paper"]; // 클래스의 이름으로 사용과 동시에 결과에서도 사용할 문자열 배열
let gameArr2 = ["chi", "muck", "ba"]; // 클래스의 이름으로 사용과 동시에 결과에서도 사용할 문자열 배열
let playerBtns = document.querySelectorAll(".player-btn"); // 버튼
let playerBtns2 = document.querySelectorAll(".player-btn2"); // 버튼
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

let player = new createObj(0, 0, 0, 0);
let computer = new createObj(0, 0, 0, 0);

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
}

// 초기화
function init() {
    gameArr.forEach(function(item, index) {
        playerBtns[index].addEventListener('click', function() {
            // player 선택한 이미지 보여주는 태그
            playerSelect.className = "player-select " + item; // player-select 클래스를 유지하면서 새로운 클래스 추가

            // 배팅금액 2000-3000 랜덤 설정
            player.betting = Math.floor(Math.random() * 1000 + 2000);
            console.log("랜덤 배팅금액 : ", player.betting);
            computer.betting = player.betting;

            restmoneyP.innerHTML = player.restmoney;
            restmoneyC.innerHTML = computer.restmoney;
            bettingP.innerHTML = player.betting;
            bettingC.innerHTML = computer.betting;
            winCntP.innerHTML = winCount;
            loseCntP.innerHTML = loseCount;
            winCntC.innerHTML = loseCount;
            loseCntC.innerHTML = winCount;

            let {value, text} = gameStart(item, player.restmoney, computer.restmoney); // 키를 구조분해 할당으로 받음
            document.querySelector(".result").innerHTML = value;
            document.querySelector(".log").innerHTML = text;
        })
    })
}
init();

function init2() {
    gameArr2.forEach(function(item, index) {
        playerBtns2[index].addEventListener('click', function() {
            // player 선택한 이미지 보여주는 태그
            playerSelect.className = "player-select " + item; // player-select 클래스를 유지하면서 새로운 클래스 추가

            gameMCB(item); // 키를 구조분해 할당으로 받음
        })
    })
}
init2();

function gameStart(playerSelect, restmoneyP, restmoneyC) {
    player.restmoney = restmoneyP;
    computer.restmoney = restmoneyC;
    console.log(player.restmoney, computer.restmoney);

    let comSelect = gameArr[Math.floor(Math.random() * gameArr.length)];
    document.querySelector(".com-select").className ="com-select " + comSelect;

    console.log(`플레이어 선택 : ${playerSelect} | 컴퓨터 선택 : ${comSelect}`);

    if(playerSelect == comSelect) {
        return {value : "무승부", text : "다시 시작하세요"};
    }else if(playerSelect == "rock" && comSelect == "scissors" ||
            playerSelect == "scissors" && comSelect == "paper" ||
            playerSelect == "paper" && comSelect == "rock") {
            win_lose = "win";
            return {value : "가위바위보 승리", text : "묵찌빠 진행 시작"};
    }else {
        win_lose = "lose";
        return {value : "가위바위보 패배", text : "묵찌빠 진행 시작"};
    }
}

function gameMCB(playerSelect) {
    console.log("묵찌빠 시작");
    
    let comSelect = gameArr2[Math.floor(Math.random() * gameArr2.length)];
    document.querySelector(".com-select").className ="com-select " + comSelect;
    
    console.log(`플레이어 선택 : ${playerSelect} | 컴퓨터 선택 : ${comSelect}`);
    
    if(playerSelect !== comSelect) {
        mcbing(playerSelect, comSelect);
    }else if(playerSelect == comSelect) {
        mcbend(win_lose);
    }
}

function mcbing(player, computer) {
    if (player == "muck" && computer == "chi" ||
        player == "chi" && computer == "ba" ||
        player == "ba" && computer == "muck") {
        win_lose = "win";
        document.querySelector(".result").innerHTML = `Player: "${player}" | Computer: "${computer}"`;
        document.querySelector(".log").innerHTML = "묵찌빠 계속 진행";
    }else {
        win_lose = "lose";
        console.log("lose - 묵찌빠 계속 진행");
        document.querySelector(".result").innerHTML = `Player: "${player}" | Computer: "${computer}"`;
        document.querySelector(".log").innerHTML = "묵찌빠 계속 진행";
    }
}

function mcbend(whowin) {
    if(whowin == "win") {
        winCount++;
        player.restmoney = player.restmoney + (player.betting * 2);
        computer.restmoney = computer.restmoney - (computer.betting * 2);

        document.querySelector(".result").innerHTML = "Player 승리!";
        document.querySelector(".log").innerHTML = "다음판 go! 가위바위보";
        console.log("Player 승리", player.restmoney, computer.restmoney);
    }else if(whowin == "lose") {
        loseCount++;
        player.restmoney = player.restmoney - (player.betting * 2);
        computer.restmoney = computer.restmoney + (computer.betting * 2);

        document.querySelector(".result").innerHTML = "Player 패배...";
        document.querySelector(".log").innerHTML = "다시 도전... 가위바위보";
        console.log("Player 패배", player.restmoney, computer.restmoney);
    }
    
    if(player.restmoney <= 0 || computer.restmoney <= 0) {
        document.querySelector(".result").innerHTML = "게임 끝";
        document.querySelector(".log").innerHTML = "30초 후 다시 시작";

        restmoneyP.innerHTML = player.restmoney;
        restmoneyC.innerHTML = computer.restmoney;
        bettingP.innerHTML = player.betting;
        bettingC.innerHTML = computer.betting;
        winCntP.innerHTML = winCount;
        loseCntP.innerHTML = loseCount;
        winCntC.innerHTML = loseCount;
        loseCntC.innerHTML = winCount;

        setTimeout(() => {
            location.reload();
        }, 30000);
    }
}
