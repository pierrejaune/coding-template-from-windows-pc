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
    dots: true,
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
    speed: 100,
    autoplaySpeed: 3000,
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
    adjustStickyPosition('.hero');
    function adjustStickyPosition(targetSelector) {
      let stickyTarget = $(targetSelector);
      let stickyTargetHeight = stickyTarget.outerHeight(true);

      if (stickyTargetHeight > windowHeight) {
        let stickyPosition = `calc(100vh - (${stickyTargetHeight}px - 10%))`;
        stickyTarget.css('top', stickyPosition);
      }
    }
  }, 1000);
});

$(function () {
  // inview
  $('.js_typingText01').on('inview', function () {
    document
      .querySelectorAll(`.js_typingText01 typewritten-text`)
      .forEach((elem) => {
        elem.start();
      });
  });

  $('.js_typingText02').on('inview', function () {
    document
      .querySelectorAll(`.js_typingText02 typewritten-text`)
      .forEach((elem) => {
        elem.start();
      });
  });
});
