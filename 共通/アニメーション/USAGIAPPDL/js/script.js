// ---------------------------------------
// ページの全体処理：DOM構築完了後に実行
// ---------------------------------------
$(function () {
  // =========================
  // .fix（固定要素）の処理
  // =========================
  $('.fix').hide(); // 初期状態では非表示にする

  // スクロールイベントを監視
  $(window).on('scroll', function () {
    // 現在のスクロール量（上からの位置）
    const scrollTop = $(this).scrollTop();

    // ページ全体の高さ
    const scrollHeight = $(document).height();

    // ウィンドウ下端の位置（スクロール量 + 表示領域の高さ）
    const scrollPosition = $(window).height() + scrollTop;

    // フッターの高さを取得
    const footHeight = $('.l-footer').innerHeight();

    // -----------------------------
    // スクロール量が200pxを超えたら表示
    // -----------------------------
    if (scrollTop > 200) {
      $('.fix').fadeIn(); // フェードインで表示
    } else {
      $('.fix').fadeOut(); // 200px未満では非表示
    }

    // ---------------------------------
    // フッターと重ならないように位置を調整
    // ---------------------------------
    if (scrollHeight - scrollPosition <= footHeight) {
      // ページ最下部付近（フッターと重なる領域）ではabsoluteで固定解除
      $('.fix').css({
        position: 'absolute',
        bottom: '0', // ページの下に固定
      });
    } else {
      // それ以外のスクロール中は固定表示
      $('.fix').css({
        position: 'fixed',
        bottom: '0', // 画面下部に固定
      });
    }
  });

  // =========================
  // .pagetop（ページトップボタン）の処理
  // =========================
  $('.pagetop').hide(); // 初期状態では非表示にする

  // スクロールイベントを監視
  $(window).on('scroll', function () {
    const scrollTop = $(this).scrollTop();
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + scrollTop;
    const footHeight = $('.l-footer').innerHeight();

    // -----------------------------
    // スクロール量が200pxを超えたら表示
    // -----------------------------
    if (scrollTop > 200) {
      $('.pagetop').fadeIn(); // フェードインで表示
    } else {
      $('.pagetop').fadeOut(); // 非表示に戻す
    }

    // ---------------------------------
    // フッターとの重なりを防ぐため位置を調整
    // ---------------------------------
    if (scrollHeight - scrollPosition <= footHeight) {
      $('.pagetop').css({
        position: 'absolute', // 固定を解除してページ内配置に切り替え
      });
    } else {
      $('.pagetop').css({
        position: 'fixed', // 通常時は画面固定表示
      });
    }
  });

  // =========================
  // フェードインアニメーションの処理
  // =========================
  // 「inview」プラグインを利用して、要素が表示範囲に入ったときにクラスを付与
  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      // 要素が画面内に入った場合
      $(this).addClass('is-active'); // アニメーションクラスを付与
    }
  });

  // スクロール時にも再判定（スクロールで新たに要素が入ってきた場合に対応）
  $(window).scroll(function () {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });
});
