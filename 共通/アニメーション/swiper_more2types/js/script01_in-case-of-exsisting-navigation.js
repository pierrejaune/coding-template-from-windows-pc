$(document).ready(function () {
  // =====================
  // IntersectionObserver で .anim を監視
  // =====================
  const animElements = document.querySelectorAll('.anim');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('showed');
          obs.unobserve(entry.target); // 一度きり
        }
      });
    },
    { threshold: 0.5 }
  );

  animElements.forEach((el) => observer.observe(el));
});

// =====================
// Swiper スライダー設定（方法1: クラスごとに分ける）
// =====================
let swiperInstances = [];

function initSwiper($el) {
  if ($el.data('swiper-initialized')) return;

  let options = {};
  let hasAutoplay = false;

  if ($el.hasClass('swiper-fade')) {
    options = {
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 1000,
      autoplay: { delay: 2000, disableOnInteraction: false },
    };
    hasAutoplay = true;
  } else if ($el.hasClass('swiper-slide')) {
    options = {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 20,
      speed: 600,
      // autoplay なし
    };
    hasAutoplay = false;
  } else {
    options = {
      loop: true,
      slidesPerView: 1,
    };
    hasAutoplay = false;
  }

  // ✅ ページネーションが存在する場合のみ設定
  let paginationEl = $el.find('.swiper-pagination')[0];
  if (paginationEl) {
    options.pagination = {
      el: paginationEl,
      clickable: true,
    };
  }

  // ✅ ナビゲーションが存在する場合のみ設定
  let nextEl = $el.find('.swiper-button-next')[0];
  let prevEl = $el.find('.swiper-button-prev')[0];
  if (nextEl && prevEl) {
    options.navigation = {
      nextEl: nextEl,
      prevEl: prevEl,
    };
  }

  // Swiper 初期化
  let swiper = new Swiper($el[0], options);

  $el.data('swiper-initialized', true);
  $el.data('swiper-instance', swiper);
  $el.data('has-autoplay', hasAutoplay);
  swiperInstances.push(swiper);

  // autoplay があるものは初期化直後に停止
  if (hasAutoplay) {
    swiper.autoplay.stop();
  }
}

$(function () {
  $('.swiper').each(function () {
    initSwiper($(this));
  });

  // showed が付与されたら autoplay 開始
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        let $target = $(mutation.target);
        if ($target.hasClass('showed') && $target.hasClass('swiper')) {
          let swiper = $target.data('swiper-instance');
          let hasAutoplay = $target.data('has-autoplay');
          if (swiper && hasAutoplay) {
            swiper.autoplay.start();
          }
        }
      }
    });
  });

  $('.swiper').each(function () {
    observer.observe(this, { attributes: true });
  });
});
