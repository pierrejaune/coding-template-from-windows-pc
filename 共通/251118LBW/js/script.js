window.addEventListener('load', function () {
  var mvswiper = new Swiper('.mv__Start .swiper', {
    loop: true, // ループ有効
    slidesPerView: 'auto',
    speed: 6000, // ループの時間
    allowTouchMove: false, // スワイプ無効
    autoplay: {
      delay: 0, // 途切れなくループ
    },
  });
  var sec01pinkswiper = new Swiper('.sec01__Model-Pink .swiper', {
    loop: true,
    slidesPerView: 'auto',
    speed: 700,
    autoplay: {
      delay: 1200,
      disableOnInteraction: false,
    },
  });
  var sec01whiteswiper = new Swiper('.sec01__Model-White .swiper', {
    loop: true,
    slidesPerView: 'auto',
    speed: 700,
    autoplay: {
      delay: 1200,
      disableOnInteraction: false,
    },
  });

  var slideswiper = new Swiper('.slide-swiper', {
    loop: true,
    slidesPerView: 'auto',
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  var reverseslideswiper = new Swiper('.reverse-slide-swiper', {
    loop: true,
    slidesPerView: 'auto',
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
  const blackswiper01 = new Swiper('.sec02__Blackfriday01 .swiper', {
    loop: true,
    slidesPerView: 'auto',
    speed: 24000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
    },
  });
  const blackswiper02 = new Swiper('.sec02__Blackfriday02 .swiper', {
    loop: true,
    slidesPerView: 'auto',
    speed: 24000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      reverseDirection: true,
    },
  });
  var sec04charactor01 = new Swiper('.sec04__Charactor01 .swiper', {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    speed: 1200,
    autoplay: {
      delay: 700,
      disableOnInteraction: false,
    },
  });
  var sec04charactor02 = new Swiper('.sec04__Charactor02 .swiper', {
    loop: true,
    slidesPerView: 'auto',
    // centeredSlides: true,
    speed: 1200,
    autoplay: {
      delay: 700,
      disableOnInteraction: false,
      reverseDirection: true,
    },
  });
});

$(function () {
  $('.sec01 .-credit01 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec01 .-credit01 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec01 .-credit02 .credit .item:nth-of-type(3)').addClass('-mr0');
  $('.sec01 .-credit02 .credit .item:nth-of-type(3)').after('<br>');
  $('.sec01 .-credit03 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec01 .-credit03 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec02 .-credit02 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec02 .-credit02 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec03 .-credit01 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec03 .-credit01 .credit .item:nth-of-type(2)').after('<br>');
  gsap.registerPlugin(ScrollTrigger);

  // 既存のmodel04の処理
  // 初期状態の設定
  gsap.set('.sec01__Model.-model04 .card01', {
    opacity: 0,
    y: 50,
    visibility: 'hidden',
    rotation: 1.3, // 初期回転角度を設定
    transformOrigin: 'bottom center', // 回転の起点を設定
    z: 0.01, // translateZ(0)の代わりにGSAPのzプロパティを使用
  });

  gsap.set('.sec01__Model.-model04 .card02', {
    opacity: 0,
    y: 50,
    visibility: 'hidden',
    rotation: -3.56, // 初期回転角度を設定
    transformOrigin: 'bottom right', // 回転の起点を設定
    z: 0.01, // translateZ(0)の代わりにGSAPのzプロパティを使用
  });

  // フラグ管理
  const animationFlags = {
    card01: false,
    card02: false,
  };

  ScrollTrigger.create({
    trigger: '.sec01__Model.-model04',
    start: 'top center',
    end: '+=250',
    onUpdate: (self) => {
      const scrolledPixels = self.progress * 600;

      // card01: 200pxスクロール時
      if (scrolledPixels >= 200 && !animationFlags.card01) {
        animationFlags.card01 = true;
        gsap.to('.sec01__Model.-model04 .card01', {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          rotation: 0, // 0度に回転
          duration: 1,
          ease: 'power3.out',
        });
      }

      // card02: 400pxスクロール時
      if (scrolledPixels >= 600 && !animationFlags.card02) {
        animationFlags.card02 = true;
        gsap.to('.sec01__Model.-model04 .card02', {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          rotation: 0, // 0度に回転
          duration: 1,
          ease: 'power3.out',
        });
      }
    },
  });

  // 新規追加：model02の処理
  // 初期状態の設定
  gsap.set('.sec02__Model.-model02 .card01', {
    opacity: 0,
    y: 30,
    visibility: 'hidden',
    rotation: -1.56, // 初期回転角度を設定
    transformOrigin: 'bottom center', // 回転の起点を設定
    z: 0.01, // translateZ(0)の代わりにGSAPのzプロパティを使用
  });

  // フラグ管理（model02用）
  const animationFlagsModel02 = {
    card01: false,
  };

  ScrollTrigger.create({
    trigger: '.sec02__Model.-model02',
    start: 'top center',
    end: '+=350',
    // markers: true,
    onUpdate: (self) => {
      const scrolledPixels = self.progress * 600;

      // card01: 200pxスクロール時（必要に応じてタイミング調整可能）
      if (scrolledPixels >= 200 && !animationFlagsModel02.card01) {
        animationFlagsModel02.card01 = true;
        gsap.to('.sec02__Model.-model02 .card01', {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          rotation: 0, // 0度に回転
          duration: 1,
          ease: 'power3.out',
        });
      }
    },
  });

  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });
  $(window).scroll(function () {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });
});
