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

// ============================================================
// Swiper：サムネイルクリックでモーダルを開き、
//          対応スライドへ正確にジャンプする最適化コード
// ============================================================
// 改善ポイント：
// ・ループスライダーの複製スライド問題を正しく処理
// ・コードを明確に分割（初期化 / イベント設定 / スライド同期）
// ・DOM取得を最小化
// ・可読性・保守性向上
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // モーダル要素取得
  // -------------------------------
  const modal = document.querySelector('#feature');
  const closeBtn = modal.querySelector('.s-modal_close-btn');
  const thumbnails = document.querySelectorAll('.thumbnail');

  // -------------------------------
  // モーダル内 Swiper オプション
  // -------------------------------
  const modalSwiperOption = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    effect: 'slide',
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400,
    observer: true,
    observeParents: true,
  };

  let modalSwiper = null;

  // -------------------------------
  // Swiper 初期化（1度だけ）
  // -------------------------------
  function initModalSwiper() {
    if (!modalSwiper) {
      modalSwiper = new Swiper('#feature .swiper_modal', modalSwiperOption);
    }
  }

  initModalSwiper();

  // -------------------------------
  // サムネイル → 対応スライド index を取得する関数
  // ※ loop:true で複製スライドがあるため、
  //   data-slide-index の一致 × 複製スライド除外 で true index を探す
  // -------------------------------
  function findRealIndex(targetIndex) {
    const slides = modalSwiper.slides;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const slideIndex = slide.getAttribute('data-slide-index');
      const isDuplicate = slide.classList.contains('swiper-slide-duplicate');

      if (slideIndex === targetIndex && !isDuplicate) {
        // Swiper が内部で管理する real index を返す
        return Number(slide.getAttribute('data-swiper-slide-index'));
      }
    }
    return -1;
  }

  // -------------------------------
  // モーダルを開く処理
  // -------------------------------
  function openModal() {
    modal.classList.add('is-modal-active');
    document.body.classList.add('s-modal-open');
  }

  // -------------------------------
  // モーダルを閉じる処理
  // -------------------------------
  function closeModal() {
    modal.classList.remove('is-modal-active');
    document.body.classList.remove('s-modal-open');
  }

  // -------------------------------
  // サムネイルクリックイベント
  // -------------------------------
  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const targetIndex = thumb.getAttribute('data-slide-index');
      if (!targetIndex) return;

      openModal();

      // 少し遅延 → レイアウト安定後にスライド移動
      setTimeout(() => {
        modalSwiper.update();

        const realIndex = findRealIndex(targetIndex);
        if (realIndex >= 0) {
          modalSwiper.slideToLoop(realIndex, 400);
        }
      }, 20);
    });
  });

  // -------------------------------
  // モーダルを閉じる
  // -------------------------------
  closeBtn.addEventListener('click', closeModal);

  // -------------------------------
  // リサイズ時の処理
  // スライド位置を維持しつつレイアウト再計算
  // -------------------------------
  window.addEventListener('resize', () => {
    if (modalSwiper) {
      modalSwiper.update();
      modalSwiper.slideToLoop(modalSwiper.realIndex, 0);
    }
  });
});
