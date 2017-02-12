/**
 * Created by dragon on 2017/1/12.
 */
function  friend(w,h,headimg,friendName) {
    this.width = w;
    this.height = h;
    this.headimg = headimg;
    this.friendName = friendName;

    this.oDiv =$("<div></div>");
    this.oDiv.css({
        "width":this.width+"px",
        "height":this.height+"px",
        // "border":"1px solid red",
        "border-bottom":"1px solid gray"
    });

    this.oHead = $("<img src="+this.headimg+" />");
    this.oHead.css({
        "width":"30%",
        "height":"100%",
        // "border":"1px solid gray"
    });
    this.oHead.appendTo(this.oDiv);
    this.oHead.on("mouseover",function(){
        $(this).css("border","1px solid blue");
    })
    this.oHead.on("mouseout",function(){
        $(this).css("border","");
    })

    this.oFriendName=$("<span>"+this.friendName+ "</span>");
    this.oFriendName.appendTo(this.oDiv);

    this.oDiv.on("mouseover",function(){
        $(this).css("background-color","#d9d9d9");
    })
    this.oDiv.on("mouseout",function(){
        $(this).css("background-color","");
    })

    this.init = function (frameId) {
        this.oDiv.appendTo($("#"+frameId));

        this.oDiv.on("click",function(){
            console.log("click friend***********")
            var chatW =   new chat(400,500);
            chatW.init(frameId);
            chatW.setName($(this).find("span").text());

        })
    }



}