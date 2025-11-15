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
// Swiper スライダー設定（方法2: data-属性で分岐）
// =====================
let swiperInstances = [];

function initSwiper($el) {
  if ($el.data('swiper-initialized')) return;

  let type = $el.data('swiper-type') || 'default';
  let options = {};
  let hasAutoplay = false; // autoplay の有無をフラグ管理

  switch (type) {
    case 'fade':
      options = {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 1000,
        autoplay: { delay: 2000, disableOnInteraction: false },
      };
      hasAutoplay = true;
      break;

    case 'slide':
      options = {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 600,
        // autoplay はなし
      };
      hasAutoplay = false;
      break;

    default:
      options = {
        loop: true,
        slidesPerView: 1,
        // デフォルトも autoplay なし
      };
      hasAutoplay = false;
  }

  // ✅ ページネーションが存在する場合のみ追加
  let paginationEl = $el.find('.swiper-pagination')[0];
  if (paginationEl) {
    options.pagination = {
      el: paginationEl,
      clickable: true,
    };
  }

  // Swiper 初期化
  let swiper = new Swiper($el[0], options);

  // 管理用データを保存
  $el.data('swiper-initialized', true);
  $el.data('swiper-instance', swiper);
  $el.data('has-autoplay', hasAutoplay);
  swiperInstances.push(swiper);

  // autoplay があるものは初期化直後に止める
  if (hasAutoplay) {
    swiper.autoplay.stop();
  }
}

$(function () {
  // 全 swiper を一旦初期化
  $('.swiper').each(function () {
    initSwiper($(this));
  });

  // .showed が付与されたら autoplay を開始（autoplay のみ）
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
