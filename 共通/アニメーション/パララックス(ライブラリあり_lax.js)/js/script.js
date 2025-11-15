$(document).ready(function () {
  // lax.js を初期化
  window.onload = function () {
    lax.init();

    // スクロールイベントを監視
    lax.addDriver('scrollY', function () {
      return window.scrollY;
    });

    // **視差効果のプリセット設定**
    lax.addElements('.parallax-image', {
      scrollY: {
        translateY: [
          ['elInY', 'elOutY'],
          [0, -200], // 上方向に動く
        ],
      },
    });

    lax.addElements('.parallax-text', {
      scrollY: {
        translateX: [
          ['elInY', 'elOutY'],
          [-100, 100], // 左右に流れる
        ],
        opacity: [
          ['elInY', 'elCenterY', 'elOutY'],
          [0, 1, 0], // 透明 → 表示 → 透明
        ],
      },
    });

    lax.addElements('.parallax-scale', {
      scrollY: {
        scale: [
          ['elInY', 'elCenterY', 'elOutY'],
          [0.5, 1.2, 0.5], // ズームイン
        ],
      },
    });
  };

  $(window).on('scroll', function () {
    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height();

    // スクロール位置に応じて背景を変更
    if (scrollPos < windowHeight) {
      $('.background').css('background-image', "url('img/image01.jpg')");
    } else if (scrollPos >= windowHeight && scrollPos < windowHeight * 2) {
      $('.background').css('background-image', "url('img/image02.jpg')");
    } else {
      $('.background').css('background-image', "url('img/image03.jpg')");
    }
  });
});
