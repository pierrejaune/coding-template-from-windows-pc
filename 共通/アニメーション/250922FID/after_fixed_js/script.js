$(window).load(function () {
  gsap.registerPlugin(ScrollTrigger);

  // #feature要素を取得
  var featureElement = document.querySelector('#feature');

  // .con要素のIDを収集
  var conElements = gsap.utils.toArray('.con');
  var conIds = conElements
    .map(function (element) {
      return element.id;
    })
    .filter(Boolean);

  document.querySelectorAll('.con').forEach(function (r, o) {
    var n = r.querySelector('.inner1');
    gsap.fromTo(
      n,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: r,
          start: 'top top',
          end: function () {
            return '+='.concat(0.5 * window.innerHeight);
          },
          scrub: !0,
          pinSpacing: !1,
          markers: !1,
          id: 'o-'.concat(o + 1),
        },
      }
    );

    ScrollTrigger.create({
      trigger: r,
      start: 'top top',
      end: function () {
        return '+='.concat(+window.innerHeight);
      },
      pin: r,
      pinSpacing: !1,
      markers: !1,
      id: 't-'.concat(o + 1),
    });

    ScrollTrigger.create({
      trigger: r,
      start: 'bottom bottom',
      end: function () {
        return '+='.concat(2 * window.innerHeight);
      },
      pin: r,
      pinSpacing: !1,
      markers: !1,
      id: 'b-'.concat(o + 1),
    });

    // #feature要素にクラスを動的に付与する処理を追加
    if (featureElement && r.id) {
      ScrollTrigger.create({
        trigger: r,
        start: 'top top',
        end: 'bottom bottom',
        onToggle: function (self) {
          if (self.isActive && r.id) {
            // 既存のcon*クラスをすべて削除
            featureElement.classList.forEach(function (className) {
              if (className.startsWith('con')) {
                featureElement.classList.remove(className);
              }
            });
            // 新しいクラスを追加
            featureElement.classList.add(r.id);
            console.log('#feature に', r.id, 'クラスを追加');
          }
        },
        markers: false,
        id: 'feature-class-'.concat(o + 1),
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var swipersec03 = new Swiper('.sec03 .swiper', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    speed: 2000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });
});

$(function () {
  $('.sec01 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec01 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec02 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec02 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec03 .credit .item:nth-of-type(2)').addClass('-mr0');
  $('.sec03 .credit .item:nth-of-type(2)').after('<br>');
  $('.sec04 .credit .item:nth-of-type(3)').addClass('-mr0');
  $('.sec04 .credit .item:nth-of-type(3)').after('<br>');
  $('.sec06 .credit .item:nth-of-type(3)').addClass('-mr0');
  $('.sec06 .credit .item:nth-of-type(3)').after('<br>');
  $('.sec07 .credit .item:nth-of-type(3)').addClass('-mr0');
  $('.sec07 .credit .item:nth-of-type(3)').after('<br>');

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
