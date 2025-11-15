document.addEventListener('DOMContentLoaded', function () {
  // デバイス判定を行い、対応したデバイスに必要な処理を実行
  var ua = navigator.userAgent;
  var iphone = ua.indexOf('iPhone') > 0;
  var androidSp = ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0;
  // var ipad = ua.indexOf("iPad");
  // var androidT = ua.indexOf("Android");

  if (iphone || androidSp) {
  }
});

/* movie.js */

// 動画遅延読み込み
$(function () {
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  });

  // inview
  $('.js_movie').on('inview', function () {
    $(this).play();
  });
});

jQuery.fn.play = function (fn) {
  return fn ? this.bind('play', fn) : this.trigger('play');
};

/* animation.js */

document.addEventListener('DOMContentLoaded', function () {
  // フェードイン
  $(function () {
    $(window).on('resize load', function () {
      setTimeout(function () {
        $('.feature').addClass('is_show');
        setTimeout(function () {
          $('.js_anime').each(function () {
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight * 0.75) {
              $(this).addClass('is_show');
            }
          });

          $('.js_animenext').each(function () {
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight) {
              $(this).addClass('is_show');
            }
          });
        }, 500);
      }, 1000);
    });
  });

  $(window).on('scroll', function () {
    $('.js_anime').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  });

  $(window).on('scroll', function () {
    $('.js_animenext').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight) {
        $(this).addClass('is_show');
      }
    });
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   for (var i = 0; i < 500; i++) {
//     //get random dimensions
//     var x = Math.random() * 120;
//     var y = Math.random() * 50;
//     var d = Math.random() * 4;
//     var s = Math.random() * 2 + 1.5;
//     //create new element and add to html
//     var star = document.createElement("div");
//     star.classList.add("star");
//     var sky = document.getElementById("anime-star");
//     sky.appendChild(star);

//     star.style.width = d + "px";
//     star.style.height = d + "px";
//     star.style.top = y + "%";
//     star.style.left = x + "%";
//     star.style.animationDuration = s + "s";
//   }
// });

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('anime-star');
  const ctx = canvas.getContext('2d');

  // サイズ調整
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const starCount = 300;
  const stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2,
      s: Math.random() * 1.5 + 0.5,
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    stars.forEach((star) => {
      const alpha = 0.5 + Math.sin(Date.now() * 0.002 * star.s) * 0.5;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawStars);
  }
  drawStars();
});

// gsap-basic.js
document.addEventListener('DOMContentLoaded', function () {
  gsap.config({
    nullTargetWarn: false,
  });

  gsapTriger();

  window.addEventListener('resize', gsapTriger, false);

  function gsapTriger() {
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec01',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec01',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-01',
          '.fixed-right .nav-list .item_01',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec02',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec02',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-02',
          '.fixed-right .nav-list .item_02',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec03',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec03',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-03',
          '.fixed-right .nav-list .item_03',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec04',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec04',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-04',
          '.fixed-right .nav-list .item_04',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec05',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec05',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-05',
          '.fixed-right .nav-list .item_05',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec06',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec06',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-06',
          '.fixed-right .nav-list .item_06',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec07',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec07',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-07',
          '.fixed-right .nav-list .item_07',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec08',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec08',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-08',
          '.fixed-right .nav-list .item_08',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec09',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec09',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-09',
          '.fixed-right .nav-list .item_09',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec10',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec10',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-10',
          '.fixed-right .nav-list .item_10',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec11',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec11',
      end: 'bottom+=150 center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-11',
          '.fixed-right .nav-list .item_11',
        ],
        className: 'is-open-target',
      },
    });
    ScrollTrigger.create({
      //markers: true, // マーカー表示
      trigger: '.wrap_sec12',
      start: 'top+=150 center',
      endTrigger: '.wrap_sec12',
      end: 'bottom center',
      toggleClass: {
        targets: [
          '.onstellation_box .box-12',
          '.fixed-right .nav-list .item_12',
        ],
        className: 'is-open-target',
      },
    });
  }
});

/* swiper-slider.js */

// ループスライダー
$(function () {
  // Swiperのオプション設定
  const swiperOption_01 = {
    loop: true,
    effect: 'fade', //slide | fade | cube | coverflow | flip | creative | cards
    slidesPerView: 'auto', //スライド表示枚数
    centeredSlides: true, //スライドを中央に配置

    // effect:fade の再設定（opacity対策）
    fadeEffect: {
      crossFade: true,
    },
    speed: 1200,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  };

  //無限ループスライダの設定
  const swiperOption_02 = {
    loop: true, // ループ有効
    slidesPerView: 'auto', // 一度に表示する枚数
    centeredSlides: true, //スライドを中央に配置
    speed: 14000, // ループの時間
    effect: 'slide', //slide | fade | cube | coverflow | flip | creative | cards
    allowTouchMove: false, // スワイプ無効
    autoplay: {
      delay: 0, // 途切れなくループ
    },
  };

  let swiperInstances = [];

  function initSwiper() {
    swiperInstances.forEach((swiper) => {
      if (swiper) swiper.destroy(true, true);
    });
    swiperInstances = [];

    const allElements = document.querySelectorAll('#feature [class]');
    const swiperElements_01 = Array.from(allElements).filter((el) =>
      Array.from(el.classList).some((cls) => /^ptr01-swiper_\d+$/.test(cls))
    );

    const swiperElements_02 = Array.from(allElements).filter((el) =>
      Array.from(el.classList).some((cls) => /^ptr02-swiper_\d+$/.test(cls))
    );

    swiperElements_01.forEach((el) => {
      const swiper = new Swiper(el, swiperOption_01);
      swiperInstances.push(swiper);
    });
    swiperElements_02.forEach((el) => {
      const swiper = new Swiper(el, swiperOption_02);
      swiperInstances.push(swiper);
    });
  }

  initSwiper();
  window.addEventListener('resize', initSwiper, false);
});
