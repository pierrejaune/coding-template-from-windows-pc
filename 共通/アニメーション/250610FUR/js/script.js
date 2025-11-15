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

  function updateStickyPositions() {
    const containers = document.querySelectorAll('.container__sticky');
    const viewportHeight = window.innerHeight;

    containers.forEach(function (container) {
      const containerHeight = container.offsetHeight;
      const topValue = containerHeight - (viewportHeight / 2 + 79);
      container.style.top = -topValue + 'px';
    });

    updateBallOnScroll();
  }

  function updateBallOnScroll() {
    if (!ball || !container) return;

    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    const containerHeight = container.offsetHeight;
    const ballHeight = ball.offsetHeight;

    // ボールが動ける最大距離
    const maxMoveY = containerHeight * 0.8 - ballHeight;

    // スクロールに応じた移動距離（最大値を超えないように制限）
    const moveY = Math.min(scrollPercent * maxMoveY, maxMoveY);
    const rotateDeg = scrollPercent * 360 * 5;

    ball.style.transform = `translateY(${moveY}px) rotate(${rotateDeg}deg)`;
  }

  // イベント登録
  window.addEventListener('load', updateStickyPositions);
  window.addEventListener('resize', updateStickyPositions);
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
