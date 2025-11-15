// フェードイン
$(function () {
  $(window).on('load', function () {
    setTimeout(function () {
      $('.feature').addClass('is_show');
      setTimeout(function () {
        animationposition('.js_anime');
      }, 500);
    }, 1000);
  });

  $(window).on('scroll', function () {
    animationposition('.js_anime');
  });

  function animationposition(e) {
    $(e).each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  }
});

// スライダー
$(function () {
  $('.slider').slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    infinite: true,
    fade: true,
    pauseOnFocus: false,
    pauseOnHover: false,
  });
});

jQuery.fn.play = function (fn) {
  return fn ? this.bind('play', fn) : this.trigger('play');
};
// 1. jQuery.fn とは？
// jQuery.fn は jQueryのプロトタイプ。
// ここに関数を追加すると、$('セレクタ') で取得した要素に対してその関数を使えるようになります。
// つまり上記のコードは、jQueryで選んだ要素に対して .play() を呼べるようにするという拡張です。

// 動画遅延読み込み
$(function () {
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  });

  // inview
  $('.js_movie').on('inview', function () {
    $(this).play();
  });

  // 動画mute
  $('.mutebtn').click(function () {
    if ($(this).hasClass('on') == false) {
      $(this).addClass('on');
      $(this).text('OFF');
      $(this).prev('.js_movie').prop('muted', false);
    } else {
      $(this).removeClass('on');
      $(this).text('ON');
      $(this).prev('.js_movie').prop('muted', true);
    }
  });
});

// アコーディオン
$(function () {
  //クリックで動く
  $('.js_accordionbtn01').click(function () {
    if ($(this).hasClass('on') == false) {
      $(this).children('img').attr('src', 'img/close.svg');
      $(this).addClass('on');
      $('.sec__accordiontxt').addClass('is_show');
    } else {
      $(this).children('img').attr('src', 'img/open.svg');
      $(this).removeClass('on');
      $('.sec__accordiontxt').removeClass('is_show');
    }
  });
});
