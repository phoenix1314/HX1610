/**
 * Created by dragon on 2017/2/6.
 */
function webqq(w,h) {
    this.width = w;
    this.height = h;
    var self = this;
    this.oDiv = $("<div></div>");
    this.webqqId;
    this.tableName;
    this.colName;
    this.imgPath = "../images/head.jpg";
    this.friendId = "friend";

    this.init = function (id,user) {
        this.webqqId = id;
        this.tableName = user;
        this.oDiv.css({
            "width":this.width+"px",
            "height":this.height+"px",
            "border":"red 1 solid"
        });
        this.oDiv.appendTo($("#"+this.webqqId));
    }

    //创建数据库
    this.creatDB = function (database,user,colName) {
        self.tableName = user;
        self.colName = colName;
        self.db = new webSQL(database);
        self.db.create(self.tableName,colName);
    }

    this.selectDB = function () {
        this.friend();
        self.db.select(self.tableName,checkFrined);
    }

    function checkFrined(result) {
        console.log("result len: "+result.rows.length);
        for(var i = 0;i<result.rows.length;i++)
        {
            console.log("result name: "+result.rows.item(i).name);
            var friendW  = new friend(150,40,result.rows.item(i).head,result.rows.item(i).name);
            friendW.init(self.friendId);
        }
    }

    this.setBackLogin = function (btnText,id) {
        console.log("id :"+id);
        var $backBtn = $("<button>"+btnText+"</button>");
        $backBtn.appendTo(self.oDiv);
        var $br = $("<br/>");
        $br.appendTo(self.oDiv);
        $backBtn.on("click",function () {
            $("#"+id).show();
            self.oDiv.hide();
        })

    }

    this.setAdd = function (btnText) {
        var $addInput = $("<input type='text'>");
        var $addBtn = $("<button>"+btnText+"</button>");
        $addInput.appendTo(self.oDiv);
        $addBtn.appendTo(self.oDiv);

        $addBtn.on("click",function () {
            console.log("click add friend");
            var friendName = $addInput.val();
            console.log("friendName: "+friendName);

            if(friendName)
            {
                var friendW  = new friend(150,40,self.imgPath,friendName);
                var colValue = [self.imgPath,friendName];
                friendW.init(self.friendId);
                self.db.insert(self.tableName,self.colName,colValue);
            }
            else {
                alert("请输入好友");
            }

        })
    }

    this.friend = function () {
        var $divFriend = $("<div></div>");
        $divFriend.css({
            "width":"300px",
            "height":"300px",
            "border":"red 1 solid"
        });
        $divFriend.attr("id",self.friendId);
        $divFriend.appendTo(self.oDiv);
    }

}