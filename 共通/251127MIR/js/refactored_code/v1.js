document.addEventListener('DOMContentLoaded', function () {
  const targetList = document.querySelectorAll('.fade-target');

  const IO = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.dataset.isActive = 'true';
        }
      });
    },
    { threshold: 0.3 }
  );
  targetList.forEach((target) => IO.observe(target));
});

$(function () {
  // inview
  $('.js-fade, .js-in').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-show');
    }
  });

  // slider
  $('.ph-slider').slick({
    fade: false,
    speed: 1500,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  // 画面に表示時スライド開始(autoplayはfalseに設定する)
  // $('.ph-slider').on('inview', function (event, isInView) {
  //   if (isInView) {
  //     setTimeout(() => {
  //       $(this).slick('slickPlay');
  //     }, 1750);
  //   }
  // });

  // スライダー用のIntersection Observer
  const sliders = document.querySelectorAll('.ph-slider');
  const sliderIO = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          setTimeout(() => {
            $(target).slick('slickPlay');
          }, 1750);
        }
      });
    },
    { threshold: 0.3 }
  );
  sliders.forEach((slider) => sliderIO.observe(slider));
});

// ===============================
// Vanilla JS リファクタリング版
// スクロール位置に応じて .item-block に on クラスを付け外しする処理
// ===============================

// ウィンドウサイズやスクロール量を取得する関数
function getWindowMetrics() {
  const winH = window.innerHeight; // ウィンドウの高さ
  const winTop = window.scrollY; // スクロール位置（上端）
  const winEnd = winTop + winH; // スクロール位置の下端（今回は未使用だが元コードに合わせて残す）
  const winCenter = winTop + winH / 2; // 画面の中央位置（こちらも未使用だが元コード準拠）

  return { winH, winTop, winEnd, winCenter };
}

// スクロール時に実行される処理
function handleScroll() {
  const { winH, winTop } = getWindowMetrics();

  // jQuery版と同じ条件：画面上からウィンドウ高さの 3/6 = 1/2 の位置をしきい値にする
  const threshold = winTop + (winH / 6) * 3;

  // 全 .item-block に対して処理
  document.querySelectorAll('.item-block').forEach((elem) => {
    const elemTop = elem.getBoundingClientRect().top + window.scrollY; // 要素のページ上端位置

    // on が付いていなければ、しきい値より上に来た時に付ける
    if (!elem.classList.contains('on') && elemTop < threshold) {
      elem.classList.add('on');
    }
    // on が付いている場合、再びしきい値より下になったら外す
    else if (elem.classList.contains('on') && elemTop > threshold) {
      elem.classList.remove('on');
    }
  });
}

// スクロールイベント登録
window.addEventListener('scroll', handleScroll);
