(function () {
    var oForm = document.getElementsByTagName("form")[0];
    var oSpan = oForm.getElementsByTagName("span");
    var tag = true;
    var res1 = document.getElementById("reset1");
    var res2 = document.getElementById("reset2");
    var tip  = document.getElementById("tip");
    var oP   = oForm.getElementsByTagName("p");
    oSpan[0].onclick =oSpan[1].onclick = function () {
        if (tag==true){
            tag=false
        } else {
            tag=true
        }
        if (tag==true){
            oSpan[0].className="checkbox";
        } else{
            oSpan[0].className="checkbox2";
        }
    }
    //
    res1.onclick = function (){
        oForm.user.value="";
        res1.style.display="none";
    }
    res2.onclick = function (){
        oForm.passWord.value="";
        res2.style.display="none";
    }
    oForm.user.onfocus = function(){
        oP[1].style.display = "none"
    }
    oForm.user.onblur = function(){
        if (this.value==""){
            oP[1].style.display = "inline-block"
        }
    }
    oForm.passWord.onfocus = function(){
        oP[2].style.display = "none"
    }
    oForm.passWord.onblur = function(){
        if (this.value==""){
            oP[2].style.display = "inline-block"
        }
    }

    // ie8兼容
    oForm.user.onpropertychange = oForm.user.oninput =function () {

        if (oForm.user.value == "") {
            res1.style.display = "none";
        }else {
            res1.style.display = "block";

        }

    }
    //ie8兼容
    oForm.passWord.onpropertychange=oForm.passWord.oninput =function () {
        if (oForm.passWord.value == "") {
            res2.style.display = "none";
        } else {
            res2.style.display = "block";
        }

    }
    oForm.onsubmit = function () {

        if (oForm.user.value==""){
        tip.innerHTML="请输入账号";
            return false
        }
        if (oForm.passWord.value == "") {
            tip.innerHTML="请输入密码";
            return false
        }
        var arr =[
            {"userName":"111111",
            "passWord":"123456"}
             ]
        for (var i=0;i<arr.length;i++){
            if (oForm.user.value==arr[i].userName && oForm.passWord.value==arr[i].passWord) {
                open("index.html");
                return true
            }
            tip.innerHTML="账号或密码错误";
            return false
        } 

    }
})()