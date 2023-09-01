export function SelectNum(num : number) {
    let arr : Array<number> = [];
    for (let i : number = 1; i <= 45; i++) {
        arr.push(i);
    }

    let value : Array<number> = [];
    for (let i : number = 0; i < num; i++) {
        let index = Math.floor(Math.random() * arr.length)
        let number = arr[index]
        arr.splice(index, 1)
        value.push(number)
    }

    return value;
}