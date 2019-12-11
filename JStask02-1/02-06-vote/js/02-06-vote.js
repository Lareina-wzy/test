var storage = window.sessionStorage;
var group = JSON.parse(storage.getItem("group"));
var day = JSON.parse(storage.getItem("day"));
var bool = JSON.parse(storage.getItem("bool"));
var killGroup = JSON.parse(storage.getItem("killGroup"));

var colorAfter = "#A8A8A8";
var colorBefore = "#29BDE0";
var colorKill = "#666666"; //死亡背景色
var killNumber, kill, man;

console.log("group=", group);
console.log("day=", day);
console.log("killGroup=", killGroup);

// 杀手杀人页面跳转bool为"true"
if (killGroup.length < day * 2 - 1 && bool) {
    $("#title").html("杀手请选择要杀死的目标");
    $(".select").html("确定杀死对象");
    // 全民投票页面跳转bool为"false"
} else if (killGroup.length < day * 2 && bool == false) {
    $("#title").html("发言讨论结束，大家请投票");
    $(".select").html("确定投票对象");
} else {
    $("#title").html("本轮您已选择，请返回");
    $(".select").html("点击此处返回");
}

// 按数组长短克隆box
for (var i = 0; i < group.length - 1; i++) {
    $(".g-main").append($("#box-0").clone().attr("id", "box-" + (i + 1)));
}

// 输出编号身份text
for (var i = 0; i < group.length; i++) {
    $(".id").eq(i).html(group[i]);
    $(".txt").eq(i).html((i + 1) + "号");
}

// 死亡玩家黑屏
for (var i = 0; i < group.length; i++) {
    if (killGroup.indexOf(i) != -1) {
        $(".box").eq(i).css({
            "background": colorKill
        });
    }
}

// 小刀图标不显示
$(".choose").css({
    "display": "none"
});

for (let i = 0; i < group.length; i++) {
    $(".box").eq(i).on("click", function () {
        click(i);
    })
}

function click(i) {
    if ((killGroup.length < day * 2 - 1 && bool) || (killGroup.length < day * 2 && bool == false)) {
        $(".choose").css({
            "display": "none"
        });
        // 点击的box玩家未被杀死
        if (killGroup.indexOf(i) == -1) {
            // 选中杀手
            if (group[i] == "杀手") {
                // 杀手杀人页面跳转
                if (bool) {
                    alert("不能杀死自己");
                    killNumber = null;
                    // 全民投票页面跳转
                } else {
                    $(".choose").eq(i).css({
                        "display": "flex"
                    });
                    killNumber = i;
                }
            } else {
                $(".choose").eq(i).css({
                    "display": "flex"
                });
                killNumber = i;
            }
            // 点击的box玩家已被杀死
        } else {
            killNumber = null;
            alert("该玩家已死亡");
        }
    } else {
        killNumber = "back";
        alert("本轮您已选择，请返回")
    }
}





$(".select").on("click", function () {
    if (killNumber == "back") {
        window.location.href = "../../02-05-judge/html/02-05-judge.html"
    } else if (killNumber != null) {
        killGroup.push(killNumber);
        storage.setItem("killGroup", JSON.stringify(killGroup));
        kill = Math.floor(group.length / 4);
        man = group.length - kill;
        for (let i = 0; i < killGroup.length; i++) {
            if (group[killGroup[i]] == "杀手") {
                kill = kill - 1; // 剩下杀手数目
            } else {
                man = man - 1; // 剩下平民数目
            }
        }
        storage.setItem("kill", JSON.stringify(kill));
        storage.setItem("man", JSON.stringify(man));
        // 杀手全部死亡，平民胜利
        if (kill == 0) {
            storage.setItem("result", JSON.stringify(true));
            window.location.href = '../../02-07-result/html/02-07-result.html'
            // 杀手数>=平民数，杀手胜利
        } else if (kill >= man) {
            storage.setItem("result", JSON.stringify(false));
            window.location.href = '../../02-07-result/html/02-07-result.html'
            // 游戏未结束
        } else {
            //全民投票跳转则day+1
            if (bool == false) {
                day = day + 1;
                storage.setItem("day", JSON.stringify(day));
            }
            window.location.href = "../../02-05-judge/html/02-05-judge.html"
        }
    } else {
        alert("请选择一位玩家");
    }
});