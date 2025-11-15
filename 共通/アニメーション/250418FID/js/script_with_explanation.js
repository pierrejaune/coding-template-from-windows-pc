// ページ読み込み完了後に実行される処理（jQueryのショートハンド）
$(function () {
  // -------------------------------
  // テキストアニメーションを制御する関数
  // -------------------------------
  function TextRandomAnimeControl() {
    // ページのロード時とスクロール時に処理を実行
    $(window).on('load scroll', function () {
      // .TextRandomAnime クラスを持つ要素を1つずつ処理
      $('.TextRandomAnime').each(function () {
        // 要素の縦方向の位置を取得
        var elemPos = $(this).offset().top;
        // 現在のスクロール量を取得
        var scroll = $(window).scrollTop();
        // ブラウザのウィンドウ高さを取得
        var winH = $(window).height();

        // スクロール位置が要素の70%手前まで来たら処理実行
        if (scroll > elemPos - winH * 0.7) {
          // クラスを付与 → CSSでアニメーション開始
          $(this).addClass('appearRandomtext');
        }
      });
    });
  }

  // -------------------------------
  // 各文字を <span> で囲む処理
  // -------------------------------
  $('.TextRandomAnime').each(function () {
    // 元のテキストを取得
    var text = $(this).text();
    var textbox = '';

    // 文字を1文字ずつ分割して <span> タグで囲む
    text.split('').forEach(function (t) {
      textbox += '<span>' + t + '</span>';
    });

    // HTMLに書き換える（各文字が <span> 要素になる）
    $(this).html(textbox);
  });

  // -------------------------------
  // アニメーション制御関数を実行
  // -------------------------------
  TextRandomAnimeControl();
});
