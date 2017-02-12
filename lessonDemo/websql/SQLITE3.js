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
                    //不希望在这里处理数据
                    //希望在外面处理
                    //不同的表需要不同的函数处理
                    //函数从哪里来？从参数来
                    callback(result);
                    //var len = result.rows.length;
                    //for(var i = 0; i < len; i++){
                    //    document.write(result.rows.item(i).stuid+" "+result.rows.item(i).name+"<br/>");
                    //}

                },function(ret,msg){
                    alert("error:"+msg.message);
                })
        },function(){},function(){})
    }
}






function aaa(){

}

aaa(1,2,3,4)



