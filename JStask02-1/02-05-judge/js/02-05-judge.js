var storage = window.sessionStorage;
var group = JSON.parse(storage.getItem("group"));
var day = JSON.parse(storage.getItem("day"));
var bool = JSON.parse(storage.getItem("bool"));
var killGroup = JSON.parse(storage.getItem("killGroup"));

var x, y, i;
var colorAfter = "#A8A8A8";
var colorBefore = "#29BDE0";

storage.setItem("judge", JSON.stringify(false));

console.log("group=", group);
console.log("day=", day);
console.log("killGroup=", killGroup);

// 克隆第几天
for (let i = 0; i < day - 1; i++) {
    $(".g-main").append($(".box-0").clone().attr("id", "box-" + (i + 1)));
    $(".g-choose").eq(i).hide();
    $(".daytitle").eq(i + 1).html("第" + (i + 2) + "天");
}

// 下拉菜单
for (let i = 0; i < day; i++) {
    $(".g-title").eq(i).on("click", function () {
        $(".g-choose").eq(i).toggle();
    });
}

// 全民投票跳转回此页面，新增加天数框下选项条状态为true（未点击）
if (bool == false) {
    for (let i = 0; i < 4 * day; i++) {
        if (i >= (4 * day - 4)) {
            storage.setItem("stepColor" + i, true);
        }
    }
}

// 背景颜色
for (let i = 0; i < (4 * day); i++) {
    var colorJudge = storage.getItem("stepColor" + i);
    if (colorJudge == "false") {
        $(".txt").eq(i).css({
            "background-color": colorAfter
        });
        $(".square").eq(i).css({
            "borderRightColor": colorAfter
        });
    } else {
        $(".txt").eq(i).css({
            "background-color": colorBefore
        });
        $(".square").eq(i).css({
            "borderRightColor": colorBefore
        });
    }
}

// 显示被杀人身份文字信息
for (let i = 0; i < killGroup.length; i++) {
    $(".txtww").eq(i).css({
        "height": "16px",
        "marginBottom": "10px"
    })
    $(".txtww").eq(i).html((killGroup[i]+1) + "号玩家被杀死，他的真实身份是：" + group[killGroup[i]]);
}

// 蓝条点击事件
for (let i = 0; i < 4 * day; i++) {
    $(".txt").eq(i).on("click", function () {
        // 点击每天第一栏凶手杀人
        if (i % 4 == 0) {
            // 第一栏未被点击为true时
            if (storage.getItem("stepColor" + i) == "true") {
                $(".txt").eq(i).css({
                    "background-color": colorAfter
                });
                $(".square").eq(i).css({
                    "borderRightColor": colorAfter
                });
                storage.setItem("stepColor" + i, false);
                storage.setItem("bool", JSON.stringify(true));
                window.location.href = "../../02-06-vote/html/02-06-vote.html";
            }
            // 点击其他几栏
        } else {
            // 上一栏已被点击
            if (storage.getItem("stepColor" + (i - 1)) == "false") {
                // 自身未被点击
                if (storage.getItem("stepColor" + i) == "true") {
                    // 设定背景灰色
                    $(".txt").eq(i).css({
                        "background-color": colorAfter
                    });
                    $(".square").eq(i).css({
                        "borderRightColor": colorAfter
                    });
                    storage.setItem("stepColor" + i, false);
                    if (i % 4 == 1) {
                        alert("亡灵发表遗言");
                    } else if (i % 4 == 2) {
                        alert("玩家依次发言");
                    } else if (i % 4 == 3) {
                        storage.setItem("bool", JSON.stringify(false));
                        window.location.href = "../../02-06-vote/html/02-06-vote.html";
                    }
                }
                // 上一栏未被点击
            } else {
                alert("请按顺序点击");
            }
        }
    });
}

$(".over").on("click", function () {
    var z = confirm("确认退出游戏吗");
    if (z == true) {
        window.location.href = '../../02-01-home/html/02-01-home.html';
    }
})