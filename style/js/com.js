$(document).ready(function() {
	com.loaded();
})
var com = {
	loaded: function() {
		document.onreadystatechange = subSomething; //当页面加载状态改变的时候执行这个方法.
		var self = this;
		function subSomething() {
			if (document.readyState == "complete") {
				self.start();
			}
		}
	},
	start: function() {
		this.resize();
		this.Click();
		this.interact();
	},
	resize: function() {
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var docWidth = winWidth > 640 ? 640 : winWidth;
		var mainbody = $("div").is(".mainbody");
		if (mainbody) {
			$(".mainbody").css({
				"width": docWidth,
				"height": winHeight
			});
		}
	},
	Click: function() {
		var mask = $(".mask");
		var cross = $(".cross");
		var popupA = $(".popupA");
		var popupB = $(".popupB");
		var popupC = $(".popupC");
		var details1 = $(".details1");
		var details2 = $(".details2");
		var close = $(".success span");
		cross.click(function() {
			$(this).parent().hide();
			mask.hide();
		});
		popupA.find(".btns,.cross").click(function() {
			popupA.remove();
			mask.hide();
		});
		popupB.find(".btns").click(function() {
			popupB.hide();
			mask.hide();
		});
		popupC.find(".cross").click(function() {
			popupC.hide();
			mask.hide();
		});
		details1.click(function() {
			mask.show();
			popupC.show();
		});
		details2.click(function() {
			mask.show();
			popupB.show();
		});
		close.click(function(){
			$(".success").css("display","none");
		})
	},
	interact: function() {
		var btn = $(".btn");
		var Name = /^[\u4E00-\u9FA5]{2,4}$/;
		var Tel = /^1[3|4|5|7|8]\d{9}$/;
		btn.click(function() {
			var name = $("#name");//姓名
			var sex_boj = $("input[name='sex']"),sex = '';//性别
			sex_boj.each(function(){
			    if($(this).is(':checked')){
			        sex = $(this).val();

			    }

			});
			var tel = $("input[name='tel']").val();//电话
			var firmname = $("#firmname").val();//单位名称
			var address = $("#address").val();//单位地址
			var safe_obj = $("input[name='safe']"),safe='';//单位缴纳
			safe_obj.each(function(){
			    if($(this).is(':checked')){
			        safe = $(this).val();

			    }

			});
			// alert(safe);
			var apply = $("#apply").val();//申请的卡
			var processed = $("#processed").val();//受理银行
			var firmaddress = $("#firmaddress").val();//详细地址
			var recommend = $("#recommend").val();//推荐人的手机
			var param={
							"name":name.val(),
							"sex":sex.toString(),
							"phone":tel.toString(),
							"company":firmname.toString(),
							"addr":address.toString(),
							"firmaddress":firmaddress.toString(),
							"social":safe.toString(),
							"cardype":apply.toString(),
							"accept":processed.toString(),
							"reference":recommend.toString()
						};
			$.post('bin/save.php', param, function(data) {
				if(data.hycode == 0){
					$(".success").css("display","block");
				}else{
					alert(data.msg);
				}
			},"json");
		});
	},
};