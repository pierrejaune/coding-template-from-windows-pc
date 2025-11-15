// ============================
// フェードインアニメーション設定
// ============================

// ページの読み込み完了後やスクロール時に実行
$(function () {
  $(window).on('load scroll', function () {
    // .fadeIn_top クラスを持つ要素をすべて取得して処理
    $('.fadeIn_top').each(function () {
      var imgPos = $(this).offset().top; // 要素のページ上での縦位置（top座標）
      var scroll = $(window).scrollTop(); // 現在のスクロール位置
      var windowHeight = $(window).height(); // ブラウザの表示領域の高さ

      // 要素が画面内に入ったら（1倍分先で）activeクラスを付与
      if (scroll > imgPos - windowHeight * 1) {
        $(this).addClass('active');
      }
    });
  });
});

// 通常のフェードインアニメーション
$(function () {
  $(window).on('load scroll', function () {
    // .fadeIn クラスを持つ要素を取得
    $('.fadeIn').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();

      // 要素が画面の85%位置に来たら active クラスを付与
      if (scroll > imgPos - windowHeight * 0.85) {
        $(this).addClass('active');
      }
    });
  });
});

// 点滅（blinking）アニメーション
$(function () {
  $(window).on('load scroll', function () {
    // .star クラスを持つ要素を取得
    $('.star').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();

      // 要素が画面の85%位置に来たら blinking クラスを付与
      if (scroll > imgPos - windowHeight * 0.85) {
        $(this).addClass('blinking');
      }
    });
  });
});

// ============================
// Swiper スライダー設定
// ============================
$(function () {
  // フェードで切り替わるメインスライダー
  const mySwiper = new Swiper('.swiper', {
    effect: 'fade', // フェード切り替え
    loop: true, // ループ再生
    speed: 1500, // アニメーション速度（ミリ秒）
    fadeEffect: {
      crossFade: false, // クロスフェードを無効に
    },
    autoplay: {
      delay: 3000, // 3秒ごとに切り替え
      disableOnInteraction: false, // ユーザー操作後も自動再生を継続
    },
  });

  // 通常スライド（複数枚表示可）
  const slideSwiper02 = new Swiper('.swiper_slide', {
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto', // スライド幅に応じて複数枚表示
    effect: 'slide', // 通常のスライド切り替え
  });
});

// ============================
// ゆらめき(sway)アニメーション
// ============================
$(function () {
  $(window).on('load scroll', function () {
    // figure.sway.fadeIn クラスを持つ要素ごとに処理
    $('figure.sway.fadeIn').each(function () {
      var $figure = $(this);
      var $img = $figure.find('img'); // figure内のimg要素を取得

      // 既にactive（画面内表示）で、まだゆらめき未設定のものだけ実行
      if ($figure.hasClass('active') && !$img.hasClass('sway_random')) {
        $img.addClass('sway_random'); // ゆらめき用クラスを追加

        // 1.5〜2.5秒の間でランダムなアニメーション速度を設定
        const duration = (Math.random() * 1 + 1.5).toFixed(3);
        $img.css('animation-duration', duration + 's');
      }
    });
  });
});

// ============================
// 雪（Snow）アニメーション
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const snowContainer = document.getElementById('snow-container'); // 雪を降らせる領域

  // 使用する雪の画像リスト
  const snowImages = ['img/ball01.png', 'img/ball02.png', 'img/ball03.png'];

  let snowInterval = null;
  const minCount = 1; // 一度に降る最小の雪の数
  const maxCount = 2; // 一度に降る最大の雪の数
  const interval = 2500; // 2.5秒ごとに雪を生成
  const minSpeed = 12; // 落下の最短時間（秒）
  const maxSpeed = 18; // 落下の最長時間（秒）

  // CSS calc()で使用する基準サイズ（雪の大きさ）
  const minSize = 23.1063;
  const maxSize = 23.9897;

  const maxXMove = 50; // 左右に揺れる最大距離(px)

  // ----------------------------
  // 雪の結晶を生成する関数
  // ----------------------------
  function createSnowflake() {
    const flake = document.createElement('img');
    flake.src = snowImages[Math.floor(Math.random() * snowImages.length)];
    flake.className = 'snowflake';

    // 雪の大きさをランダムに設定（CSS変数を使用）
    const baseSize = Math.random() * (maxSize - minSize) + minSize;
    const sizeCalc = `calc(${baseSize} * var(--lpSetSize))`;
    flake.style.width = sizeCalc;
    flake.style.height = sizeCalc;

    // コンテナ内のランダムな横位置に配置
    const containerWidth = snowContainer.clientWidth;
    const sizeForPosition = baseSize;
    const maxStartX = containerWidth - sizeForPosition;
    const startX = Math.random() * maxStartX;
    flake.style.left = `${startX}px`;

    // 左右に揺れる動きをランダムに設定
    const xMove = (Math.random() - 0.5) * 2 * maxXMove;
    flake.style.setProperty('--x-move', `${xMove}px`);

    // 落下時間（速さ）をランダムに設定
    const duration = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    flake.style.animationDuration = `${duration}s`;

    // コンテナに追加して雪を降らせる
    snowContainer.appendChild(flake);

    // アニメーションが終わったら要素を削除して整理
    setTimeout(() => flake.remove(), duration * 1000);
  }

  // ----------------------------
  // 雪を定期的に生成する関数
  // ----------------------------
  function startSnow() {
    snowInterval = setInterval(() => {
      // 1〜2個の雪をランダムに生成
      const count =
        Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
      for (let i = 0; i < count; i++) {
        createSnowflake();
      }
    }, interval);
  }

  // ページ読み込み後に雪の降雪を開始
  startSnow();
});
