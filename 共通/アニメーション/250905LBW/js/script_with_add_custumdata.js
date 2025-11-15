// -----------------------------
// Intersection Observer (スクロール検知処理)
// -----------------------------
$(document).ready(function () {
  const targetList = document.querySelectorAll('.target');

  const IO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.dataset.isActive = 'true';
        }
      });
    },
    { threshold: 0.3 }
  );

  targetList.forEach((target) => IO.observe(target));
});

// -----------------------------
// カスタムデータ属性の自動付与
// -----------------------------
$(function () {
  // .look__list-img に data-look を付与
  $('.look__list-img').each(function (index) {
    $(this).attr('data-look', index + 1);
  });

  // .Lmodal__box に data-modal を付与
  $('.Lmodal__box').each(function (index) {
    $(this).attr('data-modal', index + 1);
  });
});

// -----------------------------
// モーダル表示処理
// -----------------------------
$(function () {
  $('.look__list-img').on('click', function () {
    let look = $(this).data('look');

    $('.Lmodal__box').each(function () {
      let modal = $(this).data('modal');

      if (look == modal) {
        let page = modal - 1;
        $('.Lmodal__list').slick('slickGoTo', page, false);
        $('.Lmodal__list').slick('slickSetOption', 'speed', 700, false);
      }
    });

    $('.Lmodal').addClass('on');
    $('.look__list').addClass('on');
    $('body').addClass('on');
  });

  $('.Lmodal').click(function () {
    $('.Lmodal').removeClass('on');
    $('.look__list').removeClass('on');
    $('body').removeClass('on');
    $('.Lmodal__list').slick('slickSetOption', 'speed', 0, false);
  });

  $('.Lmodal .inner').on('click', function (e) {
    e.stopPropagation();
  });

  $(window).resize(function () {
    let winH = $(window).height();
    if (winH > 1286) {
      $('.left').addClass('on');
      $('.right').addClass('on');
    } else {
      $('.left').removeClass('on');
      $('.right').removeClass('on');
    }
  });
});

// -----------------------------
// モーダル表示中のスクロール無効化
// -----------------------------
$(function () {
  $('.look__list-img').on('click', function () {
    document.addEventListener('touchmove', noscroll, { passive: false });
    document.addEventListener('wheel', noscroll, { passive: false });
  });

  $('.Lmodal').on('click', function () {
    document.removeEventListener('touchmove', noscroll, { passive: true });
    document.removeEventListener('wheel', noscroll, { passive: true });
  });

  function noscroll(e) {
    e.preventDefault();
  }
});

// -----------------------------
// slick スライダー設定
// -----------------------------
$(function () {
  $('.Lmodal__list').slick({
    arrows: true,
    autoplay: false,
    speed: 0,
    fade: false,
    infinite: true,
    swipe: false,
    slidesToShow: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  $('.Lmodal__slide').slick({
    arrows: false,
    autoplay: true,
    dots: true,
    speed: 1000,
    fade: false,
    infinite: true,
    initialSlide: 0,
    swipe: true,
    slidesToShow: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
  });
});
