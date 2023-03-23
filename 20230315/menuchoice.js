// 메뉴 추천기

let menu = [];
let res = [];

function makeMenu() {
    for(i = 1; i <= 20; i++) {
        menu.push(i);
    }
    console.log(menu);
}

function choiceMenu() {
    for(i = 0; i < 1; i++) {

        let rndIndex = Math.floor(Math.random() * menu.length);
        let number = menu[rndIndex];
        res.push(number);
        
        console.log(res);
    }
}

makeMenu();
choiceMenu();