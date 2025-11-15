document.addEventListener('DOMContentLoaded', function () {
  const catalogItems = document.querySelectorAll('.catalog-item'); // カタログ画像をクリックしたとき
  const catalogLists = document.querySelectorAll('.catalog'); // 対応するスライダー
  const sliderOverlay = document.querySelector('.slider-overlay');
  const sliderContainer = document.querySelector('.slider-container');
  const closeBtn = document.querySelector('.close-btn');

  let swiperInstance = null; // Swiperインスタンスを保持する変数

  // クリックでスライダーを表示
  catalogItems.forEach((item, index) => {
    item.addEventListener('click', function () {
      showSlider(index); // スライダーを表示
    });
  });

  function showSlider(index) {
    // スライダーの内容をクリア
    sliderContainer.innerHTML = '';

    // 対応するカタログ（スライダーの画像群）を取得
    const catalog = catalogLists[index];
    const images = catalog.querySelectorAll('img');

    // Swiper用のHTMLを生成
    let slidesHTML = Array.from(images)
      .map(
        (img) =>
          `<div class="swiper-slide"><img src="${img.src}" alt="${img.alt}"></div>`
      )
      .join('');

    const sliderHTML = `
      <div class="swiper catalog-slider">
        <div class="swiper-wrapper">
          ${slidesHTML}
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    `;
    sliderContainer.innerHTML = sliderHTML;

    // スライダーのオーバーレイを表示
    sliderOverlay.style.display = 'flex';

    // Swiperの初期化
    if (swiperInstance) {
      swiperInstance.destroy(); // 以前のSwiperインスタンスを破棄
    }

    swiperInstance = new Swiper('.catalog-slider', {
      effect: 'fade',
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // 閉じるボタンでスライダーを非表示にする
  closeBtn.addEventListener('click', () => {
    sliderOverlay.style.display = 'none';
  });

  // スライダー外をクリックで非表示
  sliderOverlay.addEventListener('click', (e) => {
    if (e.target === sliderOverlay) {
      sliderOverlay.style.display = 'none';
    }
  });
});
