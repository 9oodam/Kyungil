function solution(d, budget) {
    var answer = 0;
    let total = 0;
    
    for (let i = 0; i < d.length; i++) {
        if(total <= budget) {
            total = total + d[i];
            console.log(total);
            answer = i;
            console.log(i);
        }
    }
    return answer;
}

let arr = [1, 3, 2, 5, 4];
let arr2 = [2, 2, 3, 3];
// console.log(solution(arr, 9));
console.log(solution(arr2, 10));


// function solution(a, b) {
//     var answer = 1234567890;
//     answer = 0;
    
//     for(let i = 0; i < a.length; i++) {
//         for(i = 0; i < b.length; i++) {
//             console.log(a[i] * b[i]);

//             total = a[i] * b[i];
//             answer += total;
//         }
//     }
//     return answer;
// }

// let a = [1,2,3,4];
// let b = [-3,-1,0,2];
// console.log(solution(a, b));