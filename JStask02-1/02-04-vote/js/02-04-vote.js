var storage = window.sessionStorage;
var group = JSON.parse(storage.getItem("group"));
var judge = JSON.parse(storage.getItem("judge"));
var killGroup = JSON.parse(storage.getItem("killGroup"));

var colorKill = "#666666"; //死亡背景色

console.log(group);



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
        $(".box").eq(i).css({"background":colorKill});
    }
}

// 按钮变化
if (judge) {
    $(".select").html("开始游戏");
} else {
    $(".select").html("返回");
}

$(".select").on("click", function(){
    window.location.href="../../02-05-judge/html/02-05-judge.html"
}); 

