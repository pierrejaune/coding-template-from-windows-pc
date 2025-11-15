document.addEventListener('DOMContentLoaded', function () {
  // ★ フェードスライダー（Slickの .slider に対応）
  const fadeSlider = new Swiper('.slider', {
    loop: true,
    effect: 'fade',
    speed: 1500,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.slider .swiper-pagination',
      clickable: true,
    },
    simulateTouch: true,
  });

  // ★ 無限ロゴスライダー（Slickの .loopslider に対応）
  const loopSlider = new Swiper('.loopslider', {
    loop: true,
    slidesPerView: 'auto', // 可変幅対応
    speed: 10000, // 超スロー移動
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freeMode: true, // 連続スクロール的な動作
    freeModeMomentum: false,
    allowTouchMove: false, // スワイプ禁止
    centeredSlides: true, // 中央揃え
  });
});
