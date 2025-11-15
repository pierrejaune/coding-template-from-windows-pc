$(document).ready(function () {
  $(window).on('scroll', function () {
    var scrollTop = $(window).scrollTop();

    $('.parallax-item').each(function () {
      var speed = $(this).data('speed');
      $(this).css('transform', 'translateY(' + scrollTop * speed + 'px)');
    });
  });
});
