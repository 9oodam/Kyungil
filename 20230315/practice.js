// 문제 1. 배열에서 banana 빼기
let fruit1 = ['apple', 'banana', 'cherry', 'strawberry', 'orange'];

for (let i = 0; i < fruit1.length; i++) {
    if(fruit1[i] === 'banana') {
        fruit1.splice(i, 1);
    }
}
console.log("1번 문제 결과: " + fruit1);
console.log('\n');


// 문제 2. 두 배열에서 마지막 값을 잘라내고 잘라낸 두 배열 합치기
let fruit2 = ['apple', 'orange', 'banana'];
let fruit3 = ['pear', 'melon', 'peach', 'cherry'];

fruit2.pop();
fruit3.pop();

let fruit4 = fruit2.concat(fruit3);

console.log("2번 문제 결과: " + fruit4);
console.log('\n');


// 문제 3. Match.random 함수를 이용하여
//        '가위', '바위', '보' 중 하나의 값을 return하는 함수를 만들기
let RSP = ['가위', '바위', '보'];

function getRSP() {
    let i = parseInt(Math.random() * 3);
    console.log("3번 문제 결과: " + RSP[i]);
}
getRSP();
console.log('\n');


// 문제 4. 출석부 이름들에게 인사하기
//         단, 마지막 이름부터 첫 번째 이름까지
let students = ['김가가', '이나나', '박다다', '정라라', '황마마'];

function goodMorning() {
    for(i = (students.length - 1); i >= 0; i--) {
        name = students[i];
        console.log(`안녕! ${name}`);
    }
}
goodMorning();
console.log('\n');




// 따라 써보기 

let fruit = ['apple', 'banana', 'cherry', 'strawberry', 'orange', 'orangejuice'];

let rt = fruit.splice(1, 2, 'pear', 'grape');
console.log(rt);
console.log(fruit);

let rt1 = fruit.indexOf('orange');
console.log(rt1);

let rt2 = fruit.find(function(item) { return item === 'orange' });
console.log(rt2);

let rt3 = fruit.findIndex(function(item) { return item === 'grape' });
console.log(rt3);

let rt4 = fruit.filter(function(item) { return item[0] === 'o'});
console.log(rt4);

function filterItems(query) {
    return fruit.filter(function(item) {
        return item.indexOf(query) > -1
    })
}
console.log(filterItems('o'));

let rt5 = fruit.map(function(item) { return item[0] === 'o' });
console.log(rt5);