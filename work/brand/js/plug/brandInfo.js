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

    /**创建表格*/
    this.createTable = function (id) {
        this.oDivTable = $("<div></div>");
        this.tableId = id;
        this.oTable =$("<table contenteditable = 'true'></table>");
        this.oTable.css(
            {
                "border":"1px blcak solid",
                "cellpadding":"5px"
            }
        );
        // this.oTr.appendTo(this.oTable);
        this.oDivTable.attr("id",this.tableId+"Div");
        this.oTable.attr("id",this.tableId);
        this.oTable.appendTo(this.oDivTable);
        this.oDivTable.appendTo(this.oDiv);
    }

    /**表格的文字说明*/
    this.setTextDeclare = function (text) {
        this.oText.html(text);
        this.oText.appendTo(this.oDivTable);
    }

    /**创建表头*/
    this.setTh=function (arry) {
        var $oTr=$("<tr></tr>");
        var th = arry;
        self.column = th.length;
        console.log("th len: ",th.length);
        for (var i  = 0;i<th.length;i++)
        {
            var oTh=$("<th contenteditable = 'false'>" + th[i]+"</th>");
            oTh.css("background-color", "green");
            oTh.appendTo($oTr);
        }
        $oTr.appendTo(this.oTable);
    }

    /**创建数据库*/
    this.dbInit = function (dataName,tableName,tdName) {
        this.brandDB = new webSQL(dataName);
        this.tdName = tdName;//["id","name","category","origin_id","img","price","operate"];
        this.tableName= tableName;//"brand";
        this.brandDB.create(this.tableName,this.tdName);
        // this.brandDB.drop(this.tableName);
        //  this.brandDB.drop("brand");

        /**查询数据，有则自动填入数据*/
        // var td = $("<td></td>")
        // var $oTr=$("<tr></tr>");
        // $oTr.appendTo(self.oTable);

        this.brandDB.select(this.tableName,this.tableId);

        // this.brandDB.showResult();
    }

    /**按钮 增加一行*/
    this.setBtnAdd= function (btnText) {
            var oBtnAdd=$("<button>"+btnText+"</button>");
            oBtnAdd.appendTo(this.oDivTable);

            oBtnAdd.on("click",function () {
                /**获取表格id*/
                var tableID = oBtnAdd.prev().attr("id");
                console.log("table name is "+tableID);
                var columnNum = $("#"+tableID).find("tr").find("th").length;
                console.log("table column num "+columnNum);
                self.column = columnNum;


                /**插入行*/
                self.addTdNum++;
                var $oTr=$("<tr></tr>");
                console.log("table column:"+self.column);
                for (var i = 0;i<self.column;i++)
                {
                    var $oTd;
                    if(i == (self.column-1))
                    {
                        var oBtnSave=$("<button>add</button>");
                        var oBtnUpdate=$("<button>update</button>");
                        var oBtnDel=$("<button>delete</button>");
                        $oTd=$("<td contenteditable = 'false' class = operate></td>");
                        oBtnSave.appendTo($oTd);
                        oBtnUpdate.appendTo($oTd);
                        oBtnDel.appendTo($oTd);

                        /**点击add 插入数据*/
                        oBtnSave.on("click",function () {
                            console.log("click add*********** "+self.tableName);
                            var tdContent=[];
                            $(this).parent("td").parent("tr").find("td").each(function () {
                            //$(self.oTable).children("tr").find("td").each(function () {
                                console.log("click add value "+$(this).not(".operate").text());
                                /*获取列td所在的文本值*/
                                tdContent.push($(this).not(".operate").text());
                            })
                            console.log("tdContent len "+tdContent.length)
                            self.brandDB.insert(self.tableName,self.tdName,tdContent);
                        })
                    }
                    else
                    {
                        $oTd=$("<td></td>");
                    }
                    $oTd.css("background-color", "pink");
                    $oTd.appendTo($oTr);
                }
                // $oTr.css("height","20px");

                $oTr.appendTo($("#"+tableID));


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