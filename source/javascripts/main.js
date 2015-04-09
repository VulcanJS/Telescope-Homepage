//= require chartist/dist/chartist.js

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

});
