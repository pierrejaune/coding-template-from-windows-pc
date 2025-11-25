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

// stickyによる高さ
$(window).on('load resize', function () {
  let windowHeight = window.innerHeight;
  setTimeout(function () {
    adjustStickyPosition01('.sec01');
    adjustStickyPosition02('.sec02');
    function adjustStickyPosition01(targetSelector) {
      let stickyTarget = $(targetSelector);
      let stickyTargetHeight = stickyTarget.outerHeight(true);

      if (stickyTargetHeight > windowHeight) {
        let stickyPosition = `calc(100vh - (${stickyTargetHeight}px))`;
        stickyTarget.css('top', stickyPosition);
      }
    }
    function adjustStickyPosition02(targetSelector) {
      let stickyTarget = $(targetSelector);
      let stickyTargetHeight = stickyTarget.outerHeight(true);

      if (stickyTargetHeight > windowHeight) {
        let stickyPosition = `calc(100vh - (${stickyTargetHeight}px - 100vh))`;
        stickyTarget.css('top', stickyPosition);
      }
    }
  }, 1000);
});
