// Swiperインスタンス用のMap
const swiperInstances = new Map();

// Swiper生成関数
function createSwiper(selector, options, key) {
  if (swiperInstances.has(key)) {
    swiperInstances.get(key).destroy(true, true);
  }
  const instance = new Swiper(selector, options);
  swiperInstances.set(key, instance);
}

// Swiperの初期化
function initSwipers() {
  createSwiper(
    '.slide_loop',
    {
      loop: true,
      slidesPerView: 1.28,
      speed: 8000,
      allowTouchMove: false,
      autoplay: { delay: 0 },
    },
    'swiper1'
  );

  createSwiper(
    '.slide',
    {
      speed: 1000,
      autoplay: false,
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 47,
      mousewheel: false,
      effect: 'coverflow',
      coverflowEffect: {
        depth: 300,
        rotate: 0,
        scale: 1.05,
        stretch: 0,
        slideShadows: false,
        modifier: 1,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    },
    'swiper2'
  );

  createSwiper(
    '.slide_loop02',
    {
      loop: true,
      slidesPerView: 3,
      speed: 4000,
      allowTouchMove: false,
      autoplay: { delay: 0 },
    },
    'swiper3'
  );
}

// フェードインアニメーション処理
function handleFadeIn() {
  const scroll = $(window).scrollTop();
  const windowHeight = $(window).height();

  $('.fadeIn, .fadeUp, .fadeRight, .fadeLeft').each(function () {
    const imgPos = $(this).offset().top;
    if (scroll > imgPos - windowHeight) {
      $(this).addClass('active');
    }
  });

  $('.flex_area').each(function () {
    const boxTop = $(this).offset().top;
    if (scroll > boxTop - windowHeight) {
      $(this).find('figure').addClass('active');
    }
  });
}

// sticky位置調整処理
function updateStickyPositions() {
  const containers = document.querySelectorAll('.sticky');
  const viewportHeight = window.innerHeight;

  containers.forEach(function (container) {
    const containerHeight = container.offsetHeight;
    const topValue = containerHeight - viewportHeight;
    container.style.top = -topValue + 'px';
  });
}

// 初期化処理
$(function () {
  // 初期実行
  initSwipers();
  handleFadeIn();
  updateStickyPositions();

  // スクロール & リサイズイベント登録
  $(window).on('load scroll', handleFadeIn);
  $(window).on('resize', updateStickyPositions);

  // 追加: stickyの再調整イベントを正確に
  window.addEventListener('load', updateStickyPositions);
  window.addEventListener('resize', updateStickyPositions);
});

// 戻るボタンなどでのページ復帰対応
window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    initSwipers();
  }
});
