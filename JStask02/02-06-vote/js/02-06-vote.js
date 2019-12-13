var i;
var storage = window.sessionStorage;
var group = JSON.parse(storage.getItem("group"));
var killNumGroup = JSON.parse(storage.getItem("killNumGroup"));//killNumGroup 被杀玩家序号数组
var day = JSON.parse(storage.getItem("day"));
var bool = storage.getItem("bool");   //判断杀手杀人跳转/全民投票跳转

document.getElementsByClassName("select")[0].addEventListener("click", btnClick);  //投死按钮
var id = document.getElementsByClassName("id");   // id  玩家身份
var txt = document.getElementsByClassName("txt");   //txt  玩家序号
var box = document.getElementsByClassName("box");    // box   玩家选框
var choose = document.getElementsByClassName("choose");   //choose  小刀图片
var title = document.getElementById("title");   //title   游戏引导语
var killNumber;   //选中序号

console.log(group);
console.log(killNumGroup);

// 杀手杀人页面跳转bool为"true"
if (bool == "true") {
    title.innerHTML = "杀手请选择要杀死的目标";
// 全民投票页面跳转bool为"false"
} else {
    title.innerHTML = "发言讨论结束，大家请投票";
}

// 按数组长短克隆box
for (var i = 1; i < group.length; i++) {
    var box0 = document.getElementById('box-0');
    var boxClone = box0.cloneNode(true);
    boxClone.setAttribute("id", "box-" + i);
    box0.parentNode.appendChild(boxClone);
}

// 玩家序号
for (var x = 0; x < group.length; x++) {
    id[x].innerHTML = group[x];
    txt[x].innerHTML = x + 1 + "号";
}

// 绑定每个box的click事件
for (let i = 0; i < group.length; i++) {
    box[i].addEventListener("click", function () {
        boxClick(i)
    });
}

// 已死玩家黑屏
for (var i = 0; i < group.length; i++) {
    if (killNumGroup.indexOf(i) != -1) {
        box[i].style.background = "#666666";
    }
}

// 小刀图标不显示
function chooseNone() {
    for (let i = 0; i < group.length; i++) {
        choose[i].style.display = "none";
    }
}

// 每个box选项click事件
function boxClick(x) {
    // 点击box玩家未被杀死
    if (killNumGroup.indexOf(x) == -1) {
        // 杀手杀人页面跳转
        if (bool == "true") {
            //点击box身份为杀手
            if (group[x] == "杀手") {
                alert("不能杀死自己")
                chooseNone();  // 小刀图标不显示
                killNumber = null;  //选中序号null
            } else {
                chooseNone();  // 小刀图标不显示
                choose[x].style.display = "flex";   // 小刀图标显示
                killNumber = x; //选中序号为x
            }
        // 全民投票页面跳转
        } else {
            chooseNone();
            choose[x].style.display = "flex";
            killNumber = x;
        }
    // 点击box玩家已被杀死
    } else {
        chooseNone();
        alert("该玩家已死亡");
        killNumber = null;
    }
    console.log("x=", x);
}

// 投死按钮
function btnClick() {
    // 当选中序号存在时执行
    if (killNumber != null) {
        killNumGroup.push(killNumber);  // 选中序号存入被杀数组
        storage.setItem("killNumGroup", JSON.stringify(killNumGroup));
        var kill = Math.floor(group.length / 4);
        var man = group.length - kill;
        for (let i = 0; i < killNumGroup.length; i++) {
            if (group[killNumGroup[i]] == "杀手") {
                kill = kill - 1; // 剩下杀手数目
            } else {
                man = man - 1;  // 剩下平民数目
            }
        }
        storage.setItem("kill", JSON.stringify(kill));
        storage.setItem("man", JSON.stringify(man));
        // 杀手全部死亡，平民胜利
        if (kill == 0) {
            storage.setItem("result", true);
            window.location.href = '../../02-07-result/html/02-07-result.html'
        // 杀手数>=平民数，杀手胜利
        } else if (kill >= man) {
            storage.setItem("result", false);
            window.location.href = '../../02-07-result/html/02-07-result.html'
        // 游戏未结束
        } else {
            //全民投票跳转则day+1
            if (bool == "false") {
                day = day + 1;
                storage.setItem("day", JSON.stringify(day));
            }
            window.history.go(-1);
        }
    }
}