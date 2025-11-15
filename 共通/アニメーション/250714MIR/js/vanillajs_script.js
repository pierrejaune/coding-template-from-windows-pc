document.addEventListener('DOMContentLoaded', function () {
  // --vw設定
  function updateVW() {
    document.documentElement.style.setProperty(
      '--vw',
      `${window.innerWidth}px`
    );
  }

  // 要素が表示領域に来たら.is_showを付与
  function animateOnScroll(selector) {
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;
    document.querySelectorAll(selector).forEach((el) => {
      const pos = el.getBoundingClientRect().top + scroll;
      if (scroll > pos - windowHeight * 0.75) {
        el.classList.add('is_show');
      }
    });
  }

  // スクロール連動アニメーション
  function handleScrollAnime(selector) {
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;

    document.querySelectorAll(selector).forEach((container) => {
      const blocks = [
        {
          block: '.js_scrollblock01',
          num: '.js_num01',
          img: '.sec__img figure:nth-child(1)',
        },
        {
          block: '.js_scrollblock02',
          num: '.js_num02',
          img: '.sec__img figure:nth-child(2)',
        },
        {
          block: '.js_scrollblock03',
          num: '.js_num03',
          img: '.sec__img figure:nth-child(3)',
        },
      ];

      blocks.forEach(({ block, num, img }, i) => {
        const blockEl = container.querySelector(block);
        const numEl = container.querySelector(num);
        const imgEl = container.querySelector(img);
        if (!blockEl) return;
        const pos = blockEl.getBoundingClientRect().top + scroll;
        if (scroll > pos - windowHeight * 0.75) {
          container
            .querySelectorAll('.js_num')
            .forEach((n) => n.classList.remove('is_active'));
          numEl?.classList.add('is_active');
          blockEl.classList.add('is_show');
          imgEl?.classList.add('is_show');
        } else if (i > 0) {
          blockEl.classList.remove('is_show');
          imgEl?.classList.remove('is_show');
        }
      });
    });
  }

  // スクロールナビクリック
  document.querySelectorAll('.js_num').forEach((btn) => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.js_scroll');
      container
        .querySelectorAll('.js_num')
        .forEach((n) => n.classList.remove('is_active'));
      btn.classList.add('is_active');

      let targetSelector;
      if (btn.classList.contains('js_num01'))
        targetSelector = '.js_scrollblock01';
      if (btn.classList.contains('js_num02'))
        targetSelector = '.js_scrollblock02';
      if (btn.classList.contains('js_num03'))
        targetSelector = '.js_scrollblock03';

      const target = container.querySelector(targetSelector);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // 「もっと見る」ボタンクリック
  const moreBtn = document.querySelector('.sec__btn02');
  if (moreBtn) {
    moreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const h1 = document.querySelector('.l-header')?.offsetHeight || 0;
      const h2 = document.querySelector('.hero')?.offsetHeight || 0;
      const h3 = document.querySelector('.sec01')?.offsetHeight || 0;
      const h4 = window.innerHeight;
      const position = h1 + h2 + h3 + h4;
      window.scrollTo({ top: position, behavior: 'smooth' });
    });
  }

  // stickyの位置調整
  function adjustSticky(selector, type = 1) {
    const el = document.querySelector(selector);
    if (!el) return;
    const height = el.offsetHeight;
    const winH = window.innerHeight;
    if (height > winH) {
      const top =
        type === 1
          ? `calc(100vh - ${height}px)`
          : `calc(100vh - (${height}px - 100vh))`;
      el.style.top = top;
    }
  }

  // イベントバインド
  window.addEventListener('resize', updateVW);

  window.addEventListener('load', () => {
    updateVW();

    setTimeout(() => {
      document.querySelector('.feature')?.classList.add('is_show');
      setTimeout(() => {
        document.querySelector('.hero')?.classList.add('is_show');
        animateOnScroll('.js_anime');
        handleScrollAnime('.js_scroll');
      }, 500);
    }, 1000);

    setTimeout(() => {
      adjustSticky('.sec01', 1);
      ['.sec02', '.sec03'].forEach((sel) => adjustSticky(sel, 2));
    }, 1000);

    // ✅ Swiper v4.3.3 初期化
    new Swiper('.swiper-container', {
      loop: true,
      effect: 'fade',
      speed: 1500,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });

  window.addEventListener('scroll', () => {
    document.querySelector('.hero')?.classList.add('is_show');
    animateOnScroll('.js_anime');
    handleScrollAnime('.js_scroll');
  });
});
