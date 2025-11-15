// フェードイン
$(function () {
  $(window).on('resize load', function () {
    let vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);

    setTimeout(function () {
      $('.feature').addClass('is_show');
      setTimeout(function () {
        $('.js_anime').each(function () {
          var imgPos = $(this).offset().top;
          var scroll = $(window).scrollTop();
          var windowHeight = $(window).height();
          if (scroll > imgPos - windowHeight * 0.75) {
            $(this).addClass('is_show');
          }
        });
      }, 500);
    }, 1000);
  });

  $(window).on('scroll', function () {
    $('.js_anime').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  });
});

$(function () {
  // jQuery の DOM 準備完了イベント
  // ここに書いた処理はページが読み込まれた後に実行される
  let splideSLide = null;

  // ページ内にある .splide 要素をすべて取得
  const menuElements = document.querySelectorAll('.splide');

  // 各スライダーごとに処理を実行
  menuElements.forEach(function (element) {
    // スライドの枚数を取得
    const slideCount = element.querySelectorAll('.splide__slide').length;

    // スワイプ開始と判定される指の移動距離（px）
    const splideSwipeThreshold = 80;

    // この .splide が .sec02 内にあるかどうかを判定
    const isInSec02 = element.closest('.sec02') !== null;

    // Splide の設定
    const splideSLide = new Splide(element, {
      // .sec02 内のスライダーはループ無効、それ以外はスライド数が5枚以上ならループ
      type: isInSec02 ? '' : slideCount >= 5 ? 'loop' : '',

      // 矢印（左右ナビゲーション）
      arrows: true,

      // 自動再生
      autoplay: true,

      // スライダー上でフォーカスしても自動再生を止めない
      pauseOnFocus: false,

      // スライダーにマウスを乗せたときは自動再生を一時停止
      pauseOnHover: true,

      // ドラッグ開始判定に必要な最小移動量
      dragMinThreshold: splideSwipeThreshold,

      // スライド間の余白
      gap: '3rem',

      // スライダーの左右余白
      padding: '0',

      // 1ページに表示するスライド数
      perPage: 4,

      // アニメーションの速度
      speed: 1400,

      // 自動再生の間隔
      interval: 4000,

      // 動きを減らす設定（OSの設定に応じる）
      reducedMotion: {
        autoplay: true,
        speed: 1400,
      },

      // .sec02 内では矢印、ページネーション、ドラッグ機能を無効化
      arrows: isInSec02 ? false : slideCount >= 5 ? true : false,
      pagination: isInSec02 ? false : slideCount >= 5 ? true : false,
      drag: isInSec02 ? false : slideCount >= 5 ? true : false,
      snap: isInSec02 ? false : slideCount >= 5 ? true : false,

      // レスポンシブ対応
      breakpoints: {
        767: {
          // スマホサイズ（767px以下）の場合
          // .sec02 内はループなし、それ以外は1枚以上ならループ
          type: isInSec02 ? '' : slideCount >= 1 ? 'loop' : '',

          // スライド間の余白を小さめに
          gap: '1.6rem',

          // 左右に余白を持たせて中央に配置
          padding: '17%',

          // 1ページに1枚表示
          perPage: 1,

          // .sec02 内では矢印・ページネーション・ドラッグを無効化
          arrows: isInSec02 ? false : slideCount >= 1 ? true : false,
          pagination: isInSec02 ? false : slideCount >= 1 ? true : false,
          drag: isInSec02 ? false : slideCount >= 1 ? true : false,
          snap: isInSec02 ? false : slideCount >= 1 ? true : false,
        },
      },
    }).mount(); // Splide の初期化
  });
});
