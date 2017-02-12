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

io.sockets.on('connection',function(socket){

   console.log('client is online!!!!!');
   socket.emit("welcomeMsg",{info:'welcome!!!!'})
})


console.log('server is runing!!!');