$(function () {
  $('.js-inview').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });
  $('.accordionTrigger').click(function () {
    $(this).toggleClass('open');
    $('.accordion').not(this).removeClass('open');
    if ($(this).hasClass('open')) {
      $(this).html('close');
    } else {
      $(this).html('read more');
    }
    $(this).prev().toggleClass('slide');
    $('.accordion').not($(this)).prev('.accordionTrigger').removeClass('slide');
  });
  $('.js-modal-open').each(function () {
    $(this).on('click', function () {
      var target = $(this).data('target');
      var modal = document.getElementById(target);
      $(modal).fadeIn();
      scrlY = $(window).scrollTop();
      $('body').addClass('no_scroll');
      $('html, body').scrollTop(scrlY);
      return false;
    });
  });
  $('.modalClose').on('click', function () {
    $('.js-modal').fadeOut();
    $('body').removeClass('no_scroll');
    $('html, body').scrollTop(scrlY);
    return false;
  });
});

$(document).ready(function () {
  $('.feature .slick').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    fade: true,
    dots: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  });
});
