// フェードイン
$(function () {
  $(window).on('resize load', function () {
    // 最初に、ビューポートの高さを取得し、0.01を掛けて1%の値を算出して、vh単位の値を取得
    let vw = document.documentElement.clientWidth;
    // カスタム変数--vhの値をドキュメントのルートに設定
    document.documentElement.style.setProperty('--vw', `${vw}px`);

    setTimeout(function () {
      $('.feature').addClass('is_show');
      setTimeout(function () {
        $('.js_anime').each(function () {
          var imgPos = $(this).offset().top;
          var scroll = $(window).scrollTop();
          var windowHeight = $(window).height();
          if (scroll > imgPos - windowHeight * 0.75) {
            $(this).addClass('is_show');
          }
        });
      }, 500);
    }, 1000);
  });

  // フェードイン
  $(window).on('scroll', function () {
    $('.js_anime').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  });
});

$(function () {
  $(window).on('resize load scroll', function () {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var point = $('.sec02').offset().top;
    if (scroll < point) {
      $('.js_follow01').addClass('is_show');
      $('.js_follow02').removeClass('is_show');
    }
    if (scroll > point) {
      $('.js_follow01').removeClass('is_show');
      $('.js_follow02').addClass('is_show');
    }
  });
});

$(function () {
  $(window).on('load resize scroll', function () {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var js_stickyitem02 = $('.js_stickyitem02').offset().top;
    var js_stickyitem03 = $('.js_stickyitem03').offset().top;
    var js_stickyitem04 = $('.js_stickyitem04').offset().top;
    var js_stickyitem05 = $('.js_stickyitem05').offset().top;
    var js_stickyitem06 = $('.js_stickyitem06').offset().top;
    var js_stickyitem07 = $('.js_stickyitem07').offset().top;
    var js_stickyitem08 = $('.js_stickyitem08').offset().top;
    var js_stickyitem09 = $('.js_stickyitem09').offset().top;
    var js_stickyitem10 = $('.js_stickyitem10').offset().top;
    var js_stickyitem11 = $('.js_stickyitem11').offset().top;
    var js_stickyitem12 = $('.js_stickyitem12').offset().top;
    var js_stickyitem13 = $('.js_stickyitem13').offset().top;
    var js_stickyitem14 = $('.js_stickyitem14').offset().top;
    var js_stickyitem15 = $('.js_stickyitem15').offset().top;

    if (scroll > js_stickyitem02 - windowHeight * 0.75) {
      $('.js_model02').addClass('is_show');
    }
    if (scroll < js_stickyitem02 - windowHeight * 0.75) {
      $('.js_model02').removeClass('is_show');
    }
    if (scroll > js_stickyitem03 - windowHeight * 0.75) {
      $('.js_model03').addClass('is_show');
    }
    if (scroll < js_stickyitem03 - windowHeight * 0.75) {
      $('.js_model03').removeClass('is_show');
    }
    if (scroll > js_stickyitem04 - windowHeight * 0.75) {
      $('.js_model04').addClass('is_show');
    }
    if (scroll < js_stickyitem04 - windowHeight * 0.75) {
      $('.js_model04').removeClass('is_show');
    }
    if (scroll > js_stickyitem05 - windowHeight * 0.75) {
      $('.js_model05').addClass('is_show');
    }
    if (scroll < js_stickyitem05 - windowHeight * 0.75) {
      $('.js_model05').removeClass('is_show');
    }
    if (scroll > js_stickyitem06 - windowHeight * 0.75) {
      $('.js_model06').addClass('is_show');
    }
    if (scroll < js_stickyitem06 - windowHeight * 0.75) {
      $('.js_model06').removeClass('is_show');
    }
    if (scroll > js_stickyitem07 - windowHeight * 0.75) {
      $('.js_model07').addClass('is_show');
    }
    if (scroll < js_stickyitem07 - windowHeight * 0.75) {
      $('.js_model07').removeClass('is_show');
    }
    if (scroll > js_stickyitem08 - windowHeight * 0.75) {
      $('.js_model08').addClass('is_show');
    }
    if (scroll < js_stickyitem08 - windowHeight * 0.75) {
      $('.js_model08').removeClass('is_show');
    }
    if (scroll > js_stickyitem09 - windowHeight * 0.75) {
      $('.js_model09').addClass('is_show');
    }
    if (scroll < js_stickyitem09 - windowHeight * 0.75) {
      $('.js_model09').removeClass('is_show');
    }
    if (scroll > js_stickyitem10 - windowHeight * 0.75) {
      $('.js_model10').addClass('is_show');
    }
    if (scroll < js_stickyitem10 - windowHeight * 0.75) {
      $('.js_model10').removeClass('is_show');
    }
    if (scroll > js_stickyitem11 - windowHeight * 0.75) {
      $('.js_model11').addClass('is_show');
    }
    if (scroll < js_stickyitem11 - windowHeight * 0.75) {
      $('.js_model11').removeClass('is_show');
    }
    if (scroll > js_stickyitem12 - windowHeight * 0.75) {
      $('.js_model12').addClass('is_show');
    }
    if (scroll < js_stickyitem12 - windowHeight * 0.75) {
      $('.js_model12').removeClass('is_show');
    }
    if (scroll > js_stickyitem13 - windowHeight * 0.75) {
      $('.js_model13').addClass('is_show');
    }
    if (scroll < js_stickyitem13 - windowHeight * 0.75) {
      $('.js_model13').removeClass('is_show');
    }
    if (scroll > js_stickyitem14 - windowHeight * 0.75) {
      $('.js_model14').addClass('is_show');
    }
    if (scroll < js_stickyitem14 - windowHeight * 0.75) {
      $('.js_model14').removeClass('is_show');
    }
    if (scroll > js_stickyitem15 - windowHeight * 0.75) {
      $('.js_model15').addClass('is_show');
    }
    if (scroll < js_stickyitem15 - windowHeight * 0.75) {
      $('.js_model15').removeClass('is_show');
    }
  });
});

$(function () {
  $('.js_modelitem01').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg01').removeClass('is_show');
    $('.js_modelimg01').eq($num).addClass('is_show');
  });
  $('.js_modelitem02').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg02').removeClass('is_show');
    $('.js_modelimg02').eq($num).addClass('is_show');
  });
  $('.js_modelitem03').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg03').removeClass('is_show');
    $('.js_modelimg03').eq($num).addClass('is_show');
  });
  $('.js_modelitem04').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg04').removeClass('is_show');
    $('.js_modelimg04').eq($num).addClass('is_show');
  });
  $('.js_modelitem05').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg05').removeClass('is_show');
    $('.js_modelimg05').eq($num).addClass('is_show');
  });
  $('.js_modelitem06').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg06').removeClass('is_show');
    $('.js_modelimg06').eq($num).addClass('is_show');
  });
  $('.js_modelitem07').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg07').removeClass('is_show');
    $('.js_modelimg07').eq($num).addClass('is_show');
  });
  $('.js_modelitem08').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg08').removeClass('is_show');
    $('.js_modelimg08').eq($num).addClass('is_show');
  });
  $('.js_modelitem09').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg09').removeClass('is_show');
    $('.js_modelimg09').eq($num).addClass('is_show');
  });
  $('.js_modelitem10').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg10').removeClass('is_show');
    $('.js_modelimg10').eq($num).addClass('is_show');
  });
  $('.js_modelitem11').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg11').removeClass('is_show');
    $('.js_modelimg11').eq($num).addClass('is_show');
  });
  $('.js_modelitem12').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg12').removeClass('is_show');
    $('.js_modelimg12').eq($num).addClass('is_show');
  });
  $('.js_modelitem13').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg13').removeClass('is_show');
    $('.js_modelimg13').eq($num).addClass('is_show');
  });
  $('.js_modelitem14').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg14').removeClass('is_show');
    $('.js_modelimg14').eq($num).addClass('is_show');
  });
  $('.js_modelitem15').on('click', function () {
    $num = $(this).index();
    $('.js_modelimg15').removeClass('is_show');
    $('.js_modelimg15').eq($num).addClass('is_show');
  });
});

// クレジット改行位置
$(function () {
  $(window).on('load', function () {
    $('.credit').each(function () {
      var items = [];

      $(this)
        .find('li')
        .each(function () {
          var pos = $(this).offset().top;
          items.push(pos);
        });

      for (var i = 0; i < items.length; i++) {
        if (items[i] < items[i + 1]) {
          $('li:nth-child(' + (i + 1) + ')', this).addClass('break');
        }
      }
    });
  });
});
