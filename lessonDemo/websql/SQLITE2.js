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
    this.getAll=function(sql,callback){
        self.db.transaction(function(tx){
            tx.executeSql(sql,[],
                function(ret,result){
                    //��ϣ�������ﴦ������
                    //ϣ�������洦��
                    //��ͬ�ı���Ҫ��ͬ�ĺ�������
                    //���������������Ӳ�����
                    callback(result);
                    //var len = result.rows.length;
                    //for(var i = 0; i < len; i++){
                    //    document.write(result.rows.item(i).stuid+" "+result.rows.item(i).name+"<br/>");
                    //}

                },function(){
                    alert("error");
                })
        },function(){},function(){})
    }
}
function prohx1610(result){
    var len = result.rows.length;
    for(var i = 0; i < len; i++){
        document.write(result.rows.item(i).stuid+" "+result.rows.item(i).name+"<br/>");
    }
}
function prostu(result){
    var len = result.rows.length;
    for(var i = 0; i < len; i++){
        document.write(result.rows.item(i).stuid+" "+result.rows.item(i).name+" "+result.rows.item(i).age+" "+result.rows.item(i).addr+"<br/>");
    }
}

var mydb = new SQLITE();
mydb.init();
var sqlGet = "select * from hx1610";
mydb.getAll(sqlGet,prohx1610);
//var sql = "select * from hx1611";
//mydb.getAll(sql);
 sql = "select * from stu";
mydb.getAll(sql,prostu);
//var sql="create table if not exists stu(stuid integer primary key autoincrement,name varchar(32),age int(32),addr varchar(32))";
//mydb.exesql(sql);
// sql="create table if not exists hx1611(stuid integer primary key autoincrement,name varchar(32),password varchar(32))";
//mydb.exesql(sql);
////
//var sqlAdd = "insert into stu(name,age,addr) values('zhaoliu',18,'xiamen')";
//mydb.exesql(sqlAdd);
//var sqlAdd2 = "insert into hx1611(name,password) values('aaaaa','666666')";
//mydb.exesql(sqlAdd2);

//1��Ϊʲô����װ sqlite
//2����ô����װ ��װ��Щ��������ɾ�Ĳ�
//3����װͨ�õ�exesql����
//4.��ѯ���








