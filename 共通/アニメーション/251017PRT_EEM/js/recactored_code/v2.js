// フェードイン
$(function () {
  $(window).on('resize load', function () {
    let vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  });

  $(window).on('load', function () {
    setTimeout(function () {
      $('.feature').addClass('is_show');
      setTimeout(function () {
        animationposition('.js_anime');
      }, 500);
    }, 1000);
  });

  $(window).on('scroll', function () {
    animationposition('.js_anime');
  });

  function animationposition(e) {
    $(e).each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  }
});

/* ==================================================
   スライダー共通制御スクリプト
   --------------------------------------------------
   各スライダーごとの設定をオブジェクトで定義し、
   1つの共通関数 createSlider() で処理を行う。
================================================== */
document.addEventListener('DOMContentLoaded', () => {
  /*--------------------------------------------
    各スライダーの設定一覧
    - selector: スライダー要素のセレクタ
    - interval: 切り替え間隔（ミリ秒）
    - usePrevAnime: 前スライドに is_prevanime を付けるかどうか
  --------------------------------------------*/
  const sliderConfigs = [
    {
      selector: '.js_slider01',
      interval: 5000,
      usePrevAnime: false,
    },
    {
      selector: '.js_slider02',
      interval: 5000,
      usePrevAnime: true,
    },
    // 例）さらにスライダーを追加したい場合
    // {
    //   selector: ".js_slider03",
    //   interval: 7000,
    //   usePrevAnime: true,
    // },
  ];

  /*--------------------------------------------
    共通スライダー関数
    各設定を受け取ってアニメーション制御を行う
  --------------------------------------------*/
  function createSlider({ selector, interval, usePrevAnime }) {
    const slides = document.querySelectorAll(selector);
    const total = slides.length;

    // スライドが存在しなければ何もしない
    if (total === 0) return;

    let index = 0; // 現在スライド番号

    // 指定スライドにクラスを付け替える処理
    function setActiveSlide(currentIndex) {
      // 全スライドからアニメーションクラスを削除
      slides.forEach((slide) => {
        slide.classList.remove('is_anime', 'is_prevanime');
      });

      // 現在スライドに is_anime を付与
      slides[currentIndex].classList.add('is_anime');

      // usePrevAnime が true の場合のみ前スライドにクラス付与
      if (usePrevAnime) {
        const prevIndex = (currentIndex - 1 + total) % total; // 負の値対策
        slides[prevIndex].classList.add('is_prevanime');
      }
    }

    // 最初のスライドを表示
    setActiveSlide(index);

    // 指定間隔でスライドを切り替え
    setInterval(() => {
      index = (index + 1) % total;
      setActiveSlide(index);
    }, interval);
  }

  /*--------------------------------------------
    全スライダーを設定に基づいて初期化
  --------------------------------------------*/
  sliderConfigs.forEach((config) => createSlider(config));
});
