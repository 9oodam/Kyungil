// 배열 제네릭 타입 설정
const arr4 : Array<number | string> = [1, "2"];

// 타입 추론 없이 배열 선언
const strArr : string[] = ["1", "2", "3"];
const numArr : number[] = [1, 2, 3];

// 튜플
// 각 배열의 자리에 타입 지정
const tuple : [string, number, object] = ["hi", 100, {}];