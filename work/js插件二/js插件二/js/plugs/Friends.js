/**
 * Created by Administrator on 2017-01-12.
 */

//  var zs = new Friends("1.jpg","Àë¿ªË®µÄÓã");
function Friends(headImg,nick){
    this.headImg = headImg;
    this.nickName=nick;
    this.oDiv=$("<div></div>")
    this.oHead=$("<img src="+this.headImg  +" />");
    this.oNickName=$("<span>"+this.nickName+ "</span>");
    this.oHead.appendTo(this.oDiv);
    this.oNickName.appendTo(this.oDiv);
    this.oDiv.appendTo($("#firends"));
    this.oDiv.css("width","100px");
    this.oDiv.append("<hr>");
    this.oDiv.on("mouseover",function(){
        $(this).css("border","1px solid blue");
    })
    this.oDiv.on("mouseout",function(){
        $(this).css("border","");
    })
    this.oDiv.on("click",function(){
       //alert( $(this).find("span").text() )
      var popW =   new PopWindow(200,100);
        popW.init();
        popW.setTitle($(this).find("span").text());
        popW.setMessage("this is a test");
        popW.setLeftButton("okkk");
        popW.setRightButton("exit");
        popW.showAlert("test")
    })



    this.init=function(){

    }


}
