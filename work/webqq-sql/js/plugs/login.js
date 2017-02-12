/**
 * Created by dragon on 2017/2/6.
 */
function login(w,h) {
    this.width = w;
    this.height = h;
    this.oDiv = $("<div></div>");
    this.usrInput = $("<input type='text'>");
    this.pwdInput = $("<input type='password'>");
    this.divId;
    this.loginId = "login";
    this.db;
    this.database;
    this.tableName;
    this.colName;
    this.user;
    this.pwd;
    var self = this;

    //创建div
    this.create = function (id) {
        this.divId = id;
        this.oDiv.css({
            "width":this.width+"px",
            "height":this.height+"px",
            "border":"red 1 solid"
        });
        this.oDiv.attr("id",this.loginId);
        this.oDiv.appendTo($("#"+this.divId));
    }

    //创建数据库
    this.setLoginDB = function (database,tableName,colStr,colName) {
        self.database = database;
        self.tableName = tableName;
        self.colName = colName;
        self.db = new webSQL(database);
        self.db.create(self.tableName,colName);
    }

    //用户名 密码文本框
    this.setLoginText = function (UserText,pwdText) {
        //用户名：
        var $spanUser = $("<span>"+UserText+":</span>");
        this.usrInput.appendTo($spanUser);
        $spanUser.appendTo(this.oDiv);
        //换行
        var $brUsr = $("<br/>");
        $brUsr.appendTo($spanUser);
        //密码:
        var $spanPwd = $("<span>"+pwdText+":</span>");
        this.pwdInput.appendTo($spanPwd);
        $spanPwd.appendTo(this.oDiv);

        //换行
        var $brPwd = $("<br/>");
        $brPwd.appendTo($spanPwd);

        //获取用户名和密码
        $spanUser.change(function () {
            self.user = self.usrInput.val();
            console.log("user: "+self.user);
        });

        $spanPwd.change(function () {
            self.pwd = self.pwdInput.val();
            console.log("pwd: "+self.pwd+ "len :"+self.pwd.length);
            if(self.pwd.length>6)
            {
                alert("密码超过6位数，请重新输入！");
            }

        });
    }

    //注册
    this.setRegBtn = function (btnText) {
        var $regBtn = $("<button>"+btnText+"</button>")
        $regBtn.appendTo(this.oDiv);
        $regBtn.on("click",function () {
            console.log("click reg");
            // var user = self.usrInput.val();
            // var pwd = self.pwdInput.val();
            console.log("user: "+self.user+" pwd: "+self.pwd);
            //查询用户名是否被注册
            var colName = ["name"];
            var colValue = [self.user];
            self.db.selectWhere(self.tableName,colName,colValue,checkUser);

        })
    }

    function checkUser(result) {
        console.log("result len: "+result.rows.length);
        if(result.rows.length==1){
            alert("注册失败：该用户名已被注册，请重新输入！");
        }
        else{
            if(self.user && self.pwd)
            {
                alert("注册成功！");
                var colValue = [self.user,self.pwd];
                self.db.insert(self.tableName,self.colName,colValue);
            }
            else
            {
                alert("注册失败：输入用户名和密码不能为空！")
            }
        }
    }

    //登录
    this.setLoginBtn = function (btnText) {
        var $loginBtn = $("<button>"+btnText+"</button>")
        $loginBtn.appendTo(this.oDiv);
        $loginBtn.on("click",function () {
            console.log("click login btn");
            // self.user = self.usrInput.val();
            // self.pwd = self.pwdInput.val();
            // self.user = "张三";
            // self.pwd = "111111";
            console.log("user: "+self.user+" pwd: "+self.pwd);
            if(self.user && self.pwd)
            {
                var colValue = [self.user,self.pwd];
                self.db.selectWhere(self.tableName,self.colName,colValue,loginCallback);
            }
            else
            {
                alert("登录失败：输入用户名和密码不能为空！")
            }
        })
    }

    //登录回调函数
    function loginCallback(result) {
        console.log("result len: "+result.rows.length);
        if(result.rows.length==1){
            console.log("登录成功");
            showWebqq();
        }else{
            alert("登录失败");
        }
    }

    //显示webqq界面
    function showWebqq() {
        console.log("divid :"+self.divId);
        $("#"+self.loginId).hide();
        var webqqW = new webqq(300,400);
        webqqW.init(self.divId,self.user);
        var colName = ["head","name"];
        webqqW.creatDB(self.database,self.user,colName);
        webqqW.setBackLogin("返回登录",self.loginId);
        webqqW.showUserName(self.user);
        webqqW.setAdd("添加好友");
        webqqW.selectDB();
    }

}