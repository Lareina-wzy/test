var xmlhttp;

var userValue, pwValue;
var user = document.getElementById("user");
var password = document.getElementById("password");
var textBack = document.getElementById("main_textback");


function loadXMLDoc(url, cfunc) {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = cfunc;
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xmlhttp.send("name=" + userValue + "&pwd=" + pwValue);
    // xmlhttp.open("GET", url + "name=" + userValue + "&pwd=" + pwValue, true);
    // xmlhttp.send();
}

function btnClick() {
    event.preventDefault();
    pwValue = password.value;
    userValue = user.value;
    loadXMLDoc("/carrots-admin-ajax/a/login", function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            if (response.message == "success") {
                textBack.innerHTML = "";
                window.location.href = "http://dev.admin.carrots.ptteng.com/;";
            } else {
                textBack.innerHTML = response.message;
            }
        }
    });
}

