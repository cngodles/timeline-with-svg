$(window).resize(function(){ responder.resized(); });
window.onorientationchange = function (event){ responder.resized(); }

$(document)
.ready(function(){
	responder.setFrameWidths();
	setTimeout(function(){ responder.setFrameWidths(); }, 1000);
	runit(3, 120, 1896);
})
.on("click", "#nav-toggle", function(){
	//Toggle Mobile Slide Menu
	responder.openDeviceMenu();
	return false;
})
;

var responder = {
	openwidth:-68,
	isopen:false,
	action:false,
	curZindex:1,
	resizeCallbacks:[function(){ responder.setFrameWidths(); }],
	resized:function(){
		var thisobj = this;
		if(thisobj.resizeCallbacks.length > 0){
			for(var i=0; i < thisobj.resizeCallbacks.length; i++){
				try {
					responder.resizeCallbacks[i]();
				}
				catch(err){
					logme('Function does not exist');
				}
			}
		}
	},
	setFrameWidths:function(){
		$("body").css('width', '100%');
		var curzindex = parseInt($("#responder").css('z-index'));
		this.curZindex = curzindex;
		switch(curzindex){
			case 1:
			this.closeDeviceMenu();
			break;
			case 5:
			this.closeDeviceMenu();
			break;
			case 10:
			this.adjustDeviceMenu();
			break;
		}
	},
	openDeviceMenu:function(){
		var thisobj = this;
		this.action = true;
		$("#wrapper").stop(true, true).animate({'margin-left':thisobj.openwidth+'%'}, 600, function(){
			$("#wrapper").bind("click", function(){
				thisobj.closeDeviceMenu();
				$("#wrapper").css('cursor','pointer');
				return false;
			});
			$("#nav-toggle").addClass("active");
			thisobj.isopen = true;
			thisobj.action = false;
		});
	},
	adjustDeviceMenu:function(){
		//Useful if menu size is different from Desktop to Tablet
		var thisobj = this;
		this.action = true;
		if(this.isopen){
			$("#wrapper").stop(true, true).css({'margin-left':thisobj.openwidth+'%'});
		}
	},
	closeDeviceMenu:function(){
		//Closes menu for tablets and phones.
		var thisobj = this;
		this.action = true;
		$("#wrapper").stop(true, true).animate({'margin-left':'0'}, 600, function(){
			$("#wrapper").unbind("click").css('cursor','default');
			$("#nav-toggle").removeClass("active");
			thisobj.isopen = false;
			thisobj.action = false;
		});
	},
	closeAllMenus:function(){
		if(this.isopen){
			this.closeDeviceMenu();
		}
	}
}
