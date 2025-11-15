// IMG FADE IN AND HOVER UP

$(function () {
  // フェードイン
  $('.fadeUp-hidden').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('animate-active');
    }
  });
});

$(function () {
  // TextRandomAnimeControl関数の定義
  function TextRandomAnimeControl() {
    $(window).on('load scroll', function () {
      $('.TextRandomAnime').each(function () {
        var elemPos = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var winH = $(window).height();
        if (scroll > elemPos - winH * 0.7) {
          $(this).addClass('appearRandomtext');
        }
      });
    });
  }

  // spanタグを追加する
  $('.TextRandomAnime').each(function () {
    var text = $(this).text();
    var textbox = '';
    text.split('').forEach(function (t) {
      textbox += '<span>' + t + '</span>';
    });
    $(this).html(textbox);
  });

  // TextRandomAnimeControl関数を呼び出す
  TextRandomAnimeControl();
});

function swiperInit() {
  var fvSlider01 = new Swiper('.swiper_block', {
    loop: true,
    effect: 'slide',
    speed: 1000,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

document.addEventListener(
  'DOMContentLoaded',
  function () {
    swiperInit();
  },
  false
);
