(function () {
    // 导航banner
    var bigImg = document.getElementById("bigImg");
    var bigLi  = bigImg.getElementsByTagName("li")
    var smallImg = document.getElementById("smallImg");
    var smallLi  = smallImg.getElementsByTagName("li");
    var bannerN = 0;
    var bannerAuto = document.getElementById("banner");
    var bSpan = bannerAuto.getElementsByTagName("span")
    var time ="";
    ajax({
        "url":"https://easy-mock.com/mock/5d4d20d466a6910d9b4fab56/example/1",
        "type":"get",
        "success":function (res) {
            var x="";
            var y="";
            var arr = eval("("+res+")");
            // 获取数据
            for (var i=0;i<arr.data.length;i++){
                x+="<li><a href="+arr.data[i].href+"><img src="+arr.data[i].bigImg+" alt=''></a></li>"
                y+="<li><a href="+arr.data[i].href+"><img src="+arr.data[i].smallImg+" alt=''></a></li>"
            }
            bigImg.innerHTML=x;
            smallImg.innerHTML=y;
            bigLi[0].className="active";
            smallLi[0].className="active";
            // 定时器自动播放
            var timer = setInterval(run,1000)
            function run() {
                bannerN++;
                // console.log(bannerN);
                if (bannerN==smallLi.length){
                    bannerN=0;
                }
                for (var i=0;i<bigLi.length;i++){
                    bigLi[i].className="";
                    smallLi[i].className=""
                    bufferMove(bigLi[i],{"opacity":0})
                }
                bufferMove(bigLi[bannerN],{"opacity":100});
                bigLi[bannerN].className="active";
                smallLi[bannerN].className="active";
            }
            // 缩略图滑动事件
            for (var i=0;i<smallLi.length;i++){
                smallLi[i].index=i;
                smallLi[i].onmouseover =function () {
                    for (var j=0;j<smallLi.length;j++){
                        smallLi[j].className="";
                        bigLi[j].className="";
                        bufferMove(bigLi[j],{"opacity":0});
                    }
                    bufferMove(bigLi[this.index],{"opacity":100});
                    bigLi[this.index].className="active";
                    smallLi[this.index].className="active";
                    bannerN=this.index;

                }
            }
            // span点击事件
            bSpan[0].onclick = function(){
                bannerN--;
                for (var j=0;j<smallLi.length;j++){
                    smallLi[j].className="";
                    bigLi[j].className="";
                    bufferMove(bigLi[j],{"opacity":0});
                }
                if (bannerN<0){
                    bannerN=smallLi.length-1;
                }
                bufferMove(bigLi[bannerN],{"opacity":100});
                bigLi[bannerN].className="active";
                smallLi[bannerN].className="active";
            };
            bSpan[1].onclick = function(){
                bannerN++;
                for (var j=0;j<smallLi.length;j++){
                    smallLi[j].className="";
                    bigLi[j].className="";
                    bufferMove(bigLi[j],{"opacity":0});
                }
                if (bannerN==smallLi.length){
                    bannerN=0;
                }
                bufferMove(bigLi[bannerN],{"opacity":100});
                bigLi[bannerN].className="active";
                smallLi[bannerN].className="active";

            };
            bSpan[0].onmouseover = bSpan[1].onmouseover=function(){
                clearInterval(timer)
            }
            bSpan[0].onmouseout = bSpan[1].onmouseout=function(){
                timer = setInterval(run,1000)
            }
            smallImg.onmousemove = function(){
                clearInterval(timer)
            }
            smallImg.onmouseout= function () {
                timer = setInterval(run,1000)
            }
            bigImg.onmouseover =function () {
                clearInterval(timer)
            }
            bigImg.onmouseout = function () {
                 timer = setInterval(run,1000)
            }
        }

    })

    // bannerAdd
    var oContent = document.getElementsByClassName("contentMain")[0];
    var oSpan   = oContent.getElementsByTagName("span");
    var oImg   =  oContent.getElementsByTagName("img")[0];
    var tag1 =true
    oSpan[0].onclick = function () {
        if (tag1==true){
            // oImg.style.left =-1100+"px";
            bufferMove(oImg,{"left":-1100})
            tag1=false;
        }
    }
    oSpan[1].onclick = function () {
        if (tag1==false){
            bufferMove(oImg,{"left":0})
            tag1=true;
        }
    }
    // 电影数据
    var oUl = document.getElementsByClassName("recommend")[0];
    var oLi = oUl.getElementsByTagName("li");
    var oI  = oUl.getElementsByTagName("i");
    var oDefinition =  oUl.getElementsByClassName("definition");
    var iUl = document.getElementsByClassName("hotShow")[0];
    ajax({
        "url":"https://easy-mock.com/mock/5d4d20d466a6910d9b4fab56/example/2",
        "type":"get",
        "success":function (res) {
            var arr = eval("("+res+")")
            iUl.innerHTML=getM(arr.hot_showing);
            oUl.innerHTML=getM(arr.recommend)
            // console.log(arr);
            // var x=""
            // for (var i=0;i<arr.recommend.length;i++){
            //     x+="<li><a href='#'><img src="+arr.recommend[i].image+" alt=''></a><a href=''>"+arr.recommend[i].title+"</a><p>"+arr.recommend[i].detail+"</p><span></span><div class='definition'><div></div><p></p></div><div class='grade'><i></i><p></p></div></li>";
            // }
            // oUl.innerHTML=x;
            // for (var i=0;i<oLi.length;i++){
            //     var oDefP = oDefinition[i].getElementsByTagName("p")[0];
            //     switch (arr.recommend[i].definition) {
            //         case 1:oDefP.innerHTML="标清";break;
            //         case 2:oDefP.innerHTML="高清";break;
            //         case 3:oDefP.innerHTML="超清";break;
            //     }
            //     var oGrade=arr.recommend[i].grade;
            //     // console.log(oGrade);
            //     var gradeArr= oGrade.split(".");
            //     // console.log(gradeArr[0]);
            //     var iGrade=oLi[i].getElementsByClassName("grade")[0];
            //     var oI = iGrade.getElementsByTagName("i")[0];
            //     var oOP = iGrade.getElementsByTagName("p")[0];
            //     oOP.innerHTML="."+gradeArr[1];
            //     oI.innerHTML=gradeArr[0];
            //     var oOSpan = oLi[i].getElementsByTagName("span")[0];
            //     switch (arr.recommend[i].type) {
            //         case 1:oOSpan.className="green";break;
            //         case 2:oOSpan.className="orange";break;
            //     }
            // }
        }
    })
    // var iUl = document.getElementsByClassName("hotShow")[0];
    // var iLi = iUl.getElementsByTagName("li");
    // var iI  = iUl.getElementsByTagName("i");
    // var iDefinition =  iUl.getElementsByClassName("definition");
    // ajax({
    //     "url":"https://easy-mock.com/mock/5d4d20d466a6910d9b4fab56/example/2",
    //     "type":"get",
    //     "success":function (res) {
    //         var arr = eval("("+res+")")
    //         // console.log(arr);
    //         // console.log(res);
    //         // var x=""
    //         // for (var i=0;i<arr.hot_showing.length;i++){
    //         //     x+="<li><a href='#'><img src="+arr.hot_showing[i].image+" alt=''></a><a href=''>"+arr.hot_showing[i].title+"</a><p>"+arr.hot_showing[i].detail+"</p><span></span><div class='definition'><div></div><p></p></div><div class='grade'><i></i><p></p></div></li>";
    //         // }
    //         // iUl.innerHTML=x;
    //         // for (var i=0;i<iLi.length;i++){
    //         //     var oDefP = iDefinition[i].getElementsByTagName("p")[0];
    //         //     switch (arr.hot_showing[i].definition) {
    //         //         case 1:oDefP.innerHTML="标清";break;
    //         //         case 2:oDefP.innerHTML="高清";break;
    //         //         case 3:oDefP.innerHTML="超清";break;
    //         //     }
    //         //     var oGrade=arr.hot_showing[i].grade;
    //         //     // console.log(oGrade);
    //         //     var gradeArr= oGrade.split(".");
    //         //     console.log(gradeArr[0]);
    //         //     var iGrade=iLi[i].getElementsByClassName("grade")[0];
    //         //     var iI = iGrade.getElementsByTagName("i")[0];
    //         //     var oOP = iGrade.getElementsByTagName("p")[0];
    //         //     oOP.innerHTML="."+gradeArr[1];
    //         //     iI.innerHTML=gradeArr[0];
    //         //     var oOSpan = iLi[i].getElementsByTagName("span")[0];
    //         //     switch (arr.hot_showing[i].type) {
    //         //         case 1:oOSpan.className="green";break;
    //         //         case 2:oOSpan.className="orange";break;
    //         //     }
    //         // }
    //         iUl.innerHTML=getM(arr.hot_showing)
    //     }
    // })




    // 锚点Js
    var oRc = document.getElementsByClassName("rc")[0];
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop
        if(scrollTop >= 800){
            oRc.style.display = "block";
        }else{
            oRc.style.display = "none";
        }
    }


})()