//fade
$(function () {
  $(window).on('load scroll', function () {
    $('.blur').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.85) {
        $(this).addClass('active');
      }
    });
  });
});

// credit
$(function () {
  $('.creditBtn').on('click', function () {
    if ($(this).hasClass('on')) {
      $(this).removeClass('on');
      $(this).next().removeClass('on');
      $(this).parent().removeClass('on');
    } else {
      $(this).addClass('on');
      $(this).next().addClass('on');
      $(this).parent().addClass('on');
    }
  });
});

// slider
$(function () {
  $('.sec__slider').each(function () {
    var $slider = $(this);
    var $dots = $slider.closest('.sec__model').find('.dots-container');
    $slider.slick({
      fade: false,
      speed: 1000,
      autoplaySpeed: 4000,
      autoplay: true,
      arrows: false,
      dots: true,
      appendDots: $dots,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
    });
  });
});
