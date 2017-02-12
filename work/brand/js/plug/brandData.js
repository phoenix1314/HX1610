/**
 * Created by dragon on 2017/1/20.
 */
function  brandData(dataName) {
    this.dataFileName = dataName;
    this.tableName;  /**商品-表名*/

    /**创建商品信息数据库*/
    this.createBrandInfo= function (tableName,tableField) {
        this.tableName = tableName;
        console.log("tableName:"+tableName);
       var createTable = "create table if not exits "+tableName+"("+tableField+")";
        console.log(createTable);
        var db = openDatabase(this.dataFileName,"2.0","mydb",2*1024);
        db.transaction(function(tx){
            tx.executeSql(createTable,
                [],
                function(ret,result){
                    console.log("create table is success");
                },
                function(ret,error){
                    alert(error.message);
                });
        })
    }

    /**插入数据*/
    this.insertBrand = function (tableName,field) {
        var createTable = "create table if not exits "+tableName+"("+tableField+")";
        console.log(createTable);
        var db = openDatabase(this.dataFileName,"2.0","mydb",2*1024);
        db.transaction(function(tx){
            tx.executeSql(createTable,
                [],
                function(ret,result){
                    console.log("create table is success");
                },
                function(ret,error){
                    alert(error.message);
                });
        })
    }

}