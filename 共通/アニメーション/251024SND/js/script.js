// ============================================================
// フェードイン・アニメーション制御
// ============================================================
$(function () {
  // --------------------------------------------
  // ウィンドウ幅をCSSカスタムプロパティ(--vw)に代入
  // → スクロールバー幅を含まない正確なビューポート幅を取得するため
  // --------------------------------------------
  $(window).on('resize load', function () {
    let vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  });

  // --------------------------------------------
  // ページ読み込み完了後のフェードインアニメーション
  // --------------------------------------------
  $(window).on('load', function () {
    // 1秒後に「.feature」を表示させる
    setTimeout(function () {
      $('.feature').addClass('is_show');

      // さらに0.5秒後、要素ごとのアニメーション判定を開始
      setTimeout(function () {
        animationposition('.js_anime');
      }, 500);
    }, 1000);
  });

  // --------------------------------------------
  // スクロール時のアニメーション制御
  // --------------------------------------------
  $(window).on('scroll', function () {
    // 一度だけ実行されるフェードイン系
    animationposition('.js_anime');

    // スクロールに応じて繰り返し実行されるアニメーション
    animationpositionrepeat('.js_animerepeat');
  });

  // --------------------------------------------
  // 一度だけ表示する要素（.js_anime）
  // → 要素がウィンドウ高さの75%以内に入ったら「is_show」付与
  // --------------------------------------------
  function animationposition(e) {
    $(e).each(function () {
      var imgPos = $(this).offset().top; // 要素の縦位置
      var scroll = $(window).scrollTop(); // スクロール量
      var windowHeight = $(window).height(); // 画面の高さ

      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  }

  // --------------------------------------------
  // スクロールで表示／非表示を繰り返す要素（.js_animerepeat）
  // → ビューポートの25%位置を基準にON/OFF
  // --------------------------------------------
  function animationpositionrepeat(e) {
    $(e).each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();

      if (scroll > imgPos - windowHeight * 0.25) {
        $(this).addClass('is_show');
      } else {
        $(this).removeClass('is_show');
      }
    });
  }
});

// ============================================================
// Slick スライダー設定
// ============================================================
// $(function () {
//   $('.slider').slick({
//     dots: false, // 下部ドットナビゲーションを非表示
//     arrows: false, // 矢印を非表示
//     slidesToShow: 1, // 同時に表示するスライド数
//     autoplay: true, // 自動再生ON
//     speed: 1500, // フェード切り替え速度（ミリ秒）
//     autoplaySpeed: 1000, // スライド表示時間（ミリ秒）
//     infinite: true, // 無限ループON
//     fade: true, // フェード切り替えON
//     pauseOnFocus: false, // フォーカス時に停止しない
//     pauseOnHover: false, // ホバー時に停止しない
//   });
// });

// ============================================================
// 動画の遅延読み込み＋音声切替機能
// ============================================================

// jQueryに「play」メソッドを追加（triggerまたはbind兼用）
jQuery.fn.play = function (fn) {
  return fn ? this.bind('play', fn) : this.trigger('play');
};

$(function () {
  // --------------------------------------------
  // LazyLoad初期化（.lazy クラスを持つ要素を対象）
  // --------------------------------------------
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  });

  // --------------------------------------------
  // inviewイベントで動画を再生
  // → 要素がビューポート内に入ったら再生
  // --------------------------------------------
  $('.js_movie').on('inview', function () {
    $(this).play();
  });

  // --------------------------------------------
  // ミュート切り替えボタン制御
  // --------------------------------------------
  const video = document.querySelector('.js_movie');
  const videoBtn = document.querySelector('.js_moviebtn');

  videoBtn.addEventListener('click', () => {
    if (videoBtn.classList.contains('on')) {
      // 「on」クラスがある場合 → ミュートONに戻す
      videoBtn.classList.remove('on');
      video.muted = true;
    } else {
      // 「on」クラスがない場合 → ミュート解除
      videoBtn.classList.add('on');
      video.muted = false;
    }
  });
});

// ============================================================
// モーダル＋Swiperスライダー制御
// ============================================================
$(function () {
  // --------------------------------------------
  // Swiper設定（モーダル内スライダー）
  // --------------------------------------------
  const modalSwiper = new Swiper('.container__swiper', {
    autoplay: false, // 自動再生なし
    loop: true, // ループ有効
    lazy: true, // 遅延読み込みON
    allowTouchMove: true, // スワイプ操作ON
    updateOnWindowResize: true, // リサイズ時に更新
    centeredSlides: true, // スライド中央寄せ
    watchOverflow: true, // スライドが1枚の場合停止
    speed: 400, // 切り替え速度
    slidesPerView: 1, // 表示枚数
    navigation: {
      // ナビゲーションボタン設定
      nextEl: '#modal .next',
      prevEl: '#modal .prev',
    },
  });

  // --------------------------------------------
  // モーダルオープン処理
  // --------------------------------------------
  $('.page-slide').on('click', function () {
    // クリックされたスライドのインデックスを取得
    var index = $('.page-slide').index($(this));

    // 対応するスライドへ移動
    modalSwiper.slideToLoop(index);

    // モーダルを表示
    $('#modal').addClass('is_show');

    // 背景スクロール禁止
    $('html, body').css('overflow', 'hidden');

    return false;
  });

  // --------------------------------------------
  // モーダルクローズ処理
  // --------------------------------------------
  $('.container__close').on('click', function () {
    // モーダルを閉じる
    $('#modal').removeClass('is_show');

    // スクロール禁止解除
    $('html, body').removeAttr('style');

    // クローズ時にビューポート幅を再取得してCSS変数に再代入
    let vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  });
});
