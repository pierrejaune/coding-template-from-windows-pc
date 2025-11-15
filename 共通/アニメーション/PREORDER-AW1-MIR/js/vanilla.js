const VISIBLE_RATIO = 0.3; // 表示領域の割合（30%）

// 要素とSwiperインスタンスの対応表
const swiperInstances = new Map();

// -----------------------------
// ✅ Swiper 初期化（.js-inviewごとに）
// -----------------------------
function initAllSwipers() {
  //  .js-inview クラス → IntersectionObserver により監視対象
  document.querySelectorAll('.js-inview').forEach((container) => {
    const swiperEl = container.querySelector('.swiper-container');

    if (swiperEl) {
      // クレジット付きスライダー判定（.c__01_img01 を含むか）
      // .swiper-container → .c__01_img01.js-inview の中にあるため、自動的に Swiper の初期化対象になる
      const isCreditSwiper = container.classList.contains('c__01_img01');

      const swiper = new Swiper(swiperEl, {
        autoplay: false, // 最初は止めておく
        loop: true,
        speed: 1000,
        pagination: {
          el: container.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: false,
        on: isCreditSwiper
          ? {
              // クレジット色変更機能付き
              slideChange: function () {
                updateCreditColor(this.realIndex);
              },
            }
          : {},
      });

      // 初回スライドのクレジット色を設定（クレジット用のみ）
      if (isCreditSwiper) {
        updateCreditColor(swiper.realIndex);
      }

      // Mapに登録（inview判定用）
      swiperInstances.set(container, swiper);
    }
  });
}

// -----------------------------
// ✅ クレジット色をスライドに応じて変更（Slide 0：黒、それ以外：白）
// -----------------------------
function updateCreditColor(currentSlide) {
  const creditItems = document.querySelectorAll('.c__01_img01 .credit li');
  creditItems.forEach((li) => {
    li.classList.toggle('color-white', currentSlide !== 0);
  });
}

// -----------------------------
// ✅ 表示領域（30%以上）で is-active + Swiper再生
// -----------------------------
function handleInViewObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.intersectionRatio >= VISIBLE_RATIO) {
          if (!el.classList.contains('is-active')) {
            el.classList.add('is-active');

            // 登録されたSwiperのautoplay開始
            const swiper = swiperInstances.get(el);
            if (swiper?.autoplay) swiper.autoplay.start();
          }
        }
      });
    },
    {
      threshold: generateThresholds(VISIBLE_RATIO),
    }
  );

  document.querySelectorAll('.js-inview').forEach((el) => observer.observe(el));
}

// -----------------------------
// ✅ thresholdを細かく生成（30%などに対応）
// -----------------------------
function generateThresholds(minRatio) {
  const steps = 100;
  const thresholds = [];
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    if (ratio >= minRatio) {
      thresholds.push(ratio);
    }
  }
  return thresholds;
}

// -----------------------------
// ✅ 初期化処理
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  initAllSwipers(); // Swiper初期化（autoplay: false）
  handleInViewObserver(); // 表示領域監視 & 再生制御
});
