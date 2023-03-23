// 로또 추첨기

// 1. 로또는 겹치는 숫자가 없음
// 2. 숫자 6개
// 3. 나온 숫자들의 결과 보여줌

let lottoNum = [];  // 로또 번호가 들어갈 박스
let res = [];       // 결과를 저장할 배열


// 추첨 시작 전 초기화
function lottoInit() {

    // 배열의 값을 추가하는 작업이 있는 경우 초기화 먼저
    lottoNum = []; 

    // 로도 번호 추출 (1~45번 반복)
    for (let i = 1; i <= 45; i++) {
        lottoNum.push(i);
    }
    console.log("lotto 세팅 " + lottoNum);
}

// 추첨
function lottoPlay() {
    
    // 배열의 값을 추가하는 작업이 있는 경우 초기화 먼저
    res = [];

    for (let i = 0; i < 6; i++) {
        let rndIndex = Math.floor(Math.random() * lottoNum.length);   // floor : 소숫점 단위 버림
        // 인덱스 0~44번 랜덤으로 뽑음

        // 랜덤으로 뽑은 인덱스를 lottoNum 배열에 전달해서 number라는 변수에 저장
        let number = lottoNum[rndIndex];

        // 랜덤한 값이 겹쳐서 나오지 않게 제거
        // splice(시작점, 몇개 제거할지)
        lottoNum.splice(rndIndex, 1); // 인덱스에 해당하는 값 하나만 제거 -> 배열의 길이도 같이 줄어듦

        // 결과값 저장
        res.push(number);
    }
}

// 메인
function main() {
    lottoInit();
    lottoPlay();
    console.log("로또 결과는?\n" + res);
}

main();
main();

// 단위 테스트 (버그, 오류 등) -> 통합 테스트 (전체 진행 오류)