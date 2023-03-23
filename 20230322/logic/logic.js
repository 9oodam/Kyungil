let _div = null;

for(let i = 0; i < 25; i++) {
    let _div = document.createElement('div');
    _div.classList.add("box");
    document.querySelector('.game_space').append(_div);
}

_div.addEventListener("click", function() {
    if(e.target.classList.contains("item") != -1) {
        _target = e.target;
        _target.classList.add("item");
        console.log("채우기");
    }
});
_div.addEventListener("click", function() {
    if(e.target.classList.contains("item") == -1) {
        _target = e.target;
        _target.classList.remove("item");
        console.log("지우기");
    }
});


