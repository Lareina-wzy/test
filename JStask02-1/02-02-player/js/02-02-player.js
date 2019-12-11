var storage = window.sessionStorage;

$("#inputtxt").on('input', inputChange);
$("#range").on('input', rangeChange);
$("#add").on('click', myAdd);
$("#subtract").on('click', mySubtract);
$(".select").on('click', btnClick);

var inputValue;
var group = [];
var x, y, z, r, i;

 // 初始值
$("#range").val(4);
$("#inputtxt").val("4");

// 滑动条改变后触发
function rangeChange() {
    $("#inputtxt").val($("#range").val());
    change();
}

// 输入框改变值后触发
function inputChange() {
    this.value = this.value.replace(/[^0-9]+/, '');
    inputValue = $("#inputtxt").val();
    $("#range").val(inputValue);
    // 超出取值范围
    if (inputValue != 0 && inputValue != 1 && inputValue < 4 || inputValue > 18) {
        alert("玩家数量为4-18");
        $("#inputtxt").val("4");
        $("#range").val(4);
        change();
        // 设置输入为空时滑动条值
    } else if (inputValue == "" || inputValue == 0) {
        $("#range").val(4);
        change();
        // 4-18取值内
    } else {
        change();
    }
}

// 加号
function myAdd() {
    var range = $("#range").val()
    $("#range").val(++range);
    $("#inputtxt").val($("#range").val());
    change();
}

// 减号
function mySubtract() {
    var range = $("#range").val()
    $("#range").val(--range);
    $("#inputtxt").val($("#range").val());
    change();
}

function change() {
    x = Math.floor($("#inputtxt").val() / 4);
    y = $("#inputtxt").val() - x;
    // 改变显示平民杀手数量
    $("#killer").html("杀手" + x + "人");
    $("#person").html("平民" + y + "人");
    // 线性渐变
    r = ($("#range").val() - 4) / 14 * 100;
    $("#range").css({
        "background": "linear-gradient(90deg, #29BDE0 " + r + "%, #F0F0F0 " + r + "% )"
    });
}

function btnClick() {
    // 设置杀手平民数量
    x = Math.floor($("#inputtxt").val() / 4);
    y = $("#inputtxt").val() - x;
    for (i = 0; i < $("#inputtxt").val(); i++) {
        if (i < x) {
            group.push("杀手");
        } else {
            group.push("平民");
        }
    }
    
    // 数组乱序
    for (var i = group.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = group[i];
        group[i] = group[j];
        group[j] = temp;
    }
    storage.setItem("group", JSON.stringify(group));
    // 再次验证input输入值
    if ($("#inputtxt").val() >= 4 && $("#inputtxt").val() <= 18) {
        window.location.href = '../../02-03-watch/html/02-03-watch.html';
    } else {
        alert("玩家数量为4-18");
        $("#inputtxt").val("4");
    }
}