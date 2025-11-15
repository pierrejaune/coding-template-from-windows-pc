$(function () {
  const config = {
    both: [1, 2, 3, 6, 7, 13, 14, 15, 20, 21],
    second: [4, 8, 9, 10, 11, 16, 17, 18, 19],
  };

  config.both.forEach((n) => {
    const sec = `.sec${String(n).padStart(2, '0')}`;
    $(
      `${sec} .credit .item:nth-of-type(2), ${sec} .credit .item:nth-of-type(4)`
    )
      .addClass('-mr0')
      .after('<br>');
  });

  config.second.forEach((n) => {
    $(`.sec${String(n).padStart(2, '0')} .credit .item:nth-of-type(2)`)
      .addClass('-mr0')
      .after('<br>');
  });
  $('.catch__More span').on('click', function () {
    if ($(this).text() === 'MORE') {
      $(this).text('CLOSE');
      $('.catch__More').addClass('-op');
      $('.catch__Hidden').slideDown();
    } else if ($(this).text() === 'CLOSE') {
      $(this).text('MORE');
      $('.catch__More').removeClass('-op');
      $('.catch__Hidden').slideUp();
    }
  });

  $('#music').click(function () {
    if ($(this).hasClass('off')) {
      $(this).removeClass('off');
      $('.music .off').removeClass('active');
      $('.music .on').addClass('active');
      $('.mv__Video video').prop('muted', false);
    } else {
      $(this).addClass('off');
      $('.music .on').removeClass('active');
      $('.music .off').addClass('active');
      $('.mv__Video video').prop('muted', true);
    }
  });
  const swiper = new Swiper(' .swiper', {
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });
  $(window).scroll(function () {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });
});
