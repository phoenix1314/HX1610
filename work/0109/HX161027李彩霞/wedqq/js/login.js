$(document).ready(function(){

	var $inputText = $("input[type='text']");
	var $inputPassword = $("input[type='password']");
	var textVal = "";
	var passwordVal = "";
	//输入账号
	$(".account").on("keyup",function(){
		textVal = $inputText.val();
		console.log("textVal: "+textVal);
	})

	//输入密码
	$(".password").on("keyup",function(){
		passwordVal = $inputPassword.val();
		console.log("passwordVal: "+passwordVal);
	})

    //点击登录
	$(".loginBtn").on("click",function(){
		if(textVal==="" || passwordVal==="")
		{
			console.log("account and password is null");
			alert("账号或密码为空，请输入！");
		}
		else{
			console.log("open qq web index");
			window.location.href="indexqq.html";
		}
	})

}) //