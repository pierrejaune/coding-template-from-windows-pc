//fade
$(function () {
  $(window).on('load scroll', function () {
    $('.fadeIn,.fadeUp').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.85) {
        $(this).addClass('active');
      }
    });
  });
});

$(function () {
  $(window).on('load scroll', function () {
    $('.fadeIn_anim_area').each(function () {
      var triggerPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();

      if (scroll > triggerPos - windowHeight * 0.85) {
        $(this)
          .find('.fadeIn_anim')
          .each(function (i) {
            var _this = $(this);
            setTimeout(function () {
              _this.addClass('active');
            }, 400 * i);
          });
      }
    });
  });
});

//　slider
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#feature .swiper', {
    loop: true,
    speed: 2000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 1800,
      disableOnInteraction: false,
    },
  });
});

// movie
$(function () {
  function initVideoMuteToggle() {
    const $movieAreas = $('.movie-area');

    if ($movieAreas.length === 0) {
      console.log('要素が見つかりません');
      return;
    }

    $movieAreas.each(function () {
      const $movieArea = $(this);
      const $video = $movieArea.find('.js-movie')[0]; // DOM要素を取得
      const $videoBtn = $movieArea.find('.sound-btn');

      if (!$video || $videoBtn.length === 0) {
        console.log('動画またはボタンが見つかりません');
        return;
      }

      $videoBtn.on('click', function () {
        // クリックされたボタンが既にonの場合
        if ($videoBtn.hasClass('on')) {
          $video.muted = true;
          $videoBtn.removeClass('on');
        } else {
          // 他の動画をすべてミュートにする
          $('.js-movie').each(function () {
            this.muted = true;
          });
          // 他のボタンからonクラスを削除
          $('.sound-btn').removeClass('on');

          // クリックされたボタンに対応する動画のみミュート解除
          $video.muted = false;
          $videoBtn.addClass('on');
        }
      });
    });
  }
  initVideoMuteToggle();
});

// z-index
$(function () {
  $(window).on('scroll load', function () {
    var scr = $(window).scrollTop();
    var sec01 = $('.sec01.sticky');
    var sec02 = $('.sec02.sticky');
    var sec03 = $('.sec03.sticky');
    var sec04 = $('.sec04.sticky_bottom');
    var sec03Top = sec03.offset().top;
    var sec01Bottom = sec01.offset()
      ? sec01.offset().top + sec01.outerHeight()
      : 0;
    var sec02Bottom = sec02.offset()
      ? sec02.offset().top + sec02.outerHeight()
      : 0;

    if (scr >= sec03Top) {
      sec04.css('z-index', 1);
    } else if (scr < sec03Top) {
      sec04.css('z-index', -1);
    }
  });
});

//sticky
$(function () {
  window.addEventListener('load', updateStickyPositions);
  window.addEventListener('resize', updateStickyPositions);

  function updateStickyPositions() {
    const containers = document.querySelectorAll('.sticky,.sticky_bottom');
    const viewportHeight = window.innerHeight;

    containers.forEach((container) => {
      const rect = container.getBoundingClientRect();
      const containerHeight = rect.height;
      const topValue = containerHeight - viewportHeight;
      container.style.top = -topValue + 'px';
    });
  }
});
