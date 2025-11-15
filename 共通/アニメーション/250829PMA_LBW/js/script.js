$(document).ready(function () {
  // =====================
  // Intersection Observer で .target を監視
  // =====================
  const targetList = document.querySelectorAll('.target');
  const IO = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          // 画面に 30% 以上入ったら "active" を付与
          target.dataset.isActive = 'true';
          target.classList.add('active');
        }
        // ※ 見えなくなった時に active を外す処理はない
      });
    },
    { threshold: 0.3 }
  );

  targetList.forEach((target) => IO.observe(target));
});

// =====================
// slick スライダー初期化
// =====================
$(function () {
  $('.slide01').slick({
    arrows: false,
    autoplay: false, // 最初は自動再生オフ
    speed: 700,
    fade: false,
    infinite: true,
    swipe: true,
    slidesToShow: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  $('.slide02').slick({
    arrows: false,
    autoplay: false, // 最初は自動再生オフ
    speed: 700,
    fade: false,
    infinite: true,
    swipe: true,
    slidesToShow: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
    rtl: true, // 右から左へ流れる設定
  });
});

// =====================
// .sec__slide が active の時に再生開始
// =====================
$(function () {
  $(window).on('scroll load', function () {
    $('.sec__slide').each(function () {
      // active クラスがついているスライドだけ slickPlay 実行
      if ($(this).hasClass('active')) {
        $(this).slick('slickPlay');
      }
    });
  });
});
