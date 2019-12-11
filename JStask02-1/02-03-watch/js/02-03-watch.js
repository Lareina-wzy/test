var killGroup =[];
var storage = window.sessionStorage;
var group = JSON.parse(storage.getItem("group"));

storage.setItem("judge", JSON.stringify(true));
storage.setItem("day", JSON.stringify(1));
storage.setItem("killGroup", JSON.stringify(killGroup));

console.log(group);

//法官日志4个横条未被点击，stepColor[i]为true
for (var i = 0; i < 4; i++) {
    storage.setItem("stepColor" + i, true);
}

$("#btn").on('click', btnClick);

var i = 0;
function btnClick() {
    var x = Math.floor(i / 2);
    // i为奇数 隐藏传递过程页面
    if (i % 2 == 1 && x < group.length - 1) {
        $("#no").html(x + 2); //序号值
        $("#btn").html("查看" + (x + 2) + "号身份");
        $("#id").html(""); // 显示身份
        $(".m-pic").css({
            "background": "url(../../images/sprites3.png) 0 0 no-repeat"
        })
        i++;
    // i为偶数查看身份
    } else if (i % 2 == 0 && x < group.length) {
        // 按钮文字 x=group.length-1时为最后一个法官查看
        if (x < group.length - 1) {
            $("#btn").html("隐藏并传递给" + (x + 2) + "号");
        } else {
            $("#btn").html("法官查看");
        }
        $("#id").html(group[x]); // 显示身份
        $(".m-pic").css({
            "background": "url(../../images/sprites3.png) -150px 0 no-repeat"
        })
        i++;
    // i为奇数 但x=group.length-1时，页面跳转
    } else {
        window.location.href = '../../02-04-vote/html/02-04-vote.html';
    }
}



