
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


/*
 * requestAnimationFrame pollyfill
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  });
}


/*!
 * Mantis.js / jQuery / Zepto.js plugin for Constellation
 * @version 1.2.2
 * @author Acauã Montiel <contato@acauamontiel.com.br>
 * @license http://acaua.mit-license.org/
 */
(function ($, window) {
  /**
   * Makes a nice constellation on canvas
   * @constructor Constellation
   */
  function Constellation (canvas, options) {
    var $canvas = $(canvas),
      context = canvas.getContext('2d'),
      defaults = {
        star: {
          color: 'rgba(255, 255, 255, .5)',
          width: 1
        },
        line: {
          color: 'rgba(255, 255, 255, .5)',
          width: 0.2
        },
        position: {
          x: 0, // This value will be overwritten at startup
          y: 0 // This value will be overwritten at startup
        },
        width: window.innerWidth,
        height: window.innerHeight,
        velocity: 0.1,
        length: 100,
        distance: 120,
        radius: 150,
        stars: []
      },
      config = $.extend(true, {}, defaults, options);

    function Star () {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.vx = (config.velocity - (Math.random() * 0.5));
      this.vy = (config.velocity - (Math.random() * 0.5));

      this.radius = Math.random() * config.star.width;
    }

    Star.prototype = {
      create: function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
      },

      animate: function(){
        var i;
        for (i = 0; i < config.length; i++) {

          var star = config.stars[i];

          if (star.y < 0 || star.y > canvas.height) {
            star.vx = star.vx;
            star.vy = - star.vy;
          } else if (star.x < 0 || star.x > canvas.width) {
            star.vx = - star.vx;
            star.vy = star.vy;
          }

          star.x += star.vx;
          star.y += star.vy;
        }
      },

      line: function(){
        var length = config.length,
          iStar,
          jStar,
          i,
          j;

        for (i = 0; i < length; i++) {
          for (j = 0; j < length; j++) {
            iStar = config.stars[i];
            jStar = config.stars[j];

            if (
              (iStar.x - jStar.x) < config.distance &&
              (iStar.y - jStar.y) < config.distance &&
              (iStar.x - jStar.x) > - config.distance &&
              (iStar.y - jStar.y) > - config.distance
            ) {
              if (
                (iStar.x - config.position.x) < config.radius &&
                (iStar.y - config.position.y) < config.radius &&
                (iStar.x - config.position.x) > - config.radius &&
                (iStar.y - config.position.y) > - config.radius
              ) {
                context.beginPath();
                context.moveTo(iStar.x, iStar.y);
                context.lineTo(jStar.x, jStar.y);
                context.stroke();
                context.closePath();
              }
            }
          }
        }
      }
    };

    this.createStars = function () {
      var length = config.length,
        star,
        i;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (i = 0; i < length; i++) {
        config.stars.push(new Star());
        star = config.stars[i];

        star.create();
      }

      // star.line();
      star.animate();
    };

    this.setCanvas = function () {
      canvas.width = config.width;
      canvas.height = config.height;
    };

    this.setContext = function () {
      context.fillStyle = config.star.color;
      context.strokeStyle = config.line.color;
      context.lineWidth = config.line.width;
    };

    this.setInitialPosition = function () {
      if (!options || !options.hasOwnProperty('position')) {
        config.position = {
          x: canvas.width * 0.5,
          y: canvas.height * 0.5
        };
      }
    };

    this.loop = function (callback) {
      callback();

      window.requestAnimationFrame(function () {
        this.loop(callback);
      }.bind(this));
    };

    this.bind = function () {
      $canvas.on('mousemove', function(e){
        config.position.x = e.pageX - $canvas.offset().left;
        config.position.y = e.pageY - $canvas.offset().top;
      });
    };

    this.init = function () {
      this.setCanvas();
      this.setContext();
      this.setInitialPosition();
      this.loop(this.createStars);
      this.bind();
    };
  }

  $.fn.constellation = function (options) {
    return this.each(function () {
      var c = new Constellation(this, options);
      c.init();
    });
  };
})($, window);

// Init plugin
if ($('body').width() > 400) {
  $('#space').constellation({
    line: {
      color: 'rgba(200, 145, 235, .7)'
    }
  });
}