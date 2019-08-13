/**
 * Created by Administrator on 2019/7/26.
 */
function getStyle(elem,attr) { //标签：elem，样式名：attr
    if(elem.currentStyle){ //有值  ie
        var w = elem.currentStyle[attr];
    }else{
        var w = getComputedStyle(elem)[attr];
    }
    return w;
}



//2.运动
function move(elem,attr,step,target) {
    //4.确定步长值的正负
    step = parseInt(getStyle(elem,attr)) < target ? step : -step;
    clearInterval(elem.timer);
    elem.timer = setInterval(function () {
        //1.在当前值的基础上+10
        var speed = parseInt(getStyle(elem,attr))+step;

        //3.停止定时器
        if((speed>=target && step > 0) ||(speed<=target && step < 0) ){
            speed = target;
            clearInterval(elem.timer);
        }

        //2.设置到标签
        elem.style[attr] = speed +"px";
    },30)
}
//3、拖拽
function drag(elem) {
    elem.onmousedown = function (ev) {
        //鼠标的位置-div的offset
        var ev = window.event || ev;
        var l = ev.clientX - elem.offsetLeft;
        var t = ev.clientY - elem.offsetTop;
        //2.拖动
        document.onmousemove = function (ev) {
            var ev = window.event || ev;
            var x = ev.clientX - l;
            var y = ev.clientY - t;
            elem.style.left = x +"px";
            elem.style.top = y +"px";
        }
        //3.松手
        document.onmouseup = function () {
            if(elem.releaseCapture){
                elem.releaseCapture();
            }
            document.onmousemove = document.onmouseup = null;
        }
        //添加一个全局捕获
        if(elem.setCapture){
            elem.setCapture();
        }
        return false; //ie8- 不起作用
    }
}
// 4.1、封装半成品
function bufferMove1(elem,attr,target) { //运动元素elem, 运动属性attr 目标值target
    var timer = setInterval(function () {
        //1.获取当前值
        var cur = parseInt(getStyle(elem,attr));
        //2.计算速度 速度 = (目标值-当前值)/时间
        var speed = (target-cur)/10; //0.9
        //左-右 上    右-左  下
        speed = speed>0?Math.ceil(speed) : Math.floor(speed);
        //4.停止定时器
        if(cur == target){
            clearInterval(timer);
        }
        //3.当前值+速度
        elem.style[attr] = cur + speed+ "px";
    },30);
}

//4、缓冲运动
function bufferMove(elem,items) {
    clearInterval(elem.timer);
    elem.timer = setInterval(function () {
        var tag = true; //假设全部到达目标点，但凡有一个没有到达，tag = false
        for(var attr in items) {// for(var key in 遍历的对象)  每一次循环的时候，都会将对象前面的名字存储在变量中
            //1.获取当前值 如果是透明度运动，取值的时候需要*100(放大100倍)
            if(attr == "opacity"){
                var cur = parseInt(getStyle(elem,attr)*100);
            }else{
                var cur = parseInt(getStyle(elem,attr));
            }
            //2.计算速度 速度=(目标值-当前值)/时间
            var speed = (items[attr]-cur)/10; //0.9
            //3.将速度取整，方便到达目标点
            speed = speed>0?Math.ceil(speed) : Math.floor(speed);//1  0
            //5.到达目标点，停止定时器
            if(cur != items[attr]){
                tag = false;
            }
            //4.如果是透明度，设置属性的时候，需要/100
            if(attr == "opacity"){
                elem.style[attr] = (cur + speed)/100;
                elem.style.filter = 'alpha(opacity='+(cur+speed)+')'
            }else{
                elem.style[attr] = cur + speed+ "px";
            }
        }
        if(tag == true){
            clearInterval(elem.timer);
        }

    },30);
}


//5.存储
function setCookie(key,value,day) {//key,value
    var oDate = new Date();
    //默认是7天，用户没用指定天数7天，指定天数，看传入的天数
    day = day ? day : 7;
    oDate.setDate(oDate.getDate()+day);
    document.cookie = key+"="+value+";expires="+oDate.toGMTString();
}

//6.取
function getCookie(key) { //key    返回value
    var obj = {};
    //获取cookie
    var cookies = document.cookie.split("; "); //["userName=124", "passWord=345"]
    for(var i = 0;i<cookies.length;i++){
        var c = cookies[i].split("=");
        obj[c[0]] = c[1];
    }
    return obj[key];
}

//7.删除
function removeCookie(key) {
    //key value
    setCookie(key,0,-1);}

//8.ajax
function ajax(req) {
    //①.创建请求对象
    if(window.XMLHttpRequest){
        var request = new XMLHttpRequest();
    }else {
        var request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //②.建立连接
    //get url?   post
    if(req.type.toLowerCase() === "get"){
        //get
        //③处理url，如果有请求参数，就再url的后面拼接请求参数，没有就直接用
        req.url = req.data ? req.url+"?"+req.data : req.url;
        request.open("get",req.url,true);
        request.send();
    }else {
        request.open("post",req.url,true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        req.data ? request.send(req.data) : request.send();
    }
    //④.监听结果
    request.onreadystatechange = function () {
        if(request.readyState === 4){
            if(request.status === 200){
                req.success(request.response);
            }
        }
    }
}
// 9、获取电影数据
function getM(movie) {
    var x=""
    for (var i=0;i<movie.length;i++){
        x+="<li><a href='#'><img src="+movie[i].image+" alt=''></a><a href=''>"+movie[i].title+"</a><p>"+movie[i].detail+"</p>";

        // iUl.innerHTML=x;
        // for (var i=0;i<iLi.length;i++){
        //     var oDefP = iDefinition[i].getElementsByTagName("p")[0];
        switch (movie[i].type) {
            case 1:x+="<span class='green'></span>";break;
            case 2:x+="<span class='orange'></span>";break;
        }
        switch (movie[i].definition) {
            case 1:x+="<div class='definition'><div></div><p>标清</p></div>";break;
            case 2:x+="<div class='definition'><div></div><p>高清</p></div>";break;
            case 3:x+="<div class='definition'><div></div><p>超清</p></div>";break;
        }
        var oGrade=movie[i].grade;
        var gradeArr= oGrade.split(".");
        // var iGrade=iLi[i].get    ElementsByClassName("grade")[0];
        // var iI = iGrade.getElementsByTagName("i")[0];
        // var oOP = iGrade.getElementsByTagName("p")[0];
        // oOP.innerHTML="."+gradeArr[1];
        // iI.innerHTML=gradeArr[0];
        x+="<div class='grade'><i>"+gradeArr[0]+"</i><p>"+'.'+gradeArr[1]+"</p></div></li>"
        // var oOSpan = iLi[i].getElementsByTagName("span")[0];
    }
    // }
    return x
}