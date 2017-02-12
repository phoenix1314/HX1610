/**
 * Created by dragon on 2017/1/11.
 */

function popupWindows(w,h,title,content,btnLeftName,btnLeftFn,btnRightName,btnRightFn) {
    this.width = w;
    this.height = h;
    this.title = title;
    this.content = content;
    this.btLeftName= btnLeftName;
    this.btLeftFn=btnLeftFn;
    this.btRightName = btnRightName;

    this.oDivFrame = $("<div></div>");
    this.oDivTitle = $("<div></div>");
    this.oDivContent = $("<div></div>");
    this.oDivBottom = $("<div></div>");
    this.oBtLeft = $("<button></button>");
    this.oBtRight = $("<button></button>");
    this.init=function(){
        //最大的DIV
        this.oDivFrame.css("width",this.width);
        this.oDivFrame.css("height",this.height);
        this.oDivFrame.css("position","relative")
        // this.oDivFrame.css("border","1px solid red");
        this.oDivFrame.css("box-shadow","5px 5px 5px gray");
        this.oDivFrame.css("background-color","#D9D9D9");
        // this.oDivFrame.css("margin","auto");
        this.oDivFrame.css("text-align","center");  //文本居中


        //title的DIV
        this.oDivTitle.css("width","100%");
        this.oDivTitle.css("height","20%");
        // this.oDivTitle.css("border","1px solid blue");
        this.oDivTitle.css("border-bottom","1px solid white")
        this.oDivTitle.appendTo(this.oDivFrame);
        //msg的DIV
        this.oDivContent.css("width","100%");
        this.oDivContent.css("height","60%");
        // this.oDivContent.css("border","1px solid black");
        this.oDivContent.css("border-bottom","1px solid white")
        this.oDivContent.appendTo(this.oDivFrame);

        //bottom的DIV
        this.oDivBottom.css("width","100%");
        this.oDivBottom.css("height","20%");
        // this.oDivBottom.css("border","1px solid blue");
        this.oDivBottom.append(this.oBtLeft);
        this.oDivBottom.append(this.oBtRight);

        this.oDivBottom.appendTo(this.oDivFrame);
        this.oDivFrame.appendTo($("#popup"));

        this.setTitle(this.title);
        this.setMessage(this.content);
        this.setLeftButton(this.btLeftName,this.btLeftFn);
        this.setRightButton(this.btRightName);
    }
    this.setTitle=function(msg){
        this.oDivTitle.html(msg);
        this.oDivTitle.css("line-height",2);
    }
    this.setMessage=function(msg){
        this.oDivContent.html(msg);
        this.oDivContent.css("line-height",2);
    }

    this.setLeftButton=function(btnName,w,h,btnColorbk,marginLeft,marginTop,textcolor,fn){
        // this.oBtLeft.html(btnName);
        this.setBtnStyle(this.oBtLeft,btnName,w,h,btnColorbk,marginLeft,marginTop,textcolor);
        this.oBtLeft.on("click",fn);
    }
    this.setRightButton=function(btnName,w,h,btnColorbk,marginLeft,marginTop,textcolor,fn){
        this.setBtnStyle(this.oBtRight,btnName,w,h,btnColorbk,marginLeft,marginTop,textcolor);
        var arg = fn ? fn : 0;
        this.oBtRight.on("click",function(){
            if(arg){
                arg()
                console.log("exit*****************");
            }
            else{
                $("#popup").children().hide();
            }
        })

    }

    this.setPosition=function(x,y){
        this.oDivFrame.css("left",x);
        this.oDivFrame.css("top",y);
    }

    this.setBtnStyle=function (obj,name,w,h,colorbk,marginLeft,marginTop,textcolor)
    {
        obj.html(name);
        obj.css("background-color",colorbk);
        obj.css("width",w);
        obj.css("height",h);
        obj.css("margin-left",marginLeft);
        obj.css("margin-top",marginTop);
        var textcolorval = textcolor? textcolor : "black";
        obj.css("color",textcolorval)
    }
}