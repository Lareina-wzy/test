var storage = window.sessionStorage;
var group = JSON.parse(storage.getItem("group"));
var killNumGroup = JSON.parse(storage.getItem("killNumGroup"));
var day = JSON.parse(storage.getItem("day"));
var kill = JSON.parse(storage.getItem("kill"));
var man = JSON.parse(storage.getItem("man"));
var result = storage.getItem("result");

var announce = document.getElementsByClassName("picture-txt")[0];
var txt01 = document.getElementsByClassName("txt01");
var survive = document.getElementsByClassName("survive");
var dayname = document.getElementsByClassName("day");
var event = document.getElementsByClassName("event");


function over() {
    if (result == "true") {
        announce.innerHTML = "平民胜利";
        txt01.innerHTML = "太棒了!你知道么？在捉鬼游戏中只有20%的卧底取得游戏最终的胜利哦！"
    } else {
        announce.innerHTML = "杀手胜利";
        txt01.innerHTML = "太棒了!你知道么？在捉鬼游戏中只有20%的卧底取得游戏最终的胜利哦！"
    }
    survive[0].innerHTML = "杀&nbsp;手" + kill + "人";
    survive[1].innerHTML = "平&nbsp;民" + man + "人";
}

over()


console.log("day=", day)

console.log(group);
console.log(killNumGroup);
console.log(killNumGroup.length);

function clone() {
    // 克隆
    for (var i = 1; i < day; i++) {
        var box0 = document.getElementById('box-0');
        var boxClone = box0.cloneNode(true);
        boxClone.setAttribute("id", "box-" + i);
        box0.parentNode.appendChild(boxClone);
    }
    for (let i = 0; i < day; i++) {
        dayname[i].innerHTML = "第" + (i + 1) + "天";
    }
    // 日志
    for (let i = 0; i < killNumGroup.length; i = i + 2) {
        let x = killNumGroup[i];
        let y = killNumGroup[i + 1];
        event[i].innerHTML = "晚上：" + (x + 1) + " 号被杀手杀死，" + (x + 1) + "号是" + group[x];
        if (i < killNumGroup.length - 1) {
            event[i + 1].innerHTML = "白天：" + (y + 1) + " 号被全民投票投死，" + (y + 1) + "号是" + group[y];
        }
    }
}
clone();