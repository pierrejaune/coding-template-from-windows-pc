// 一部のコード
// DOMの読み込み完了後に実行
$(function () {
  // タイプライター関数：1文字ずつ表示する処理
  function typeWriter(element, text, delay = 70) {
    let index = 0; // 文字表示の開始位置（0からスタート）

    // 文字を1つずつ表示していく内部関数
    function type() {
      if (index < text.length) {
        // 現在のindexまでの文字列を要素に表示
        element.text(text.slice(0, index + 1));
        index++; // 次の文字へ
        setTimeout(type, delay); // delayミリ秒後に再実行（繰り返し）
      }
    }

    // タイピング開始
    type();
  }

  // data-typewriter属性を持つすべての要素を対象に処理
  $('[data-typewriter]').each(function () {
    const element = $(this); // 現在の要素をjQueryオブジェクトとして取得
    const text = element.data('typewriter'); // data-typewriterに設定された文字列を取得

    // 要素が画面内に入ったとき（inviewイベント発火時）に処理開始
    element.on('inview', function (_, isInView) {
      if (isInView) {
        // 画面内に入ったらtypeWriterを呼び出してアニメーション開始
        typeWriter(element, text);
        element.off('inview'); // 一度だけ動作させるためにinviewイベントを削除
      }
    });
  });
});
