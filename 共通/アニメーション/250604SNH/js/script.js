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

  // ===============================
  // js-scroll-toggle の挙動制御
  // スクロール位置によって .on クラスを付けたり外したりする処理
  // ===============================
  // ウィンドウオブジェクトを jQuery で取得
  var $win = $(window);
  // ウィンドウのスクロールイベントに処理を登録
  $win.on({
    scroll: function () {
      // 現在のウィンドウの高さを取得
      var winH = $win.height();

      // スクロール量（上からどれだけスクロールしたか）を取得
      var winTop = $win.scrollTop();

      // ウィンドウの下端の位置 = 高さ + スクロール量
      var winEnd = winH + winTop;

      // ウィンドウの中央位置 = スクロール量 + 高さ / 2
      var winCenter = winTop + winH / 2;

      // .js-scroll-toggle クラスが付いた要素を1つずつ処理
      $('.js-scroll-toggle').each(function () {
        var $this = $(this);

        // 【条件1】要素がまだ「on」クラスを持っていない && 要素の上端が画面中央より上に来たとき
        // → クラス「on」を追加する
        if (!$this.hasClass('on') && $this.offset().top < winTop + winH / 2) {
          $this.addClass('on');

          // 【条件2】要素が既に「on」クラスを持っている && 要素の上端が画面中央より下に戻ったとき
          // → クラス「on」を削除する
        } else if (
          $this.hasClass('on') &&
          $this.offset().top > winTop + winH / 2
        ) {
          $this.removeClass('on');
        }
      });
    },
  });

  $(function () {
    const $mainVisual = $('.main-visual');
    const mainVisualTop = $mainVisual.offset().top;
    const scrollTop = $(window).scrollTop();

    const isInitial = true;

    // 1. 最初の状態で on クラスをつける必要があるか判定
    if (mainVisualTop < scrollTop) {
      // トランジションを無効化して即座にクラスを付与（演出なし）
      $mainVisual.addClass('no-transition on');

      // 一瞬後にトランジション復活（次のスクロール以降に演出有効化）
      requestAnimationFrame(() => {
        $mainVisual.removeClass('no-transition');
      });
    }

    // 2. スクロール時は普通に判定して演出ありでon/off
    $(window).on('scroll', function () {
      const scrollTop = $(window).scrollTop();
      const mainVisualTop = $mainVisual.offset().top;

      if (mainVisualTop < scrollTop) {
        $mainVisual.addClass('on');
      } else {
        $mainVisual.removeClass('on');
      }
    });
  });

  function checkCutOff() {
    const $inner = $('.main-visual-inner');
    const $el = $('.main-visual-ph');
    const elBottom = $el.offset().top + $el.outerHeight();
    const winBottom = $(window).scrollTop() + $(window).height();

    if (elBottom > winBottom) {
      $inner.addClass('is-cutoff');
    } else {
      $inner.removeClass('is-cutoff');
    }
  }
  $(window).on('resize load', function () {
    checkCutOff();
  });
});
