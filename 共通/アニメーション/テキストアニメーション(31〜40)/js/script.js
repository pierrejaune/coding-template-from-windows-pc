$(document).ready(function () {
  // スクロールイベントで要素にactiveクラスを追加
  $(window).on('scroll', function () {
    $('.anim').each(function () {
      if ($(this).isInViewport()) {
        $(this).addClass('active');
      }
    });
  });

  // 要素がビューポートに入っているかチェックする関数
  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  // フェードインアニメーションを実行
  $('.fade-in-letters').each(function () {
    var text = $(this).text();

    // 空白を保持したまま1文字ずつ分割する
    var splitText = text.split('').map(function (char) {
      return char === ' ' ? '&nbsp;' : char; // 空白を非破壊で保持
    });

    $(this).empty();

    // spanタグを使って文字を1つずつ挿入
    splitText.forEach(
      function (char) {
        $(this).append('<span>' + char + '</span>');
      }.bind(this)
    );

    $(this)
      .find('span')
      .each(function (index) {
        $(this).css('animation-delay', 0.1 * index + 's');
      });
  });
});
