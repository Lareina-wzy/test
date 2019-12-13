var storage = window.sessionStorage;
var btn = document.getElementById("btn"); //btn  查看身份按钮id
var no = document.getElementById("no");   //no 上方玩家序号id
var pic = document.getElementsByClassName("m-pic")[0];   //pic 翻牌图片id
btn.addEventListener("click", click);

var inputValue = storage.getItem("inputValue");
var group = JSON.parse(storage.getItem("group"));

var order = true;
var killNumGroup=[];

storage.setItem("killNumGroup", JSON.stringify(killNumGroup));  //killNumGroup 被杀玩家序号数组
storage.setItem("bool", true);   //判断杀手杀人跳转/全民投票跳转
storage.setItem("judge", true);  //判断按钮文字为“返回”/“开始游戏”
storage.setItem("day", JSON.stringify(1));  //天数

//法官日志4个横条未被点击，stepColor[i]为true
for (let i = 0; i < 4; i++) {
    storage.setItem("stepColor"+i, true);   
}

var z = 1;
function click() {
    var x = z + 1;
    // order为true隐藏传递过程页面
    if (order && z <= group.length) {
        no.innerHTML = z; //序号值
        pic.style.background = "url(../../images/sprites3.png) -150px 0 no-repeat";
        order = false;
        // 显示身份
        id.innerHTML = group[z - 1];
        // 按钮文字
        if (z < group.length) {
            btn.innerHTML = "隐藏并传递给" + x + "号";
        } else {
            // order为true但z==group.length 
            btn.innerHTML = "法官查看";
        }
    // order为false查看身份
    } else if (z < group.length) {
        z++;
        no.innerHTML = x;
        id.innerHTML = "";
        btn.innerHTML = "查看" + x + "号身份";
        pic.style.background = "url(../../images/sprites3.png) 0 0 no-repeat";
        order = true;
    // order为false但z==group.length 页面跳转
    } else {
        window.location.href = '../../02-04-vote/html/02-04-vote.html';
    }
}

