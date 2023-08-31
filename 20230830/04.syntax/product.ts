// 유지보수를 편하게 하기 위해 class 를 사용


// 상품의 구조 정의
// interface IProduct {
//     name : string
//     price : number
// }

class Product2 {
    // private : 접근 불가 키워드 (다른 곳에서 직접 참조 불가능)
    private name : string
    private price : number
    private discountAmount : number
    
    constructor (name : string, price : number) {
        this.name = name;
        this.price = price;
        this.discountAmount = 0;
    }

    // 직접 참조가 안되기 때문에 get메소드로 값을 호출
    getName() : string {
        return this.name;
    }
    getPrice() : number {
        return this.price - this.discountAmount; // 가격 - 할인가 = 현재가
    }

    getProduct() {
        return {name : this.name, price : this.getPrice()}
    }


    // 할인가 조정 함수
    setDiscountAmount(amount : number) : void {
        this.discountAmount = amount;
    }
}

const product = new Product2("블록", 1000)
console.log(product.getProduct());

product.setDiscountAmount(200);
console.log(product.getProduct());


// npm init -y
// npm i -D typescript
// npm i -D ts-node
// npx ts-node ./product.ts



// 위의 코드는 확장성 좀 부족스...
// 만약 할인율에 종류가 여러개라고 하면 전략 패턴으로
// 1 할인
// 2 할인
// 3 할인
// ...