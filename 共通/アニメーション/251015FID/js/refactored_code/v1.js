// ================================
// Slides（スライダーの初期化）
// ================================

// 通常スライドを適用するコンテナ番号
const normalSlideContainers = [3, 7, 18];
// フェードスライドを適用するコンテナ番号
const fadeSlideContainers = [5, 10, 11, 14, 19, 21, 24];

/**
 * Swiperスライダーを初期化する共通関数
 * @param {number} containerNumber - コンテナ番号
 * @param {boolean} isFade - フェードスライドを使用するかどうか
 */
function initSwiper(containerNumber, isFade = false) {
  const selector = `.container${containerNumber} .swiper-container`;
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
          el: document.querySelector(
            `.container${containerNumber} .swiper-pagination`
          ),
          clickable: true,
        },
      }
    : {
        loop: true,
        speed: 4000,
        autoplay: { delay: 0, disableOnInteraction: false },
        slidesPerView: 'auto',
      };

  new Swiper(selector, options);
}

// 通常スライドを初期化
normalSlideContainers.forEach((num) => initSwiper(num));
// フェードスライドを初期化
fadeSlideContainers.forEach((num) => initSwiper(num, true));

// ================================
// Intersection Observer（画面内アニメーション制御）
// ================================

// data-observer属性を持つ要素を全て取得
const observedElements = document.querySelectorAll('[data-observer]');

// IntersectionObserverの設定
const observerOptions = {
  root: null, // ビューポートを基準に監視
  rootMargin: '0px',
  threshold: 0.1, // 10%見えた時に発火
};

// 要素が画面に入った時の処理
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const target = entry.target;
    if (!entry.isIntersecting) continue; // 可視領域外ならスキップ

    // activeクラスを付与（1度のみ）
    if (!target.classList.contains('active')) {
      target.classList.add('active');
    }

    // trigger-credit属性がある場合、親要素のcredits-containerをアクティブ化
    if (target.hasAttribute('trigger-credit')) {
      const creditContainer =
        target.parentElement.querySelector('.credits-container');
      if (creditContainer) creditContainer.classList.add('active');
    }

    // trigger-text属性がある場合、親要素のcontainer__textをアクティブ化
    if (target.hasAttribute('trigger-text')) {
      const textContainer =
        target.parentElement.querySelector('.container__text');
      if (textContainer) textContainer.classList.add('active');
    }
  }
}, observerOptions);

// 監視開始
observedElements.forEach((el) => observer.observe(el));

// ================================
// Fixed ribbon contents（固定リボンの制御）
// ================================

// 公開日時（UTC基準）を設定
const openDateUTC = new Date('2025-10-18T00:00:00Z');
// JSTに変換（UTCから+9時間引く）
const openDateJST = new Date(openDateUTC.getTime() - 9 * 60 * 60 * 1000);
const now = new Date();

// 現在が公開日時を過ぎたら、リボン内テキストを非表示に
if (now > openDateJST) {
  const ribbon = document.querySelector('.fixed-text__point');
  if (ribbon) ribbon.style.display = 'none';
}

// ================================
// Sticky containers（stickyエリアの高さ調整）
// ================================

// ルート要素（<html>）を取得
const root = document.documentElement;

/**
 * stickyコンテナの高さをCSS変数に反映
 * 例: --container-height1, --container-height2 ...
 */
function updateStickyContainerHeights() {
  // sticky-container クラスを持つ全要素を取得
  const containers = document.querySelectorAll('.sticky-container');

  containers.forEach((container, index) => {
    const height = container.offsetHeight;
    // CSS変数に高さを代入（1から始まる連番）
    root.style.setProperty(`--container-height${index + 1}`, `${height}px`);
  });
}

// ページロードとリサイズ時に実行
window.addEventListener('load', updateStickyContainerHeights);
window.addEventListener('resize', updateStickyContainerHeights);
