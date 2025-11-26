//fade
$(function () {
  $(window).on('load scroll', function () {
    $('.fadeIn').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.85) {
        $(this).addClass('active');
      }
    });
  });
});

//　star アニメーションのdelayとduration個別自動設定
document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.star,.star02');

  stars.forEach((star, index) => {
    const delay = Math.random() * 3000;
    const duration = 5000;

    star.style.setProperty('--star-delay', `${delay}ms`);
    star.style.setProperty('--star-duration', `${duration}ms`);
    star.classList.add('animate');
  });
});

// swiper
$(function () {
  // 無限スクロールスワイパー
  const swiper01 = new Swiper('.swiper01', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
    },
  });

  const swiper02 = new Swiper('.swiper02,.swiper03', {
    loop: true,
    spaceBetween: 0,
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 0,
  });
});

// order_type01
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

// order_type02
$(function () {
  function loopIcons(container, delay, callback) {
    const icons = container.find('.icon');
    let index = 0;

    function showNext() {
      $(icons[index]).addClass('active');
      index++;

      if (index >= icons.length) {
        if (callback) {
          setTimeout(callback, delay);
        }
      } else {
        setTimeout(showNext, delay);
      }
    }
    showNext();
  }
  function loopLeftRight() {
    loopIcons($('.loop_left'), 500, function () {
      loopIcons($('.loop_right'), 500, function () {
        setTimeout(() => {
          $('.loop_left .icon, .loop_right .icon').removeClass('active');
          setTimeout(loopLeftRight, 500);
        }, 1000);
      });
    });
  }
  loopLeftRight();
});
