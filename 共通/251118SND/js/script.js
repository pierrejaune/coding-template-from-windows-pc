// フェードイン
$(function () {
  $(window).on('resize load', function () {
    let vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  });

  $(window).on('load', function () {
    setTimeout(function () {
      $('.feature').addClass('is_show');
      setTimeout(function () {
        $('.hero').addClass('is_show');
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
    dots: false,
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    infinite: true,
    fade: true,
    pauseOnFocus: false,
    pauseOnHover: false,
  });
});

// stickyによる高さ
$(window).on('load resize', function () {
  let windowHeight = window.innerHeight;
  setTimeout(function () {
    adjustStickyPosition('.sec01');
    function adjustStickyPosition(targetSelector) {
      let stickyTarget = $(targetSelector);
      let stickyTargetHeight = stickyTarget.outerHeight(true);

      if (stickyTargetHeight > windowHeight) {
        let stickyPosition = `calc(100vh - (${stickyTargetHeight}px))`;
        stickyTarget.css('top', stickyPosition);
      }
    }
  }, 1000);
});

// PC背景
$(function () {
  $(window).on('load resize scroll', function () {
    var sec02Pos = $('.sec02').offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > sec02Pos - windowHeight + 80) {
      $('.main').addClass('is_red');
    } else {
      $('.main').removeClass('is_red');
    }
  });
});
