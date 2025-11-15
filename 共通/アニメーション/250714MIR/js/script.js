// jQuery版：アニメーション・スライダー・Sticky調整
$(function () {
  // 画面幅をCSS変数(--vw)に設定
  function updateVW() {
    document.documentElement.style.setProperty(
      '--vw',
      `${document.documentElement.clientWidth}px`
    );
  }

  // 共通フェードイン処理（要素が画面内に来たら.is_showを付与）
  function animateOnScroll(selector) {
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    $(selector).each(function () {
      const pos = $(this).offset().top;
      if (scroll > pos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  }

  // スクロール連動のアニメーション制御（3セクション）
  function handleScrollAnime(selector) {
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();

    $(selector).each(function () {
      const $this = $(this);
      const blocks = ['01', '02', '03'].map((num) => ({
        content: $this.find(`.js_scrollblock${num}`),
        num: $this.find(`.js_num${num}`),
        image: $this.find(`.sec__img figure:nth-child(${parseInt(num)})`),
      }));

      blocks.forEach(({ content, num, image }, idx) => {
        const pos = content.offset().top;
        if (scroll > pos - windowHeight * 0.75) {
          $this.find('.js_num').removeClass('is_active');
          num.addClass('is_active');
          content.addClass('is_show');
          image.addClass('is_show');
        } else if (idx > 0) {
          content.removeClass('is_show');
          image.removeClass('is_show');
        }
      });
    });
  }

  // 数字ナビクリックで対応セクションにスクロール
  $('.js_num').click(function () {
    const $this = $(this);
    const scrollBlock = $this.hasClass('js_num01')
      ? '.js_scrollblock01'
      : $this.hasClass('js_num02')
      ? '.js_scrollblock02'
      : '.js_scrollblock03';

    $this.addClass('is_active').siblings('.js_num').removeClass('is_active');
    const pos = $this.closest('.js_scroll').find(scrollBlock).offset().top - 80;
    $('html, body').animate({ scrollTop: pos }, 0, 'swing');
  });

  // 「もっと見る」などのボタンクリックで下層へ移動
  $('.sec__btn02').click(function () {
    const totalHeight =
      $('.l-header').outerHeight() +
      $('.hero').outerHeight() +
      $('.sec01').outerHeight() +
      $(window).height();

    $('html, body').animate({ scrollTop: totalHeight }, 400, 'swing');
    return false;
  });

  // Sticky要素の高さに応じてtop位置を調整
  function adjustStickyPosition(selector, type = 1) {
    const $el = $(selector);
    const h = $el.outerHeight(true);
    const winH = window.innerHeight;
    if (h > winH) {
      const top =
        type === 1 ? `calc(100vh - ${h}px)` : `calc(100vh - (${h}px - 100vh))`;
      $el.css('top', top);
    }
  }

  // 初期化処理
  $(window).on('resize load', updateVW);

  $(window).on('load', function () {
    setTimeout(() => {
      $('.feature').addClass('is_show');
      setTimeout(() => {
        $('.hero').addClass('is_show');
        animateOnScroll('.js_anime');
        handleScrollAnime('.js_scroll');
      }, 500);
    }, 1000);

    // Sticky調整
    setTimeout(() => {
      adjustStickyPosition('.sec01', 1);
      ['.sec02', '.sec03'].forEach((sel) => adjustStickyPosition(sel, 2));
    }, 1000);
  });

  $(window).on('scroll', function () {
    $('.hero').addClass('is_show');
    animateOnScroll('.js_anime');
    handleScrollAnime('.js_scroll');
  });

  // スライダー初期化
  $('.slider').slick({
    dots: true,
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
});
