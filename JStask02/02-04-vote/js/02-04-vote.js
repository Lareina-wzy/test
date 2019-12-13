var storage = window.sessionStorage;
var select = document.getElementsByClassName("select")[0]; //select 返回按钮
var id = document.getElementsByClassName("id");  // id  玩家身份
var txt = document.getElementsByClassName("txt"); //txt  玩家序号
var box = document.getElementsByClassName("box"); // box   玩家选框

var group = JSON.parse(storage.getItem("group"));
var killNumGroup = JSON.parse(storage.getItem("killNumGroup"));   //killNumGroup 被杀玩家序号数组
var judge = storage.getItem("judge"); //判断按钮文字为“返回”/“开始游戏”

var black = "#666666"; //死亡背景色

select.addEventListener("click", btnClick);
function btnClick() {
    window.location.href = '../../02-05-judge/html/02-05-judge.html';
}

// 按数组长短克隆box
for (var i = 1; i < group.length; i++) {
    var box = document.getElementById('box-0');
    var boxClone = box.cloneNode(true);
    boxClone.setAttribute("id", "box-" + i);
    box.parentNode.appendChild(boxClone);
}
// 显示玩家身份、序号
for (var x = 0; x < group.length; x++) {
    id[x].innerHTML = group[x];
    txt[x].innerHTML = x + 1 + "号";
}

// 按钮名称
if (judge == "true") {
    select.innerHTML = "开始游戏";
    storage.setItem("judge", false);
} else {
    select.innerHTML = "返回";
}


// 出局玩家黑屏
for (var i = 0; i < group.length; i++) {
    if (killNumGroup.indexOf(i) != -1) {
        box[i].style.background = black;
    }
}