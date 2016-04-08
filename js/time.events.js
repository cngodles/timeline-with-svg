$(window).resize(function(){ responder.resized(); });
window.onorientationchange = function (event){ responder.resized(); }

$(document)
.ready(function(){
	responder.setFrameWidths();
	setTimeout(function(){ responder.setFrameWidths(); }, 1000);
	svgtime.run(2, 120, 1900, 10);
	
	svgtime.setPoint(8, 1942, 'Ron');
	svgtime.setPoint(6, 1945, 'Judy');
	svgtime.setPoint(9, 1954, 'Clint');
	svgtime.setPoint(9, 1957, 'Cindy');
	svgtime.setPoint(5, 1962, 'Bill');
	svgtime.setPoint(12, 1963, 'Roni Sue');
	svgtime.setPoint(5, 1983, 'Clint');
	svgtime.setPoint(11, 1983, 'Rachel');
	svgtime.setPoint(8, 1988, 'Kristin');
	svgtime.setPoint(12, 1991, 'Jenn');
	svgtime.setPoint(5, 1998, 'Connor');
	svgtime.setPoint(10, 2005, 'Declan');
	svgtime.setPoint(6, 2010, 'Ralena');
	svgtime.showBoundryLine(4, 2016);
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
};