$(document).ready(function () {
  // IO START
  const targetList = document.querySelectorAll('.target');
  const IO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.dataset.isActive = 'true';
        }
      });
    },
    { threshold: 0.3 }
  );
  targetList.forEach((target) => IO.observe(target));
  // IO END
});

//slide
$(function () {
  $('.item__slide').slick({
    asNavFor: '.item__type',
    arrows: true,
    autoplay: false,
    fade: true,
    speed: 500,
    infinite: true,
    swipe: false,
    slidesToShow: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
  });
  $('.item__type').slick({
    asNavFor: '.item__slide',
    autoplay: false,
    dots: false,
    slidesToShow: 8,
    focusOnSelect: true,
  });

  $('.hero__link-face').on('click', function () {
    let page = $(this).data('face');
    $('.item__slide').slick('slickGoTo', page, false);
  });

  // 矢印色切り替え
  $('.slick-arrow,.item__type-text,.hero__link-face').on('click', function () {
    $('.slick-arrow').removeClass('cute');
    $('.slick-arrow').removeClass('activecute');
    $('.slick-arrow').removeClass('fresh');
    $('.slick-arrow').removeClass('coolcasual');
    $('.slick-arrow').removeClass('feminine');
    $('.slick-arrow').removeClass('softelegant');
    $('.slick-arrow').removeClass('elegant');
    $('.slick-arrow').removeClass('cool');
    $('.item__type').removeClass('on');
    $('.item__slide-box').each(function () {
      let arrow = $(this).data('arrow');
      if ($(this).hasClass('slick-active')) {
        $('.slick-arrow').addClass(arrow);
        if ($(this).hasClass('cool')) {
          $('.item__type').addClass('on');
        }
      }
    });
  });

  // ブランド切り替え
  $('.slick-arrow,.item__type-text,.hero__link-face').on('click', function () {
    $('.item__slide-box').each(function () {
      let arrow = $(this).data('arrow');
      if ($(this).hasClass('slick-active')) {
        if (arrow == 'cute') {
          $('.js-brand').text('キュート');
        } else if (arrow == 'activecute') {
          $('.js-brand').text('アクティブキュート');
        } else if (arrow == 'fresh') {
          $('.js-brand').text('フレッシュ');
        } else if (arrow == 'coolcasual') {
          $('.js-brand').text('クールカジュアル');
        } else if (arrow == 'feminine') {
          $('.js-brand').text('フェミニン');
        } else if (arrow == 'cool') {
          $('.js-brand').text('クール');
        } else if (arrow == 'softelegant') {
          $('.js-brand').text('ソフトエレガント');
        } else if (arrow == 'elegant') {
          $('.js-brand').text('エレガント');
        }
      }
    });
  });

  // アイテム切り替え
  $('.slick-arrow,.item__type-text,.hero__link-face').on('click', function () {
    $('.item__brand-list').removeClass('on');
    $('.item__panel').removeClass('on');
    $('.item__slide-box').each(function () {
      let arrow = $(this).data('arrow');
      if ($(this).hasClass('slick-active')) {
        $('.item__brand-list').each(function () {
          if ($(this).hasClass(arrow)) {
            $(this).addClass('on');
          }
        });
        $('.item__panel').each(function () {
          if ($(this).hasClass(arrow)) {
            $(this).addClass('on');
          }
        });
      }
    });
  });

  // スワイプ処理
  $('.item__slide-img').on('touchend', function () {
    setTimeout(function () {
      $('.slick-arrow').removeClass('cute');
      $('.slick-arrow').removeClass('activecute');
      $('.slick-arrow').removeClass('fresh');
      $('.slick-arrow').removeClass('coolcasual');
      $('.slick-arrow').removeClass('feminine');
      $('.slick-arrow').removeClass('softelegant');
      $('.slick-arrow').removeClass('elegant');
      $('.slick-arrow').removeClass('cool');
      $('.item__type').removeClass('on');
      $('.item__slide-box').each(function () {
        let arrow = $(this).data('arrow');
        if ($(this).hasClass('slick-active')) {
          $('.slick-arrow').addClass(arrow);
          if ($(this).hasClass('cool')) {
            $('.item__type').addClass('on');
          }
        }
      });

      // ブランド切り替え
      $('.item__slide-box').each(function () {
        let arrow = $(this).data('arrow');
        if ($(this).hasClass('slick-active')) {
          if (arrow == 'cute') {
            $('.js-brand').text('キュート');
          } else if (arrow == 'activecute') {
            $('.js-brand').text('アクティブキュート');
          } else if (arrow == 'fresh') {
            $('.js-brand').text('フレッシュ');
          } else if (arrow == 'coolcasual') {
            $('.js-brand').text('クールカジュアル');
          } else if (arrow == 'feminine') {
            $('.js-brand').text('フェミニン');
          } else if (arrow == 'cool') {
            $('.js-brand').text('クール');
          } else if (arrow == 'softelegant') {
            $('.js-brand').text('ソフトエレガント');
          } else if (arrow == 'elegant') {
            $('.js-brand').text('エレガント');
          }
        }
      });

      // アイテム切り替え
      $('.item__brand-list').removeClass('on');
      $('.item__panel').removeClass('on');
      $('.item__slide-box').each(function () {
        let arrow = $(this).data('arrow');
        if ($(this).hasClass('slick-active')) {
          $('.item__brand-list').each(function () {
            if ($(this).hasClass(arrow)) {
              $(this).addClass('on');
            }
          });
          $('.item__panel').each(function () {
            if ($(this).hasClass(arrow)) {
              $(this).addClass('on');
            }
          });
        }
      });
    }, 100);
  });
});
