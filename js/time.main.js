var svgtime = {
	loaded:false,
  baseline:400,
  permonth:4,
  years:120,
  startyear:1896,
  darkmarks:5,
  paper:'',
  setPoint:function(month, year, name){
    var yeardiff = (year - this.startyear) * (this.permonth * 12);
    var monthdiff = ((month - 1) *  this.permonth) + (this.permonth/2);
    var leftpoint = yeardiff + monthdiff + 20;
    console.log(leftpoint);

    var ticklimits = {
      name:{top:this.baseline, bottom:this.baseline + 100},
      text:this.baseline + 110
    }
    this.paper.circle(leftpoint, this.baseline, 7).attr("fill", "#f00").attr("stroke-width", "0")
      .hover(function(){
        this.animate({"r": 12}, 200);
      }, function(){
        this.animate({"r": 7}, 200);
      })
      .click(function(){ alert("clicked.")})
      ;
    this.paper.path("M"+leftpoint+" "+ticklimits.name.top+"L"+leftpoint+" "+ticklimits.name.bottom).attr("stroke", "red");
    this.paper.text(leftpoint, ticklimits.text, name);
  },
  showBoundryLine:function(month, year){
    var yeardiff = (year - this.startyear) * (this.permonth * 12);
    var monthdiff = ((month - 1) *  this.permonth) + (this.permonth/2);
    var leftpoint = yeardiff + monthdiff + 20;
    var ticklimits = {
      name:{top:0, bottom:600}
    }
  },
  run:function(permonth, years, startyear){
    this.permonth = permonth;
    this.years = years;
    this.startyear = startyear;

    var totalmonths = 12 * this.years
    var canvaswidth = (this.permonth * totalmonths) + 40;
    this.paper = Raphael('timeline', canvaswidth, 600);

    var timelinelength = canvaswidth - 20;
    var c = this.paper.path("M20 "+this.baseline+"L"+timelinelength+" "+this.baseline);

    var leftpos = 20;
    var yearstep = this.permonth * 12;
    var loopyear = this.startyear;
    var ticklimits = {
      big:{top:this.baseline - 20, bottom:this.baseline + 20},
      small:{top:this.baseline - 10, bottom:this.baseline + 10},
      text:this.baseline - 30
    }
    for(var i=0; i <= this.years; i++){
      //Dark mark every 10 years.
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
