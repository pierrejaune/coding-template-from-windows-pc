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

// DOMの読み込みが完了したら実行
$(function () {
  // クレジット表記の2番目・3番目のitemにクラス付与＆改行を挿入
  $('.sec01 .-credit01 .credit .item:nth-of-type(2)').addClass('-mr0'); // 2番目にクラス付与
  $('.sec01 .-credit01 .credit .item:nth-of-type(2)').after('<br>'); // その後に改行を追加
  $('.sec01 .-credit02 .credit .item:nth-of-type(3)').addClass('-mr0');
  $('.sec01 .-credit02 .credit .item:nth-of-type(3)').after('<br>');
  $('.sec01 .-credit03 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec01 .-credit03 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec02 .-credit02 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec02 .-credit02 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec03 .-credit01 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec03 .-credit01 .credit .item:nth-of-type(2)').after('<br>');

  // ScrollTriggerプラグインをGSAPに登録
  gsap.registerPlugin(ScrollTrigger);

  // ---------------------------
  // sec01 model04 のアニメーション設定
  // ---------------------------

  // card01 の初期状態を設定
  gsap.set('.sec01__Model.-model04 .card01', {
    opacity: 0, // 透明
    y: 50, // 下に50pxずらす
    visibility: 'hidden', // 非表示
    rotation: 1.3, // 初期回転
    transformOrigin: 'bottom center', // 回転の基準点
    z: 0.01, // 3Dバグ防止
  });

  // card02 の初期状態を設定
  gsap.set('.sec01__Model.-model04 .card02', {
    opacity: 0,
    y: 50,
    visibility: 'hidden',
    rotation: -3.56, // 初期回転
    transformOrigin: 'bottom right',
    z: 0.01,
  });

  // それぞれのカードが一度だけアニメするようにフラグ管理
  const animationFlags = {
    card01: false,
    card02: false,
  };

  // スクロールトリガーを作成（model04用）
  ScrollTrigger.create({
    trigger: '.sec01__Model.-model04', // 発火位置
    start: 'top center', // 画面中央に来たら開始
    end: '+=250', // 250px分スクロールを監視
    onUpdate: (self) => {
      const scrolledPixels = self.progress * 600; // 進行度からスクロール量を擬似計算

      // 200pxスクロールしたら card01 をアニメ
      if (scrolledPixels >= 200 && !animationFlags.card01) {
        animationFlags.card01 = true;
        gsap.to('.sec01__Model.-model04 .card01', {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          rotation: 0, // 回転を0に
          duration: 1,
          ease: 'power3.out',
        });
      }

      // 600pxスクロールしたら card02 をアニメ
      if (scrolledPixels >= 600 && !animationFlags.card02) {
        animationFlags.card02 = true;
        gsap.to('.sec01__Model.-model04 .card02', {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          rotation: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }
    },
  });

  // ---------------------------
  // sec02 model02 のアニメーション設定
  // ---------------------------

  // card01 の初期状態
  gsap.set('.sec02__Model.-model02 .card01', {
    opacity: 0,
    y: 30,
    visibility: 'hidden',
    rotation: -1.56,
    transformOrigin: 'bottom center',
    z: 0.01,
  });

  // model02のフラグ（1枚だけ）
  const animationFlagsModel02 = {
    card01: false,
  };

  // model02 の ScrollTrigger
  ScrollTrigger.create({
    trigger: '.sec02__Model.-model02',
    start: 'top center',
    end: '+=350',
    onUpdate: (self) => {
      const scrolledPixels = self.progress * 600;

      // 200pxスクロールしたら card01 をアニメ
      if (scrolledPixels >= 200 && !animationFlagsModel02.card01) {
        animationFlagsModel02.card01 = true;
        gsap.to('.sec02__Model.-model02 .card01', {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          rotation: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }
    },
  });

  // ---------------------------
  // フェードイン（.js-fade）
  // ---------------------------

  // inviewイベントで要素が見えたらクラス付与
  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active'); // フェード用クラスを付与
    }
  });

  // スクロール時にも inview を再判定
  $(window).scroll(function () {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });
});
