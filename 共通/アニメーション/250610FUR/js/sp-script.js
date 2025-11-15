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

window.addEventListener('load', updateStickyPositions);
window.addEventListener('resize', updateStickyPositions);

function updateStickyPositions() {
  const containers = document.querySelectorAll('.container__sticky');
  const viewportHeight = window.innerHeight;

  containers.forEach(function (container) {
    const containerHeight = container.offsetHeight;

    const topValue = containerHeight - (viewportHeight / 2 + 79);
    container.style.top = -topValue + 'px';
  });
}

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
