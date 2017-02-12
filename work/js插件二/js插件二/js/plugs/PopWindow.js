/**
 * Created by Administrator on 2017-01-11.
 */
/**
 * Created by Administrator on 2017-01-11.
 */
function PopWindow(w,h){
    this.width = w;
    this.height = h;
    this.oDivBg=$("<div></div>");
    this.oDivBox = $("<div></div>");
    this.oDivTitle = $("<div></div>");;
    this.oDivMsg = $("<div></div>");;
    this.oDivBootm = $("<div></div>");
    this.oBtLeft = $("<button class='btn btn-success'></button>");
    this.oBtRight = $("<button class='btn btn-danger'></button>");
    this.init=function(){
        //背景
        this.oDivBg.css("width",$(window).width());

        ;
        this.oDivBg.css("height",$(window).height());
        this.oDivBg.css("background-color","red");
        this.oDivBg.css("opacity",0.5);
        //this.oDivBg.css("position","absolute")
        this.oDivBg.css("position","fixed");
        this.oDivBg.css("top","0px");


        //最大的DIV
        this.oDivBox.css("background-color","gray");
        this.oDivBox.css("width",this.width);
        //this.oDivBox.css("width",this.width);
        //this.oDivBox.css("height",this.height);
        this.oDivBox.css("height",this.height);
        this.oDivBox.css("position","fixed")
        this.oDivBox.css("border","1px solid red");
        this.oDivBox.css("left",$(window).width()/2-this.width/2);
        this.oDivBox.css("top",$(window).height()/2-this.height/2);
        //title的DIV
        this.oDivTitle.css("width","100%");
        this.oDivTitle.css("height","20%");
        this.oDivTitle.css("border","1px solid blue");
        this.oDivTitle.appendTo(this.oDivBox);
        //msg的DIV
        this.oDivMsg.css("width","100%");
        this.oDivMsg.css("height","55%");
        this.oDivMsg.css("border","1px solid black");
        this.oDivMsg.appendTo(this.oDivBox);
        //bootm的DIV





        this.oDivBootm.css("width","100%");
        this.oDivBootm.css("height","25%");
        this.oDivBootm.css("border","1px solid blue");
        this.oDivBootm.append(this.oBtLeft);
        this.oDivBootm.append(this.oBtRight);

        this.oDivBootm.appendTo(this.oDivBox);


        this.oDivBg.appendTo($("#divTest"));
        this.oDivBox.appendTo($("#divTest"));

    }
    this.setTitle=function(msg){
        this.oDivTitle.html(msg);
    }
    this.setMessage=function(msg){
        this.oDivMsg.html(msg);
    }

    this.showAlert=function(id){
        this.oDivBox.appendTo($("#"+id));
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
                $("#test").children().remove();
            }
        })

    }

    this.setPosition=function(x,y){
        this.oDivBox.css("left",$(window).width()/2-this.width/2);
        this.oDivBox.css("top",$(window).height()/2-this.height/2);

    }


}

