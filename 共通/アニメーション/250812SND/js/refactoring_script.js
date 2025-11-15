// slider
$(function () {
  // 複数のスライダーを管理するため配列に保存
  const swipers = [];

  // swiper1
  $('#feature .swiper-container').each(function (i, el) {
    const swiper = new Swiper(el, {
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
    swiper.autoplay.stop(); // 最初は止める
    swipers.push({ el, swiper });
    $(el).addClass('anim');
  });

  // swiper2
  $('#feature .swiper-container02').each(function (i, el) {
    const swiper = new Swiper(el, {
      slidesPerView: 'auto',
      loop: true,
      speed: 6000,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
      },
    });
    swiper.autoplay.stop();
    swipers.push({ el, swiper });
    $(el).addClass('anim');
  });

  // swiper3
  $('#feature .swiper-container03').each(function (i, el) {
    const swiper = new Swiper(el, {
      slidesPerView: 'auto',
      loop: true,
      speed: 6000,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        reverseDirection: true,
      },
    });
    swiper.autoplay.stop();
    swipers.push({ el, swiper });
    $(el).addClass('anim');
  });

  // ===== スクロールで監視 =====
  $(window).on('load scroll', function () {
    swipers.forEach(({ el, swiper }) => {
      const $el = $(el);
      if ($el.hasClass('showed')) return; // すでに始動済みならスキップ

      const imgPos = $el.offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();

      if (scroll > imgPos - windowHeight * 0.8) {
        // 8割見えたら
        $el.addClass('showed');
        swiper.autoplay.start(); // 再生開始
      }
    });
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
