// 가위바위보 게임

// 1. 가위바위보 20판 -> 배팅금액 2만원 들고 시작
//      시작할 때 2천원 이상 걸 수 있게 (2천원 이하는 다시)
// 2. 묵찌빠 이기면 배팅한 금액의 X2
//          지면 배팅한 금액의 -(X2)
//          20판 다 끝나거나 돈 다 잃었을 때 소지금 & 몇 판 했는지

// 랜덤값 구할 수 있는 함수
// Math.random(); // 0~1까지의 랜덤수 (소수점으로 나옴)
// parseInt를 사용해서 정수로 변환 & 값이 너무 작기 때문에 곱해줌
// console.log(parseInt(Math.random() * 3));



let value1 = parseInt(prompt("0: 바위, 1: 보자기, 2: 가위"));
let value2 = parseInt(Math.random() * 3);
let play = true;

while(play) {
    switch (value1) {
        case 0:
            console.log("당신:", value1, "컴퓨터:", value2);
            if(value2 == 0) {
                console.log("당신: 바위, 컴퓨터: 바위 => 비김")
            } else if(value2 == 1) {
                console.log("당신: 바위, 컴퓨터: 보자기 => 당신은 졌습니다")
            } else if(value2 == 2) {
                console.log("당신: 바위, 컴퓨터: 가위 => 당신은 이겼습니다")
            }
            play = false;
            break;
        case 1:
            console.log("당신:", value1, "컴퓨터:", value2);
            if(value2 == 0) {
                console.log("당신: 보자기, 컴퓨터: 바위 => 당신은 이겼습니다")
            } else if(value2 == 1) {
                console.log("당신: 보자기, 컴퓨터: 보자기 => 비김")
            } else if(value2 == 2) {
                console.log("당신: 보자기, 컴퓨터: 가위 => 당신은 졌습니다")
            }
            play = false;
            break;
        case 2:
            console.log("당신:", value1, "컴퓨터:", value2);
            if(value2 == 0) {
                console.log("당신: 가위, 컴퓨터: 바위 => 당신은 졌습니다")
            } else if(value2 == 1) {
                console.log("당신: 가위, 컴퓨터: 보자기 => 당신은 이겼습니다")
            } else if(value2 == 2) {
                console.log("당신: 가위, 컴퓨터: 가위 => 비김")
            }
            play = false;
            break;
        
        case null:
            break;

        default:
            if(value1 != 0 && value1 != 1 && value != 2) {
                console.log("0: 바위, 1: 보자기, 2: 가위 중에 고르시오");
                value1 = prompt("0: 바위, 1: 보자기, 2: 가위 중에 고르시오");
                break;
                
            }
    }
}