// =====================
// Swiper スライダー初期化
// =====================
window.addEventListener('pageshow', () => {
  document
    .querySelectorAll('.swiper-container, .swiper-container02')
    .forEach((sliderElement) => {
      // 既にSwiperが存在している場合は破棄
      if (sliderElement.swiper) {
        sliderElement.swiper.destroy(true, true);
      }

      // Swiperインスタンス生成
      const swiperInstance = new Swiper(sliderElement, {
        speed: 9000,
        slidesPerView: 'auto',
        loop: true,
        loopedSlides: 3,
        freeMode: false,
        freeModeMomentum: false,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
      });

      // スワイプ終了後の補正処理
      swiperInstance.on('touchEnd', function () {
        const getTranslate = this.getTranslate(); // 現在位置
        const slide = sliderElement.querySelector('.swiper-slide');
        const slideWidth = slide ? slide.offsetWidth : 0; // スライド幅（1枚分）
        this.setTranslate(getTranslate - slideWidth);
        this.setTransition(9000);
      });
    });
});

// =====================
// フェードイン処理
// =====================
window.addEventListener('load', fadeHandler);
window.addEventListener('scroll', fadeHandler);
function fadeHandler() {
  document.querySelectorAll('.fadeIn, .fadeUp span').forEach((el) => {
    const imgPos = el.getBoundingClientRect().top + window.scrollY; // 要素の絶対位置
    const scroll = window.scrollY; // 現在のスクロール量
    const windowHeight = window.innerHeight; // 画面の高さ

    if (scroll > imgPos - windowHeight * 0.9) {
      el.classList.add('active');
    }
  });
}
// 初回ロード直後に強制実行
window.addEventListener('load', fadeHandler);

// =====================
// bfcache（戻る/進むキャッシュ）対応
// =====================
window.addEventListener('pageshow', function (event) {
  let isBackForward = event && event.persisted === true;

  try {
    const navEntries = performance?.getEntriesByType?.('navigation');
    if (navEntries && navEntries[0]?.type === 'back_forward') {
      isBackForward = true;
    }
  } catch (e) {}

  if (!isBackForward) return;

  // Swiperを再開
  document.querySelectorAll('.swiper-container').forEach((sliderElement) => {
    if (sliderElement.swiper) {
      const instance = sliderElement.swiper;
      instance.update();
      if (instance.autoplay) {
        instance.autoplay.stop();
        instance.autoplay.start();
      }
      instance.setTransition(9000);
    }
  });

  // フェード処理を再実行
  fadeHandler();
});
