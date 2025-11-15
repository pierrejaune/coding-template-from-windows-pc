// DOMの読み込みが完了してから実行
document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // 【設定オブジェクト】
  // 対象セクション番号の配列を指定
  // both → 2つの.item要素に処理を適用
  // second → 2番目の.item要素のみ処理を適用
  // -------------------------------
  const config = {
    both: [1, 2, 3, 6, 7, 13, 14, 15, 20, 21],
    second: [4, 8, 9, 10, 11, 16, 17, 18, 19],
  };

  // -------------------------------
  // 【共通関数】nth-of-type指定で要素を取得
  // -------------------------------
  const getNthItem = (section, n) =>
    document.querySelector(`${section} .credit .item:nth-of-type(${n})`);

  // -------------------------------
  // both配列 → 2番目と4番目の.itemにクラスと改行を追加
  // -------------------------------
  config.both.forEach((num) => {
    const section = `.sec${String(num).padStart(2, '0')}`;
    [2, 4].forEach((nth) => {
      const item = getNthItem(section, nth);
      if (item) {
        item.classList.add('-mr0');
        item.insertAdjacentHTML('afterend', '<br>');
      }
    });
  });

  // -------------------------------
  // second配列 → 2番目の.itemにクラスと改行を追加
  // -------------------------------
  config.second.forEach((num) => {
    const section = `.sec${String(num).padStart(2, '0')}`;
    const item = getNthItem(section, 2);
    if (item) {
      item.classList.add('-mr0');
      item.insertAdjacentHTML('afterend', '<br>');
    }
  });

  // -------------------------------
  // 【MORE/CLOSE ボタンのトグル】
  // -------------------------------
  const moreBtn = document.querySelector('.catch__More span');
  const moreWrapper = document.querySelector('.catch__More');
  const hiddenContent = document.querySelector('.catch__Hidden');

  if (moreBtn && moreWrapper && hiddenContent) {
    moreBtn.addEventListener('click', () => {
      const isMore = moreBtn.textContent.trim() === 'MORE';
      moreBtn.textContent = isMore ? 'CLOSE' : 'MORE';
      moreWrapper.classList.toggle('-op', isMore);

      // slideDown / slideUp の代替 → CSSトランジションでフェードのように実装
      if (isMore) {
        // hiddenContent.style.display = 'block';
        // hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
        $('.catch__Hidden').slideDown();
      } else {
        // hiddenContent.style.maxHeight = '0';
        // setTimeout(() => (hiddenContent.style.display = 'none'), 500);
        $('.catch__Hidden').slideUp();
      }
    });
  }

  // -------------------------------
  // 【音声ON/OFF切り替え】
  // -------------------------------
  const musicBtn = document.getElementById('music');
  const musicOn = document.querySelector('.music .on');
  const musicOff = document.querySelector('.music .off');
  const videoEl = document.querySelector('.mv__Video video');

  if (musicBtn && musicOn && musicOff && videoEl) {
    musicBtn.addEventListener('click', () => {
      const isOff = musicBtn.classList.contains('off');

      if (isOff) {
        // ミュート解除
        musicBtn.classList.remove('off');
        musicOff.classList.remove('active');
        musicOn.classList.add('active');
        videoEl.muted = false;
      } else {
        // ミュートにする
        musicBtn.classList.add('off');
        musicOn.classList.remove('active');
        musicOff.classList.add('active');
        videoEl.muted = true;
      }
    });
  }

  // -------------------------------
  // 【Swiper初期化】
  // Swiperは外部ライブラリのため、グローバルに存在している前提
  // -------------------------------
  const swiper = new Swiper('.swiper', {
    speed: 1000,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  // -------------------------------
  // 【スクロール時フェードインアニメーション】
  // Intersection Observerでinview相当を実装
  // -------------------------------
  const fadeElements = document.querySelectorAll('.js-fade');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
          }
        });
      },
      { threshold: 0.2 } // 要素が20%見えた時に発火
    );

    fadeElements.forEach((el) => observer.observe(el));
  }
});
