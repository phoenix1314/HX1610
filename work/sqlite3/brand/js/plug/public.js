/**
 * Created by dragon on 2017/2/4.
 */
function myBasedata() {
    this.getBaseData = function (tableName,id,ret) {
        console.log("ret len "+ret.length);

        for(var j=0; j<ret.rows.length; j++)
        {
            var $oTr=$("<tr></tr>");
            var $oTd;
            if(tableName == "brand")
            {
                var id = ret.rows.item(j).id;
                var name = ret.rows.item(j).name;
                var category = ret.rows.item(j).category;
                var origin_id = ret.rows.item(j).origin_id;
                var img = ret.rows.item(j).img;
                var price = ret.rows.item(j).price;
                var operate = ret.rows.item(j).operate;

                $oTd = $("<td>"+id+"</td> \
                        <td>"+name+"</td> \
                        <td>"+category+"</td> \
                        <td>"+origin_id+"</td> \
                        <td>"+img+"</td> \
                        <td>"+price+"</td> \
                        <td td contenteditable = 'false' class = operate>"+operate+"</td>");
            }
            else if(tableName == "origin")
            {
                var origin_id = ret.rows.item(j).origin_id;
                var origin_name = ret.rows.item(j).origin_name;
                var operate = ret.rows.item(j).operate;


                $oTd = $("<td>"+origin_id+"</td> \
                        <td>"+origin_name+"</td> \
                        <td contenteditable = 'false' class = operate>"+operate+"</td>");
            }
            else if(tableName == "category")
            {
                var category_id = ret.rows.item(j).category_id;
                var category_name = ret.rows.item(j).category_name;
                var operate = ret.rows.item(j).operate;


                $oTd = $("<td>"+category_id+"</td> \
                        <td>"+category_name+"</td> \
                        <td contenteditable = 'false' class = operate>"+operate+"</td>");
            }

            $oTd.css("background-color","pink");
            $oTd.appendTo($oTr);
            //this.setOperate($oTr);
            $oTr.appendTo("#"+id);
        }
    }

    this.setOperate = function (obj) {
        var $oTdOperate;
        var oBtnSave=$("<button>add</button>");
        var oBtnUpdate=$("<button>update</button>");
        var oBtnDel=$("<button>delete</button>");
        $oTdOperate = $("<td contenteditable = 'false' class = operate></td>");
        oBtnSave.appendTo($oTdOperate);
        oBtnUpdate.appendTo($oTdOperate);
        oBtnDel.appendTo($oTdOperate);
        $oTdOperate.css("background-color", "pink");
        $oTdOperate.appendTo(obj);

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
}