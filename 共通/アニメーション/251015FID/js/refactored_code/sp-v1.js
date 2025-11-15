// ================================
// Slides（Swiperスライダー初期化）
// ================================

// 通常スライドを適用するコンテナ番号
const normalSlideContainers = [3, 7, 18];

// フェードスライドを適用するコンテナ番号
const fadeSlideContainers = [5, 10, 11, 14, 19, 21, 24];

/**
 * Swiperスライダーを初期化する共通関数
 * @param {number} containerNumber - コンテナ番号（例: 3 → .container3）
 * @param {boolean} isFade - フェードスライドを使用するかどうか
 */
function initSwiper(containerNumber, isFade = false) {
  const selector = `.container${containerNumber} .swiper-container`;
  const paginationSelector = `.container${containerNumber} .swiper-pagination`;

  // オプション定義（isFadeで分岐）
  const options = isFade
    ? {
        loop: true,
        speed: 800,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 2600, disableOnInteraction: false },
        normalizeSlideIndex: true,
        watchOverflow: true,
        pagination: {
          el: document.querySelector(paginationSelector),
          clickable: true,
        },
      }
    : {
        loop: true,
        speed: 4000,
        autoplay: { delay: 0, disableOnInteraction: false },
        slidesPerView: 'auto',
      };

  // Swiperインスタンス生成
  new Swiper(selector, options);
}

// 通常スライド・フェードスライドをそれぞれ初期化
normalSlideContainers.forEach((num) => initSwiper(num));
fadeSlideContainers.forEach((num) => initSwiper(num, true));

// ================================
// Intersection Observer（画面内アニメーション制御）
// ================================

// data-observer属性を持つ要素を全て取得
const observedElements = document.querySelectorAll('[data-observer]');

// IntersectionObserver設定
const observerOptions = {
  root: null, // ビューポート基準
  rootMargin: '0px',
  threshold: 0.1, // 要素が10%見えた時に発火
};

// 要素の可視判定とクラス付与処理
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue; // 見えていなければスキップ

    const target = entry.target;

    // activeクラス付与（1回のみ）
    if (!target.classList.contains('active')) {
      target.classList.add('active');
    }

    // trigger-credit属性 → 親要素の.credits-containerをアクティブ化
    if (target.hasAttribute('trigger-credit')) {
      const creditContainer =
        target.parentElement.querySelector('.credits-container');
      if (creditContainer) creditContainer.classList.add('active');
    }

    // trigger-text属性 → 親要素の.container__textをアクティブ化
    if (target.hasAttribute('trigger-text')) {
      const textContainer =
        target.parentElement.querySelector('.container__text');
      if (textContainer) textContainer.classList.add('active');
    }
  }
}, observerOptions);

// 対象要素を監視開始
observedElements.forEach((el) => observer.observe(el));

// ================================
// GSAP ScrollTrigger（固定リボンの表示制御）
// ================================

// ScrollTriggerプラグインを登録
gsap.registerPlugin(ScrollTrigger);

/**
 * 固定リボンのアニメーションを定義
 * スクロール範囲（container1〜24）内でフェードイン/アウト
 */
function initFixedRibbonAnimation() {
  const tl = gsap.timeline();

  tl.to('.fixed-ribbon', {
    bottom: 0, // 初期位置を下端に
    duration: 0,
  }).to('.fixed-ribbon', {
    duration: 0.5,
    opacity: 1,
    ease: 'none', // 緩急なし
  });

  // スクロールに応じて再生/逆再生を制御
  ScrollTrigger.create({
    trigger: '.container1', // アニメーション開始トリガー
    endTrigger: '.container24', // 終了トリガー
    start: 'top bottom', // 表示開始位置
    end: 'bottom bottom', // 表示終了位置
    animation: tl,
    invalidateOnRefresh: true, // リサイズ時に再計算
    toggleActions: 'play reverse restart reverse', // 再生制御
  });
}

// ================================
// Fixed ribbon contents（公開日時に応じた表示制御）
// ================================

// 公開日時（UTC基準）
const openDateUTC = new Date('2025-10-18T00:00:00Z');

// JSTに変換（UTC → UTC+9時間）
const openDateJST = new Date(openDateUTC.getTime() - 9 * 60 * 60 * 1000);
const now = new Date();

/**
 * 現在日時が公開日時を過ぎたら、
 * リボン内の特定要素（.fixed-ribbon__date）を非表示に
 */
if (now > openDateJST) {
  const ribbonDate = document.querySelector('.fixed-ribbon__date');
  if (ribbonDate) ribbonDate.style.display = 'none';
}

// ================================
// Sticky containers（stickyエリアの高さ調整）
// ================================

// HTMLルート要素
const root = document.documentElement;

/**
 * stickyコンテナの高さを計算し、CSS変数に反映する関数
 * - 固定リボンの高さを考慮
 * - CSS内で var(--container-heightN) として使用可能
 */
function updateStickyContainerHeights() {
  const containers = document.querySelectorAll('.sticky-container');
  const ribbon = document.querySelector('.fixed-ribbon');
  const ribbonHeight = ribbon ? ribbon.scrollHeight : 0;

  containers.forEach((container, index) => {
    const height = container.offsetHeight + ribbonHeight;
    root.style.setProperty(`--container-height${index + 1}`, `${height}px`);
  });
}

// ================================
// イベントハンドラ登録
// ================================

window.addEventListener('load', () => {
  initFixedRibbonAnimation(); // GSAPアニメーション初期化
  updateStickyContainerHeights(); // sticky高さ反映
});

window.addEventListener('resize', () => {
  // ScrollTriggerを再初期化（リサイズでずれ防止）
  ScrollTrigger.killAll();
  setTimeout(() => {
    initFixedRibbonAnimation();
    updateStickyContainerHeights();
  }, 800);
});
