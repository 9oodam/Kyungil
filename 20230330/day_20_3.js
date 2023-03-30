// promise 객체
// 비동기 처리를 가능하게 해주는 객체
// nodejs에서 사용 많이 할 예정

function testPromise(num) {
    // new 키워드로 빈객체 생성
    // Promise에 매개변수로 함수
    // resolve() : 처리가 완료되면 반환하는 함수
    // reject() : 처리가 오류나면 반환하는 함수
    return new Promise(function(resolve, reject) {
        try {
            if(num > 10) reject({data : "숫자 큼"});
            console.log(num);
    
            // data를 받아올 때 가져오는 시간이 소요됨
            // 완료되고 안전하게 다음 작업을 진행시켜야 할 때
            setTimeout(() => {
                resolve(num + 1);
            }, num * 1000);
        } catch (error) {
            reject(error);
        }
    }) 
}

/*
testPromise(10).then(function(data) {
    // 데이터를 가지고 처리해야 할 구문 작성
    console.log(data);
    // 위에서 9 먼저 뜨고 1초(1000) 뒤에10(num + 1)이 뜸

    return testPromise(data);
}).then(function(data) { // resolve를 실행하면 then() 메소드 실행
    console.log(data);
}).catch(function(error) { // reject를 실행하면 catch()메소드 실행
    console.log(error); // data : "숫자 큼"
})
*/


// then과 catch를 안 쓰는 경우 async await 구문 사용 가능 (같이 사용 X)

async function asyncFun() {
    try {
        // await 뒤에 promise 객체를 넣음
        let temp = await testPromise(10); // testPromise가 res나 rej 처리 될 때까지 기다렸다가 temp 변수에 담음
        console.log(temp); // 2 // 2초 뒤 실행

        temp = await testPromise(temp);
        console.log(temp); // 3(num + 1) // 2초 뒤 실행
        // awiat + promise = promise를 기다리고 resolve 값을 반환
    } catch (error) {
        console.log(error);
    }
}
asyncFun();