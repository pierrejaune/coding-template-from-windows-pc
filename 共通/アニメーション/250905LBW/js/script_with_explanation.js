// -----------------------------
// Intersection Observer (スクロール検知処理)
// -----------------------------
$(document).ready(function () {
  // .target 要素をすべて取得
  const targetList = document.querySelectorAll('.target');

  // IntersectionObserver の生成
  const IO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          // 画面に 30% 以上見えたときに data-is-active を付与
          target.dataset.isActive = 'true';
        }
      });
    },
    { threshold: 0.3 } // 30% 見えたら発火
  );

  // すべてのターゲットを監視開始
  targetList.forEach((target) => IO.observe(target));
});

// -----------------------------
// モーダル表示処理
// -----------------------------
$(function () {
  // 画像クリックでモーダルを開く
  $('.look__list-img').on('click', function () {
    // クリックされた画像の data-look を取得
    let look = $(this).data('look');

    // モーダル内の各 .Lmodal__box を確認
    $('.Lmodal__box').each(function () {
      let modal = $(this).data('modal');

      // data-look と data-modal が一致した場合
      if (look == modal) {
        // slick のスライド番号は 0 始まりなので -1
        let page = modal - 1;

        // 対応するスライドに移動
        $('.Lmodal__list').slick('slickGoTo', page, false);

        // スライド切り替え速度を 700ms に設定
        $('.Lmodal__list').slick('slickSetOption', 'speed', 700, false);
      }
    });

    // モーダル表示用クラス付与
    $('.Lmodal').addClass('on');
    $('.look__list').addClass('on');
    $('body').addClass('on');
  });

  // モーダル外側をクリックで閉じる
  $('.Lmodal').click(function () {
    $('.Lmodal').removeClass('on');
    $('.look__list').removeClass('on');
    $('body').removeClass('on');

    // モーダル閉じたときはスライド速度を 0 に戻す
    $('.Lmodal__list').slick('slickSetOption', 'speed', 0, false);
  });

  // 内側クリックはモーダルを閉じないように伝播停止
  $('.Lmodal .inner').on('click', function (e) {
    e.stopPropagation();
  });

  // -----------------------------
  // ウィンドウサイズでレイアウト調整
  // -----------------------------
  $(window).resize(function () {
    let winH = $(window).height();
    if (winH > 1286) {
      $('.left').addClass('on');
      $('.right').addClass('on');
    } else {
      $('.left').removeClass('on');
      $('.right').removeClass('on');
    }
  });
});

// -----------------------------
// モーダル表示中のスクロール無効化
// -----------------------------
$(function () {
  $('.look__list-img').on('click', function () {
    // モーダルオープン時にスクロール禁止
    document.addEventListener('touchmove', noscroll, { passive: false });
    document.addEventListener('wheel', noscroll, { passive: false });
  });

  $('.Lmodal').on('click', function () {
    // モーダル閉じたらスクロール許可
    document.removeEventListener('touchmove', noscroll, { passive: true });
    document.removeEventListener('wheel', noscroll, { passive: true });
  });

  // スクロールイベントを止める関数
  function noscroll(e) {
    e.preventDefault();
  }
});

// -----------------------------
// slick スライダー設定
// -----------------------------
$(function () {
  // モーダル全体のスライド
  $('.Lmodal__list').slick({
    arrows: true, // ← → 矢印あり
    autoplay: false, // 自動再生なし
    speed: 0, // 初期は即時切り替え
    fade: false,
    infinite: true, // ループ
    swipe: false, // スワイプ無効
    slidesToShow: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  // モーダル内の各スライドコンテンツ
  $('.Lmodal__slide').slick({
    arrows: false, // 矢印なし
    autoplay: true, // 自動再生あり
    dots: true, // 下部ドットあり
    speed: 1000, // 切り替え速度 1秒
    fade: false,
    infinite: true,
    initialSlide: 0,
    swipe: true, // スワイプ操作可能
    slidesToShow: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
  });
});
