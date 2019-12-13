var i;
var blue="#29BDE0";  //选框未被点击蓝色
var gray="#A8A8A8";  //选框被点击后灰色
var storage = window.sessionStorage;
var bool = storage.getItem("bool");
var group = JSON.parse(storage.getItem("group"));
var killNumGroup = JSON.parse(storage.getItem("killNumGroup")); //killNumGroup 被杀玩家序号数组
var day = JSON.parse(storage.getItem("day"));

var step = document.getElementsByClassName("txt");  //step  每天4组选框class
var btnOver = document.getElementsByClassName("over")[0];  //btnOver 结束游戏按钮
var square = document.getElementsByClassName("square");  //square 4组选框左边小三角
var txtww = document.getElementsByClassName("txtww");  //txtww  被杀人身份信息text框
var txtBox = document.getElementsByClassName("g-choose");    //txtBox   天数下的整个选项选框
var arrow = document.getElementsByClassName("g-title");  //arrow   天数框（点击隐藏txtBox）
var daytitle = document.getElementsByClassName("daytitle"); //daytitle   第几天text
btnOver.addEventListener("click", btnClick);


// 按数组长短克隆box
for (let i = 1; i < day; i++) {
    var box0 = document.getElementById('box-0');
    var boxClone = box0.cloneNode(true);
    boxClone.setAttribute("id", "box-" + i);
    box0.parentNode.appendChild(boxClone);
}
// 每个box显示第几天
for (let i = 0; i < day; i++) {
    daytitle[i].innerHTML = "第" + (i + 1) + "天";
}
// 前几天box隐藏选项框
for (let i = 0; i < day - 1; i++) {
    txtBox[i].style.display = "none";
}

// 全民投票跳转回此页面，新增加天数框下选项条状态为true（未点击）
if (bool == "false") {
    for (let i = 0; i < 4 * day; i++) {
        if (i >= (4 * day - 4)) {
            storage.setItem("stepColor" + i, true);
        }
    }
}

// 选项条及天数框click事件绑定
for (let i = 0; i < (4 * day); i++) {
    step[i].addEventListener("click", function () {
        stepClick(i)
    });
}

for (let i = 0; i < day; i++) {
    arrow[i].addEventListener("click", function () {
        arrowClick(i)
    });
}

console.log(group);

// 下拉菜单显示隐藏
function arrowClick(i) {
    if (txtBox[i].style.display == "none") {
        txtBox[i].style.display = "block";
    } else {
        txtBox[i].style.display = "none";
    }
}

// 按钮点击
function stepClick(i) {
    // 点击每天第一条选项框
    if (i % 4 == 0) {
        // 状态为未被点击
        if (storage.getItem("stepColor" + i)=="true") {
            // 更改背景色
            step[i].style.background = gray;
            square[i].style.borderRightColor = gray;
            storage.setItem("stepColor" + i, false);
            // 杀手杀人页面跳转bool为"true"
            storage.setItem("bool", true);
            // 跳转
            window.location.href = "../../02-06-vote/html/02-06-vote.html";
        }
    // 点击每天其他选项框
    } else {
        // 前一格已被点击
        if (storage.getItem("stepColor" + (i-1))=="false") {
            // 自身未被点击
            if (storage.getItem("stepColor" + i)=="true") {
                // 背景色
                step[i].style.background = gray;
                square[i].style.borderRightColor = gray;
                storage.setItem("stepColor" + i, false);
                if (i % 4 == 1) {
                    alert("亡灵发表遗言");
                } else if (i % 4 == 2) {
                    alert("玩家依次发言");
                } else if (i % 4 == 3) {
                    // 全民投票页面跳转bool为"false"
                    storage.setItem("bool", false);
                    window.location.href = "../../02-06-vote/html/02-06-vote.html";
                }
            }
        // 前一格未被点击
        } else {
            window.alert("请按顺序点击");
        }
    }

}

// 选项框背景颜色由状态值决定
for (let i = 0; i < (4 * day); i++) {
    var colorJudge = storage.getItem("stepColor" + i);
    // false已被点击
    if (colorJudge == "false") {
        step[i].style.background = gray;
        square[i].style.borderRightColor = gray;
    // true未被点击
    } else {
        step[i].style.background = blue;
        square[i].style.borderRightColor = blue;
    }
}

console.log("day=", day);
console.log("killNumGroup=", killNumGroup);


// 显示被杀人身份文字信息
function text() {
    for (let i = 0; i < killNumGroup.length; i++) {
        let x = killNumGroup[i];
        txtww[i].style.height = "16px";
        txtww[i].style.marginBottom = "10px";
        txtww[i].innerHTML = x + 1 + "号玩家被杀死，他的真实身份是：" + group[x];
    }
}
text()


function btnClick() {
    window.location.href = '../../02-01-home/html/02-01-home.html';
}