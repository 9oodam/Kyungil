// Iterable & Iterator

// Set : 배열에 중복되지 않는 유일한 값을 저장할 수 있음
//       순서에 의미가 없음, 인덱스로 접근할 수 없음
//       ES6 값으로만 이루어져 있고, 중복 값은 허용하지 않음

const s = new Set(); // Set 객체 생성
console.log(s); // Set(0)

// add 메소드 : 요소 추가
s.add("one");
s.add("two");
s.add("two"); // 중복되는 값 허용 X
s.add("three");
console.log(s); // Set(3) {'one', 'two', 'three'}


const arr = [1, 2, 3, 4, 5];
const ss = new Set(arr); // 생성자 함수에 배열을 전달
console.log(ss); // Set(5) {1, 2, 3, 4, 5}

// has 메소드 : 해당 값이 있는지 확인 (true/false)
console.log(ss.has(2)); // true

// delete 메소드 : 해당 값을 제거
ss.delete(2);
console.log(ss); // Set(4) {1, 3, 4, 5}

// clear 메소드 : 모든 값을 제거
// ss.clear();
// console.log(ss); // Set(0)

// forEach : 이터러블 반복자
ss.forEach(function(i) {
    console.log(i); // 1 3 4 5
})

// SetIterator 객체로 반환
// 이터러블에 이터레이터를 반환 시켜줌
const temp = ss.entries();
// next로 첫 번째 값 확인
console.log(temp.next().value); // (2) [1, 1]



// Map : key & value를 저장하는데 객체로도 할 수 있음
//       key와 value를 한쌍으로 저장하고 중복은 허용하지 않음
//       iterator를 통해 Map 객체 내부를 순회할 수 있음
//       ES6부터 추가

const m = new Map(); // Map 객체 생성

// set 메소드 : 키와 값 한쌍으로 추가
m.set("one", 0);
m.set("one", 1); // 중복되는 키 허용 X, 키가 겹치는 경우 마지막 값으로 저장
m.set("two", 2);
m.set("three", 3)
console.log(m); // Map(3) {'one' => 1, 'two' => 2, 'three' => 3}

// get 메소드 : 키를 사용하여 값 호출
console.log(m.get("one")); // 1

// delete 메소드 : 해당 키를 사용하여 값 삭제
m.delete("one");
console.log(m); // Map(2) {'two' => 2, 'three' => 3}

// size 메소드 : map에 저장된 요소가 몇개인지 확인
console.log(m.size); // 2

// keys 메소드 : key 반환
const keys = m.keys();
console.log(keys); // MapIterator {'two', 'three'}

// values 메소드 : value 반환
const values = m.values();
console.log(values); // MapIterator {2, 3}

// entries 메소드 : [key, value] 형태의 정보들을 모아서 MapIterator 객체로 변환하여 반환
const mIter = m.entries();
console.log(mIter); // MapIterator {'two' => 2, 'three' => 3}

// next로 첫 번째 값 확인
// console.log(mIter.next().value); // ['two', 2]

// for .. of 문으로 원하는 정보 출력
// 이터레이터 요소가 끝날때까지 반복하면서 요소를 보여줌
for (const iterator of keys) {
    console.log(iterator); // two three
}
for (const iterator of values) {
    console.log(iterator); // 2 3
}
for (const [key, value] of mIter) {
    console.log(`key : ${key} | value : ${value}`);
    // key : two | value : 2
    // key : three | value : 3
}

// forEach 문으로 키와 값 호출
m.forEach(function(value, key) {
    console.log(`key : ${key} | value : ${value}`);
})