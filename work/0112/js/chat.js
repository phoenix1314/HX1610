/**
 * Created by dragon on 2017/1/12.
 */
function  chat(w,h) {
    this.width = w;
    this.height = h;
    this.oChatDiv = $("<div></div>");
    this.oChatBg=$("<div></div>");
    this.left = $(window).width()/2-this.width/2;
    this.top = $(window).height()/2-this.height/2;
    this.oChatTop = $("<div></div>");
    this.oChatMsg = $("<div></div>");
    this.oChatBottom = $("<div><div");
    this.oChatBtn = $("<button>close</button>");
    this.oChatSel = $("<div></div>");
    this.oChatSend = $("<div contenteditable = true></div>");
    this.oChatBtnSend = $("<button>发 送</button>");
    this.oChatBtnEmoji1=$("<button>表情1</button>");
    this.oChatBtnEmoji2=$("<button>表情2</button>");

    //遮罩层
    // this.oChatBg.css("width",$(window).width());
    // this.oChatBg.css("height",$(window).height());
    // this.oChatBg.css("background-color","red");
    // this.oChatBg.css("opacity",0.1);
    // this.oChatBg.css("position","fixed");
    // this.oChatBg.css("top","0px");

    /**聊天窗口*/
    this.oChatDiv.css(
        {
            "width":this.width+"px",
            "height":this.height+"px",
            "border":"1px solid red",
            "left":this.left,
            "top":this.top,
            "position":"fixed"
            // "background-color":"pink"
        }
    );

    /**聊天窗口-上部分*/
    this.oChatTop.css(
        {
            "width":"100%",
            "height":"15%",
            "border":"1px solid blue",
            // "position": "relative",
            // "position":"absolute"
        }
    );
    this.oChatTop.appendTo(this.oChatDiv);

    this.oChatBtn.css(
        {
            "width":"100px",
            "height":"30px",
            // "position": "relative",
            "float":"right",
            // "top":"10px",
            // "left":"10px"
    });
    this.oChatBtn.appendTo(this.oChatTop);

    var $oDiv = this.oChatDiv;
    this.oChatBtn.on("click",function () {
        console.log("click close chatDiv************");
        $oDiv.slideDown("slow",function () {
            $oDiv.hide();
        })
        // $oDiv.hide();
    })

    /**聊天窗口显示信息*/
    this.oChatMsg.css(
        {
            "width":"100%",
            "height":"60%",
            "border":"1px solid yellow",
        }
    );
    this.oChatMsg.attr("id","chatmsg");
    this.oChatMsg.appendTo(this.oChatDiv);

    /**聊天窗口-底部*/
    this.oChatBottom.css(
        {
            "width":"100%",
            "height":"25%",
            "border":"1px solid purple",
            "float":"left"
        }
    );
    this.oChatBottom.appendTo(this.oChatDiv);

    this.oChatSel.css(
        {
            "width":"100%",
            "height":"25%",
            "border":"1px solid cyan",
        }
    );
    this.oChatSel.appendTo(this.oChatBottom);

    this.oChatBtnEmoji1.appendTo(this.oChatSel);
    this.oChatBtnEmoji2.appendTo(this.oChatSel);

    var msgId = this.oChatMsg.attr("id");
    var selObj = this.oChatSel;
    console.log("msgid: "+msgId)
    this.oChatBtnEmoji1.on("click",function () {
        /*定义数组且赋值*/
        var count = 75;
        var arrayFace = new Array()
        for (var i = 1; i<=count; i++) {
            arrayFace[i-1] = i + ".gif";
            console.log("arrayFace["+i+"]:"+arrayFace[i-1]);
        }
        console.log("arrFace lengtg: "+arrayFace.length);

        var emoji1 = new emoji(300,100,arrayFace,"../images/emoji/",msgId);
        emoji1.init(selObj);

    })

    this.oChatBtnEmoji2.on("click",function () {
        /*定义数组且赋值*/
        var count = 75;
        var arrayFace = new Array()
        for (var i = 1; i<=count; i++) {
            arrayFace[i-1] = i + ".png";
            console.log("arrayFace["+i+"]:"+arrayFace[i-1]);
        }
        console.log("arrFace lengtg: "+arrayFace.length);


        var emoji2 = new emoji(300,100,arrayFace,"../images/face/",msgId);
        emoji2.init(selObj);

    })



    this.oChatSend.css(
        {
            "width":"70%",
            "height":"75%",
            "border":"1px solid gray",
            "float":"left"
            // "position":"absolute"
        }
    );
    this.oChatSend.appendTo(this.oChatBottom);

    this.oChatBtnSend.css(
        {
            "width":"100px",
            "height":"30px",
            "background-color":"cyan",
            "color":"white",
            // "position": "relative",
            "float":"right",
            "top":"30px",
            // "left":"10px"
        });
    this.oChatBtnSend.appendTo(this.oChatBottom);

    this.oChatBtnSend.on("click",function () {
        $(this).siblings().text()
    })


    this.init=function (id) {
        this.oChatDiv.appendTo($("#"+id));
        this.oChatBg.appendTo($("#"+id));
    }

    this.setName=function (friendName) {
        var $p= $("<p>"+friendName+"</p>");
        $p.appendTo(this.oChatTop);
    }
    
}//