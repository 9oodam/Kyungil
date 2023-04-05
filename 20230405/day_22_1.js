// Prototype(프로토타입) : 객체의 원형
// JavaScript의 객체는 프로토타입을 상속 받음

/*
function car(model, color, speed) {
    this.model = model;
    this.color = color;
    this.speed = speed;
    this.accel = function() {
        this.speed -= 10; // 10씩 감소
    }
}

let car1 = new car("벤츠", "white", 200);
let car2 = new car("모닝", "black", 100);
console.log(car1);
console.log(car2);
*/


// 객체에 새 속성을 추가할 수 있는데 원형에 추가는 할 수 없음
/*
function car(m, c, s) {
    this.model = m;
    this.color = c;
    this.speed = s;
    this.speedUp = function() { // 함수 원형
        this.speed += 10;
        return this.speed;
    }
}

let car1 = new car("마티즈", "red", 150);
car1.battery = true; // 새 속성 부여 (키와 값 추가)
car1.speedUp = function() { // 함수 수정
    this.speed += 20;
    return this.speed;
}

console.log(car1); // {model: '마티즈', color: 'red', speed: 150, battery: true, speedUp: ƒ}
car1.speedUp();
console.log(car1); // {model: '마티즈', color: 'red', speed: 170, battery: true, speedUp: ƒ}
*/


// 프로토타입 : 객체 원형에 추가 가능
// 이 원형을 가진 객체들은 전부 프로토타입으로 추가한 메소드를 사용 가능
// 생성자 함수에 메소드를 정의하지 않고 생성자 외부에 별도의 메소드를 정의하는 방법

// 생성자에 의해 생성된 모든 객체는 생성자 함수의 모든 속성과 메소드를 상속 받음
// 각 객체는 상속된 속성과 메소드를 메모리에 저장하고 중복 저장을 피함

function car(m, c, s) {
    this.model = m;
    this.color = c;
    this.speed = s;
}

// 생성자 함수로 만든 모든 객체에게 메소드를 추가
// 객체명.prototype.메소드 = function() {}
car.prototype.speedUp = function() {
    this.speed += 30;
    return this.speed;
}
car.prototype.speedDown = function() {
    this.speed -= 30;
    return this.speed;
}

let car1 = new car("봉고", "silver", 100);
let car2 = new car("다마스", "grey", 150);
console.log(car1.speedUp()); // 130
console.log(car2.speedUp()); // 180

// 객체에 stop이라는 메소드 추가 (해당 객체에만 추가됨)
car1.stop = function() {
    this.speed = 0;
    return this.speed;
}
console.log(car1.stop()); // 0
// console.log(car2.stop()); // TypeError


car.prototype.stop = function() {
    this.speed = 0;
    return this.speed;
}
console.log(car2.stop()); // 0


// 문자열의 원형은 String
String.prototype.replaceOf = function() {
    console.log("프로토타입으로 추가됨");
}
"가나다".replaceOf(); // 프로토타입으로 추가됨

// 이런걸 직접 만들 수 있음
console.log("가나다".replace("가", "나")); // 나나다