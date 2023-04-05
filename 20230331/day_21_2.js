class Mother {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getInfo() {
        return console.log(`이름 : ${this.name} | 나이 : ${this.age}`);
    }
}

let temp = new Mother("홍길동", 30);
temp.getInfo();



// 클래스 상속 : 자식 클래스가 부모 클래스를 상속받아 같은 기능을 사용할 수 있음
class Child extends Mother {
    // 비워놓으면 constructor 생성자가 자동으로 생김
}

let temp2 = new Child("홍동길", 10);
temp2.getInfo();



class Animal {
    constructor(name) {
        this.name = name;
        this.speed = 0;
        this.age = 2;
    }
    run(speed) {
        this.speed += speed;
        console.log(`부모 함수 : ${this.name}은(는) ${this.speed}(으)로 달리는 중`);
    }
    stop() {
        this.speed = 0;
        console.log(`${this.name}이 멈춤`);
    }
}

let ani1 = new Animal("동물");
ani1.run(10);
ani1.stop();

class Cat extends Animal {
    // 부모의 함수를 받아서 overriding (기능을 재정의) 할 수 있음
    // run이라는 함수가 없으면 부모에서 상속받은 run 함수를 실행하고
    // run이라는 함수가 재정의 되면 재정의 된 함수를 실행
    run(speed) {
        this.speed = speed;
        console.log(`자식 함수 : ${this.name}은(는) ${this.speed}(으)로 달리는 중`);
    }
    speak() {
        console.log("미야옹");
    }
    stop() {
        // 재정의 해서 사용할 수 있지만
        // 상속받은 부모의 클래스 키워드(super)로 부모의 함수를 실행
        super.stop(); // 부모의 함수
        this.speak(); // 본인의 함수
    }
}

let cat = new Cat("때껄룩");
cat.run(10);
cat.stop();



// 이렇게 만들면 X
// 일반적인 함수는 new 키워드를 함게 사용하면 빈객체가 만들어 지는데
// this라는 키워드에 객체를 참조 시킴
// 반면에 상속 받은 클래스 Man 생성자 함수가 실행되면 일반함수에서 일어나는 일이 발생하지 않음
// this는 객체를 할당하는 일을 부모 클래스의 생성자가 처리해주길 바람
class Human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

// 상속 받은 클래스는 반드시 부모 클래스를 호출해서 사용하기!
class Man extends Human {
    constructor(name, age) {
        this.name = name; // X
        this.age = age; // X
    }
}

let man1 = new Man("김아무개", 30);
console.log(man1);