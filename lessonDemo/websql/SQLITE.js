/**
 * Created by Administrator on 2017-02-06.
 */
function SQLITE(){
    this.db;
    var self = this;
    this.init=function(){
        self.db =  openDatabase("hx161012","2.0","sqlite",2*1024);
    }
    this.exesql=function(sql){
        self.db.transaction(function(tx){
            tx.executeSql(sql,[],
            function(){
                //alert("success");
            },function(){
                    alert("error");
                })
        },function(){},function(){})
    }


    this.add=function(sql){
        var obj=[];
        for(var i = 1;i < arguments.length;i++){
            obj.push(arguments[i]);
        }
        self.db.transaction(function(tx){
            tx.executeSql(sql,obj,
                function(){
                    alert(" add success");
                },function(){
                    alert("error");
                })
        },function(){},function(){})
    }
    this.getAll=function(callback){
        self.db.transaction(function(tx){
            tx.executeSql("select * from info",[],
                function(ret,result){
                    //result
                    callback(result);

                },function(){
                    alert("error");
                })
        },function(){},function(){})
    }
}

var mydb = new SQLITE();
mydb.init();
var sql="create table if not exists info(stuid integer primary key autoincrement,name varchar(32),password varchar(32))";
mydb.exesql(sql);
////////////////Ìí¼Ó1///////////////////////////////////////
//var sqlAdd = "insert into info(name,password) values('lisi','654321')";
//mydb.exesql(sqlAdd);
////////////////Ìí¼Ó2///////////////////////////////////////////
//var sqlAdd2 = "insert into info(name,password) values(?,?)";
//var strName = "zhangshanfeng";
//var strPwd = "99999";
//mydb.add(sqlAdd2,strName,strPwd);

function proResult(result){
    var len = result.rows.length;
    for(var i = 0; i < len; i++){
        document.write(result.rows.item(i).stuid+" "+result.rows.item(i).name+"<br/>");
    }


}
 mydb.getAll(proResult);






//$("#bt1").on("click",function(){
//    mydb.exesql();
//})
//
//$("#bt2").on("click",function(){
//    mydb.exesql();
//})

