
//数据库（数据库名，数据大小）
function webSQL(database,datasize=2*1024) {
    this.db = openDatabase(database,"2.0","my datavase", datasize);

}

webSQL.prototype= {

    //作为webSQL的原型
    constructor: webSQL,

    /**创建表
     * @param 表名
     * @param object 列名
     * */
    create: function (tableName, allcol) {
        console.log("tableName: " + tableName);
        console.log("allcol: " + allcol + " len: " + allcol.length)

        var col = "";
        for (var i = 0; i < allcol.length; i++) {
            col += allcol[i];
            if (i !== allcol.length - 1) {
                col += ",";
            }
        }
        console.log("col name: " + col);

        var sql = "create table if not exists " + tableName + "(" + col + ")";
        console.log(sql);
        this.db.transaction(function (tx) {
            tx.executeSql(sql,
                [],
                function (ret, successMsg) {
                    console.log("创建表成功！")
                },
                function (ret, errorMsg) {
                    console.log("创建表失败：" + errorMsg.message);
                });
        });
    },

    /**创建表 带有约束条件
     * @param 表名
     * @param object 列名具有约束性
     * */
    createKey
        : function (tableName, allcol) {
        console.log("tableName: " + tableName);
        console.log("allcol: " + allcol + " len: " + allcol.length)

        // var col = "";
        // for (var i = 0; i < allcol.length; i++) {
        //     col += allcol[i];
        //     if (i !== allcol.length - 1) {
        //         col += ",";
        //     }
        // }
        // console.log("col name: " + col);

        var sql = "create table if not exists " + tableName + "(" + allcol + ")";
        console.log(sql);
        this.db.transaction(function (tx) {
            tx.executeSql(sql,
                [],
                function (ret, successMsg) {
                    console.log("创建表成功！")
                },
                function (ret, errorMsg) {
                    console.log("创建表失败：" + errorMsg.message);
                });
        });
    },

    /**
     * 删除表
     * @param 表名
     * */
    drop: function (tableName) {
        var sql = "drop table if exists " + tableName;
        this.db.transaction(function (tx) {
            tx.executeSql(sql,
                [],
                function (ret, successMsg) {
                    console.log("删除表成功!");
                },
                function (ret, errorMsg) {
                    console.log("删除表失败: " + errorMsg.message);
                });
        });
    },

    /**
     * 插入数据
     * @param 表名
     * @param 列名
     * @param 列名对应的值
     * */

    insert: function (tableName, colNameArray, colValueArray) {
        console.log("tableName: " + tableName);
        console.log("colName len: " + colNameArray.length);
        console.log("colValue len: " + colValueArray.length);
        var allColName = "";
        var quesMark = "";
        for (var i = 0; i < colNameArray.length; i++) {
            console.log(colNameArray[i] + " : " + colValueArray[i]);
            allColName += colNameArray[i];
            quesMark += "?";
            if (i !== colNameArray.length - 1) {
                allColName += ",";
                quesMark += ",";
            }
        }

        var sql = "insert into " + tableName + "(" + allColName + ") values (" + quesMark + ")";
        console.log(sql);
        console.log(colValueArray);
        this.db.transaction(function (tx) {
            tx.executeSql(sql,
                colValueArray,
                function (ret, successMsg) {
                    console.log("插入数据成功！");
                },
                function (ret, errorMsg) {
                    console.log("插入数据失败： " + errorMsg.message);
                });
        });
    },

    /**
     * 查询数据
     * @param 表名
     * @param callback 回调函数处理返回值
     * */
    select: function (tableName,callback) {
        var sql = "select * from " + tableName;
        this.db.transaction(function (tx) {
            tx.executeSql(sql,
                [],
                function (ret, rt) {
                    console.log("select row item: " + rt.rows.length);
                    console.log("查询成功");
                    callback(rt);
                },
                function (ret, errorMsg) {
                    console.log("查询失败： " + errorMsg.message);
                });
        });
    },

    /**
     * 指定条件查询
     * @param 表名
     * @param 条件列名
     * @param 条件列值
     * @param 回调函数
     * @param 条件关系 如and or
     * @param 是否通配
     * */
    selectWhere : function (tableName,whereColName=null,whereColValue=null,callback,relation="and", equal="=") {
        var whereSyntax = "";
        if (whereColName) {
            for (var j = 0; j < whereColName.length; j++) {
                if (whereColName[j]) {
                    if (j === 0) {
                        whereSyntax += " where ";
                    }
                    whereSyntax += (whereColName[j] + "" + equal + "?");
                    if (j !== whereColName.length - 1) {
                        whereSyntax += (" " + relation + " ");
                    }
                }
            }
        }
        console.log("whereSyntax: " + whereSyntax);

        var sql = "select * from " + tableName + "" + whereSyntax;
        console.log(sql);
        this.db.transaction(function (tx) {
            tx.executeSql(
                sql,
                whereColValue,
                function (ret, rt) {
                    console.log("查询成功！");
                    console.log("select row item: " + rt.rows.length);
                    console.log("查询成功");
                    callback(rt);
                },
                function (ret, errorMsg) {
                    console.log("查询失败: " + errorMsg.message);
                }
            );
        });
},

    /**
     * 删除数据
     * @param 表名
     * @param 条件列名
     * @param 条件列值
     * @param 条件关系 如and or
     * @param 是否通配
     * */
    delete: function (tableName, whereColName=null, whereColValue=null, relation="and", equal="=") {
        var whereSyntax = "";
        if (whereColName) {
            for (var j = 0; j < whereColName.length; j++) {
                if (whereColName[j]) {
                    if (j === 0) {
                        whereSyntax += " where ";
                    }
                    whereSyntax += (whereColName[j] + "" + equal + "?");
                    if (j !== whereColName.length - 1) {
                        whereSyntax += (" " + relation + " ");
                    }
                }
            }
        }
        // var fanalColValue = new Array();
        // console.log("whereColValue len: "+whereColValue.length);
        // for(var n=0; n<whereColValue.length; n++){
        //     console.log("whereColValue value: "+whereColValue[n]);
        //     if(whereColValue[n]){
        //         fanalColValue.push(whereColValue[n]);
        //     }
        // }
        //console.log("fanalColValue: "+fanalColValue);
        console.log("whereSyntax: " + whereSyntax);

        var sql = "delete from " + tableName + "" + whereSyntax;
        console.log(sql);
        this.db.transaction(function (tx) {
            tx.executeSql(
                sql,
                whereColValue,
                function (ret, successMsg) {
                    console.log("删除数据成功！");
                },
                function (ret, errorMsg) {
                    console.log("删除数据失败: " + errorMsg.message);
                }
            );
        });
    },

    /**
     * 更新数据
     * @param 表名
     * @param 列名
     * @param 列值
     * @param 条件列名
     * @param 条件列值
     * @param 条件关系
     * @param 是否通配
     * */
    update: function (tableName, colNameArray, colValueArray, whereColName=null, whereColValue=null, relation="&&", equal="=") {
        var colAndValue = "";
        for (var i = 0; i < colNameArray.length; i++) {
            if (colNameArray[i]) {
                colAndValue += (colNameArray[i] + "=?");
                if (i !== colNameArray.length - 1) {
                    colAndValue += ",";
                }
            }
        }
        var whereSyntax = "";
        if (whereColName) {
            for (var j = 0; j < whereColName.length; j++) {
                if (whereColName[j]) {
                    if (j === 0) {
                        whereSyntax += " WHERE ";
                    }
                    whereSyntax += (whereColName[j] + "" + equal + "?");
                    if (j !== whereColName.length - 1) {
                        whereSyntax += (" " + relation + " ");
                    }
                }
            }
        }

        var fanalArray = new Array();
        for (var m = 0; m < colValueArray.length; m++) {
            if (colValueArray[m]) {
                fanalArray.push(colValueArray[m]);
            }
        }
        if (whereColValue) {
            for (var n = 0; n < whereColValue.length; n++) {
                if (whereColValue[n]) {
                    fanalArray.push(whereColValue[n]);
                }
            }
        }

    }
}