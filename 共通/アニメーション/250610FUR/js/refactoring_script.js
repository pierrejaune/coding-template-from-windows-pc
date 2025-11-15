// IMG FADE IN AND HOVER UP

$(function () {
  // フェードイン
  $('.fadeUp-hidden').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('animate-active');
    }
  });
  $('.js-block').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('fadeUp');
    }
  });
  $('.js-ball').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('show');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const ball = document.querySelector('.pc-ball');
  const container = document.querySelector('.pc-flex__left--inner');

  // --- 定数 ---
  const STICKY_OFFSET = 79;
  const BALL_MOVE_RATIO = 0.8;
  const ROTATE_MULTIPLIER = 360 * 5;

  const updateStickyPositions = () => {
    const containers = document.querySelectorAll('.container__sticky');
    const viewportHeight = window.innerHeight;

    containers.forEach((el) => {
      const containerHeight = el.offsetHeight;
      const topValue = containerHeight - (viewportHeight / 2 + STICKY_OFFSET);
      // 👉 「コンテナの高さ －（画面の半分の高さ＋オフセット）」= コンテナを画面の中央よりやや下に固定する位置を計算している
      el.style.top = `${-topValue}px`;
    });

    updateBallOnScroll(); // 初期位置も更新
  };

  const updateBallOnScroll = () => {
    if (!ball || !container) return;

    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    const containerHeight = container.offsetHeight;
    const ballHeight = ball.offsetHeight;

    const maxMoveY = containerHeight * BALL_MOVE_RATIO - ballHeight;
    // ボールの移動距離をスクロール率に応じて計算し、移動しすぎないよう制限する処理
    // Math.min() は静的メソッドで、引数で渡されたもののうち最小の値を返します。
    //     scrollPercent = ページのスクロール率（0〜1）
    // ページの最上部 → 0
    // ページの最下部 → 1
    // maxMoveY = ボールが動ける最大距離（px）
    // 式の意味
    // 👉 scrollPercent * maxMoveY で「スクロール割合に応じた移動量」を算出
    // 👉 Math.min(計算値, maxMoveY) で 最大値を超えないよう制限
    const moveY = Math.min(scrollPercent * maxMoveY, maxMoveY);
    const rotateDeg = scrollPercent * ROTATE_MULTIPLIER;

    ball.style.transform = `translateY(${moveY}px) rotate(${rotateDeg}deg)`;
  };

  // --- イベント登録 ---
  ['load', 'resize'].forEach((evt) => {
    window.addEventListener(evt, updateStickyPositions);
  });
  window.addEventListener('scroll', updateBallOnScroll);
});

function swiperInit() {
  var fvSlider01 = new Swiper('.swiper_block', {
    loop: true,
    effect: 'fade',
    speed: 1000,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  var fvSlider02 = new Swiper('.swiper_block_02', {
    loop: true,
    effect: 'fade',
    speed: 0,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

document.addEventListener(
  'DOMContentLoaded',
  function () {
    swiperInit();
  },
  false
);
