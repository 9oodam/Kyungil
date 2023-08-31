// interface : 객체의 구조를 정의하는 타입, 해당 구조를 상속 받아 객체 생성

interface IBlock {
    id : number
    title : string
    content : string
    date : number
    like : number
    hit? : number // 옵션체이닝(?) : 있어도 되고 없어도 되는 키
}

const Block1 : IBlock = {
    id : 1,
    title : 'hi',
    content : 'oh',
    date : 31,
    like : 0,
    hit : 0
}

const Block2 : IBlock = {
    id : 1,
    title : 'hi',
    content : 'oh',
    date : 31,
    like : 0,
    // hit : 0
}



// class 상속
// implements : class의 구조가 만족하는지의 여부를 체크

interface IProduct {
    name : string
    price : number
}

class Product1 implements IProduct {
    name : string
    price : number

    constructor(name : string, price : number) {
        this.name = name;
        this.price = price;
    }
}