//fade
$(function () {
  $(window).on('load scroll', function () {
    $('.blur').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.85) {
        $(this).addClass('active');
      }
    });
  });
});

// ============================================
// jQuery版：クレジットボタンのON/OFF切り替え処理（リファクタリング）
// ============================================
$(function () {
  // .creditBtn がクリックされたときに実行
  $('.creditBtn').on('click', function () {
    // if ($(this).hasClass('on')) {
    //   $(this).removeClass('on');
    //   $(this).next().removeClass('on');
    //   $(this).parent().removeClass('on');
    // } else {
    //   $(this).addClass('on');
    //   $(this).next().addClass('on');
    //   $(this).parent().addClass('on');
    // }
    const $btn = $(this);
    const $next = $btn.next();
    const $parent = $btn.parent();

    // toggleClassでON/OFFをまとめて切り替え
    $btn.toggleClass('on');
    $next.toggleClass('on');
    $parent.toggleClass('on');
  });
});

// ============================================
// Vanilla JS 版：クレジットボタンのON/OFF切り替え処理
// ============================================
// ページの全コンテンツが読み込まれた後に実行
// document.addEventListener('DOMContentLoaded', () => {
//   // .creditBtn 要素をすべて取得
//   const creditButtons = document.querySelectorAll('.creditBtn');
//   // 各ボタンにクリックイベントを設定
//   creditButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//       // 現在ボタンが "on" クラスを持っているかどうかを判定
//       const isActive = button.classList.contains('on');
//       const nextElement = button.nextElementSibling; // 直後の兄弟要素
//       const parentElement = button.parentElement; // 親要素
//       if (isActive) {
//         // すでにON状態 → OFFに戻す
//         button.classList.remove('on');
//         if (nextElement) nextElement.classList.remove('on');
//         if (parentElement) parentElement.classList.remove('on');
//       } else {
//         // OFF状態 → ONにする
//         button.classList.add('on');
//         if (nextElement) nextElement.classList.add('on');
//         if (parentElement) parentElement.classList.add('on');
//       }
//     });
//   });
// });

// slider
$(function () {
  $('.sec__slider').each(function () {
    var $slider = $(this);
    var $dots = $slider.closest('.sec__model').find('.dots-container');
    $slider.slick({
      fade: false,
      speed: 1000,
      autoplaySpeed: 4000,
      autoplay: true,
      arrows: false,
      dots: true,
      appendDots: $dots,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
    });
  });
});
