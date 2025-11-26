// =====================
// fade（スクロールでフェード表示）
// =====================
$(function () {
  $(window).on('load scroll', function () {
    $('.fadeIn,.fadeUp').each(function () {
      // 要素のページ上での位置を取得
      var imgPos = $(this).offset().top;

      // 現在のスクロール量
      var scroll = $(window).scrollTop();

      // ウィンドウの高さ
      var windowHeight = $(window).height();

      // 要素がウィンドウ内に *約85% 入ったら active クラス付与
      if (scroll > imgPos - windowHeight * 0.85) {
        $(this).addClass('active');
      }
    });
  });
});

// =====================
// 複数要素を順番にフェードさせる（ディレイ付き）
// =====================
$(function () {
  $(window).on('load scroll', function () {
    $('.fadeIn_anim_area').each(function () {
      // トリガーとなる親エリアの位置
      var triggerPos = $(this).offset().top;

      // 現在のスクロール量
      var scroll = $(window).scrollTop();

      // ウィンドウ高さ
      var windowHeight = $(window).height();

      // 85% の位置に入ったら子要素を順番に active 付与
      if (scroll > triggerPos - windowHeight * 0.85) {
        $(this)
          .find('.fadeIn_anim')
          .each(function (i) {
            var _this = $(this);

            // i × 400ms ずつ遅らせてクラス付与
            setTimeout(function () {
              _this.addClass('active');
            }, 400 * i);
          });
      }
    });
  });
});

// =====================
// Swiper スライダー
// =====================
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#feature .swiper', {
    loop: true, // ループ再生
    speed: 2000, // 切り替えスピード
    effect: 'fade', // フェード切り替え
    fadeEffect: {
      crossFade: true, // クロスフェード
    },
    autoplay: {
      delay: 1800, // 自動切り替え間隔
      disableOnInteraction: false, // ユーザー操作後も自動再生続行
    },
  });
});

// =====================
// 動画のミュートON/OFF切り替え
// （他の動画は必ずミュートにする）
// =====================
$(function () {
  function initVideoMuteToggle() {
    const $movieAreas = $('.movie-area');

    // 対象が無ければ終了
    if ($movieAreas.length === 0) {
      console.log('要素が見つかりません');
      return;
    }

    $movieAreas.each(function () {
      const $movieArea = $(this);
      const $video = $movieArea.find('.js-movie')[0]; // video要素（DOM）
      const $videoBtn = $movieArea.find('.sound-btn'); // ミュート切替ボタン

      // video またはボタンが無ければスキップ
      if (!$video || $videoBtn.length === 0) {
        console.log('動画またはボタンが見つかりません');
        return;
      }

      // ボタンをクリックした時の処理
      $videoBtn.on('click', function () {
        // すでに "on" の場合 → ミュートする
        if ($videoBtn.hasClass('on')) {
          $video.muted = true;
          $videoBtn.removeClass('on');
        } else {
          // 他すべての動画をミュート
          $('.js-movie').each(function () {
            this.muted = true;
          });

          // 他すべてのボタンから "on" を外す
          $('.sound-btn').removeClass('on');

          // この動画のみミュート解除
          $video.muted = false;
          $videoBtn.addClass('on');
        }
      });
    });
  }

  // 初期化実行
  initVideoMuteToggle();
});

// =====================
// scroll量に応じて z-index を切り替える
// =====================
$(function () {
  $(window).on('scroll load', function () {
    var scr = $(window).scrollTop();

    var sec01 = $('.sec01.sticky');
    var sec02 = $('.sec02.sticky');
    var sec03 = $('.sec03.sticky');
    var sec04 = $('.sec04.sticky_bottom');

    // sec03 の上端位置
    var sec03Top = sec03.offset().top;

    // sec01 と sec02 の bottom（未使用対策で安全に取得）
    var sec01Bottom = sec01.offset()
      ? sec01.offset().top + sec01.outerHeight()
      : 0;
    var sec02Bottom = sec02.offset()
      ? sec02.offset().top + sec02.outerHeight()
      : 0;

    // sec03 より下にスクロールしたら sec04 を前面へ
    if (scr >= sec03Top) {
      sec04.css('z-index', 1);

      // それより上では背面へ
    } else if (scr < sec03Top) {
      sec04.css('z-index', -1);
    }
  });
});

// =====================
// sticky要素の top を動的計算して調整
// =====================
$(function () {
  // 読み込み & リサイズ時に実行
  window.addEventListener('load', updateStickyPositions);
  window.addEventListener('resize', updateStickyPositions);

  function updateStickyPositions() {
    // sticky と sticky_bottom の両方を取得
    const containers = document.querySelectorAll('.sticky,.sticky_bottom');

    const viewportHeight = window.innerHeight;

    // 各 sticky 要素に対して処理
    containers.forEach((container) => {
      // 要素の高さを取得
      const rect = container.getBoundingClientRect();
      const containerHeight = rect.height;

      // ビューポートより長ければ、見た目上 bottom に配置するため top をマイナスにする
      const topValue = containerHeight - viewportHeight;

      // top に反映
      container.style.top = -topValue + 'px';
    });
  }
});
