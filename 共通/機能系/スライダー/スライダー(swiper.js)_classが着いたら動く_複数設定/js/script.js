$(function () {
  // 初期化済みチェック用
  const initialized = {
    '.sec02 .swiper': false,
    '.sec04 .swiper': false,
  };

  function initSwiper(selector, options) {
    if (!initialized[selector] && $(selector).hasClass('showed')) {
      new Swiper(selector, options);
      initialized[selector] = true;
    }
  }

  function checkAndInitSwipers() {
    initSwiper('.sec02 .swiper', {
      loop: true,
      speed: 1500,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      centeredSlides: true, // 中央寄せ（sec02のみ）
      allowTouchMove: true,
      pagination: false,
      navigation: false,
    });

    initSwiper('.sec04 .swiper', {
      loop: true,
      speed: 1500,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      centeredSlides: false,
      allowTouchMove: true,
      pagination: false,
      navigation: false,
    });
  }

  // スクロール・リサイズ・ロード時に監視
  $(window).on('scroll resize load', function () {
    checkAndInitSwipers();
  });

  // showedクラスの付与を監視（MutationObserver）
  const observer = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        checkAndInitSwipers();
      }
    }
  });

  // 監視対象を指定
  $('.sec02 .swiper, .sec04 .swiper').each(function () {
    observer.observe(this, { attributes: true });
  });
});
