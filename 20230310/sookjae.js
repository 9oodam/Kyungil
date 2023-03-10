// 1번 문제

let students = ["김씨", "박씨", "이씨", "최씨"];
let award = ["이씨"];

// beststudent = students.filter(it => award.includes(it));
// console.log(beststudent);

let i = 0;
let j = 0;
for(award[i]; i < award.length; i++) {
    for(students[j]; j < students.length; j++) {
        if(students[j] == award[i]) {
            console.log(students[j]);
        }
    }
}



// 2번 문제

for(let a=1; a < 61; a++) {
    if(a % 3 == 0) {
        console.log("짝");
    }else {
        console.log(a);
    }
}