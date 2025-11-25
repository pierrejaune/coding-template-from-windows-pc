// ===============================
// 画面読み込み時の処理
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  // -------------------------------------
  // フェードイン処理（jQuery）
  // -------------------------------------
  $(function () {
    $(window).on('resize load', function () {
      // 1秒後に .feature に is_show を付与（最初のフェード）
      setTimeout(function () {
        $('.feature').addClass('is_show');

        // さらに 0.5秒後、スクロール位置によってアニメを開始
        setTimeout(function () {
          // .js_anime 要素のアニメ開始（少し早めの開始）
          $('.js_anime').each(function () {
            var imgPos = $(this).offset().top; // 要素の位置
            var scroll = $(window).scrollTop(); // 現在のスクロール量
            var windowHeight = $(window).height(); // 画面の高さ

            // 画面の下 75% の位置を越えたら表示
            if (scroll > imgPos - windowHeight * 0.75) {
              $(this).addClass('is_show');
            }
          });

          // .js_animenext 要素のアニメ開始（画面に入ったらすぐ）
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

  // -------------------------------------
  // スクロール時に .js_anime を表示
  // -------------------------------------
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

  // -------------------------------------
  // スクロール時に .js_animenext を表示
  // -------------------------------------
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

// ===============================
// 自動フェードループ `.js-fadeAutoLoop`
// ===============================
$(function () {
  $('.js-fadeAutoLoop').each(function () {
    const loopElement = $(this); // 各ループ対象

    // 2.4秒ごとに is-open を付け替え → 点滅アニメ的挙動
    setInterval(function () {
      loopElement.toggleClass('is-open');
    }, 2400);
  });
});

// ===============================
// swiper-slider.js（横ループスライダー）
// ===============================
$(function () {
  // Swiperの設定
  const swiperOption_01 = {
    loop: true, // 無限ループ
    slidesPerView: 'auto', // 複数枚が流れる
    centeredSlides: true, // 中央寄せ
    speed: 12000, // 超ゆっくり流れる
    effect: 'slide',
    allowTouchMove: false, // 手動スワイプ無効（自動流しのみ）
    autoplay: {
      delay: 0, // 途切れなくループ
    },
  };

  // Swiperのインスタンス
  let swiper_01;

  // 初期化
  function initSwiper() {
    if (swiper_01) {
      // リサイズ時に既存インスタンスを完全破棄して再生成
      swiper_01.destroy(true, true);
      swiper_01 = undefined;
    }

    // 新しく生成
    if (!swiper_01) {
      swiper_01 = new Swiper('#feature .swiper_01', swiperOption_01);
    }
  }

  // 初期実行
  initSwiper();

  // debounce（連続 resize 発火を抑制）
  function debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  }

  // リサイズ・向き変更に対応して再初期化
  window.addEventListener('resize', debounce(initSwiper, 200), false);
  window.addEventListener(
    'orientationchange',
    debounce(initSwiper, 200),
    false
  );
});

// ===============================
// swiper-slider_modal-jump.js（モーダル＋Swiper）
// ===============================
$(function () {
  // モーダル内スライダー設定
  const modalSwiperOption_01 = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    effect: 'slide',
    slidesPerView: 1,
    centeredSlides: true,
    fadeEffect: { crossFade: true },
    speed: 400,
    observer: true, // DOM変化に対応
    observeParents: true,
  };

  let swiper_modal;

  // 初回のみ初期化
  function initSwiperOnce() {
    if (!swiper_modal) {
      swiper_modal = new Swiper('#feature .swiper_modal', modalSwiperOption_01);
    }
  }

  initSwiperOnce();

  const modal = document.getElementById('feature');
  const closeBtn = modal.querySelector('.s-modal_close-btn');

  // -------------------------------------
  // サムネイルクリックでモーダル表示＋該当スライドへ移動
  // -------------------------------------
  document.querySelectorAll('.thumbnail').forEach((el) => {
    el.addEventListener('click', () => {
      console.log('click_modal');

      const targetIndex = el.getAttribute('data-slide-index');
      if (!swiper_modal || !targetIndex) return;

      // モーダル表示
      modal.classList.add('is-modal-active');
      document.body.classList.add('s-modal-open');

      // 少し遅延してスライド更新（描画安定のため）
      setTimeout(() => {
        swiper_modal.update();

        const slides = swiper_modal.slides;
        let realIndex = -1;

        // ループのダミースライドを除外して一致する index を探す
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

        // 該当スライドへジャンプ
        if (realIndex >= 0) {
          swiper_modal.slideToLoop(realIndex, 400);
        }
      }, 10);
    });
  });

  // -------------------------------------
  // モーダルを閉じる
  // -------------------------------------
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-modal-active');
    document.body.classList.remove('s-modal-open');
  });

  // -------------------------------------
  // リサイズ時：Swiper再計算 + 現在位置維持
  // -------------------------------------
  window.addEventListener('resize', () => {
    if (swiper_modal) {
      swiper_modal.update();
      swiper_modal.slideToLoop(swiper_modal.realIndex, 0);
    }
  });
});

// ===============================
// 参考
// 上記コードでモーダル・スライダー・フェードアニメなどを制御
// ===============================
