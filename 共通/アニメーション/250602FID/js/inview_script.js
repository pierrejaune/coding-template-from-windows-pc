$(document).ready(function () {
  // =====================
  // IntersectionObserver で .anim を監視
  // =====================
  const animElements = document.querySelectorAll('.anim');

  // 閾値 0.5 → 要素の 50% 以上が可視範囲に入ったら発火
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 可視範囲に入ったら "showed" を付与
          entry.target.classList.add('showed');

          // 一度だけ実行したい場合は監視解除
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  animElements.forEach((el) => observer.observe(el));

  // =====================
  // FV（ファーストビュー）の特別処理
  // → ページロード直後に必ず "showed" を付与する
  // =====================
  $(window).on('load', () => {
    setTimeout(() => {
      document.querySelector('.hero__mv').classList.add('showed');
      document.querySelector('.sec01 .img01').classList.add('showed');
    }, 500);
  });

  // =====================
  // .sec__box 内のアニメーション連動処理
  // =====================
  document.querySelectorAll('.sec__box .anim').forEach((img) => {
    img.addEventListener('transitionstart', () => {
      const box = img.closest('.sec__box');
      if (box && box.querySelector('.sec__text')) {
        box.querySelector('.sec__text').classList.add('showed');
      }
      if (box && box.querySelector('.sec__credit')) {
        box.querySelector('.sec__credit').classList.add('showed');
      }
    });
  });

  // =====================
  // テキストアニメーション（SVG の線アニメ用）
  // =====================
  document.querySelectorAll('.sec__text svg').forEach((target) => {
    if (!target) return;

    const paths = target.querySelectorAll('.cls-1');
    paths.forEach((path, index) => {
      path.style.transitionDelay = `${index * 0.1}s`;
    });
  });
});

// =====================
// 文字分割アニメーション
// =====================
document.addEventListener('DOMContentLoaded', function () {
  const delayUnit = 0.1;
  const targets = document.querySelectorAll('.split-text');

  targets.forEach((el) => {
    const trimmedText = el.textContent.trim();
    const chars = trimmedText.split('');

    let index = 0;
    const spanned = chars
      .map((char) => {
        const delay = ((index + 1) * delayUnit).toFixed(2);
        const displayChar = char === ' ' ? '&nbsp;' : char;
        index++;
        return `<span style="display:inline-block;opacity 0.3s ease;transition-delay:${delay}s;">${displayChar}</span>`;
      })
      .join('');

    el.innerHTML = spanned;
  });

  // split01 の最後の文字が終わったら split02 を表示
  document
    .querySelector('.sec04 .split01')
    .lastChild.addEventListener('transitionend', () => {
      document.querySelector('.sec04 .split02').classList.add('showed');
    });
});

// =====================
// PC メインビジュアル調整
// =====================
function adjustLayout() {
  const heroImg = document.querySelector('.hero__mv img');
  const pcLeft = document.querySelector('.pc__left');
  const heroContainer = document.querySelector('.hero__container');
  if (!heroImg) return;

  const heroImgHeight = heroImg.getBoundingClientRect().height;
  const pcLeftHeight = pcLeft.getBoundingClientRect().height;

  if (heroImgHeight > pcLeftHeight) {
    heroContainer.classList.add('on');
  } else {
    heroContainer.classList.remove('on');
  }
}

window.addEventListener('load', adjustLayout);
window.addEventListener('resize', adjustLayout);

// =====================
// Swiper スライダー設定
// =====================
let swiperInstances = [];
function initSwiper($el) {
  if ($el.data('swiper-initialized')) return;

  let swiper = new Swiper($el[0], {
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1000,
    autoplay: { delay: 2000 },
    pagination: {
      el: $el.find('.swiper-pagination')[0],
      clickable: true,
    },
  });

  $el.data('swiper-initialized', true);
  swiperInstances.push(swiper);
}

$(function () {
  // showed が付いたら Swiper 初期化
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        let $target = $(mutation.target);
        if ($target.hasClass('showed') && $target.hasClass('swiper')) {
          initSwiper($target);
        }
      }
    });
  });

  $('.sec .swiper').each(function () {
    observer.observe(this, { attributes: true });
  });
});

// =====================
// 100vh の代わりに --vh を設定
// =====================
function setVhVariables() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVariables();
window.addEventListener('resize', setVhVariables);
window.addEventListener('orientationchange', setVhVariables);
