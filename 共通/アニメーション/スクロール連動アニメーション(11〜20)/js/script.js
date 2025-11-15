$(document).ready(function () {
  function scrollAnimation() {
    $('.anim').each(function () {
      var position = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();

      // 要素の半分が見えたらアニメーション開始
      if (scroll > position - windowHeight + $(this).height() / 2) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active'); // outviewでremoveClass
      }
    });
  }

  // スクロールイベントを設定
  $(window).on('scroll', function () {
    scrollAnimation();
  });

  // 初回読み込み時にも発火
  scrollAnimation();
});
