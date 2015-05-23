
var coefficients = {
  deploys: 1,
  stars: 0.7,
  forks: 1.3,
  visitors: 1.2
}

customTooltips = function(tooltip) {

  var tooltipContainer = $('.chartjs-tooltips');

  if (tooltip) {
    tooltipContainer.css({opacity: 1});

    // create a "fake" event that we can pass to getPointsAtEvent
    var e = jQuery.Event( "click" );
    e.clientX = tooltip.x - tooltip.xPadding - tooltip.xOffset;
    e.clientY = tooltip.y;
    e.currentTarget = tooltip.chart.canvas;

    var activePoints = myNewChart.getPointsAtEvent(e);
    // => activePoints is an array of points on the canvas that are at the same position as the click event.
    // console.log(activePoints[0].label)

    activePoints.forEach(function (point, index) {
      var childIndex = index + 1;
      var tooltip = tooltipContainer.find('.tooltips .tooltip:nth-child('+childIndex+')');
      tooltip.find('.tooltip-label').text(point.datasetLabel);
      tooltip.find('.tooltip-value').text(point.value);
      tooltip.css({
        left: point.x+10,
        top: point.y-14,
        opacity: 1
      });
    });

    var highestPointY = _.min(_.pluck(activePoints, 'y')); // we count from the top
    $('.tooltip-divider').css({
      opacity: 1,
      left: activePoints[0].x,
      top: highestPointY
    });
  } else {
    tooltipContainer.css({opacity: 0});
  }
};

$(function(){

  $('body').addClass('animate');
  $(".video").fitVids();
	$('#origin').val(document.referrer);

  $('.annotation-target').hover(function () {
    var targetClass = $(this).attr('id');
    $('.annotation:not(.'+targetClass+')').addClass('faded');
    $('.'+targetClass).addClass('highlight');

  }, function () {
    $('.annotation').removeClass('faded highlight');
  });


  var dataPoints = 60;
  var dataPointEveryXDays = 1;
  var totalDays = dataPoints * dataPointEveryXDays;

  $.getJSON('http://version.telescopeapp.org/api', {}, function (jsonData) {
    var jsonData = _.last(jsonData, totalDays);
    
    var ctx = $("#myChart").get(0).getContext("2d");

    var colors = {
      fillColor: "rgba(220,220,220,0.05)",
      strokeColor: "rgba(255,255,255,0.4)",
      pointColor: "rgba(255,255,255,0)",
      pointStrokeColor: "rgba(255,255,255,0)",
      pointHighlightFill: "rgba(255,255,255,0.8)",
      pointHighlightStroke: "rgba(255,255,255,0)",
    };


    // use the last X days as labels
    var labels = _.range(0,dataPoints).map(function (d) {return moment().subtract(totalDays, 'days').add(d * dataPointEveryXDays, 'days').format("MM/DD")});

    var datasets = [
      {
        label: "Active Deploys",
        data: _.pluck(jsonData, 'activeCount')
      },
      {
        label: "Total Stars",
        data: _.pluck(jsonData, 'starsCount')
      },      
      {
        label: "Total Forks",
        data: _.pluck(jsonData, 'forksCount')
      },      
      {
        label: "Daily Visitors",
        data: _.pluck(jsonData, 'visitorsCount')
      },      
    ].map(function (d) {
      return _.extend(d, colors);
    });

    var data = {
      labels: labels,
      datasets: datasets
    };

    console.log(data)

    var options = {
      customTooltips: customTooltips,
      animation: false,
      responsive: true,
      showScale : false,
      bezierCurve: false,
      multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
      datasetStrokeWidth: 1,
      pointHitDetectionRadius : 9
    }

    myNewChart = new Chart(ctx).Line(data, options);

  });

  // $.getJSON('http://version.telescopeapp.org/api', {}, function (jsonData) {
  //   var jsonData = _.first(jsonData, 30);
  //   console.log(jsonData);
  //   var active = _.pluck(jsonData, 'activeCount');
  //   var data = {
  //     labels: _.range(1, 30),
  //     series: [
  //       {
  //         name: 'Active Instances',
  //         data: active
  //       }
  //     ]
  //   };
  //   var options = {
  //     // Don't draw the line chart points
  //     showPoint: false,
  //     // Disable line smoothing
  //     lineSmooth: false,
  //     // X-Axis specific configuration
  //     axisX: {
  //       // We can disable the grid for this axis
  //       showGrid: true,
  //       // and also don't show the label
  //       showLabel: true
  //     },
  //     // // Y-Axis specific configuration
  //     // axisY: {
  //     //   // Lets offset the chart a bit from the labels
  //     //   offset: 60,
  //     //   // The label interpolation function enables you to modify the values
  //     //   // used for the labels on each axis. Here we are converting the
  //     //   // values into million pound.
  //     //   labelInterpolationFnc: function(value) {
  //     //     return '$' + value + 'm';
  //     //   }
  //     // }
  //   }
  //   new Chartist.Line('.ct-chart', data, options);
  // });

});





var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 10;
var numStars = 600;

$('document').ready(function() {
  
  // Calculate the screen size
  screenH = $(window).height();
  screenW = $(window).width();
  
  // Get the canvas
  canvas = $('#space');
  
  // Fill out the canvas
  canvas.attr('height', screenH);
  canvas.attr('width', screenW);
  context = canvas[0].getContext('2d');
  
  // Create all the stars
  for(var i = 0; i < numStars; i++) {
    var x = Math.round(Math.random() * screenW);
    var y = Math.round(Math.random() * screenH);
    var length = 1 + Math.random() * 2;
    var opacity = Math.random();
    
    // Create a new star and draw
    var star = new Star(x, y, length, opacity);
    
    // Add the the stars array
    stars.push(star);
  }
  
  setInterval(animate, 1000 / fps);
});

/**
 * Animate the canvas
 */
function animate() {
  context.clearRect(0, 0, screenW, screenH);
  $.each(stars, function() {
    this.draw(context);
  })
}

/**
 * Star
 * 
 * @param int x
 * @param int y
 * @param int length
 * @param opacity
 */
function Star(x, y, length, opacity) {
  this.x = parseInt(x);
  this.y = parseInt(y);
  this.length = parseInt(length);
  this.opacity = opacity;
  this.factor = 1;
  this.increment = Math.random() * .03;
}

/**
 * Draw a star
 * 
 * This function draws a start.
 * You need to give the contaxt as a parameter 
 * 
 * @param context
 */
Star.prototype.draw = function() {
  context.rotate((Math.PI * 1 / 10));
  
  // Save the context
  context.save();
  
  // move into the middle of the canvas, just to make room
  context.translate(this.x, this.y);
  
  // Change the opacity
  if(this.opacity > 1) {
    this.factor = -1;
  }
  else if(this.opacity <= 0) {
    this.factor = 1;
    
    this.x = Math.round(Math.random() * screenW);
    this.y = Math.round(Math.random() * screenH);
  }
    
  this.opacity += this.increment * this.factor;
  
  context.beginPath()
  for (var i = 5; i--;) {
    context.lineTo(0, this.length);
    context.translate(0, this.length);
    context.rotate((Math.PI * 2 / 10));
    context.lineTo(0, - this.length);
    context.translate(0, - this.length);
    context.rotate(-(Math.PI * 6 / 10));
  }
  context.lineTo(0, this.length);
  context.closePath();
  context.fillStyle = "rgba(214, 203, 237, " + this.opacity + ")";
  // context.shadowBlur = 5;
  // context.shadowColor = '#ffff33';
  context.fill();
  
  context.restore();
}