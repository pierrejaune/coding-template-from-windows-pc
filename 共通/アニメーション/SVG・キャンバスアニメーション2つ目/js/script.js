$(document).ready(function () {
  // 1. バウンド
  $('#bounce-svg circle').addClass('animated');

  // 2. フェードイン・フェードアウト
  $('#fade-svg rect').addClass('animated');

  // 3. スケールイン
  $('#scale-in-svg path').addClass('animated');

  // 4. 波線アニメーション
  $('#wave-line path').addClass('animated');

  // 5. 回転スライドイン
  $('#rotate-slide-svg rect').addClass('animated');

  // 6. 拡大フェードアウト
  $('#expand-fade-svg circle').addClass('animated');

  // 7. ストロークとフィルの切り替え
  $('#stroke-fill-text text').addClass('animated');

  // 8. 弾むアニメーション
  $('#elastic-svg circle').addClass('animated');

  // 9. ランダム移動
  $('#random-move-svg rect').addClass('animated');

  // 10. 色の変化
  $('#color-shift-svg circle').addClass('animated');
});
