// slickスライドスライダー設定
$(function () {
  $('.sec__slide.slk').each(function () {
    let $slider = $(this);

    // slickが初期化済みかどうか判定するフラグとしてclassを使う
    let initializeSlider = () => {
      if (!$slider.hasClass('slick-initialized')) {
        $slider
          .slick({
            arrows: false,
            dots: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 6000,
            cssEase: 'linear',
            slidesToShow: 1, // デフォルト（PC）
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  centerMode: true,
                  initialSlide: 1, // 真ん中に表示するスライド（2番目）
                },
              },
            ],
          })
          .slick('slickPause');
      }
    };

    // 初期化
    initializeSlider();

    // .showedがついたらautoplay開始
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          if ($slider.hasClass('showed')) {
            setTimeout(() => {
              $slider.slick('slickPlay');
            }, 300);
          }
        }
      });
    });

    observer.observe(this, { attributes: true });

    // ページ読み込み時点で既に.showedがついている場合
    if ($slider.hasClass('showed')) {
      setTimeout(() => {
        $slider.slick('slickPlay');
      }, 300);
    }
  });
});
