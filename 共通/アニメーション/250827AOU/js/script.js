// =====================
// スライダー処理
// =====================
window.addEventListener('pageshow', () => {
  // ページ表示時（戻る進むを含む）に、対象のスライダー要素を処理
  document
    .querySelectorAll('.swiper-container, .swiper-container02')
    .forEach((sliderElement) => {
      // 既にSwiperが初期化されている場合は一旦破棄（多重初期化防止）
      if (sliderElement.swiper) {
        sliderElement.swiper.destroy(true, true);
      }

      // Swiperの新しいインスタンスを生成
      const swiperInstance = new Swiper(sliderElement, {
        speed: 9000, // アニメーション速度（9秒）
        slidesPerView: 'auto', // スライド幅に応じて自動調整
        loop: true, // 無限ループ
        loopedSlides: 3, // ループ用に複製されるスライド数
        freeMode: false, // フリースクロール無効
        freeModeMomentum: false, // 慣性スクロール無効
        autoplay: {
          delay: 0, // 遅延なしで自動再生
          disableOnInteraction: false, // ユーザー操作後も自動再生継続
        },
      });

      // スワイプ後の動作を調整
      swiperInstance.on('touchEnd', function () {
        // 現在のスライド位置を取得
        const getTranslate = this.getTranslate();
        // jQueryでスライド幅を取得
        const slideWidth = $(sliderElement).find('.swiper-slide').outerWidth();
        // スワイプ終了時に次のスライド位置へ補正
        this.setTranslate(getTranslate - slideWidth);
        // アニメーション速度を設定（9秒）
        this.setTransition(9000);
      });
    });
});

// =====================
// フェードイン処理
// =====================
$(function () {
  $(window).on('load scroll', function () {
    // .fadeIn と .fadeUp span が対象
    $('.fadeIn,.fadeUp span').each(function () {
      var imgPos = $(this).offset().top; // 要素の縦位置
      var scroll = $(window).scrollTop(); // 現在のスクロール位置
      var windowHeight = $(window).height(); // ウィンドウ高さ

      // 要素が画面内に入ったらクラス付与（アニメーション開始）
      if (scroll > imgPos - windowHeight * 0.9) {
        $(this).addClass('active');
      }
    });
  });
});

// =====================
// bfcache（戻る/進むキャッシュ）対応
// =====================
window.addEventListener('pageshow', function (event) {
  // 戻る/進むによるページ表示かどうかを判定
  var isBackForward = event && event.persisted === true;
  try {
    var navEntries =
      performance &&
      performance.getEntriesByType &&
      performance.getEntriesByType('navigation');
    if (navEntries && navEntries[0] && navEntries[0].type === 'back_forward') {
      isBackForward = true;
    }
  } catch (e) {}

  if (!isBackForward) return; // 戻る進むでなければ何もしない

  // Swiperを再開させる
  document
    .querySelectorAll('.swiper-container')
    .forEach(function (sliderElement) {
      if (sliderElement.swiper) {
        var instance = sliderElement.swiper;
        instance.update(); // レイアウト再計算
        if (instance.autoplay) {
          // autoplayが止まっている可能性があるので再スタート
          instance.autoplay.stop();
          instance.autoplay.start();
        }
        instance.setTransition(9000); // アニメーション速度を再設定
      }
    });

  // フェード効果を再評価（スクロールイベントを強制発火）
  $(window).trigger('scroll');
});
