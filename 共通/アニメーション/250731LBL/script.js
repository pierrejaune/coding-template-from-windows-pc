$(function () {
  // =========================
  // 1. アニメーション表示処理
  // =========================

  function scrollAddClass() {
    const scrollElements = document.querySelectorAll('.anim');
    const windowHeight = window.innerHeight;

    scrollElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const visibleHeight = windowHeight - elementTop;
      const threshold = elementHeight * 0.5;

      if (visibleHeight >= threshold && elementTop < windowHeight) {
        el.classList.add('showed');
      }
    });
  }

  // スクロールイベントのthrottle化（パフォーマンス改善）
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        scrollAddClass(); // ← 実行されるのは最大で100msに1回
        scrollTimeout = null; // ← 再び呼べるようにリセット
      }, 100); // ← ここが間引きの間隔（100msごとに1回まで）
    }
  });

  // 初回表示時のアニメーション
  $(window).on('load', () => {
    scrollAddClass(); // 一度実行
    setTimeout(() => {
      document.querySelector('.hero__mv')?.classList.add('showed');
      $('.navi__pc-pic').addClass('showed');
    }, 500);
  });

  // =========================
  // 2. Swiper スライド初期化
  // =========================

  const swiperSelectors = [
    '.sec02 .slide01 .swiper',
    '.sec02 .slide02 .swiper',
    '.sec04 .slide01 .swiper',
  ];
  const swiperInitialized = {};

  const swiperOptions = {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 1000,
    spaceBetween: 20,
    autoplay: { delay: 3000 },
  };

  function initSwiper(selector) {
    if (!swiperInitialized[selector] && $(selector).hasClass('showed')) {
      new Swiper(selector, swiperOptions);
      swiperInitialized[selector] = true;
    }
  }

  function checkAndInitSwipers() {
    swiperSelectors.forEach(initSwiper);
  }

  // スクロール・リサイズ・ロード時にチェック
  $(window).on('scroll resize load', checkAndInitSwipers);

  // showed クラスの付与を監視してSwiperを初期化
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        checkAndInitSwipers();
      }
    });
  });

  swiperSelectors.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) {
      observer.observe(el, { attributes: true });
    }
  });

  // =========================
  // 3. ページ内リンクスクロール
  // =========================

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    const href = $(this).attr('href');
    const $target = $(href === '#' || href === '' ? 'html' : href);

    if (!$target.length) return;

    // ヘッダーの高さを取得
    let headerHeight = 0;
    if (document.querySelector('.header-fix-buttons')) {
      headerHeight = 57;
    } else if (document.querySelector('.pc-header-main')) {
      headerHeight = 90;
    }

    const targetTop = $target.offset().top;
    const scrollPosition = targetTop - headerHeight;

    $('html, body').animate({ scrollTop: scrollPosition }, 300, 'swing', () => {
      // 念のため再調整
      const diff = $target.offset().top - headerHeight;
      if (diff !== scrollPosition) {
        $('html, body').animate({ scrollTop: diff }, 200, 'swing');
      }
    });
  });
});
