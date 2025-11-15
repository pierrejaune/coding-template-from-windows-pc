// DOM読み込み後に実行
document.addEventListener('DOMContentLoaded', () => {
  /**
   * ---------------------------
   * ビューポートサイズをCSS変数に設定
   * ---------------------------
   */
  const setViewportWidth = () => {
    const vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  };

  // リサイズ・ロード時に実行
  window.addEventListener('resize', setViewportWidth);
  window.addEventListener('load', setViewportWidth);

  /**
   * ---------------------------
   * フェードイン処理
   * ---------------------------
   */
  const fadeInElements = document.querySelectorAll('.js_anime');
  const feature = document.querySelector('.feature');

  // 初期フェードイン（ロード時）
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (feature) feature.classList.add('is_show');

      setTimeout(() => {
        fadeInOnScroll(); // 初回チェック
      }, 500);
    }, 1000);
  });

  // スクロール時のフェードイン
  const fadeInOnScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    fadeInElements.forEach((el) => {
      const imgPos = el.getBoundingClientRect().top + scrollY;
      if (scrollY > imgPos - windowHeight * 0.75) {
        el.classList.add('is_show');
      }
    });
  };

  window.addEventListener('scroll', fadeInOnScroll);

  /**
   * ---------------------------
   * sec02 で要素の切り替え
   * ---------------------------
   */
  const follow01 = document.querySelector('.js_follow01');
  const follow02 = document.querySelector('.js_follow02');
  const sec02 = document.querySelector('.sec02');

  const toggleFollow = () => {
    if (!sec02) return;
    const point = sec02.getBoundingClientRect().top + window.scrollY;
    const scrollY = window.scrollY;

    if (scrollY < point) {
      follow01?.classList.add('is_show');
      follow02?.classList.remove('is_show');
    } else {
      follow01?.classList.remove('is_show');
      follow02?.classList.add('is_show');
    }
  };

  window.addEventListener('scroll', toggleFollow);
  window.addEventListener('resize', toggleFollow);
  window.addEventListener('load', toggleFollow);

  /**
   * ---------------------------
   * スクロールでモデル画像の表示切り替え
   * ---------------------------
   */
  const stickyItems = Array.from({ length: 14 }, (_, i) => i + 2); // 02〜15
  const toggleModels = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    stickyItems.forEach((num) => {
      const sticky = document.querySelector(
        `.js_stickyitem${num.toString().padStart(2, '0')}`
      );
      const model = document.querySelector(
        `.js_model${num.toString().padStart(2, '0')}`
      );
      if (!sticky || !model) return;

      const stickyPos = sticky.getBoundingClientRect().top + scrollY;

      if (scrollY > stickyPos - windowHeight * 0.75) {
        model.classList.add('is_show');
      } else {
        model.classList.remove('is_show');
      }
    });
  };

  window.addEventListener('scroll', toggleModels);
  window.addEventListener('resize', toggleModels);
  window.addEventListener('load', toggleModels);

  /**
   * ---------------------------
   * モデルアイテムクリックで画像切り替え
   * ---------------------------
   */
  const setupModelClick = (groupNum) => {
    const items = document.querySelectorAll(`.js_modelitem${groupNum}`);
    const images = document.querySelectorAll(`.js_modelimg${groupNum}`);

    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        images.forEach((img) => img.classList.remove('is_show'));
        images[index]?.classList.add('is_show');
      });
    });
  };

  // 01〜15まで一括設定
  for (let i = 1; i <= 15; i++) {
    setupModelClick(i.toString().padStart(2, '0'));
  }

  /**
   * ---------------------------
   * クレジット改行位置調整
   * ---------------------------
   */
  const creditLists = document.querySelectorAll('.credit');
  window.addEventListener('load', () => {
    creditLists.forEach((credit) => {
      const lis = credit.querySelectorAll('li');
      const items = Array.from(lis).map((li) => li.getBoundingClientRect().top);

      for (let i = 0; i < items.length - 1; i++) {
        if (items[i] < items[i + 1]) {
          lis[i].classList.add('break');
        }
      }
    });
  });
});
