var goback = document.getElementsByClassName('line');
goback[0].onclick=function(){
    window.history.go(-1);
    // window.history.back(-1);
}

var goout = document.getElementsByClassName('close');
goout[0].onclick=function(){
    var r=confirm("确定结束游戏吗");
	if (r==true){
		window.location.href='../../02-01-home/html/02-01-home.html';
	}
}




