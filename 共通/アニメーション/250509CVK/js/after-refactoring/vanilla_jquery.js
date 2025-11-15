document.addEventListener('DOMContentLoaded', () => {
  // ------------------------
  // 初期ロード処理
  // ------------------------
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelector('.feature')?.classList.add('is_show');
      adjustStickyPosition('.sec01', 0.7);
      adjustStickyPosition('.sec02', 0.6);

      setTimeout(() => animationPosition('.js_anime'), 500);
    }, 1000);
  });

  // ------------------------
  // スクロールでアニメーション
  // ------------------------
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    animationPosition('.js_anime');
    toggleFollowArea();
    toggleBackground();
  });

  // ------------------------
  // slickスライダー (jQuery必須)
  // ------------------------
  $('.slider').slick({
    dots: false,
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

  // ------------------------
  // アコーディオン（共通化）
  // ------------------------
  document
    .querySelectorAll('.js_accordionbtn01, .js_accordionbtn02')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        const isOpen = btn.classList.contains('on');
        const type = btn.classList.contains('js_accordionbtn01') ? '01' : '02';
        const img = btn.querySelector('img');

        btn.classList.toggle('on');
        img.setAttribute(
          'src',
          isOpen ? `img/open${type}.svg` : `img/close${type}.svg`
        );
        btn.previousElementSibling?.classList.toggle('is_show', !isOpen);

        adjustStickyPosition('.sec01', 0.7);
        adjustStickyPosition('.sec02', 0.6);
      });
    });

  // ------------------------
  // 共通関数群
  // ------------------------
  function animationPosition(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      const imgPos = el.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > imgPos - window.innerHeight * 0.75) {
        el.classList.add('is_show');
      }
    });
  }

  function adjustStickyPosition(selector, ratio) {
    const el = document.querySelector(selector);
    if (!el) return;
    const windowHeight = window.innerHeight;
    const targetHeight = el.offsetHeight;

    if (targetHeight > windowHeight) {
      el.style.top = `-${targetHeight * ratio}px`;
    }
  }

  function toggleFollowArea() {
    const follow = document.querySelector('.followarea');
    if (!follow) return;
    const scrollTop = window.scrollY;
    follow.classList.toggle('is_show', scrollTop < lastScroll);
    lastScroll = scrollTop;
  }

  function toggleBackground() {
    const bg = document.querySelector('.js_bg');
    if (!bg) return;
    const imgPos = bg.getBoundingClientRect().top + window.scrollY;
    bg.classList.toggle(
      'is_show',
      window.scrollY > imgPos - window.innerHeight
    );
  }
});
