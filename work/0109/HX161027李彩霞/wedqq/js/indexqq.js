$(document).ready(function(){

			$("#personal").hide();
			$("#chat").hide();
			$(".listInfo").hide();
			// $(".del").hide();

			/*鼠标移到qq头像显示个人资料，移开隐藏*/
			$("#panelTop img").hover(
			function(){
				console.log("personal slideDown show")
				$("#personal").slideDown("slow",function()
					{
						$("#personal").show();
					});
			},
			function(){
				console.log("personal slideUp hide")
				$("#personal").slideUp("slow",function()
					{
						$("#personal").hide();
					});
			})

			// $("#panelTop img").off("hover");

			/*点击qq头像显示个人资料*/
			$("#panelTop span").on("click",function(){
				console.log("personal show");
				$("#personal").show();
				setInterval(personalHide,10000)
			})

			function  personalHide(){
				console.log("personal hide");
				$("#personal").hide();
			}

			/*添加好友文本信息框*/
			var $input = $("input[type = 'text']");
			var addText = "";
			$(".searchText").on("keyup",function(){
				addText = $input.val();
				console.log("addText: "+addText);
				// $(".name:contains("+addText+")").css("color","red");
				// $(".listInfo").show();
			})


			/*添加好友*/
			var addTextbak="";
			$(".addBtn").on("click",function(){
				if($(".searchText").val()==="")
				{
					alert("请输入内容！");
				}
				else
				{
					console.log("add friend");					 
					var addStr=' \
					    <li>\
						<input type="checkbox"> \
						<img src="../images/head_list.jpg"> \
						<p>'+$(".searchText").val()+'</p> \
						<button>del</button> \
					</li>';
					console.log("addTextbak: "+addTextbak);
					if(addTextbak === $(".searchText").val())
					{
						alert("该帐号已添加，请重新输入");
					}
					else{
						$("#friendList ul").prepend(addStr);
				    	addTextbak = $(".searchText").val();//备份添加文本
					}
				}
			})

			/*点击分组展示好友*/
			var num = 0;
			var indexbak = -1;
			var numbak = 0;
			$("#groupList").on("click","li",function(event){
				console.log("groupList ul li");
				var index = $(this).index();
            	console.log("click group index:"+index);
            	$(".listInfo").eq(index).toggle(); 
            	console.log("indexbak*******: "+indexbak);          	
            	// if(index != indexbak)
            	// {
            	// 	numbak = num;
            	// 	indexbak = index;
            	// 	console.log("num****2222222222222******:"+num);
            	// }
            	// else{
            	// 	num=numbak;
            	// 	console.log("num*****11111111111111111*****:"+num);
            	// }
            	// else
            	// {           		
            	// 	num++;
            	// 	console.log("num*****111*****:"+num);
            	// }   
            	num++;       	
            	console.log("click num: "+ num%2);
            	if(num%2 === 1)
            	{
            		$(".span1").eq(index).html("<<");
            	}
            	else{
            		$(".span1").eq(index).html(">");
            	}

            	


            	$(".listInfo").click(function(event) {
                if(event.stopPropagation) {
                    event.stopPropagation();//阻止冒泡事件发生，就是阻止点击licon时，他里面的内容也跟着运行事件。但IE并不认识
                } else if(window.event) { //IE下阻止冒泡事件，window.event.cancelBubble = true;谷歌，火狐等不认识
                    window.event.cancelBubble = true;
                }
            })
			})

			/*点击checkbox*/
			$(".listInfo ul").on("click","input",function(){
				if($(".listInfo input").is(":checked")){
					console.log("checked is true")
					//全选 反选按钮重置
					$(".allSel").prop("checked",false);
					$(".invertSel").prop("checked",false);
					// var checkIndex = $(this).index;
					// console.log("checkbox index: "+checkIndex);
					// $(".del").eq(index).show();
				}
				else
				{

				}
				/*遍历checkbox*/
				console.log("length: "+$(".listInfo input").val().length);
				$(".listInfo input").each(function(){
					var count = 0;
					for(var i=0;i<$(".listInfo input").val().length;i++)
					{
						if($(this).is(":checked")){
							count++;
						}
					}
					console.log("count: "+count);
					if(count === $(".listInfo input").val().length)
					{
						$(".allSel").prop("checked",true);
					}
					else
					{
						$(".allSel").prop("checked",false);
					}
					})
			})

			/*全选*/
			$(".allSel").on("click",function(){
				console.log("click allSel");
				if($(".allSel").is(":checked")){
					$(".listInfo input").prop("checked",true);
					$(".invertSel").prop("checked",false);
				}
				else{
					$(".listInfo input").prop("checked",false);
				}
			})

			/*反选*/
			$(".invertSel").on("click",function(){
				console.log("click invertSel");
				$(".listInfo input").each(function(){
					var state = $(this).is(":checked")?false:true;
					$(this).prop("checked",state);
				})
				if($(".allSel").is(":checked")){
                	$(".allSel").prop("checked",false); //全选按钮重置
            	}  
			})

			/*选中删除*/
			$(".delSel").on("click",function(){
				console.log("click delSel");
                $(".listInfo input").each(function(){
                    if($(this).is(":checked")){
                        $(this).parent().remove();
                    }
                })
            })

             //单条删除
	        $(".listInfo").on("click","button",function(){
	            console.log("del");
	            $(this).parent().remove();
	            $("chat").hide();
	        })

	        /*点击好友弹出聊天框*/
	        $(".listInfo").on("click","p",function(){	      
	        	
	            var textstr =$(this).text();
	            console.log("click name:"+textstr);
            	$("#chatTop p").text(textstr);
            	$("#receive span").text(textstr);
            	$(".sender").html("");//共用div，不同昵称，弹框之前要先之前发送信息清空
           		$("#chat").show();           	
	        })

	        /*点击close关闭聊天框*/
	        $("#chatTop").on("click","button",function(){
	        	console.log("close chat");
	        	$("#chat").fadeIn("slow",function(){
	        		$("#chat").hide();
	        	})
	        })

	        /*发送*/
	        $("#chatSend").on("click","button",function(){
	        	console.log("chatSend text: "+$(".sendText").val());
	        	if($(".sendText").val() === "")
	        	{
	        		alert("请输入要发送的内容!");
	        	}
	        	else
	        	{
	        		var textSend='\
	        		<span>夕阳西下</span>\
	        		<img src="../images/head_bk.jpg">\
	        		<p>'+$(".sendText").val()+'</p>';
					$(".sender").append(textSend);
	        	}
	        })

			

		})//