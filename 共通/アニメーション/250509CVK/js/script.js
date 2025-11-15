// フェードイン
$(function () {
  $(window).on('load', function () {
    setTimeout(function () {
      $('.feature').addClass('is_show');
      adjustStickyPosition02('.sec01');
      adjustStickyPosition01('.sec02');
      setTimeout(function () {
        animationposition('.js_anime');
      }, 500);
    }, 1000);
  });

  $(window).on('scroll', function () {
    animationposition('.js_anime');
  });

  // スライダー
  $('.slider').slick({
    dots: false,
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

  // アコーディオン
  $('.js_accordionbtn01').click(function () {
    adjustStickyPosition02('.sec01');
    adjustStickyPosition01('.sec02');
    if ($(this).hasClass('on') == false) {
      $(this).children('img').attr('src', 'img/close01.svg');
      $(this).addClass('on');
      $(this).prev('.sec__accordionblock').addClass('is_show');
    } else {
      $(this).children('img').attr('src', 'img/open01.svg');
      $(this).removeClass('on');
      $(this).prev('.sec__accordionblock').removeClass('is_show');
    }
  });

  $('.js_accordionbtn02').click(function () {
    adjustStickyPosition02('.sec01');
    adjustStickyPosition01('.sec02');
    if ($(this).hasClass('on') == false) {
      $(this).children('img').attr('src', 'img/close02.svg');
      $(this).addClass('on');
      $(this).prev('.sec__accordionblock').addClass('is_show');
    } else {
      $(this).children('img').attr('src', 'img/open02.svg');
      $(this).removeClass('on');
      $(this).prev('.sec__accordionblock').removeClass('is_show');
    }
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

  // stickyによる高さ
  function adjustStickyPosition01(targetSelector) {
    var windowHeight = $(window).height();
    let stickyTarget = $(targetSelector);
    let stickyTargetHeight = stickyTarget.outerHeight(true);

    if (stickyTargetHeight > windowHeight) {
      let stickyPosition = '-' + stickyTargetHeight * 0.6 + 'px';
      stickyTarget.css('top', stickyPosition);
    }
  }
  function adjustStickyPosition02(targetSelector) {
    var windowHeight = $(window).height();
    let stickyTarget = $(targetSelector);
    let stickyTargetHeight = stickyTarget.outerHeight(true);

    if (stickyTargetHeight > windowHeight) {
      let stickyPosition = '-' + stickyTargetHeight * 0.7 + 'px';
      stickyTarget.css('top', stickyPosition);
    }
  }
});

//上スクロール判定
$(function () {
  var scroll = 0;
  $(window).on('scroll', function () {
    if ($(this).scrollTop() < scroll) {
      $('.followarea').addClass('is_show');
    } else {
      $('.followarea').removeClass('is_show');
    }
    scroll = $(this).scrollTop();
  });
});

$(function () {
  $(window).on('scroll', function () {
    var imgPos = $('.js_bg').offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > imgPos - windowHeight) {
      $('.js_bg').addClass('is_show');
    } else {
      $('.js_bg').removeClass('is_show');
    }
  });
});
