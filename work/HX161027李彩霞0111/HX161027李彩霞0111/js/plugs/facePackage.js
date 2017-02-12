/**
 * Created by dragon on 2017/1/11.
 */
function  facePackage(w,h) {
    this.width = w;
    this.height = h;
    this.oDivFrame = $("<div></div>");
    this.oUlFace = $("<ul></ul>");
    this.oLiFacePos = $("<li></li>");


    this.init=function() {
        //最大的DIV
        this.oDivFrame.css("width", this.width);
        this.oDivFrame.css("height", this.height);
        this.oDivFrame.css("position", "relative")
        this.oDivFrame.css("border","1px solid red");
        // this.oDivFrame.css("box-shadow", "5px 5px 5px gray");
        // this.oDivFrame.css("background-color", "#D9D9D9");
        this.oDivFrame.appendTo($("#popup"));

        this.setUlFrame();
        this.setLi();
    }

    this.setPosition=function(x,y){
        this.oDivFrame.css("left",x);
        this.oDivFrame.css("top",y);
    }

    this.setUlFrame=function (id) {
        this.oUlFace.appendTo(this.oDivFrame);
        this.oUlFace.css("float","left");
        this.oUlFace.css("list-style-type","none");
    }

    this.setLi= function () {
        this.oLiFacePos.appendTo(this.oUlFace);

    }

    this.setImg=function (path,imgName) {
        var $img =$("<img/>");
        var srcStr = path + imgName;
        console.log("src: "+srcStr);
         $img.attr("src",srcStr);
        this.oLiFacePos.append($img);
    }


}