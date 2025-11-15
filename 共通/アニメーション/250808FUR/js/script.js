// $(function () {
//   // 共通設定パターンを定義
//   const swiperConfigs = {
//     // 自動スライド設定（タッチ無効）
//     autoSlide: {
//       loop: true,
//       slidesPerView: 'auto',
//       allowTouchMove: false,
//       autoplay: { delay: 0 },
//     },

//     // フェード効果設定
//     fade: {
//       loop: true,
//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//       },
//       effect: 'fade',
//       speed: 750,
//       autoplay: { delay: 3500 },
//     },
//   };

//   // 個別設定でSwiperを初期化
//   const swiper01 = new Swiper('.sec01 .swiper', {
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//     speed: 1000,
//     centeredSlides: false,
//     slidesPerView: 'auto',
//     loop: true,
//     autoplay: {
//       delay: 4000,
//       disableOnInteraction: false,
//     },
//   });

//   // 自動スライド系のSwiper（speedのみ異なる）
//   const swiper02 = new Swiper('.sec02__Itemlist .swiper', {
//     ...swiperConfigs.autoSlide,
//     speed: 3000,
//   });

//   const swiper03item = new Swiper('.sec03__Itemlist .swiper', {
//     ...swiperConfigs.autoSlide,
//     speed: 3000,
//   });

//   const swiper03model05 = new Swiper('.sec03__Model.-model05 .swiper', {
//     ...swiperConfigs.autoSlide,
//     speed: 6000,
//   });

//   // フェード効果系のSwiper（同一設定）
//   [
//     '.sec03__Model.-model01 .swiper',
//     '.sec04__Model.-model03 .swiper',
//     '.sec05__Model.-model03 .swiper',
//   ].forEach((selector) => {
//     new Swiper(selector, swiperConfigs.fade);
//   });

//   $('.sec02__Model.-model02,.js-fade').on('inview', function (event, isInView) {
//     if (isInView) {
//       $(this).addClass('is-active');
//     }
//   });
//   $(window).scroll(function () {
//     $('.sec02__Model.-model02,.js-fade').on(
//       'inview',
//       function (event, isInView) {
//         if (isInView) {
//           $(this).addClass('is-active');
//         }
//       }
//     );
//   });
// });

$(function () {
  // Swiper 共通設定パターン
  const swiperConfigs = {
    // 自動スライド設定（タッチ無効）
    autoSlide: {
      loop: true,
      slidesPerView: 'auto',
      allowTouchMove: false,
      autoplay: { delay: 0 },
    },

    // フェード効果設定
    fade: {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      effect: 'fade',
      speed: 750,
      autoplay: { delay: 3500 },
    },
  };

  // 個別 Swiper 初期化用マップ
  const swiperInitMap = [
    {
      selector: '.sec01 .swiper',
      options: {
        pagination: { el: '.swiper-pagination', clickable: true },
        speed: 1000,
        centeredSlides: false,
        slidesPerView: 'auto',
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
      },
    },
    {
      selector: '.sec02__Itemlist .swiper',
      options: { ...swiperConfigs.autoSlide, speed: 3000 },
    },
    {
      selector: '.sec03__Itemlist .swiper',
      options: { ...swiperConfigs.autoSlide, speed: 3000 },
    },
    {
      selector: '.sec03__Model.-model05 .swiper',
      options: { ...swiperConfigs.autoSlide, speed: 6000 },
    },
  ];

  // 上記マップに従って Swiper を生成
  swiperInitMap.forEach(({ selector, options }) => {
    if ($(selector).length) new Swiper(selector, options);
  });

  // フェード効果系 Swiper
  [
    '.sec03__Model.-model01 .swiper',
    '.sec04__Model.-model03 .swiper',
    '.sec05__Model.-model03 .swiper',
  ].forEach((selector) => {
    if ($(selector).length) new Swiper(selector, swiperConfigs.fade);
  });

  // inview イベント処理（1回だけバインド）
  const fadeTargets = $('.sec02__Model.-model02, .js-fade');
  fadeTargets.on('inview', function (event, isInView) {
    if (isInView) $(this).addClass('is-active');
  });
});
