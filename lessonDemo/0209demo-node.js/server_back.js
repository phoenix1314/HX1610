function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

var http = require("http");
var fs  = require("fs");
var documentRoot = './';
var server = http.createServer(function(req,res){
    var url = req.url;
    //客户端输入的url，例如如果输入127.0.0.1:8888/index.html
    var file = documentRoot + url;
    console.log(url);
    fs.readFile( file , function(err,data){
        /*
         一参为文件路径
         二参为回调函数
         回调函数的一参为读取错误返回的信息，返回空就没有错误
         二参为读取成功返回的文本内容
         */
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();

        }

    });


}).listen(8888);


var io = require("socket.io").listen(server);

var aScoket=[];

io.sockets.on('connection',function(socket){
    aScoket.push(socket);
   console.log('client is online!!!!!');
   console.log(socket.id);
    socket.on("nickEvent",function(data){
         var message = "<p style='color:red;'><b>welcome "+ data.nickname +" come to CHAT</b></p>";
        io.sockets.emit("welcomeMsg",{info:message});
    })


    socket.on("chatMsgEvent",function(data){
         console.log(data.msg);
        var obj = {
            msg:data.msg,
            time:getNowFormatDate(),
            nickName:data.nickName
        }
       // io.sockets.emit("pushMsg",obj);
        for(var i = 0; i < aScoket.length;i++){
            //io.sockets.socket(aScoket[i].id).emit("pushMsg",obj);
            io.to(aScoket[i].id).emit("pushMsg",obj);
        }
    })
})


console.log('server is runing!!!');