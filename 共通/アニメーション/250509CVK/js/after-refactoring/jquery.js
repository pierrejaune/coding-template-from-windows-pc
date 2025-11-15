$(function () {
  // ------------------------
  // 初期ロード処理
  // ------------------------
  $(window).on('load', function () {
    setTimeout(function () {
      $('.feature').addClass('is_show');
      adjustStickyPosition('.sec01', 0.7);
      adjustStickyPosition('.sec02', 0.6);

      setTimeout(() => animationPosition('.js_anime'), 500);
    }, 1000);
  });

  // ------------------------
  // スクロールでアニメーション
  // ------------------------
  $(window).on('scroll', function () {
    animationPosition('.js_anime');
    toggleFollowArea();
    toggleBackground();
  });

  // ------------------------
  // slickスライダー
  // ------------------------
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

  // ------------------------
  // アコーディオン（共通化）
  // ------------------------
  $('.js_accordionbtn01, .js_accordionbtn02').on('click', function () {
    const $btn = $(this);
    const isOpen = $btn.hasClass('on');
    const type = $btn.hasClass('js_accordionbtn01') ? '01' : '02';
    const imgSrc = isOpen ? `img/open${type}.svg` : `img/close${type}.svg`;

    $btn.toggleClass('on').children('img').attr('src', imgSrc);
    $btn.prev('.sec__accordionblock').toggleClass('is_show', !isOpen);

    adjustStickyPosition('.sec01', 0.7);
    adjustStickyPosition('.sec02', 0.6);
  });

  // ------------------------
  // 共通関数群
  // ------------------------
  function animationPosition(selector) {
    $(selector).each(function () {
      const imgPos = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  }

  function adjustStickyPosition(target, ratio) {
    const windowHeight = $(window).height();
    const $target = $(target);
    const targetHeight = $target.outerHeight(true);

    if (targetHeight > windowHeight) {
      $target.css('top', `-${targetHeight * ratio}px`);
    }
  }

  let lastScroll = 0;
  function toggleFollowArea() {
    const scrollTop = $(window).scrollTop();
    $('.followarea').toggleClass('is_show', scrollTop < lastScroll);
    lastScroll = scrollTop;
  }

  function toggleBackground() {
    const imgPos = $('.js_bg').offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    $('.js_bg').toggleClass('is_show', scroll > imgPos - windowHeight);
  }
});
