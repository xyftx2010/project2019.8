(function () {
    var movie = document.getElementsByClassName("recommend")[0];
    var oDate = document.getElementById("oF");
    var oPop  = document.getElementById("pop");
    var oDl   = document.getElementsByTagName("dl")[0];
    var oDd   = oDl.getElementsByTagName("dd");
    oDd[0].onclick = function(){
        oDd[0].className = "active";
        oDd[1].className = "";
        oDd[2].className = "";
    }
    oDd[1].onclick = function(){
        oDd[1].className = "active";
        oDd[0].className = "";
        oDd[2].className = "";
    }
    oDd[2].onclick = function(){
        oDd[2].className = "active";
        oDd[1].className = "";
        oDd[0].className = "";
    }

    ajax({
        "url":"https://easy-mock.com/mock/5d4d20d466a6910d9b4fab56/example/x1",
        "type":"get",
        "success":function (res) {
            var tag = "";
            var arr = eval("("+res+")");
            oPop.onclick = function () {
                tag = true;
                oDate.className="";
                oPop.className = "active";
                arr.recommend.sort(function (a,b) {
                    return b.welcome-a.welcome
                });
                movie.innerHTML =getM(arr.recommend);
                // location.reload()
            }

            oDate.onclick = function () {
                tag=false;
                oDate.className="active";
                oPop.className = "";
                arr.recommend.sort(function (a,b) {
                    return Date.parse(b.date)-Date.parse(a.date)
                });
                movie.innerHTML =getM(arr.recommend);
                // location.reload()
            }
            arr.recommend.sort(function (a,b) {
                return Date.parse(b.date)-Date.parse(a.date)
            });
            movie.innerHTML =getM(arr.recommend);
            // if (tag==false){
            //     arr.recommend.sort(function (a,b) {
            //         return Date.parse(b.date)-Date.parse(a.date)
            //     });
            //     movie.innerHTML =getM(arr.recommend);
            // } {
            //     arr.recommend.sort(function (a,b) {
            //         return b.welcome-a.welcome
            //     });
            //     movie.innerHTML =getM(arr.recommend);
            // }

            // x=getM(arr.recommend);
            // movie.innerHTML=x;

        }
    })


})()