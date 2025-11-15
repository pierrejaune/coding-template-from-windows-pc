// =====================
// Swiper スライダー初期化
// =====================
window.addEventListener('pageshow', () => {
  $('.swiper-container, .swiper-container02').each(function () {
    const $sliderElement = $(this);

    // 既にSwiperが存在している場合は破棄（多重初期化防止）
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

    // Swiperインスタンス生成
    const swiperInstance = new Swiper(this, {
      speed: 9000, // 移動速度（9秒）
      slidesPerView: 'auto', // スライドの横幅に応じて自動表示
      loop: true, // 無限ループ
      loopedSlides: 3, // ループ時の複製枚数
      freeMode: false,
      freeModeMomentum: false,
      autoplay: {
        delay: 0, // 遅延なしで自動スクロール
        disableOnInteraction: false, // ユーザー操作後も継続
      },
    });

    // スワイプ終了後の挙動補正
    swiperInstance.on('touchEnd', function () {
      const getTranslate = this.getTranslate(); // 現在の位置
      const slideWidth = $sliderElement.find('.swiper-slide').outerWidth(); // スライド幅
      this.setTranslate(getTranslate - slideWidth); // 位置をスライド分だけ調整
      this.setTransition(9000); // 移動速度再設定
    });
  });
});

// =====================
// フェードイン処理
// =====================
$(function () {
  // スクロール & ロード時に発火
  $(window).on('load scroll', function () {
    $('.fadeIn,.fadeUp span').each(function () {
      const imgPos = $(this).offset().top; // 要素の位置
      const scroll = $(window).scrollTop(); // 現在のスクロール量
      const windowHeight = $(window).height(); // 画面の高さ

      // 画面内に入ったら active クラス付与
      if (scroll > imgPos - windowHeight * 0.9) {
        $(this).addClass('active');
      }
    });
  });

  // 初回ロード直後に強制的に scroll イベントを発火
  $(window).trigger('scroll');
});

// =====================
// bfcache（戻る/進むキャッシュ）対応
// =====================
window.addEventListener('pageshow', function (event) {
  let isBackForward = event && event.persisted === true;

  // navigation APIでも確認
  try {
    const navEntries = performance?.getEntriesByType?.('navigation');
    if (navEntries && navEntries[0]?.type === 'back_forward') {
      isBackForward = true;
    }
  } catch (e) {}

  if (!isBackForward) return; // 戻る/進む以外なら何もしない

  // Swiperを再開
  $('.swiper-container').each(function () {
    if (this.swiper) {
      const instance = this.swiper;
      instance.update();
      if (instance.autoplay) {
        instance.autoplay.stop();
        instance.autoplay.start(); // autoplayを再開
      }
      instance.setTransition(9000);
    }
  });

  // フェードインを再評価
  $(window).trigger('scroll'); // ← 実際にスクロールしていなくても発火
});
