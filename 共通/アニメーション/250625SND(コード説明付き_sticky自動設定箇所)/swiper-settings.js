$(function () {
  // 初期化済みチェック用
  const selectors = ['.sec02 .swiper', '.sec07 .swiper', '.sec10 .swiper'];
  const initialized = {};

  // 共通のSwiperオプション
  const swiperOptions = {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    speed: 1000,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
    },
  };

  // 初期化関数
  function initSwiper(selector) {
    if (!initialized[selector] && $(selector).hasClass('showed')) {
      new Swiper(selector, swiperOptions);
      initialized[selector] = true;
    }
  }

  // 各Swiperをチェックして初期化
  function checkAndInitSwipers() {
    selectors.forEach(initSwiper);
  }

  // スクロール・リサイズ・ロード時にチェック
  $(window).on('scroll resize load', function () {
    checkAndInitSwipers();
  });

  // MutationObserverでshowedクラスの付与を監視
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

  // 各swiperを監視対象に設定
  selectors.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) {
      observer.observe(el, { attributes: true });
    }
  });
});
