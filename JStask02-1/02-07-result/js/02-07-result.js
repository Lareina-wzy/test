var storage = window.sessionStorage;
var group = JSON.parse(storage.getItem("group"));
var killGroup = JSON.parse(storage.getItem("killGroup"));
var day = JSON.parse(storage.getItem("day"));
var kill = JSON.parse(storage.getItem("kill"));
var man = JSON.parse(storage.getItem("man"));
var result = JSON.parse(storage.getItem("result"));

if (result) {
    $(".picture-txt").html("平民胜利");
    $(".txt01").html("太棒了!你知道么？在捉鬼游戏中只有20%的卧底取得游戏最终的胜利哦！");
} else {
    $(".picture-txt").html("杀手胜利");
    $(".txt01").html("太棒了!你知道么？在捉鬼游戏中只有20%的卧底取得游戏最终的胜利哦！");
}
$(".survive").eq(0).html("杀&nbsp;手" + kill + "人");
$(".survive").eq(1).html("平&nbsp;民" + man + "人");


console.log("day=", day)
console.log(group);
console.log(killGroup);
console.log(killGroup.length);


// 克隆
for (let i = 1; i < day; i++) {
    $(".g-mainwhite").append($(".group").clone());
}
for (let i = 0; i < day; i++) {
    $(".day").eq(i).html("第" + (i + 1) + "天");
}

// 日志
for (let i = 0; i < killGroup.length; i++) {
    if (i % 2 == 0) {
        $(".event").eq(i).html("晚上：" + (killGroup[i] + 1) + " 号被杀手杀死，" + (killGroup[i] + 1) + "号是" + group[killGroup[i]]);
    } else {
        $(".event").eq(i).html("白天：" + (killGroup[i] + 1) + " 号被全民投票投死，" + (killGroup[i] + 1) + "号是" + group[killGroup[i]]);
    }
}