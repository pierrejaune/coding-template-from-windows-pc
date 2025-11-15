// document.addEventListener('DOMContentLoaded', function () {
//   const scrollSlider = new Swiper('.scroll-slider', {
//     direction: 'vertical', // 縦スクロール
//     slidesPerView: 1,
//     spaceBetween: 30,
//     mousewheel: true, // マウススクロールで切り替え
//     speed: 800, // スクロール速度
//     on: {
//       slideChangeTransitionStart: function () {
//         document
//           .querySelectorAll('.swiper-slide')
//           .forEach((slide) => slide.classList.add('scrolling'));
//       },
//       slideChangeTransitionEnd: function () {
//         document
//           .querySelectorAll('.swiper-slide')
//           .forEach((slide) => slide.classList.remove('scrolling'));
//         document.querySelector('.current-slide').textContent =
//           this.realIndex + 1;
//       },
//     },
//   });

//   // スライドの総数を取得して表示
//   document.querySelector('.total-slides').textContent =
//     scrollSlider.slides.length;
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const scrollSlider = new Swiper('.scroll-slider', {
//     direction: 'vertical',
//     slidesPerView: 1,
//     spaceBetween: 30,
//     freeMode: {
//       enabled: true,
//       momentum: true,
//     },
//     mousewheel: false,
//     on: {
//       setTranslate: function () {
//         document
//           .querySelectorAll('.swiper-slide')
//           .forEach((slide) => slide.classList.add('scrolling'));
//       },
//       transitionEnd: function () {
//         document
//           .querySelectorAll('.swiper-slide')
//           .forEach((slide) => slide.classList.remove('scrolling'));
//       },
//     },
//   });

//   scrollSlider.on('setTranslate', function () {
//     const current = Math.floor(scrollSlider.activeIndex) + 1;
//     document.querySelector('.current-slide').textContent = current;
//   });

//   document.querySelector('.total-slides').textContent =
//     scrollSlider.slides.length;

//   const wrapper = document.querySelector('.slider-wrapper');

//   wrapper.addEventListener(
//     'wheel',
//     function (e) {
//       const deltaY = e.deltaY;
//       const translate = scrollSlider.getTranslate();
//       const maxTranslate = scrollSlider.maxTranslate(); // 一番下
//       const minTranslate = scrollSlider.minTranslate(); // 一番上

//       const atTop = translate >= minTranslate;
//       const atBottom = translate <= maxTranslate;

//       // ① スライダー内スクロール処理
//       if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
//         e.preventDefault(); // ページスクロールを抑制
//         scrollSlider.setTranslate(translate - deltaY);
//         scrollSlider.updateProgress();
//         scrollSlider.updateActiveIndex();
//         scrollSlider.updateSlidesClasses();
//       }

//       // ② スライダーの端に来たとき、ページ全体を100vh分スクロール
//       if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) {
//         window.scrollBy({
//           top: deltaY > 0 ? window.innerHeight : -window.innerHeight,
//           behavior: 'smooth',
//         });
//       }
//     },
//     { passive: false }
//   );
// });

document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.slider-wrapper');
  const currentSlideEl = document.querySelector('.current-slide');
  const totalSlidesEl = document.querySelector('.total-slides');

  let wrapperTop = 0;
  let wrapperHeight = 0;

  const updateWrapperPosition = () => {
    const rect = wrapper.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    wrapperTop = rect.top + scrollTop;
    wrapperHeight = wrapper.offsetHeight;
  };

  // 初期とリサイズ時に再計算
  updateWrapperPosition();
  window.addEventListener('resize', () => {
    updateWrapperPosition();
  });

  const scrollSlider = new Swiper('.scroll-slider', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: {
      enabled: true,
      momentum: true,
    },
    mousewheel: false,
  });

  totalSlidesEl.textContent = scrollSlider.slides.length;

  scrollSlider.on('setTranslate', function () {
    const current = Math.floor(scrollSlider.activeIndex) + 1;
    currentSlideEl.textContent = current;

    const slides = scrollSlider.slides;
    const translate = -scrollSlider.getTranslate();
    const slideHeight = slides[0].offsetHeight;

    slides.forEach((slide, index) => {
      const slideTop = slideHeight * index;
      const slideBottom = slideTop + slideHeight;
      const threshold = slideHeight * 0.1;

      const isScrolling =
        translate > slideTop + threshold && translate < slideBottom - threshold;

      slide.classList.toggle('scrolling', isScrolling);
    });
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollBottom = scrollTop + window.innerHeight;

    const isInView =
      scrollBottom > wrapperTop && scrollTop < wrapperTop + wrapperHeight;

    const translate = scrollSlider.getTranslate();
    const maxTranslate = scrollSlider.maxTranslate();
    const minTranslate = scrollSlider.minTranslate();

    const atTop = translate >= minTranslate;
    const atBottom = translate <= maxTranslate;

    if (isInView && !(atBottom && scrollBottom > wrapperTop + wrapperHeight)) {
      wrapper.classList.add('fixed');
    } else {
      wrapper.classList.remove('fixed');
    }
  });

  wrapper.addEventListener(
    'wheel',
    function (e) {
      if (!wrapper.classList.contains('fixed')) return;

      const deltaY = e.deltaY;
      const translate = scrollSlider.getTranslate();
      const maxTranslate = scrollSlider.maxTranslate();
      const minTranslate = scrollSlider.minTranslate();

      const atTop = translate >= minTranslate;
      const atBottom = translate <= maxTranslate;

      if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) {
        return; // 上下端なら無反応
      }

      e.preventDefault();
      scrollSlider.setTranslate(translate - deltaY);
      scrollSlider.updateProgress();
      scrollSlider.updateActiveIndex();
      scrollSlider.updateSlidesClasses();
    },
    { passive: false }
  );
});
