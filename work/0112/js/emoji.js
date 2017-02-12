/**
 * Created by dragon on 2017/1/12.
 */
function emoji(w,h,ary,imgPath,msgId) {
    this.width = w;
    this.height = h;
    this.imgPath = imgPath;
    this.ary = ary;
    this.oDiv = $("<div></div>");
    this.oDiv.css({
        "width": this.width + "px",
        "height": this.height + "px",
        "position": "absolute",
        "border": "1px solid red",
        "overflow-y": "auto"
    });
    var $div = this.oDiv;
    for (var i = 0; i < this.ary.length; i++) {
        var oImg = $("<img class='emojiActive' src=" + this.imgPath + this.ary[i] + "  />")
        oImg.appendTo(this.oDiv);
        oImg.on("mouseover",function(){
            $(this).css("background-color","#d9d9d9");
        })
        oImg.on("mouseout",function(){
            $(this).css("background-color","");
        })
        oImg.on("click", function () {

            var imgurl = "<img src=" + $(this).attr("src") + " />";

            $("#"+msgId).append(imgurl)
            $div.remove();
            console.log("img***********")
        })
    }

    this.init=function (obj) {
        console.log("init***********")
        this.oDiv.appendTo(obj);
    }

    this.setDel=function () {
        this.oDiv.hide();
    }

}