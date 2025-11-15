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
  var $sections = $('.wrap_sec');

  // 1) data-sec を 01, 02, 03... と順番に自動付与
  $sections.each(function (index) {
    var secNum = String(index + 1).padStart(2, '0');
    $(this).attr('data-sec', secNum);
  });

  function setActiveSection() {
    var scroll = $(window).scrollTop();
    var mid = scroll + $(window).height() / 2; // 画面中央のY位置

    var activeId = null;

    // 画面中央に重なるセクションを探す
    $sections.each(function () {
      var $sec = $(this);
      var top = $sec.offset().top;
      var bottom = top + $sec.outerHeight();

      if (mid >= top && mid < bottom) {
        activeId = $sec.data('sec'); // 01..12
        return false; // 見つかったのでループ中断
      }
    });

    if (activeId != null) {
      // 対象以外からはクラスを外す
      $(".onstellation_box [class^='box-']").removeClass('is-open-target');
      $(".fixed-right .nav-list [class^='item_']").removeClass(
        'is-open-target'
      );

      // 対象にだけ付与
      $('.onstellation_box .box-' + activeId).addClass('is-open-target');
      $('.fixed-right .nav-list .item_' + activeId).addClass('is-open-target');
    }
  }

  $(window).on('load scroll resize', setActiveSection);
});

/* ==========================
   swiper-slider.js
   ========================== */
$(function () {
  var swiperInstances = [];

  var OPTION = {
    fade: {
      loop: true,
      effect: 'fade',
      slidesPerView: 'auto',
      centeredSlides: true,
      fadeEffect: { crossFade: true },
      speed: 1200,
      autoplay: { delay: 2000, disableOnInteraction: false },
    },
    marquee: {
      loop: true,
      effect: 'slide',
      slidesPerView: 'auto',
      centeredSlides: true,
      allowTouchMove: false,
      speed: 14000,
      autoplay: { delay: 0 },
    },
  };

  function initSwiper() {
    // 既存インスタンスを破棄
    swiperInstances.forEach(function (inst) {
      if (inst && inst.destroy) inst.destroy(true, true);
    });
    swiperInstances = [];

    var $feature = $('#feature');

    // data-swiper="fade" を初期化
    $feature.find('[data-swiper="fade"]').each(function () {
      swiperInstances.push(new Swiper(this, OPTION.fade));
    });

    // data-swiper="marquee" を初期化
    $feature.find('[data-swiper="marquee"]').each(function () {
      swiperInstances.push(new Swiper(this, OPTION.marquee));
    });
  }

  initSwiper();
  $(window).on('resize', initSwiper);
});
