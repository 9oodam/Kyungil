// Class
// ES6 문법부터 지원
// 상속을 받을 수 있음 inherit?? -> 코드의 재사용 높임


class student {
    // constructor : 클래스의 생성자 함수 (작성 안하면 빈 생성자 함수가 자동으로 생김)
    constructor(age, tel, city) {
        this.age = age;
        this.tel = tel;
        this.city = city;
    }
    // function 안쓰고 함수 이름만 써도 됨
    getInfo() {
        return `나이 : ${this.age}살 | 번호 : ${this.tel} | 거주지 : ${this.city}`;
    }
}

let st = new student(10, "010-0000-0000", "서울");

console.log(st);
console.log(st.age);
console.log(st.tel);
console.log(st.city);

console.log(st.getInfo());



class Character {
    constructor(hp, mp, atk) {
        this.hp = hp;
        this.mp = mp;
        this.atk = atk;
    }
    // 클래스를 동적 할당 할 때마다 생김
    getStatus() {
        return this.hp + this.mp + this.atk
    }
    // 정적 메소드 : 일반적으로 공용함수를 만들기 위해 사용
    // 클래스의 인스턴스에서 호출 X
    // static으로 선언한 정적 메소드는 클래스를 동적 할당 할 때마다 생성되지 않고 무조건 한개만 있음
    static getAtk(n) {
        return n.atk;
    }
}

let ca = new Character(100, 100, 100);

console.log(ca);
//console.log(ca.getAtk(1)); // 정적 메소드이기 때문에 생성한 인스턴스에서 안불러짐
console.log(Character.getAtk(ca));



class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    // getter setter : 클래스의 값을 가져오거나 설정
    // 클래스의 값에 접근할 때 직접 변수에 접근하는 형태가 아닌 get과 set을 통한 접근 방법
    // 내부구조를 캡슐화 하는 데 좋음 (전역적으로 데이터가 사용되지 않게 위험성을 방지)
    get getName() {
        return "제품 이름 : " + this.name;
    }
    set setPrice(price) {
        this.price = price;
    }
}

let pr = new Product("갤럭시 노트", 1000000);

console.log(pr); // Product {name: '갤럭시 노트', price: 1000000}
console.log(pr.getName); // getter 확인
pr.setPrice = 2000000;
console.log(pr); // Product {name: '갤럭시 노트', price: 2000000}