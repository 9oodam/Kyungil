// 스프레드 연산자

// 일반 객체
let obj = {name : "Damin", content : "blah"};
let obj2 = obj;             // 객체를 변수에 할당
obj2.name = "Kim";          // 객체는 레퍼런스 타입이기 때문에 주소를 참조, 하나만 바꿔도 둘 다 바뀜
console.log(obj);           // {name: 'Kim', content: 'blah'}
console.log(obj2);          // {name: 'Kim', content: 'blah'}
console.log(obj == obj2);   // true

// 원본을 유지하면서 작업 진행 가능
// DB에서 값을 가져와서 검색기능을 만든다 가정했을 때
// 모든 리스트를 가지고 있는 배열은 유지하되, 검색으로 걸러낸 배열만 사용하고 싶을 때
let obj3 = {...obj};        // 값을 복사해 새로운 객체 생성
obj3.name = "Pak";
console.log(obj);           // {name: 'Kim', content: 'blah'}
console.log(obj3);          // {name: 'Pak', content: 'blah'}
console.log(obj == obj3);   // false



// 옵션 체이닝 (React에서 많이 사용)
// 객체의 키 앞에 ? 구문을 추가하여 작성 -> 오류가 나지 않게 방지해줌
// 객체의 값을 호출할 때 안전성을 유지하면서 호출 가능
// ES11 문법에서 도입
let obj4 = {name : "Damin", content : "blah"};
console.log(obj4?.name);    // name이라는 키가 있으면 값을 불러오고
console.log(obj4?.address); // 없으면 undefined

let obj5 = {
    name : "Damin",
    content : {
        age : 100
    }
}
console.log(obj5?.content.age); // 100
console.log(obj5?.content.key); // undefined
                                // 객체의 키를 확인하고 type 에러가 나지않게 방지해줌