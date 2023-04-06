let student = {
    name : "Koo",
    isAdmin: false,
    age : 30,courses: ['html', 'css', 'js']
}

let json = JSON.stringify(student);

console.log(typeof json);
console.log(json);

let json2 = JSON.stringify(student, null, 2);
console.log(json2);