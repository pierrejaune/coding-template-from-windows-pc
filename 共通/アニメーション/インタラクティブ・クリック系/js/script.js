$(document).ready(function () {
  // クリックで要素が展開
  $('.toggle-content-btn').click(function () {
    $('.toggle-content').slideToggle();
  });

  // クリックで背景が変わる
  $('.change-bg-btn').click(function () {
    $('body').toggleClass('bg-change');
  });

  // クリックでアニメーション再生
  $('.play-animation-btn').click(function () {
    const box = $('.animate-box');
    box.removeClass('animated'); // 一旦クラスを削除
    void box[0].offsetWidth; // 強制リフローで再適用を可能に
    box.addClass('animated'); // アニメーション適用
  });

  // クリックで複数要素を切り替え
  $('.switch-elements-btn').click(function () {
    $('.switch-elements p').toggleClass('active');
  });

  // クリックで開くモーダルウィンドウ
  $('.open-modal-btn').click(function () {
    $('.modal-overlay').fadeIn();
  });
  $('.close-modal-btn, .modal-overlay').click(function () {
    $('.modal-overlay').fadeOut();
  });

  // クリックでテキスト切り替え
  $('.toggle-text-btn').click(function () {
    $('.toggle-text').text(function (_, currentText) {
      return currentText === '元のテキスト'
        ? '変更後のテキスト'
        : '元のテキスト';
    });
  });

  // クリックでフィルター適用
  $('.apply-filter-btn').click(function () {
    $('.filter-image').toggleClass('filtered');
  });

  // クリックで3D回転
  $('.rotate-3d-btn').click(function () {
    $('.rotate-3d-box').toggleClass('rotated');
  });

  // クリックで光のエフェクト
  $('.light-effect-btn').click(function () {
    const lightBox = $('.light-effect-box');
    lightBox.addClass('glow');
    setTimeout(() => lightBox.removeClass('glow'), 500); // 0.5秒後に光エフェクトを消す
  });

  // クリックでリストが展開・収納
  $('.toggle-list-btn').click(function () {
    $('.toggle-list').slideToggle();
  });
});
