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
    this.friendNameAdd;
    this.friendNum;
    this.showfriend = "showfriend";/*好友id*/

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

    //查询数据
    this.selectDB = function () {
        this.friend();
        self.db.select(self.tableName,checkFrined);
    }

    //有数据显示好友
    function checkFrined(result) {
        console.log("result len: "+result.rows.length);
        self.friendNum = result.rows.length;
        for(var i = 0;i<result.rows.length;i++)
        {
            console.log("result name: "+result.rows.item(i).name);
            var friendW  = new friend(150,40,result.rows.item(i).head,result.rows.item(i).name);
            friendW.init(self.friendId,self.showfriend+(i+1));
            friendW.setTableDB(self.db,self.tableName);
        }
    }

    //返回登录界面
    this.setBackLogin = function (btnText,id) {
        console.log("id :"+id);
        var $backBtn = $("<button>"+btnText+"</button>");
        $backBtn.appendTo(self.oDiv);
        var $br = $("<br/>");
        $br.appendTo(self.oDiv);
        $backBtn.on("click",function () {
            $("#"+id).show();
           // self.oDiv.hide();
            self.oDiv.remove();
        })

    }

    //显示用户名
    this.showUserName = function (userName) {
        var $userName = $("<p>"+userName+"</p>");
        $userName.appendTo(self.oDiv);

    }

    //添加好友
    this.setAdd = function (btnText) {
        var $addInput = $("<input type='text'>");
        var $addBtn = $("<button>"+btnText+"</button>");
        $addInput.appendTo(self.oDiv);
        $addBtn.appendTo(self.oDiv);

        $addBtn.on("click",function () {
            console.log("click add friend");
            self.friendNameAdd = $addInput.val();
            console.log("friendName: "+self.friendNameAdd);
            var colAddName = ["name"];
            var colAddValues = [self.friendNameAdd];
            self.db.selectWhere(self.tableName,colAddName,colAddValues,addCallback)

        })
    }

    //添加好友回调函数
    function addCallback(result) {
        console.log("result len: "+result.rows.length);
        if(result.rows.length==1){
            alert("添加失败：该好友已添加");
        }
        else{
            if(self.friendNameAdd)
            {
                self.friendNum++;
                var friendW  = new friend(150,40,self.imgPath,self.friendNameAdd);
                var colValue = [self.imgPath,self.friendNameAdd];
                friendW.init(self.friendId,self.showfriend+self.friendNum);
                friendW.setTableDB(self.db,self.tableName);
                self.db.insert(self.tableName,self.colName,colValue);
            }
            else {
                alert("请输入好友");
            }
        }
    }

    //好友列表div显示区域
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