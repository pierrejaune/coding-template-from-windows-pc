document.addEventListener('DOMContentLoaded', function () {
  // スクロールしてinviewで開始
  const inviewSwiper = new Swiper('.inview-slider', {
    autoplay: false,
    loop: true,
    on: {
      init: function () {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.autoplay.start();
            } else {
              this.autoplay.stop();
            }
          });
        });
        observer.observe(this.el);
      },
    },
  });

  // 3Dスライダー（カバーフロー）
  new Swiper('.coverflow-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });

  // 3Dスライダー（フリップ）
  new Swiper('.flip-slider', {
    effect: 'flip',
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
    },
  });

  // スクロールで切り替え
  new Swiper('.scroll-slider', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // ホバーで切り替え
  var hoverSwiper = new Swiper('.hover-slider', {
    loop: true,
    autoplay: false, // 自動再生をオフ
    effect: 'slide', // スライドエフェクト
    speed: 500, // スピード調整
  });

  document
    .querySelector('.hover-slider')
    .addEventListener('mouseenter', function () {
      hoverSwiper.slideNext(); // ホバー時に次のスライドへ
    });

  document
    .querySelector('.hover-slider')
    .addEventListener('mouseleave', function () {
      hoverSwiper.slidePrev(); // ホバーを外したら前のスライドへ
    });

  // レスポンシブ対応スライダー
  new Swiper('.responsive-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  var hoverPaginationSwiper = new Swiper('.hover-pagination-slider', {
    effect: 'fade',
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });

  document.querySelectorAll('.custom-pagination img').forEach((img, index) => {
    img.addEventListener('mouseenter', function () {
      hoverPaginationSwiper.slideToLoop(index); // ホバー時に該当スライドへ移動
    });
  });
});
