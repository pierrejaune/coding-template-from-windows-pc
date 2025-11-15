// JavaScript版（jQuery未使用）

document.addEventListener('DOMContentLoaded', function () {
  // クレジット非表示
  const creditSelectors = [
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
  creditSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.display = 'none';
    });
  });

  // タイピングテキストを span でラップ
  document.querySelectorAll('.typing').forEach((el) => {
    const text = el.textContent;
    const spans = Array.from(text).map((char) => {
      const span = document.createElement('span');
      span.style.opacity = 0;
      span.style.display = 'inline-block';
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      return span;
    });
    el.innerHTML = '';
    spans.forEach((span) => el.appendChild(span));
  });

  // クレジット開閉
  document.querySelectorAll('.creditBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('on');
      btn.nextElementSibling?.classList.toggle('on');
      btn.parentElement?.classList.toggle('on');
    });
  });
});

// inview 相当の代替（IntersectionObserver）
// is-active を付与（300ms遅延）
const observerFadeIn = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-active');
        }, 300);
        observerFadeIn.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll('.js-anime')
  .forEach((el) => observerFadeIn.observe(el));

// タイピングアニメーション発火
const observerTyping = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('typed');
        Array.from(target.children).forEach((span, i) => {
          setTimeout(() => {
            span.style.opacity = 1;
          }, 80 * i);
        });
        observerTyping.unobserve(target);
      }
    });
  },
  { threshold: 0.3 }
);

document
  .querySelectorAll('.typing')
  .forEach((el) => observerTyping.observe(el));

// Swiper 初期化（jQueryと同じ設定）
document.addEventListener('DOMContentLoaded', function () {
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
