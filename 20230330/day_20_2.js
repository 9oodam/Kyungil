// 재귀함수
// 함수 자신을 호출하는 함수
// 자주 사용 X, 알고리즘 문제 풀 때 가끔 사용
// 임시로 데이터베이스에 추가할 때


// 무한 실행
function addd() {
    addd();
}

// 조건 부여
function add(n) {
    if(n < 5) {
        add(n + 1);
        console.log(n);
    }
}
add(0); // 4 3 2 1 0
        // 함수의 실행 context : 함수가 호출되면 실행 context 생성, 뒤에서부터 실행 후 제거
        // add(0) 호출 -> add(1) 호출 -> add(2) 호출 -> add(3) 호출 -> add(4) 호출
        // -> add(4) 실행 끝 -> add(3) 실행 끝 -> add(2) 실행 끝 -> add(1) 실행 끝 -> add(0) 실행 끝




// 피보나치 수열(황금비 : 연속된 두 항의 합)
// 0 1 1 2 3 5 8 13 21 34 ...
function fibonacci(n) {
    if(n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2); // 이전 두 항을 더해서 반환
}
for(let i = 0; i < 20; i++) {
    console.log(fibonacci(i));
}