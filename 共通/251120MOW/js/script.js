document.addEventListener('DOMContentLoaded', function () {
  // デバイス判定を行い、対応したデバイスに必要な処理を実行
  var ua = navigator.userAgent;
  var iphone = ua.indexOf('iPhone') > 0;
  var androidSp = ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0;
  // var ipad = ua.indexOf("iPad");
  // var androidT = ua.indexOf("Android");

  if (iphone || androidSp) {
  }
});

/* animation.js */

document.addEventListener('DOMContentLoaded', function () {
  // フェードイン
  $(function () {
    $(window).on('resize load', function () {
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

          $('.js_animenext').each(function () {
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight) {
              $(this).addClass('is_show');
            }
          });
        }, 500);
      }, 1000);
    });
  });

  $(window).on('scroll load', function () {
    $('.js_anime').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  });

  $(window).on('scroll load', function () {
    $('.js_animenext').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight) {
        $(this).addClass('is_show');
      }
    });
  });
});

/* movie.js */

// 動画遅延読み込み
$(function () {
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  });
  // inview
  $('.js_movie').on('inview', function () {
    const video = this; // DOMのvideo要素

    // ミュート解除 (Chromeの仕様上、videoタグパラメータで autoplay設定時はmutedを付与しないと再生がされない)
    video.muted = false;
    video.volume = 0; // 音量100%

    // 再生
    video.play();
  });
});

jQuery.fn.play = function (fn) {
  return fn ? this.bind('play', fn) : this.trigger('play');
};

/* swiper-slider.js */

// ループスライダー
$(function () {
  // Swiperのオプション設定
  const swiperOption_01 = {
    loop: true,
    effect: 'fade', //slide | fade | cube | coverflow | flip | creative | cards
    slidesPerView: 'auto', //スライド表示枚数
    centeredSlides: true, //スライドを中央に配置

    // effect:fade の再設定（opacity対策）
    fadeEffect: {
      crossFade: true,
    },
    speed: 1200,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  };

  // Swiperのインスタンスを保持する変数
  let swiper_01;
  // let swiper_02;

  // 初期化関数
  function initSwiper() {
    if (swiper_01) {
      swiper_01.destroy(true, true); // インスタンスを完全に破棄
      swiper_01 = undefined;
    }
    if (!swiper_01) {
      swiper_01 = new Swiper('#feature .swiper_01', swiperOption_01);
    }
  }

  // 初期化実行
  initSwiper();

  // debounce関数（連続発火防止）
  function debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  }

  // 端末判定はせず、両方のイベントを監視
  window.addEventListener('resize', debounce(initSwiper, 200), false);
  window.addEventListener(
    'orientationchange',
    debounce(initSwiper, 200),
    false
  );
});
