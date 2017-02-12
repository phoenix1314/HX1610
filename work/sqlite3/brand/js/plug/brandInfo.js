/**
 * Created by dragon on 2017/1/19.
 */
/**创建商品信息表*/
function  brandInfo(w,h) {
    this.width = w;
    this.height = h;
    this.oDiv = $("<div></div>");
    this.oText = $("<p></p>");
    this.oTable;
    // this.oTr=$("<tr></tr>");
    //  this.oTh;
    this.column; /***< 表格的列数*/
    this.addTdNum = 0; /***<添加的函数*/
    var self = this;

    this.oDiv.css({
        "width":this.width+"px",
        "height":this.height+"px",
        "border":"1px red solid"
    });

    /**创建div*/
    this.init = function (id) {
        this.oDiv.appendTo($("#"+id));
    }

    /**表格的文字说明*/
    this.setTextDeclare = function (text) {
        this.oText.html(text);
        this.oText.appendTo(this.oDiv);
    }

    /**创建表格*/
    this.createTable = function () {
        this.oTable =$("<table contenteditable = 'true'></table>");
        this.oTable.css(
            {
                "border":"1px blcak solid",
                "cellpadding":"5px"
            }
        );
        // this.oTr.appendTo(this.oTable);
        this.oTable.appendTo(this.oDiv);
    }

    /**创建表头*/
    this.setTh=function (arry) {
        var $oTr=$("<tr></tr>");
        var th = arry;
        self.column = th.length;
        console.log("th len: ",th.length);
        for (var i  = 0;i<th.length;i++)
        {
            var oTh=$("<th>" + th[i]+"</th>");
            oTh.css("background-color", "green");
            oTh.appendTo($oTr);
        }
        $oTr.appendTo(this.oTable);
    }

    /**创建数据库*/
    this.brandDB = new webSQL("brandData");
    var thStr = ["id ","name","origin_id","img","price"];
    this.brandDB.create("brand",thStr);

    /**按钮 增加一行*/
    this.setBtnAdd= function (btnText) {
            var oBtnAdd=$("<button>"+btnText+"</button>");
            oBtnAdd.appendTo(this.oDiv);

            oBtnAdd.on("click",function () {
                self.addTdNum++;
                var $oTr=$("<tr></tr>");
                console.log("table column:"+self.column);
                for (var i = 0;i<self.column;i++)
                {
                    var $oTd;
                    if(i == 0)
                    {
                        $oTd =$("<td>"+self.addTdNum+"</td>");
                    }
                    else if(i == (self.column-1))
                    {
                        var save = $("<button>add</button>");
                        var update = $("<button>update</button>");
                        var del = $("<button>del</button>");
                        $oTd =$("<td>"+save+update+del+"</td>");
                    }
                    else
                    {
                        $oTd=$("<td></td>");
                    }
                    $oTd.css("background-color", "pink");
                    $oTd.appendTo($oTr);
                }
                $oTr.css("height","20px");
                $oTr.appendTo(self.oTable);
            })
    }

    /**按钮 确认添加*/
    this.setBtnOk= function (btnText) {
        var oBtnOk=$("<button>"+btnText+"</button>");
        oBtnOk.appendTo(this.oDiv);
        oBtnOk.on("click",function () {
            
        })
    }



}