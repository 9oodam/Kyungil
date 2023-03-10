// 1번 문제

let students = ["김씨", "박씨", "이씨", "최씨"];
let award = ["박씨", "이씨"];

// beststudent = students.filter(it => award.includes(it));
// console.log(beststudent);

let beststudent = [];

for(let i = 0; i < award.length; i++) {
    console.log("몇 번?")
    for(let j = 0; j < students.length; j++) {
        if(students[j] == award[i]) {
            beststudent.push(students[j]);
        }
    }   
}
console.log(beststudent);


// 2번 문제

for(let a=1; a < 61; a++) {
    if(a % 3 == 0) {
        console.log("짝");
    }else {
        console.log(a);
    }
}