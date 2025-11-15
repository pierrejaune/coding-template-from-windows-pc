// フェードイン
$(function () {
  $(window).on('resize load', function () {
    let vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);

    setTimeout(function () {
      $('.feature').addClass('is_show');
      setTimeout(function () {
        $('.js_anime').each(function () {
          var imgPos = $(this).offset().top;
          var scroll = $(window).scrollTop();
          var windowHeight = $(window).height();
          if (scroll > imgPos - windowHeight * 0.75) {
            $(this).addClass('is_show');
          }
        });
      }, 500);
    }, 1000);
  });

  $(window).on('scroll', function () {
    $('.js_anime').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  });
});

$(function () {
  document.querySelectorAll('.splide').forEach(function (element) {
    const slideCount = element.querySelectorAll('.splide__slide').length;
    const splideSwipeThreshold = 80;

    // .sec02 内かどうかを判定
    const isInSec02 = element.closest('.sec02') !== null;

    // PC用（768px以上）の設定
    const pcOptions = {
      type: isInSec02 ? 'slide' : slideCount >= 5 ? 'loop' : 'slide',
      arrows: isInSec02 ? false : slideCount >= 5,
      pagination: isInSec02 ? false : slideCount >= 5,
      drag: isInSec02 ? false : slideCount >= 5,
      snap: isInSec02 ? false : slideCount >= 5,

      autoplay: true,
      pauseOnFocus: false,
      pauseOnHover: true,
      dragMinThreshold: splideSwipeThreshold,

      gap: '3rem',
      padding: '0',
      perPage: 4,

      speed: 1400,
      interval: 4000,

      reducedMotion: {
        autoplay: true,
        speed: 1400,
      },
    };

    // SP用（767px以下）の設定
    const spOptions = {
      type: isInSec02 ? 'slide' : slideCount >= 1 ? 'loop' : 'slide',
      arrows: isInSec02 ? false : slideCount >= 1,
      pagination: isInSec02 ? false : slideCount >= 1,
      drag: isInSec02 ? false : slideCount >= 1,
      snap: isInSec02 ? false : slideCount >= 1,

      gap: '1.6rem',
      padding: '17%', // 左右に余白をつけて1枚を中央に
      perPage: 1,
    };

    // Splide 初期化
    let splide = new Splide(element, {
      ...pcOptions,
      breakpoints: {
        767: spOptions,
      },
    }).mount();

    // --- リサイズ時に再初期化する処理 ---
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        splide.destroy(true); // 完全に破棄
        splide = new Splide(element, {
          ...pcOptions,
          breakpoints: {
            767: spOptions,
          },
        }).mount();
      }, 300); // 300ms デバウンス
    });
  });
});
