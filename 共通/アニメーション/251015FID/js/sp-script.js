// ==============================
// Slides（スライダー設定）
// ==============================

// 通常スライドを適用するコンテナ番号（例：.container3, .container7, .container18）
const normalSlideContainerNumbers = [3, 7, 18];

// フェードスライドを適用するコンテナ番号
const fadeSlideContainerNumbers = [5, 10, 11, 14, 19, 21, 24];

/**
 * 通常スライダーを初期化する関数
 * ループ＋スピード4000msで自動スクロールするスライダーを設定
 */
function initNormalSlide(containerNumber) {
  new Swiper(`.container${containerNumber} .swiper-container`, {
    loop: true, // スライドを無限ループ
    speed: 4000, // スライド切り替え速度
    autoplay: {
      delay: 0, // 切り替え間隔なしで連続的に動作
      disableOnInteraction: false, // ユーザー操作後も自動再生を継続
    },
    slidesPerView: 'auto', // スライドの表示数を自動調整
  });
}

/**
 * フェードスライダーを初期化する関数
 * フェード切り替えエフェクト＋ページネーション付き
 */
function initFadeSlide(containerNumber) {
  new Swiper(`.container${containerNumber} .swiper-container`, {
    loop: true, // 無限ループ
    speed: 800, // フェードアニメーション速度
    effect: 'fade', // フェード効果を使用
    fadeEffect: { crossFade: true }, // フェード間でクロスフェード
    autoplay: {
      delay: 2600, // 2.6秒ごとに切り替え
      disableOnInteraction: false,
    },
    normalizeSlideIndex: true, // スライドインデックスのずれを修正
    watchOverflow: true, // スライド数が少ない場合は無効化
    pagination: {
      el: document.querySelector(
        `.container${containerNumber} .swiper-pagination`
      ), // ページネーション要素指定
      clickable: true, // クリック操作で切り替え可能
    },
  });
}

// 指定されたコンテナ番号に応じてそれぞれ初期化
normalSlideContainerNumbers.forEach((number) => initNormalSlide(number));
fadeSlideContainerNumbers.forEach((number) => initFadeSlide(number));

// ==============================
// Intersection Observer（要素が画面に入った時の処理）
// ==============================

// data-observer 属性を持つすべての要素を取得
const observedObjects = document.querySelectorAll('[data-observer]');

// オプション設定：ビューポートに10%入ったら発火
const observerOption = {
  root: null, // ビューポートを基準
  rootMargin: '0px',
  threshold: 0.1,
};

// IntersectionObserverを作成
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // 要素が表示領域に入ったら .active クラスを付与
    if (entry.isIntersecting && !entry.target.classList.contains('active')) {
      entry.target.classList.add('active');
    }

    // trigger-credit 属性がある場合、対応する .credits-container に .active を付与
    if (
      entry.target.classList.contains('active') &&
      entry.target.getAttribute('trigger-credit') === ''
    ) {
      entry.target.parentElement
        .querySelector('.credits-container')
        .classList.add('active');
    }

    // trigger-text 属性がある場合、対応する .container__text に .active を付与
    if (
      entry.target.classList.contains('active') &&
      entry.target.getAttribute('trigger-text') === ''
    ) {
      entry.target.parentElement
        .querySelector('.container__text')
        .classList.add('active');
    }
  });
}, observerOption);

// 各オブジェクトを監視開始
observedObjects.forEach((object) => observer.observe(object));

// ==============================
// GSAP ScrollTrigger（スクロールに応じたリボン表示）
// ==============================

// ScrollTriggerプラグインを登録
gsap.registerPlugin(ScrollTrigger);

/**
 * 固定リボン（.fixed-ribbon）の表示アニメーションを定義
 * スクロール範囲に入ったらフェードイン
 */
const fixedRibbonAnimation = () => {
  const tl = gsap.timeline();
  tl.to('.fixed-ribbon', {
    bottom: 0, // 下端に配置
    duration: 0,
  }).to('.fixed-ribbon', {
    duration: 0.5, // フェードイン速度
    opacity: 1,
    ease: 'none',
  });

  // ScrollTriggerを作成
  ScrollTrigger.create({
    trigger: '.container1', // 開始トリガー
    endTrigger: '.container24', // 終了トリガー
    start: 'top bottom', // スクロール開始位置
    end: 'bottom bottom', // スクロール終了位置
    animation: tl, // 実行するアニメーション
    invalidateOnRefresh: true, // リサイズ時に再計算
    toggleActions: 'play reverse restart reverse', // スクロール動作に応じて再生/逆再生
  });
};

// ページ読み込み時にリボンアニメーションを初期化
window.addEventListener('load', () => {
  fixedRibbonAnimation();
});

// リサイズ時は全てのScrollTriggerを破棄し再設定
window.addEventListener('resize', () => {
  ScrollTrigger.killAll();
  setTimeout(() => {
    fixedRibbonAnimation();
  }, 1500); // 少し待ってから再初期化
});

// ==============================
// Fixed ribbon contents（表示日判定）
// ==============================

// 表示開始日を設定（UTC時間で指定）
const openDate = new Date('2025-10-18T00:00:00Z');

// 日本時間（UTC+9）に変換
const jstOpenDate = new Date(openDate.getTime() - 9 * 60 * 60 * 1000);

// 現在時刻を取得
const nowDateTime = new Date();

// 現在が指定日より後なら .fixed-ribbon__date を非表示に
nowDateTime > jstOpenDate
  ? (document.querySelector('.fixed-ribbon__date').style.display = 'none')
  : null;

// ==============================
// Sticky containers（コンテンツ高さをCSS変数で調整）
// ==============================

// ルート要素を取得
const root = document.documentElement;

/**
 * 各 .sticky-container の高さを取得し、
 * CSS変数（--container-heightX）に反映する関数
 * 固定リボンの高さも加算して計算
 */
function updateContentHeight() {
  const numberOfContainers = 7; // sticky-container の数
  const fixedRibbonHeight =
    document.querySelector('.fixed-ribbon').scrollHeight; // 固定リボンの高さ

  // 各コンテナの高さをCSS変数に設定
  for (let i = 1; i <= numberOfContainers; i++) {
    const content = document.querySelector(`.sticky-container${i}`);
    root.style.setProperty(
      `--container-height${i}`,
      `${content.offsetHeight + fixedRibbonHeight}px`
    );
  }
}

// ページ読み込み・リサイズ時に高さを更新
window.addEventListener('load', updateContentHeight);
window.addEventListener('resize', updateContentHeight);
