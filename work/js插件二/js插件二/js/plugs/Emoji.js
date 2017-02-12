/**
 * Created by Administrator on 2017-01-12.
 */

function Emoji(ary){
    this.ary=ary;
    this.oDiv = $("<div></div>");
    this.oDiv.css({
        "width":"400px",
        "height":"200px",
        "position":"absolute",
        "border":"1px solid red"
    });
    for(var i = 0; i < this.ary.length;i++){
        //$("<img  src ='img/1.gif'/>")

        var oImg = $("<img class='emojiActive' src="+"img/"+this.ary[i]+"  />")
        //var oImg = $("<img  src="+"img/"+this.ary[i]+"/>")
         oImg.appendTo(this.oDiv);
         //oImg.on("mouseover",function(){
         //     $(this).css("background-color","blue");
         //})
        oImg.on("click",function(){
           //alert( $(this).attr("src"))
            var imgurl ="<img src="+ $(this).attr("src")+" />";

            $("#chat").append(imgurl)
        })

    }




    this.show=function(){
        this.oDiv.appendTo($("#divTest"));
           //this.oDiv.appendTo($("#"+id));
    }

}
