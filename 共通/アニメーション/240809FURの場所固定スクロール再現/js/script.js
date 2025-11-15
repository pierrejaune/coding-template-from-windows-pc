document.addEventListener('DOMContentLoaded', () => {
  const fixedContainer = document.querySelector('.fixed-container');
  const parentContainer = document.querySelector('.fixed-parent');

  // ✅ クローン生成処理
  const clone = fixedContainer.cloneNode(true);
  clone.classList.remove('fixed-container');
  clone.classList.add('fixed-container-cloned');
  clone.setAttribute('aria-hidden', 'true');

  // クローン内の .section も active を除去してクリーンに
  clone
    .querySelectorAll('.section')
    .forEach((s) => s.classList.remove('active'));

  // 最初に追加（scroll基準のため）
  parentContainer.insertBefore(clone, fixedContainer);

  // ✅ 要素取得（clone後）
  const realSections = fixedContainer.querySelectorAll('.section');
  const clonedSections = clone.querySelectorAll('.section');
  const footer = document.querySelector('.footer');

  let isFixedNow = false;
  let currentIndex = -1;

  const update = () => {
    const scrollTop = window.scrollY;
    const startTop = clonedSections[0].getBoundingClientRect().top;
    const endTop = footer.getBoundingClientRect().top;

    // 固定ON/OFF
    if (startTop <= 80 && endTop > 80) {
      if (!isFixedNow) {
        fixedContainer.classList.add('is-fixed');
        isFixedNow = true;
      }
    } else {
      if (isFixedNow) {
        fixedContainer.classList.remove('is-fixed');
        isFixedNow = false;
      }
    }

    // 表示切り替え
    clonedSections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      if (
        centerY < window.innerHeight / 2 + 40 &&
        centerY > window.innerHeight / 2 - 40
      ) {
        if (currentIndex !== i) {
          realSections.forEach((s, j) => {
            s.classList.toggle('active', j === i);
          });
          currentIndex = i;
        }
      }
    });
  };

  window.addEventListener('scroll', update);
  window.addEventListener('resize', update);
  update(); // 初期化時に実行
});

// 画面の高さに基づいて --vh を設定（100vhの代わりに使用）
function setVhVariables() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVariables();
window.addEventListener('resize', setVhVariables);
window.addEventListener('orientationchange', setVhVariables);
