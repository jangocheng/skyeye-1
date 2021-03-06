layui.config({
	base: basePath, 
	version: skyeyeVersion
}).define(['jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	    var $ = layui.$,
	    form = layui.form;
	    
		form.verify({
			oldPassword : function(value, item){
				if(value.length < 6){
	                return "密码长度不能小于6位";
	            }
            },
            newPassword : function(value, item){
	            if(value.length < 6){
	                return "密码长度不能小于6位";
	            }
	        },
	        confirmPwd : function(value, item){
	            if($("#newPassword").val() != value){
	                return "两次输入密码不一致，请重新输入！";
	            }
	        }
	    });
		
		form.render();
		
	    form.on('submit(formAddBean)', function (data) {
	    	//表单验证
	        if (winui.verifyForm(data.elem)) {
	        	var params = {
        			newPassword: $("#newPassword").val(),
        			oldPassword: $("#oldPassword").val(),
	        	};
	        	
	        	AjaxPostUtil.request({url:reqBasePath + "login007", params:params, type:'json', callback:function(json){
	 	   			if(json.returnCode == 0){
		 	   			parent.layer.close(index);
		 	        	parent.refreshCode = '0';
	 	   			}else{
	 	   				top.winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
	 	   			}
	 	   		}});
	        }
	        return false;
	    });
	    
	    //取消
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	});
	    
});