// slider
$(function () {
  const swiper = new Swiper('#feature .swiper-container', {
    loop: true,
    effect: 'slide',
    speed: 1000,
    slidesPerView: 1.43,
    centeredSlides: true,
    allowTouchMove: true,
    spaceBetween: 10,
    initialSlide: 1,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
    lazy: {
      loadPrevNext: true,
    },
  });

  const swiper2 = new Swiper('#feature .swiper-container02', {
    slidesPerView: 'auto',
    loop: true,
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
    },
  });

  const swiper3 = new Swiper('#feature .swiper-container03', {
    slidesPerView: 'auto',
    loop: true,
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      reverseDirection: true,
    },
  });
});

//fade
$(function () {
  $(window).on('load scroll', function () {
    $('.fadeIn,.zoom').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 1) {
        $(this).addClass('active');
      }
    });
  });
});

// scroll-up-down-trigger
$(function () {
  const $target = $('.fixed-content');
  let prevScroll = $(window).scrollTop();

  function onScrollHandler() {
    const currentScroll = $(window).scrollTop();

    if (currentScroll < prevScroll) {
      // 上スクロール時
      $target.addClass('is-fixed-open');
    } else {
      // 下スクロール時
      $target.removeClass('is-fixed-open');
    }

    prevScroll = currentScroll;
  }

  $(window).on('scroll', onScrollHandler);
});
