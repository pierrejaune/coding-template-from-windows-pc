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

// DOM読み込み後に実行
$(function () {
  // -------------------------------------------
  // クレジット項目の整形（nth-of-type + 改行追加）
  // -------------------------------------------

  const creditAdjustments = [
    { selector: '.sec01 .-credit01 .credit .item:nth-of-type(2)' },
    { selector: '.sec01 .-credit02 .credit .item:nth-of-type(3)' },
    { selector: '.sec01 .-credit03 .credit .item:nth-of-type(2)' },
    { selector: '.sec02 .-credit02 .credit .item:nth-of-type(2)' },
    { selector: '.sec03 .-credit01 .credit .item:nth-of-type(2)' },
  ];

  creditAdjustments.forEach((item) => {
    $(item.selector)
      .addClass('-mr0') // マージン調整用クラスを付与
      .after('<br>'); // 次の行へ強制改行を追加
  });

  // -------------------------------------------
  // GSAP / ScrollTrigger 設定
  // -------------------------------------------
  gsap.registerPlugin(ScrollTrigger);

  // -------------------------------------------
  //  汎用カードアニメーション関数
  // -------------------------------------------
  /**
   * スクロール進行度に応じてカードをアニメーションさせる汎用関数
   * @param {object} config - 設定オブジェクト
   * @param {string} config.trigger - ScrollTriggerの起点要素
   * @param {Array} config.cards - アニメ対象カードの設定一覧
   *
   * cards: [
   *   {
   *     selector: '.class',      // アニメ対象
   *     startPx: 200,            // スクロールpxで開始
   *     initial: {...},          // 初期セット値
   *   }
   * ]
   */
  function setupScrollAnimation({ trigger, cards }) {
    // 初期状態セット & フラグ初期化
    const flags = {};
    cards.forEach((card) => {
      gsap.set(card.selector, card.initial);
      flags[card.selector] = false;
    });

    // ScrollTrigger生成
    ScrollTrigger.create({
      trigger,
      start: 'top center',
      end: '+=350',
      onUpdate: (self) => {
        const scrolled = self.progress * 600;

        cards.forEach((card) => {
          if (scrolled >= card.startPx && !flags[card.selector]) {
            flags[card.selector] = true;

            gsap.to(card.selector, {
              opacity: 1,
              y: 0,
              visibility: 'visible',
              rotation: 0,
              duration: 1,
              ease: 'power3.out',
            });
          }
        });
      },
    });
  }

  // -------------------------------------------
  // sec01 model04 のアニメーション設定
  // -------------------------------------------
  setupScrollAnimation({
    trigger: '.sec01__Model.-model04',
    cards: [
      {
        selector: '.sec01__Model.-model04 .card01',
        startPx: 200,
        initial: {
          opacity: 0,
          y: 50,
          visibility: 'hidden',
          rotation: 1.3,
          transformOrigin: 'bottom center',
          z: 0.01,
        },
      },
      {
        selector: '.sec01__Model.-model04 .card02',
        startPx: 600,
        initial: {
          opacity: 0,
          y: 50,
          visibility: 'hidden',
          rotation: -3.56,
          transformOrigin: 'bottom right',
          z: 0.01,
        },
      },
    ],
  });

  // -------------------------------------------
  // sec02 model02 のアニメーション設定
  // -------------------------------------------
  setupScrollAnimation({
    trigger: '.sec02__Model.-model02',
    cards: [
      {
        selector: '.sec02__Model.-model02 .card01',
        startPx: 200,
        initial: {
          opacity: 0,
          y: 30,
          visibility: 'hidden',
          rotation: -1.56,
          transformOrigin: 'bottom center',
          z: 0.01,
        },
      },
    ],
  });

  // -------------------------------------------
  // フェードイン（inview監視）
  // -------------------------------------------

  function activateFade() {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) $(this).addClass('is-active');
    });
  }

  // 初回 & スクロール時に判定を行う
  activateFade();
  $(window).on('scroll', activateFade);
});
