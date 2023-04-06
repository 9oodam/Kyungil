function Drawer(el, open = false) { // 전달된 매개변수가 없으면 open에 디폴트로 false
    this.el = el;
    this.isOpen = open;

    // 객체 원형에 assign 메소드 : 하나 이상의 객체로부터 대상 객체로 속성을 복사
    // 두 번째 매개변수로 객체의 속성을 복사해서 첫 번째 매개변수의 객체에 속성을 추가한 뒤
    // 첫 번째 매개변수의 객체를 반환
    // 다른 객체의 속성을 복사해서 새로운 객체를 생성
    Object.assign(this.el.style, {
        display : "block",
        position : "fixed",
        top : 0,
        right: 0,
        bottom : 0,
        width : "500px",
        padding : "10px",
        backgroundColor : "yellow",
        transition : "1s"
    });
}

Drawer.prototype.open = function() {
    this.isOpen = true;
    this.el.style.transform = "translate(0px)";
}

Drawer.prototype.close = function() {
    this.isOpen = false;
    this.el.style.transform = "translate(500px)";
}

// 객체 생성
const sideMenu = new Drawer(document.querySelector(".drawer")); // .drawer 태그가 el에 들어감

document.querySelector(".drawer-opener").onclick = function() {
    if(!sideMenu.isOpen) {
        sideMenu.open();
    }else {
        sideMenu.close();
    }
}