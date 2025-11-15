// IMG FADE IN AND HOVER UP

$(function () {
  // フェードイン
  $('.fadeUp-hidden').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('animate-active');
    }
  });
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
}

document.addEventListener(
  'DOMContentLoaded',
  function () {
    swiperInit();
  },
  false
);

function adjustHeroLogoPosition() {
  const logo = document.querySelector('.pc-img_hero_logo');
  const heroImage = document.querySelector('.hero__img_01');

  if (!logo || !heroImage) return;

  const windowHeight = window.innerHeight;
  const imageHeight = heroImage.offsetHeight;

  console.log('window height:', windowHeight);
  console.log('image height:', imageHeight);

  if (imageHeight > windowHeight) {
    // 画像が画面より縦に長いとき → 中央に配置
    logo.style.top = '50%';
    logo.style.transform = 'translate(-50%, -50%)';
  } else {
    // 通常時（下寄り）
    logo.style.top = '61.4%';
    logo.style.transform = 'translate(-50%, -50%)';
  }
}

window.addEventListener('load', adjustHeroLogoPosition);
window.addEventListener('resize', adjustHeroLogoPosition);
