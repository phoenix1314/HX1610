/**
 * Created by Administrator on 2017-01-11.
 * (200,100,"输入非法","内容超过20000字","okkk",showIndex,"exit")
 */
function PopWindow(w,h,title,msg,btLName,btLFn,btRName){
    this.width = w;
    this.height = h;
    this.titleMSG = title;
    this.msg = msg;
    this.btLName= btLName;
    this.btLFn=btLFn;
    this.btRName = btRName;


    this.oDivBox = $("<div></div>");
    this.oDivTitle = $("<div></div>");;
    this.oDivMsg = $("<div></div>");;
    this.oDivBootm = $("<div></div>");
    this.oBtLeft = $("<button></button>");
    this.oBtRight = $("<button></button>");
    this.create=function(){
        //最大的DIV
        this.oDivBox.css("width",this.width);
        this.oDivBox.css("height",this.height);
        this.oDivBox.css("position","relative")
        this.oDivBox.css("border","1px solid red");
        //title的DIV
        this.oDivTitle.css("width","100%");
        this.oDivTitle.css("height","20%");
        this.oDivTitle.css("border","1px solid blue");
        this.oDivTitle.appendTo(this.oDivBox);
       //msg的DIV
        this.oDivMsg.css("width","100%");
        this.oDivMsg.css("height","60%");
        this.oDivMsg.css("border","1px solid black");
        this.oDivMsg.appendTo(this.oDivBox);
        //bootm的DIV

        this.oDivBootm.css("width","100%");
        this.oDivBootm.css("height","20%");
        this.oDivBootm.css("border","1px solid blue");
        this.oDivBootm.append(this.oBtLeft);
        this.oDivBootm.append(this.oBtRight);

        this.oDivBootm.appendTo(this.oDivBox);



        this.oDivBox.appendTo($("#divTest"));

        this.setTitle(this.titleMSG);
        this.setMessage(this.msg);
        this.setLeftButton(this.btLName,this.btLFn);
        this.setRightButton(this.btRName);




    }
    this.setTitle=function(msg){
        this.oDivTitle.html(msg);
    }
    this.setMessage=function(msg){
        this.oDivMsg.html(msg);
    }

    this.setLeftButton=function(btnName,fn){
        this.oBtLeft.html(btnName);
        this.oBtLeft.on("click",fn);

    }
    this.setRightButton=function(btnName,fn){
        this.oBtRight.html(btnName);
        var arg = fn ? fn : 0;
        this.oBtRight.on("click",function(){
            if(arg){
                arg()
            }
            else{
                $("#divTest").children().remove();
            }
        })

    }

    this.setPosition=function(x,y){
        this.oDivBox.css("left",x);
        this.oDivBox.css("top",y);

    }


}