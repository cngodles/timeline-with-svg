var projectname = {
	loaded:false,
};
function logme(data){
	if(window.console){ console.log(data); }
}
function runit(permonth, years, startyear){
  var totalmonths = 12 * years
  var canvaswidth = (permonth * totalmonths) + 40;


  var paper = Raphael('timeline', canvaswidth, 600);

  var timelinelength = canvaswidth - 20;
  var c = paper.path("M20 200L"+timelinelength+" 200");

  var leftpos = 20;
  var yearstep = permonth * 12;
  var loopyear = startyear;
  for(var i=0; i <= years; i++){
    //var thistick = paper.path("M"+leftpos+" 190L"+leftpos+" 210");
    if(i % 10 === 0){
      paper.path("M"+leftpos+" 180L"+leftpos+" 220").attr("stroke-width", "3");
      paper.text(leftpos, 170, loopyear);
      console.log('10th');
    } else {
      paper.path("M"+leftpos+" 190L"+leftpos+" 210");
    }
    leftpos += yearstep;
    console.log(loopyear);
    loopyear ++;
  }
//alert(i);
/*

  // Creates circle at x = 50, y = 40, with radius 10
  var circle = paper.circle(50, 40, 10);
  // Sets the fill attribute of the circle to red (#f00)
  circle.attr("fill", "#f00");

  // Sets the stroke attribute of the circle to white
  circle.attr("stroke", "#000");
  */
}
