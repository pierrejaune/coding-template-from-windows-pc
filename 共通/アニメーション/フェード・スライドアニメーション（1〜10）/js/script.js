// script.js
$(document).ready(function () {
  $('.animate-btn').click(function () {
    var animationClass = $(this).data('animation');
    var target = $('.animation-box');

    target.removeClass().addClass('animation-box ' + animationClass);
  });
});
