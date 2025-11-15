/* ==========================
   device-check.js
   ========================== */
document.addEventListener('DOMContentLoaded', function () {
  // --- デバイス判定 ---
  var ua = navigator.userAgent;
  var iphone = ua.indexOf('iPhone') > 0;
  var androidSp = ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0;

  if (iphone || androidSp) {
    // スマホ用の処理があればここに記述
  }
});

/* ==========================
   movie.js
   ========================== */
$(function () {
  // --- LazyLoad設定 ---
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  });

  // --- スクロールで再生（自動再生制限回避） ---
  $('.js_movie').on('inview', function () {
    var video = $(this).get(0);
    if (video && video.paused) {
      // 自動再生許可対策: ミュートON
      video.muted = true;
      video.play().catch(function (err) {
        console.warn('動画再生がブロックされました:', err);
      });
    }
  });
});

/* ==========================
   animation.js
   ========================== */
$(function () {
  function fadeInElements() {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.js_anime').each(function () {
      var imgPos = $(this).offset().top;
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });

    $('.js_animenext').each(function () {
      var imgPos = $(this).offset().top;
      if (scroll > imgPos - windowHeight) {
        $(this).addClass('is_show');
      }
    });
  }

  // 初回 & スクロールで実行(load イベントで初回にも fadeInElements が走るので、既に閾値を超えている要素にもクラスが付与されます。)
  $(window).on('load scroll resize', fadeInElements);

  // 特定要素を遅れて表示
  setTimeout(function () {
    $('.feature').addClass('is_show');
  }, 1000);
});

/* ==========================
   anime-star.js
   画面全体のキャンバスに「またたく星」を描画する。
   - 画面サイズに合わせてキャンバスをリサイズ
   - ランダム配置の星を生成
   - sin波でアルファ値を周期変化させて瞬きを表現
   ========================== */
document.addEventListener('DOMContentLoaded', function () {
  // 1) キャンバスと2D描画コンテキストを取得
  var canvas = document.getElementById('anime-star');
  var ctx = canvas.getContext('2d');

  // 2) 画面サイズに合わせてキャンバスの実ピクセルサイズを調整
  function resizeCanvas() {
    // CSSサイズではなく、描画バッファのサイズをウィンドウに合わせる
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas); // 画面サイズ変更時も追従
  resizeCanvas(); // 初回実行

  // 3) 星を用意
  var starCount = 300; // 星の数
  var stars = [];
  for (var i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width, // X位置（ランダム）
      y: Math.random() * canvas.height, // Y位置（ランダム）
      r: Math.random() * 2, // 半径（0〜2px）
      s: Math.random() * 1.5 + 0.5, // 瞬き速度係数（0.5〜2.0）
    });
  }

  // 4) 星を描くループ
  function drawStars() {
    // 4-1) 一旦消去
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 4-2) 星の塗り色は白
    ctx.fillStyle = 'white';

    // 4-3) すべての星を描画
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];

      // 時間経過に応じて 0〜1 のアルファを往復（sin波）
      // Date.now() はミリ秒。0.002 は速度スケール、star.s は各星の個体差。
      var alpha = 0.5 + Math.sin(Date.now() * 0.002 * star.s) * 0.5;

      ctx.globalAlpha = alpha; // 透過度（瞬き表現）
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2); // 円（星）
      ctx.fill();
    }

    // 4-4) 次フレームをスケジュール（約60fps）
    requestAnimationFrame(drawStars);
  }

  // 5) 描画開始
  drawStars();
});

/* ==========================
   section-active.js
   ========================== */
// ScrollTrigger を使わずスクロール判定に置き換え
$(function () {
  var sections = $(
    '.wrap_sec01, .wrap_sec02, .wrap_sec03, .wrap_sec04, .wrap_sec05, .wrap_sec06, .wrap_sec07, .wrap_sec08, .wrap_sec09, .wrap_sec10, .wrap_sec11, .wrap_sec12'
  );

  function setActiveSection() {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    sections.each(function (index) {
      var top = $(this).offset().top;
      var bottom = top + $(this).outerHeight();

      if (
        scroll + windowHeight / 2 > top &&
        scroll + windowHeight / 2 < bottom
      ) {
        // indexを01〜12のゼロ埋め文字列に変換
        var num = (index + 1).toString().padStart(2, '0');

        // onstellation_box
        $('.onstellation_box [class^="box-"]').removeClass('is-open-target');
        $('.onstellation_box .box-' + num).addClass('is-open-target');

        // nav-list
        $('.fixed-right .nav-list nav-item').removeClass('is-open-target');
        $('.fixed-right .nav-list .item_' + num).addClass('is-open-target');
      }
    });
  }

  $(window).on('scroll resize load', setActiveSection);
});

/* ==========================
   swiper-slider.js
   ========================== */
$(function () {
  // 1) 生成済みSwiperを保持する配列
  var swiperInstances = [];

  // 2) オプション定義（用途が違う2種類）
  var swiperOption_01 = {
    loop: true,
    effect: 'fade',
    slidesPerView: 'auto',
    centeredSlides: true,
    fadeEffect: { crossFade: true },
    speed: 1200,
    autoplay: { delay: 2000, disableOnInteraction: false },
  };

  var swiperOption_02 = {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    speed: 14000,
    effect: 'slide',
    allowTouchMove: false,
    autoplay: { delay: 0 }, // 切れ目のない無限ループ
  };

  // 3) 要素の classList に正規表現が一致するか簡易判定する関数
  function hasClassMatch(el, regex) {
    if (el instanceof jQuery) {
      el = el.get(0);
    }
    if (!el || !el.classList) return false;

    for (var i = 0; i < el.classList.length; i++) {
      if (regex.test(el.classList[i])) return true;
    }
    return false;
  }

  // 4) 初期化関数（リサイズ時にも呼ぶ）
  function initSwiper() {
    // 4-1) すでに作ったSwiperをすべて破棄（多重初期化を防ぐ）
    for (var i = 0; i < swiperInstances.length; i++) {
      var inst = swiperInstances[i];
      if (inst && inst.destroy) inst.destroy(true, true);
    }
    swiperInstances = [];

    // 4-2) #feature 配下に class を持つ要素を全部拾う
    var all = document.querySelectorAll('#feature [class]');

    // 4-3) クラス名のパターンで2群に振り分け
    // 例）<div class="ptr01-swiper_1 swiper">...</div>
    var group01 = []; // ptr01-swiper_* → フェード等
    var group02 = []; // ptr02-swiper_* → 無限ループ

    for (var j = 0; j < all.length; j++) {
      var el = all[j];
      if (hasClassMatch(el, /^ptr01-swiper_\d+$/)) group01.push(el);
      if (hasClassMatch(el, /^ptr02-swiper_\d+$/)) group02.push(el);
    }

    // 4-4) グループごとにSwiperを生成して配列に保持
    for (var k = 0; k < group01.length; k++) {
      swiperInstances.push(new Swiper(group01[k], swiperOption_01));
    }
    for (var m = 0; m < group02.length; m++) {
      swiperInstances.push(new Swiper(group02[m], swiperOption_02));
    }
  }

  // 初回とリサイズで実行
  initSwiper();
  $(window).on('resize', initSwiper);
});
