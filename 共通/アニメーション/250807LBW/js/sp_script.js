// IMG FADE IN AND HOVER UP

$(function () {
  // フェードイン
  $('.fadeUp-hidden').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('animate-active');
    }
  });
});

// js-credit クリックでクレジットの表示モーダル
// $(document).on('click', function (e) {
//   const $target = $(e.target);

//   // クリックされたのが .credit-box 内なら
//   if ($target.closest('.creditContainer').length) {
//     const $creditBox = $target.closest('.creditContainer');

//     // 他の .credit-box から .open を削除
//     $('.creditContainer').not($creditBox).removeClass('open');

//     // クリックされた .credit-box に .open を追加
//     $creditBox.addClass('open');
//   } else {
//     // それ以外をクリックした場合は全ての .credit-box から .open を削除
//     $('.creditContainer').removeClass('open');
//   }
// });

// js-credit クリックでクレジットの表示モーダル
$(document).on('click', function (e) {
  const $container = $(e.target).closest('.creditContainer');
  const $allContainers = $('.creditContainer');

  if ($container.length) {
    // 他を閉じてクリックされた要素だけ開く
    $allContainers.not($container).removeClass('open');
    $container.addClass('open');
  } else {
    // どこも対象外なら全て閉じる
    $allContainers.removeClass('open');
  }
});

// side text Animation
$(window).scroll(function () {
  $('.top_txt').each(function () {
    let scroll = $(window).scrollTop();
    let mainTop = $('.main').offset().top;
    let mainBtm = $('.main').offset().top + $('.main').height();

    if (scroll > mainTop - 400 && scroll < mainBtm - 900) {
      $(this).addClass('inView');
    } else {
      $(this).removeClass('inView');
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
