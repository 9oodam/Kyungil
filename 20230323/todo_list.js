let _json = '{"key" : "value"}';

function addList() {
    let inputs = document.querySelectorAll("input");
    
    let importance = ""
    let _importance = document.getElementsByName("importance");
    _importance.forEach((node) => {
        if(node.checked) {
            importance = node.value;
        }
    });

    let value = window.localStorage.getItem("todo-list");

    if(window.localStorage.length == 0) {
        window.localStorage.setItem("todo-list", `{"date" : "${inputs[0].value}", "importance" : "${importance}", "list" : "${inputs[4].value}", "checked" : ""}`);
    }else {
        window.localStorage.setItem("todo-list", value + "|" + `{"date" : "${inputs[0].value}", "importance" : "${importance}", "list" : "${inputs[4].value}", "checked" : ""}`);
    }
    console.log(window.localStorage.getItem("todo-list"));

    let _div = document.querySelector("#_div");
    _div.innerHTML = "";
    render();
}

submitBtn.addEventListener("click", addList);

function render() {
    let _json = window.localStorage.getItem("todo-list");
    _json = _json.split("|");
    console.log(_json);
    
    let _ul = document.createElement("ul");
    let _li = document.createElement("li");

    let _div1 = document.createElement("div");
    let _div2 = document.createElement("div");
    let _div3 = document.createElement("div");
    let _div4 = document.createElement("div");

    _div1.innerHTML = "Date";
    _div2.innerHTML = "Importance";
    _div3.innerHTML = "List";
    _div4.innerHTML = "Checked";
    
    _div1.classList.add("list_name");
    _div1.classList.add("list_name_date");
    _div2.classList.add("list_name");
    _div2.classList.add("list_name_importance");
    _div3.classList.add("list_name");
    _div3.classList.add("list_name_list");
    _div4.classList.add("list_name");
    _div4.classList.add("list_name_checked");


    _li.append(_div1, _div2, _div3, _div4);
    _ul.append(_li);

    _json.forEach(function(i) {
        let _li = document.createElement("li");

        let _div1 = document.createElement("div");
        let _div2 = document.createElement("div");
        let _div3 = document.createElement("div");
        let _div4 = document.createElement("div");

        _div1.innerHTML = JSON.parse(i).date;
        _div2.innerHTML = JSON.parse(i).importance;
        _div3.innerHTML = JSON.parse(i).list;
        _div4.innerHTML = '<label for="checkbox"></label><input type="checkbox" class="checkbox" name="checkbox">'

        _div1.classList.add("list_date");
        _div2.classList.add("list_importance");
        _div3.classList.add("list_list");
        _div4.classList.add("list_checked");

        _li.append(_div1, _div2, _div3, _div4);
        _ul.append(_li);
    })
    _div.append(_ul);
}

deleteBtn.addEventListener("click", removeList);

function removeList() {
    let checkbox;
    let is_checked = document.getElementsByClassName("checkbox");
    
    let _json = window.localStorage.getItem("todo-list");
    _json = _json.split("|");
    
    let _jsonArr = [];

    for (let i = 0; i < is_checked.length; i++) {
        if(is_checked[i].checked == true) {
            checkbox = "checked";
            window.localStorage.removeItem(JSON.parse(i));
            console.log(checkbox);
        }else if(is_checked[i].checked == false) {
            checkbox = "unchecked";
            _jsonArr[i] = _json[i];
            console.log(checkbox);
        }
    }
    
    window.localStorage.setItem("todo-list", _jsonArr);

    let _div = document.querySelector("#_div");
    _div.innerHTML = "";
    render();
}


if(window.localStorage.length != 0) {
    //render();
}


