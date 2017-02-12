function table(w,h) {
    this.width = w;
    this.height = h;
    this.oDiv = $("<div></div>");
    this.oText = $("<p></p>");
    this.oTable;
    this.column; /***< 表格的列数*/
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
        this.oText.appendTo(this.oDiv);
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
    this.dbInit = function (dataName,tableName,colStr,colName) {
        this.db = new webSQL(dataName);
        this.colName = colStr;
        this.tdName = colName;
        this.tableName= tableName;//"brand";
        this.db.create(this.tableName,this.tdName);
    }

    this.setInsertTr = function (columnNum,tableID) {
        /**插入行*/
        self.column = columnNum;
        var $oTr=$("<tr></tr>");
        console.log("table column:"+self.column);
        for (var i = 0;i<self.column;i++)
        {
            var $oTd;
            if(i == (self.column-1))
            {
                $oTd=$("<td contenteditable = 'false' class = operate></td>");
                self.setInsert($oTd);
                self.setDelete($oTd);
                self.setUpdate($oTd);
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
            self.setInsertTr(columnNum,tableID);
        })
    }

    /**删除表*/
    this.setDropTable = function (btnText) {
        var oBtnDrop=$("<button>"+btnText+"</button>");
        oBtnDrop.appendTo(this.oDivTable);
        oBtnDrop.on("click",function () {
            console.log("click drop");
            var tableID = $(this).parent().find("table").attr("id");
            console.log("table name is "+tableID);
            /**删除表格tr*/
            $("#"+tableID).find("tr:not(:first)").remove();
            /**删除sql表*/
            self.db.drop(self.tableName);
        })
    }

    /**查询并填充结果*/
    this.setSelect = function (btnText) {
        var oBtnSelect=$("<button>"+btnText+"</button>");
        oBtnSelect.appendTo(this.oDivTable);
        oBtnSelect.on("click",function() {
            var tableID = $(this).parent().find("table").attr("id");
            console.log("table name is "+tableID);
            /**通过回调函数带回查询的返回值*/
            webSQL_select_handle = function(ret)
            {
                console.log("select result len: "+ret.length);

                for(var j=0; j<ret.rows.length; j++)
                {
                    var $oTr=$("<tr></tr>");
                    var $oTd;

                    var id = ret.rows.item(j).id;
                    var name = ret.rows.item(j).name;
                    var category_id = ret.rows.item(j).category_id;
                    var origin_id = ret.rows.item(j).origin_id;
                    var img = ret.rows.item(j).img;
                    var price = ret.rows.item(j).price;
                    var operate = ret.rows.item(j).operate;

                    $oTd = $("<td>"+id+"</td> \
                    <td>"+name+"</td> \
                    <td>"+category_id+"</td> \
                    <td>"+origin_id+"</td> \
                    <td>"+img+"</td> \
                    <td>"+price+"</td>");
                    $oTd.css("background-color","pink");
                    $oTd.appendTo($oTr);

                    var $oTdOperate=$("<td td contenteditable = 'false' class = operate></td>");
                    self.setUpdate($oTdOperate);
                    self.setDelete($oTdOperate);
                    $oTdOperate.appendTo($oTr);
                    $oTdOperate.css("background-color","pink");

                    $oTr.appendTo("#"+tableID);

                }

            }
            self.db.select(self.tableName);
        })
    }

    /**按钮 确认添加*/
    this.setBtnOk= function (btnText) {
        var oBtnOk=$("<button>"+btnText+"</button>");
        oBtnOk.appendTo(this.oDiv);
        oBtnOk.on("click",function () {

        })
    }

    /**表格操作 增加*/
    this.setInsert = function (obj) {
        var oBtnInsert = $("<button>add</button>");
        oBtnInsert.appendTo(obj);
        oBtnInsert.on("click",function () {
            console.log("click add*********** "+self.tableName);
            var tdContent=[];
            $(this).parent("td").parent("tr").find("td:not(:last)").each(function () {
                console.log("click add value "+$(this).not(".operate").text());
                /*获取列td所在的文本值*/
                tdContent.push($(this).text());
            })
            console.log("tdContent len "+tdContent.length)
            self.db.insert(self.tableName,self.tdName,tdContent);
        })
    }

    /**表格操作 删除*/
    this.setDelete = function (obj) {
        var oBtnDelete = $("<button>delete</button>");
        oBtnDelete.appendTo(obj);
        oBtnDelete.on("click",function () {
            console.log("click delect*********** "+self.tableName);
            var tdContent=[];
            $(this).parent("td").parent("tr").find("td:not(:last)").each(function () {
                /*获取列td所在的文本值*/
                tdContent.push($(this).text());
            })
            console.log("tdContent len "+tdContent.length)
            self.db.delete(self.tableName,self.tdName,tdContent);
            $(this).parent("td").parent("tr").remove();

        })
    }

    /**表格操作 更新*/
    this.setUpdate = function (obj) {
        var oBtnUpdate = $("<button>update</button>");
        oBtnUpdate.appendTo(obj);
    }
}