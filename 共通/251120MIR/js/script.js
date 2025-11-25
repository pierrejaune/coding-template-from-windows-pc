// スライダー
$(function () {
  $('.slider').slick({
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 1500,
    dots: false,
    arrows: false,
    infinite: true,
  });
});

// inview
$(function () {
  $(window).on('load', function () {
    $('.inview').one('inview', function () {
      $(this).addClass('show');
    });
  });
});

// 画像タップ処理
$(function () {
  function bindTap() {
    $('.book, .img-inr').one('click.tap', function (e) {
      e.preventDefault();

      $(this).find('.credit').addClass('show');
      $(this).siblings('.bottom-credit').addClass('hide');

      $(document).on('click.outside', function (ev) {
        if ($(ev.target).closest('.book, .img-inr').length) return;

        $('.credit').removeClass('show');
        $('.bottom-credit').removeClass('hide');

        $(document).off('click.outside');

        bindTap();
      });
    });
  }

  // 初回登録
  bindTap();
});
