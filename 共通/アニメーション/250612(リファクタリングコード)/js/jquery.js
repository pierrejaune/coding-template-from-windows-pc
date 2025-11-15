// jQuery版

$(function () {
  // クレジット非表示
  const creditHideSelectors = [
    '.-model04 .credit li:nth-child(n+2)',
    '.-model05 .credit li:nth-child(n+2)',
    '.-model06 .credit li:nth-child(n+2)',
    '.-model07 .credit li:nth-child(n+2)',
    '.-model09 .credit li:nth-child(6)',
    '.-model11 .credit li:nth-child(5)',
    '.-model17 .credit li:nth-child(4)',
    '.-model20 .credit li:nth-child(4)',
    '.-model22 .credit li:nth-child(5)',
    '.-model26 .credit li:nth-child(5)',
  ];
  $(creditHideSelectors.join(',')).hide();

  // js-anime フェードイン
  $('.js-anime').on('inview', function (event, isInView) {
    if (isInView) {
      const $el = $(this);
      setTimeout(() => {
        $el.addClass('is-active');
      }, 300);
    }
  });

  // タイピングアニメーション発火
  $('.typing').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('typed');
      $(this)
        .children('span')
        .each(function (i) {
          $(this)
            .delay(80 * i)
            .animate({ opacity: 1 }, 0);
        });
    }
  });

  // テキストラップ（読み込み時）
  $('.typing').each(function () {
    const $this = $(this);
    const text = $this.text();
    const html = text
      .split('')
      .map((char) => {
        return `<span style="opacity:0; display:inline-block;">${
          char === ' ' ? '&nbsp;' : char
        }</span>`;
      })
      .join('');
    $this.html(html);
  });

  // クレジット切り替えボタン
  $('.creditBtn').on('click', function () {
    $(this)
      .toggleClass('on')
      .next()
      .toggleClass('on')
      .parent()
      .toggleClass('on');
  });
});

// Swiper 初期化
$(function () {
  new Swiper('#feature .swiper-container', {
    loop: true,
    effect: 'fade',
    speed: 10,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });
});

// スクロール監視（typing発火条件用：コメントアウト状態）
$(window).on('load scroll', function () {
  $('.typing').each(function () {
    const $this = $(this);
    if ($this.hasClass('typed')) return;

    const offsetTop = $this.offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();

    // スクロールでアニメーション発火したい場合、以下を有効化
    /*
    if (scroll > offsetTop - windowHeight * 0.7) {
      $this.addClass("typed");
      $this.children('span').each(function (i) {
        $(this).delay(80 * i).animate({ opacity: 1 }, 0);
      });
    }
    */
  });
});
