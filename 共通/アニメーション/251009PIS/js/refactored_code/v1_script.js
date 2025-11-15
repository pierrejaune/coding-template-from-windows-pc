// ======================================================
// ✅ 1. 共通ユーティリティ
// ======================================================

// 要素が画面に入ったかをチェックする関数
function isInView(element, offsetRatio = 0.85) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return rect.top < windowHeight * offsetRatio;
}

// クラスを付与するアニメーション関数
function addActiveClassOnScroll(selector, activeClass, offsetRatio = 0.85) {
  const elements = document.querySelectorAll(selector);

  const animate = () => {
    elements.forEach((el) => {
      if (isInView(el, offsetRatio)) {
        el.classList.add(activeClass);
      }
    });
  };

  window.addEventListener('load', animate);
  window.addEventListener('scroll', animate);
}

// ======================================================
// ✅ 2. フェードインや点滅アニメーション
// ======================================================

// 上方向フェードイン（画面内に入ったらactive追加）
addActiveClassOnScroll('.fadeIn_top', 'active', 1.0);

// 通常フェードイン
addActiveClassOnScroll('.fadeIn', 'active', 0.85);

// 星の点滅アニメーション
addActiveClassOnScroll('.star', 'blinking', 0.85);

// ======================================================
// ✅ 3. ゆらめき(sway)効果
// ======================================================

function addSwayEffect(selector) {
  const figures = document.querySelectorAll(selector);

  function handleSway() {
    figures.forEach((figure) => {
      const img = figure.querySelector('img');
      // 画面内に入っていて、まだsway_randomがない場合のみ設定
      if (
        figure.classList.contains('active') &&
        !img.classList.contains('sway_random')
      ) {
        img.classList.add('sway_random');
        const duration = (Math.random() * 1 + 1.5).toFixed(3); // 1.5〜2.5秒ランダム
        img.style.animationDuration = `${duration}s`;
      }
    });
  }

  window.addEventListener('load', handleSway);
  window.addEventListener('scroll', handleSway);
}

addSwayEffect('figure.sway.fadeIn');

// ======================================================
// ✅ 4. Swiper（スライダー）設定（Swiper.jsが読み込まれている前提）
// ======================================================

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined') {
    new Swiper('.swiper', {
      effect: 'fade',
      loop: true,
      speed: 1500,
      fadeEffect: { crossFade: false },
      autoplay: { delay: 3000, disableOnInteraction: false },
    });

    new Swiper('.swiper_slide', {
      loop: true,
      speed: 1500,
      autoplay: { delay: 3000, disableOnInteraction: false },
      slidesPerView: 'auto',
      effect: 'slide',
    });
  }
});

// ============================
// 雪（Snow）アニメーション（単位付き修正版）
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  // -----------------------------
  // ✅ サイズスケール変数を更新（単位付き）
  // -----------------------------
  function updateSetSize() {
    const vw = window.innerWidth;
    // 例: PCなら1440px基準、SPなら750px基準で倍率算出
    const scale = vw > 750 ? (vw / 1440) * 0.592222 : vw / 750;

    // CSS変数に"単位付き"で登録（→ pxと掛け算しても安全）
    root.style.setProperty('--lpSetSize', scale + '');
  }

  updateSetSize();
  window.addEventListener('resize', updateSetSize);

  // -----------------------------
  // 雪の降雪設定
  // -----------------------------
  const snowContainer = document.getElementById('snow-container');
  if (!snowContainer) return;

  const snowImages = ['img/ball01.png', 'img/ball02.png', 'img/ball03.png'];
  const minCount = 1;
  const maxCount = 2;
  const interval = 2500;
  const minSpeed = 12;
  const maxSpeed = 18;
  const minSize = 23.1063;
  const maxSize = 23.9897;
  const maxXMove = 50;

  // -----------------------------
  // 雪の結晶を生成
  // -----------------------------
  function createSnowflake() {
    const flake = document.createElement('img');
    flake.src = snowImages[Math.floor(Math.random() * snowImages.length)];
    flake.className = 'snowflake';

    // 現在のCSS変数の値を取得して数値化
    const lpSetSize = parseFloat(
      getComputedStyle(root).getPropertyValue('--lpSetSize')
    );

    // 雪のサイズをランダム設定（倍率適用）
    const baseSize = Math.random() * (maxSize - minSize) + minSize;
    const realSize = baseSize * lpSetSize;
    flake.style.width = `${realSize}px`;
    flake.style.height = `${realSize}px`;

    // 横位置ランダム
    const containerWidth = snowContainer.clientWidth;
    const startX = Math.random() * (containerWidth - realSize);
    flake.style.left = `${startX}px`;

    // 左右の揺れ（変数で制御）
    const xMove = (Math.random() - 0.5) * 2 * maxXMove;
    flake.style.setProperty('--x-move', `${xMove}px`);

    // 落下速度
    const duration = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    flake.style.animationDuration = `${duration}s`;

    // 追加＆削除
    snowContainer.appendChild(flake);
    setTimeout(() => flake.remove(), duration * 1000);
  }

  // -----------------------------
  // 一定間隔で雪を生成
  // -----------------------------
  setInterval(() => {
    const count =
      Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    for (let i = 0; i < count; i++) createSnowflake();
  }, interval);
});
