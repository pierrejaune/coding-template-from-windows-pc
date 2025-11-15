$(function () {
  $('.sec01 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec01 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec02 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec02 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec02 .credit .item:nth-of-type(4)').addClass('-mr0');
  $('.sec02 .credit .item:nth-of-type(4)').after('<br>');
  $('.sec03 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec03 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec04 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec04 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec05 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec05 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec06 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec06 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec07 .credit .item:nth-of-type(1)').addClass('-mr0');
  $('.sec07 .credit .item:nth-of-type(1)').after('<br>');
  $('.sec07 .credit .item:nth-of-type(3)').addClass('-mr0');
  $('.sec07 .credit .item:nth-of-type(3)').after('<br>');
  // テキストのみを1文字ずつspanで囲む
  $('.-type').each(function () {
    $(this)
      .contents()
      .filter(function () {
        // jQueryの .contents() は「その要素の直下にある子ノード」をすべて返します。
        // nodeType 1: 要素ノード (<img>, <span> など)
        // nodeType 3: テキストノード
        return this.nodeType === 3 && this.nodeValue.trim();
      })
      .each(function () {
        $(this).replaceWith(
          this.nodeValue
            .split('')
            .map((c) => (c === ' ' ? ' ' : `<span class="char">${c}</span>`))
            .join('')
        );
      });
  });
  // inview時：アニメーション発火
  $('.-type').on('inview', function (event, isInView) {
    if (isInView) {
      var $element = $(this);
      var $chars = $element.find('.char');

      $chars.each(function (i) {
        $(this)
          .delay(i * 100)
          .queue(function () {
            $(this).addClass('show').dequeue();

            // 全てのcharに.showが付与されたかチェック
            if ($element.find('.char.show').length === $chars.length) {
              setTimeout(function () {
                $element.find('.-icon').addClass('show');
              }, 100); // 0.1秒遅延
            }
          });
      });
    }
  });
  $('.LeftCont__List,.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });
  $(window).scroll(function () {
    $('.LeftCont__List,.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });
});
