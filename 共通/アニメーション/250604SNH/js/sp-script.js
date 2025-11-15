// WR用のjs/script.jsにコピペしてください。
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
    autoplaySpeed: 2000,
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
  $('.ph-slider').on('inview', function (event, isInView) {
    if (isInView) {
      setTimeout(() => {
        $(this).slick('slickPlay');
      }, 1750);
    }
  });

  // js-position stickyの開始位置
  $(window).on('load resize', function () {
    function updatePosition() {
      var windowHeight = $(window).height();

      $('.js-position').each(function () {
        var elementHeight = $(this).outerHeight();
        // var elementHeight = this.getBoundingClientRect().height;

        if (elementHeight <= windowHeight) {
          // 要素の高さがウィンドウの高さより低い場合
          $(this).css('top', '0');
        } else {
          // 要素の高さがウィンドウの高さより高い場合
          var topValue = windowHeight - elementHeight;
          $(this).css('top', topValue + 'px');
        }
      });
    }

    updatePosition();
  });

  //js-scroll-toggle .onをつけたり消したり
  var $win = $(window);
  $win.on({
    scroll: function () {
      var winH = $win.height();
      var winTop = $win.scrollTop();
      var winEnd = winH + winTop;
      var winCenter = winTop + winH / 2;
      $('.js-scroll-toggle').each(function () {
        var $this = $(this);
        if (!$this.hasClass('on') && $this.offset().top < winTop + winH / 2) {
          $this.addClass('on');
        } else if (
          $this.hasClass('on') &&
          $this.offset().top > winTop + winH / 2
        ) {
          $this.removeClass('on');
        }
      });
    },
  });
});
