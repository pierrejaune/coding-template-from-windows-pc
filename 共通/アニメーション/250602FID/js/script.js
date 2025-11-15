$(document).ready(function () {
  // 上記が良くない場合に使用
  function scrollAddClass() {
    const scrollEffect = document.querySelectorAll('.anim');
    let windowHeight = window.innerHeight;

    scrollEffect.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // 要素の50%が表示されているかどうか
      const visibleHeight = windowHeight - elementTop;
      const threshold = elementHeight * 0.5;

      if (visibleHeight >= threshold && elementTop < windowHeight) {
        el.classList.add('showed');
      } else {
        // el.classList.remove('showed');
      }
    });
  }
  document.addEventListener('DOMContentLoaded', scrollAddClass);
  document.addEventListener('scroll', scrollAddClass);

  //FVはスクロールしないとclass付与されないので読み込み時に付与
  $(window).on('load', () => {
    setTimeout(() => {
      document.querySelector('.hero__mv').classList.add('showed');
      document.querySelector('.sec01 .img01').classList.add('showed');
    }, 500);
  });

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

  document.querySelectorAll('.sec__text svg').forEach((target) => {
    if (!target) return;

    const paths = target.querySelectorAll('.cls-1');
    paths.forEach((path, index) => {
      path.style.transitionDelay = `${index * 0.1}s`;
    });
  });
});

//文字分割
document.addEventListener('DOMContentLoaded', function () {
  const delayUnit = 0.1;
  const targets = document.querySelectorAll('.split-text');

  targets.forEach((el) => {
    // 両端の半角スペースを削除
    const trimmedText = el.textContent.trim();
    // 各文字に分割（空白も含む）
    const chars = trimmedText.split('');

    let index = 0;
    const spanned = chars
      .map((char) => {
        const delay = ((index + 1) * delayUnit).toFixed(2);
        // 半角スペースの場合は &nbsp; に置換
        const displayChar = char === ' ' ? '&nbsp;' : char;
        index++;
        return `<span style="display:inline-block;opacity 0.3s ease;transition-delay: ${delay}s;">${displayChar}</span>`;
      })
      .join('');

    el.innerHTML = spanned;
  });

  document
    .querySelector('.sec04 .split01')
    .lastChild.addEventListener('transitionend', () => {
      document.querySelector('.sec04 .split02').classList.add('showed');
    });
});

//PCのメインビジュアルを画面に合わせて調整
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

// 読み込み時・リサイズ時に実行
window.addEventListener('load', adjustLayout);
window.addEventListener('resize', adjustLayout);

// スライドスライダー設定
let swiperInstances = [];
function initSwiper($el) {
  // すでに初期化されているならスキップ
  if ($el.data('swiper-initialized')) return;

  let swiper = new Swiper($el[0], {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    autoplay: {
      delay: 2000,
    },
    pagination: {
      el: $el.find('.swiper-pagination')[0],
      clickable: true,
    },
  });

  $el.data('swiper-initialized', true); // 初期化済みフラグ
  swiperInstances.push(swiper);
}

$(function () {
  // .showedがついた時を検知して処理
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

  // 各.sec .swiperにobserverをセット
  $('.sec .swiper').each(function () {
    observer.observe(this, { attributes: true });
  });

  // ページ読み込み時にすでにshowedが付いてる場合も初期化
  $('.sec .swiper.showed').each(function () {
    initSwiper($(this));
  });
});

// 画面の高さに基づいて --vh を設定（100vhの代わりに使用）
function setVhVariables() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVariables();
window.addEventListener('resize', setVhVariables);
window.addEventListener('orientationchange', setVhVariables);
