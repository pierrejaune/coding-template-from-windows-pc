document.addEventListener('DOMContentLoaded', function () {
  const targetList = document.querySelectorAll('.fade-target');

  const IO = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.dataset.isActive = 'true';
        }
      });
    },
    { threshold: 0.3 }
  );
  targetList.forEach((target) => IO.observe(target));
});

$(function () {
  // inview
  $('.js-fade, .js-in').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-show');
    }
  });

  // slider
  $('.ph-slider').slick({
    fade: false,
    speed: 1500,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  // 画面に表示時スライド開始(autoplayはfalseに設定する)
  // $('.ph-slider').on('inview', function (event, isInView) {
  //   if (isInView) {
  //     setTimeout(() => {
  //       $(this).slick('slickPlay');
  //     }, 1750);
  //   }
  // });

  // スライダー用のIntersection Observer
  const sliders = document.querySelectorAll('.ph-slider');
  const sliderIO = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          setTimeout(() => {
            $(target).slick('slickPlay');
          }, 1750);
        }
      });
    },
    { threshold: 0.3 }
  );
  sliders.forEach((slider) => sliderIO.observe(slider));

  var $win = $(window);
  $win.on({
    scroll: function () {
      var winH = $win.height();
      var winTop = $win.scrollTop();
      var winEnd = winH + winTop;
      var winCenter = winTop + winH / 2;
      $('.item-block').each(function () {
        var $this = $(this);
        if (
          !$this.hasClass('on') &&
          $this.offset().top < winTop + (winH / 6) * 3
        ) {
          $this.addClass('on');
        } else if (
          $this.hasClass('on') &&
          $this.offset().top > winTop + (winH / 6) * 3
        ) {
          $this.removeClass('on');
        }
      });
    },
  });
});
