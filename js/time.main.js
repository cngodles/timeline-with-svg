var svgtime = {
	loaded:false,
	baseline:500,
	permonth:2,
	years:80,
	startyear:1940,
	darkmarks:10,
    lines:{
        per:25,
        last:25
    },
    boundrypoint:0,
    paper:'',
  	setPoint:function(datein, name){
		var datein = datein.split('-');
        
        var yeardiff = (datein[0] - this.startyear) * (this.permonth * 12);
		var monthdiff = ((datein[1] - 1) *  this.permonth) + (this.permonth/2);
		var leftpoint = yeardiff + monthdiff + 20;
		console.log(leftpoint);
	
		var ticklimits = {
		  name:{top:this.baseline, bottom:this.baseline + 100},
		  text:this.baseline + 110
		};
		this.paper.circle(leftpoint, this.baseline, 7).attr("fill", "#f00").attr("stroke-width", "0")
			.hover(function(){
				this.animate({"r": 12}, 200);
			}, function(){
				this.animate({"r": 7}, 200);
			})
			.click(function(){ alert("clicked."); })
			;
		this.paper.path("M"+leftpoint+" "+ticklimits.name.top+"L"+leftpoint+" "+ticklimits.name.bottom).attr("stroke", "red");
		this.paper.text(leftpoint, ticklimits.text, name);
        
        
        this.paper.circle(leftpoint, this.lines.last, 7).attr("fill", "#f00").attr("stroke-width", "0")
        this.paper.path("M"+leftpoint+" "+this.lines.last+"L"+this.boundrypoint+" "+this.lines.last).attr("stroke", "red").attr("stroke-width", "2");
        this.paper.text(leftpoint+10, this.lines.last-5, name).attr('text-anchor', 'start');
        this.lines.last += this.lines.per;
  	},
  	showBoundryLine:function(month, year){
		var yeardiff = (year - this.startyear) * (this.permonth * 12);
		var monthdiff = ((month - 1) *  this.permonth) + (this.permonth/2);
		var leftpoint = yeardiff + monthdiff + 20;
		var ticklimits = {
		  boundry:{top:0, bottom:600}
		};
        this.boundrypoint = leftpoint;
		this.paper.path("M"+leftpoint+" "+ticklimits.boundry.top+"L"+leftpoint+" "+ticklimits.boundry.bottom).attr("stroke-width", "3").attr("stroke", "blue");
  	},
	clear:function(){
		this.paper.clear();  
	},
	run:function(permonth, years, startyear, darkmarks){
		this.permonth = permonth;
		this.years = years;
		this.startyear = startyear;
		this.darkmarks = darkmarks;
	
		var totalmonths = 12 * this.years;
		var canvaswidth = (this.permonth * totalmonths) + 40;
		this.paper = Raphael('timeline', canvaswidth, 700);
	
		var timelinelength = canvaswidth - 20;
		
		this.paper.path("M20 "+this.baseline+"L"+timelinelength+" "+this.baseline);
	
		var leftpos = 20;
		var yearstep = this.permonth * 12;
		var loopyear = this.startyear;
		var ticklimits = {
			big:{top:this.baseline - 20, bottom:this.baseline + 20},
			small:{top:this.baseline - 10, bottom:this.baseline + 10},
			text:this.baseline - 30
		};
		for(var i=0; i <= this.years; i++){
			//Dark mark every x years.
			if(i % this.darkmarks === 0){
				this.paper.path("M"+leftpos+" "+ticklimits.big.top+"L"+leftpos+" "+ticklimits.big.bottom).attr("stroke-width", "3");
				this.paper.text(leftpos, ticklimits.text, loopyear);
				console.log('10th');
			} else {
				this.paper.path("M"+leftpos+" "+ticklimits.small.top+"L"+leftpos+" "+ticklimits.small.bottom);
			}
			leftpos += yearstep;
			console.log(loopyear);
			loopyear ++;
		}
	}
};
function logme(data){
	if(window.console){ console.log(data); }
}
