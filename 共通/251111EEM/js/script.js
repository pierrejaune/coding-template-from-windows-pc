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

$(function () {
  $('.js-fadeAutoLoop').each(function () {
    const loopElement = $(this); // 各 .js-fadeAutoLoop 要素を取得

    setInterval(function () {
      loopElement.toggleClass('is-open');
    }, 2400);
  });
});

/* swiper-slider.js */

// ループスライダー
$(function () {
  // Swiperのオプション設定
  const swiperOption_01 = {
    loop: true, // ループ有効
    slidesPerView: 'auto', // 一度に表示する枚数
    centeredSlides: true, //スライドを中央に配置
    speed: 12000, // ループの時間
    effect: 'slide', //slide | fade | cube | coverflow | flip | creative | cards
    allowTouchMove: false, // スワイプ無効
    autoplay: {
      delay: 0, // 途切れなくループ
    },
  };

  // Swiperのインスタンスを保持する変数
  let swiper_01;

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

/* swiper-slider_modal-jump.js */
// ※ このJSは、SwiperのDOM生成後に実行を行うこと

// ループスライダー
$(function () {
  // Swiperオプション設定
  const modalSwiperOption_01 = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    effect: 'slide',
    slidesPerView: 1,
    centeredSlides: true,
    fadeEffect: {
      crossFade: true,
    },
    speed: 400,
    observer: true,
    observeParents: true,
  };

  let swiper_modal;

  // 初期化は1度だけ
  function initSwiperOnce() {
    if (!swiper_modal) {
      swiper_modal = new Swiper('#feature .swiper_modal', modalSwiperOption_01);
    }
  }

  initSwiperOnce();

  const modal = document.getElementById('feature');
  const closeBtn = modal.querySelector('.s-modal_close-btn');

  // サムネイルクリックでモーダルを開いてSwiperを移動
  document.querySelectorAll('.thumbnail').forEach((el) => {
    el.addEventListener('click', () => {
      console.log('click_modal');

      const targetIndex = el.getAttribute('data-slide-index');
      if (!swiper_modal || !targetIndex) return;

      // モーダル表示 + bodyスクロール禁止
      modal.classList.add('is-modal-active');
      document.body.classList.add('s-modal-open');

      // 少し遅延してスライド移動（描画安定のため）
      setTimeout(() => {
        swiper_modal.update(); // モーダル表示直後にレイアウト再計算

        const slides = swiper_modal.slides;
        let realIndex = -1;

        for (let i = 0; i < slides.length; i++) {
          const slide = slides[i];
          if (
            slide.getAttribute('data-slide-index') === targetIndex &&
            !slide.classList.contains('swiper-slide-duplicate')
          ) {
            realIndex = parseInt(slide.getAttribute('data-swiper-slide-index'));
            break;
          }
        }

        if (realIndex >= 0) {
          swiper_modal.slideToLoop(realIndex, 400);
        }
      }, 10);
    });
  });

  // モーダルを閉じる
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-modal-active');
    document.body.classList.remove('s-modal-open');
  });

  // リサイズ対応：Swiper更新＆現在位置を再適用
  window.addEventListener('resize', () => {
    if (swiper_modal) {
      swiper_modal.update();
      swiper_modal.slideToLoop(swiper_modal.realIndex, 0);
    }
  });
});

// 参考ページ
// https://usg-stg.fashion-co-lab.jp/s/250428SND/
