var inputName = document.getElementById('inputtxt');   //inputName 玩家数量框 id
var inputValue = document.getElementById('inputtxt').value;  //inputValue  input.value
var killer = document.getElementById("killer");   //killer   杀手数目text id
var person = document.getElementById("person");   //person   平民数目text id
var range = document.getElementById("range");   // range   滚动条id
var subtract = document.getElementById("subtract");   //subtract   减号id
var add = document.getElementById("add");   //add   加号id

var storage = window.sessionStorage;
var group = [];
var x, y, r;
subtract.addEventListener("click", mySubtract);     //减号click事件
add.addEventListener("click", myAdd);   //加号click事件
range.addEventListener("input", myRange);   //滚动条input事件
inputName.addEventListener("input", inputJudge);   //input输入框input事件
document.getElementsByClassName("select")[0].addEventListener("click", btnStorage);  // 按钮click事件

// 滚动条最大最小初始值
range.max = 18;
range.min = 4;
range.step = 1;
range.defaultValue = 4;  
inputName.value = range.value;

// 减号click事件
function mySubtract() {
    range.value--;
    inputName.value = range.value;
    change();
} 

// 加号click事件
function myAdd() {
    range.value++;
    inputName.value = range.value;
    change();
}

// 杀手平民人数更改，滚动条背景色更改
function change() {
    inputValue = inputName.value
    // 改变text人数
    x = Math.floor(inputValue / 4);
    y = inputValue - x;
    killer.innerHTML = "杀手" + x + "人";
    person.innerHTML = "平民" + y + "人";
    // 线性渐变
    r = (range.value - 4) / 14 * 100;
    // range.style.background = "linear-gradient(90deg, rgb(41, 189, 224)" + r + "%, rgb(240, 240, 240)" + r + "% )";
    range.style.background = "linear-gradient(90deg, #29BDE0 " + r + "%, #F0F0F0 " + r + "% )";
}

// 进度条
function myRange() {
    inputName.value = range.value;
    change();
}

// 根据input输入内容改变text
function inputJudge() {
    inputName.value = inputName.value.replace(/[^0-9]+/, '');
    inputValue = inputName.value;
    if (inputValue != 0 && inputValue != 1 && inputValue < 4 || inputValue > 18) {
        alert("玩家数量为4-18");
        inputName.value = "";
        range.value = 4;
        change();
    } else if (inputValue == "" || inputValue == 0) {
        range.value = 4;
        change();
    } else {
        range.value = inputValue;
        change();
    }
}


// click后执行分配杀手
function btnStorage() {
    // 设置名单组人数分配
    inputValue = inputName.value;
    x = Math.floor(inputValue / 4);
    y = inputValue - x;
    for (var i = 1; i <= x; i++) {
        group.push("杀手");
    }
    for (var i = 1; i <= y; i++) {
        group.push("平民");
    }
    // 数组随机乱序
    for (var i = group.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = group[i];
        group[i] = group[j];
        group[j] = temp;
    }
    storage.setItem("group", JSON.stringify(group));  //存储数组

    // 再次验证input输入值
    if (inputValue != 0 && inputValue < 4 || inputValue > 18) {
        alert("玩家数量为4-18");
        inputtxt.value = "";
    } else {
        window.location.href = '../../02-03-watch/html/02-03-watch.html';
    }
}