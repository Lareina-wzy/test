var incolor, divcolor, innum, num, start;

// 随机取颜色,取三个不相等的数
function change() {
    // 定时器
    clearInterval(incolor);
    incolor = setInterval(change, 1000);
    // 声明
    divcolor = [];
    num = [];
    var x = Math.floor(Math.random() * 9);
    // 取色

    for (var i = 0; i < 3; i++) {
        // var r = Math.floor(Math.random() * 256);
        // var g = Math.floor(Math.random() * 256);
        // var b = Math.floor(Math.random() * 256);
        // var y = "rgb(" + r + "," + g + "," + b + ")";

        // var y = '#' + Math.random().toString(16).substr(-6);

        var y = '#' + ('00000' + Math.floor(Math.random() * 0x1000000).toString(16)).substr(-6);
        divcolor.push(y);
    }
    // 取值
    for (var i = 0; i < 3;) {
        if (num.indexOf(x) == -1) {
            num.push(x);
            i++;
        } else {
            x = Math.floor(Math.random() * 9);
        }
    }
    // 循环改变颜色
    for (var i = 0; i < 9; i++) {
        document.getElementsByTagName("div")[i].style.background = "#ffa600";
    }
    for (var i = 0; i < 3; i++) {
        document.getElementById("div" + num[i]).style.background = divcolor[i];
    }
}

// 设置点击事件
document.getElementById("start").addEventListener("click", divStart);
document.getElementById("over").addEventListener("click", divOver);

// 点击事件
var zero = true;

function divStart() {
    if (zero) {
        change();
    }
    zero = false;
}

// 点击结束 返回div背景颜色
function divOver() {
    zero = true;
    clearInterval(incolor);
    for (var i = 0; i < 9; i++) {
        document.getElementById("div" + i).style.background = "#ffa600";
    }
}