let objArr = [];

function create(_name, _age, _gender, _content, _glasses) {
    this.name = _name;
    this.age = _age;
    this.gender = _gender;
    this.content = _content;
    this.glasses = _glasses;
}

function inputBtn() {
    console.log('버튼 눌림');
    addArr();
    render();
}

function addArr() {
    let inputs = document.querySelectorAll("input");
    console.log(inputs[0].value);
    console.log(inputs[1].value);
    console.log(inputs[2].value);
    console.log(inputs[3].value);
    console.log(inputs[4].value);

    let obj = new create(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
    objArr.push(obj);
    console.log(objArr);
}

function render() {
    let text = "";

    objArr.forEach(function(i) {
        text += `<ul><li>${i.name}</li> <li>${i.age}</li> <li>${i.gender}</li> <li>${i.content}</li> <li>${i.glasses}</li></ul>`
    });

    document.querySelector('#tables').innerHTML = text;
}