// 할인 구조 만들어보기 (유지보수 높이기!)

interface Discount {
    // 함수만 선언하고 내용은 오버라이딩으로 받음
    getDiscountPrice(price : number) : number
}


// 1. 단순 가격 차감
class FlatDiscount implements Discount {
    private amount : number
    constructor(amount : number) {
        this.amount = amount;
    }

    getDiscountPrice(price: number): number {
        return price - this.amount
    }
}

// 2. 퍼센트 할인
class PercentDiscount implements Discount {
    private amount : number
    constructor(amount : number) {
        this.amount = amount;
    }

    getDiscountPrice(price: number): number {
        return price * (1 - this.amount / 100)
    }
}

// 3. 1 + 2
class MultiDiscount implements Discount {
    private flatAmount : number
    private percent : number
    constructor(flatAmount : number, percent : number) {
        this.flatAmount = flatAmount;
        this.percent = percent;
    }

    getDiscountPrice(price: number): number {
        const flatDiscountAmount = price - this.flatAmount;
        return flatDiscountAmount * (1 - this.percent / 100);
    }
}


class Product3 {
    private name : string
    private price : number
    constructor(name : string, price : number) {
        this.name = name;
        this.price = price;
    }

    getName() : string {
        return this.name;
    }
    getPrice() : number {
        return this.price;
    }
}

class ProductDiscount {
    private product : Product3
    private discount : Discount
    constructor(product : Product3, discount : Discount) {
        this.product = product;
        this.discount = discount;
    }

    getPrice() : void {
        console.log(this.discount.getDiscountPrice(this.product.getPrice()));
    }
}

const _product1 = new Product3("mac", 100000);
const _product2 = new Product3("window", 2000);

const _productDiscount1 = new PercentDiscount(10);
const _productDiscount2 = new FlatDiscount(1000);
const _productDiscount3 = new MultiDiscount(500, 20);

const _productWithDiscount1 = new ProductDiscount(_product1, _productDiscount1); // mac에 percent 할인
_productWithDiscount1.getPrice();
const _productWithDiscount2 = new ProductDiscount(_product2, _productDiscount3); // window에 multi 할인
_productWithDiscount2.getPrice();