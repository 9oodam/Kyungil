const Counter = artifacts.require("Counter");

// contract : 테스트 케이스를 정의하기 위한 최상위 구조
contract("Counter", (account) => {
    // account : 네트워크에 있는 계정들이 매개변수로 들어옴
    console.log(account);

    describe("counter contract", () => {
        let counter;

        it("counter 1", async () => {
            // 배포한 컨트랙트를 json 파일로 가져온 Counter로 조회
            // 컨트랙트의 인스턴스를 counter에 담음
            counter = await Counter.deployed();
        });
        it("counter 2", async () => {
            console.log(await counter.getValue.call());
        });
        it("counter 3", async () => {
            await counter.setValue(40);
            console.log(await counter.getValue.call());
        })
    })
})