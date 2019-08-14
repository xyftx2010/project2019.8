(function () {
    var oForm = document.getElementsByTagName("form")[0];
    var oSpan = oForm.getElementsByTagName("span");
    var tag   = true;
    var verCBox=document.getElementById("verCBox");
    var refresh1=document.getElementById("refresh1");
    var strength =document.getElementById("strength");
    var tip   = document.getElementById("tip");
    var oP    = oForm.getElementsByTagName("p");
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
    oForm.user.onfocus = function(){
        oP[1].style.display = "none"
    }

    oForm.passWord.onfocus = function(){
        oP[2].style.display = "none"
    }

    oForm.verC.onfocus=function(){
        oP[3].style.display = "none"
    }
    oForm.verC.onblur=function() {
        if (this.value == "") {
            oP[3].style.display = "inline-block"

        }
    }
        refresh1.onclick = function () {
            verCBox.innerHTML = "";
            var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
                's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
            for (var i = 0; i < 4; i++) {
                var index = parseInt(Math.random() * arr.length)
                verCBox.innerHTML += arr[index]
            }
        }
        oForm.onsubmit = function () {
            if (oForm.verC.value.toUpperCase() != verCBox.innerHTML.toUpperCase()) {
                tip.innerHTML = "验证码错误";
                return false
            }
        }
        oForm.user.onblur = function () {
            var reg = /^1[3-9]\d{9}$/;
            if (reg.test(this.value) === false) {
                tip.innerHTML = "手机号格式不正确"
            } else {
                tip.innerHTML = "";
            }
            if (this.value==""){
                oP[1].style.display = "inline-block"
            }
        }
        oForm.passWord.onblur = function () {
            var reg = /^\d{6,8}$|^[a-zA-Z]{6,8}$|^[\W_]{6,8}$/
            if (this.value.length < 6) {
                tip.innerHTML = "请输入6-32位英文、数字和符号的组合密码"
            } else if (reg.test(this.value)) {
                tip.innerHTML = "密码过于简单，请试试英文、数字和符号的组合"
            } else {
                tip.innerHTML = ""
            }
            if (this.value==""){
                oP[2].style.display = "inline-block"
            }
        }
        oForm.passWord.onpropertychange = oForm.passWord.oninput = function () {
            // 弱
            var reg1 = /^\d{9,}$|^[a-zA-Z]{9,}$|^[\W_]{9,}$/;
            // 中
            var reg2 = /(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[\W_]+$)(^[a-zA-Z0-9]{6,32}$|^[a-zA-Z\W_]{6,32}$|^[0-9\W_]{6,32}$)/;
            // 强
            var reg3 = /(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[\W_].*)^([\W\w]{6,32}$)/;
            if (reg3.test(this.value)) {
                strength.className = "strength4";
            } else if (reg2.test(this.value)) {
                strength.className = "strength3";
            } else if (reg1.test(this.value)) {
                strength.className = "strength2";
            } else {
                strength.className = "strength";
            }
        }
        oForm.onsubmit = function () {
            var reg = /^\d{6,8}$|^[a-zA-Z]{6,8}$|^[\W_]{6,8}$/;
            var reg2 = /^1[3-9]\d{9}$/;
            if (reg2.test(oForm.user.value) === false) {
                tip.innerHTML = "手机号格式不正确"
                return false
            } else if (oForm.user.value == "") {
                tip.innerHTML = "请输入账号";
                return false
            } else if (oForm.passWord.value == "") {
                tip.innerHTML = "请输入密码";
                return false
            } else if (oForm.verC.value == "") {
                tip.innerHTML = "请输入验证码";
                return false
            } else if (oForm.verC.value.toUpperCase() != verCBox.innerHTML.toUpperCase()) {
                tip.innerHTML = "验证码错误";
                return false
            } else if (reg.test(oForm.passWord.value) == true) {
                tip.innerHTML = "密码过于简单，请试试英文、数字和符号的组合";
                return false
            } else if (oForm.passWord.value.length < 6) {
                tip.innerHTML = "请输入6-32位英文、数字和符号的组合密码";
                return false
            }
        }

})()