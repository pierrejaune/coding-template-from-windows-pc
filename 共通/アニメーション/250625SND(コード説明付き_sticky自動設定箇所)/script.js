// 覆いかぶさる2枚目以降の画像にpadding,
//   margin設定をjsですると実機確認時にちらつくのでcssで設定;
const adjustStickyPosition = () => {
  const headerHeight = 80; // 固定ヘッダーの高さ
  const windowHeight = window.innerHeight;

  requestAnimationFrame(() => {
    const sections = document.querySelectorAll('.sec__sticky');
    sections.forEach((section) => {
      const stickyElements = section.querySelectorAll('.el-sticky');
      if (stickyElements.length === 0) return;

      const firstEl = stickyElements[0];
      // const firstHeight = firstEl.getBoundingClientRect().height;

      stickyElements.forEach((el, index) => {
        const h = el.getBoundingClientRect().height;

        // topリセットのみ（paddingやmarginはCSS側で管理）
        el.style.top = '';

        if (h < windowHeight) {
          const centerOffset = (windowHeight - h) / 2 + headerHeight / 2;

          el.style.top = `${centerOffset}px`;
          if (index === 0) el.classList.add('first');
        } else {
          el.style.top = `${headerHeight}px`;
          if (index === 0) el.classList.add('first');
        }
      });
    });

    // .sec__sticky に属していない単体の .el-sticky 処理
    const orphanStickyEls = document.querySelectorAll(
      '.el-sticky:not(.sec__sticky .el-sticky)'
    );
    orphanStickyEls.forEach((el) => {
      const h = el.getBoundingClientRect().height;

      el.style.top = '';

      if (h < windowHeight) {
        const centerOffset = (windowHeight - h) / 2 + headerHeight / 2;
        el.style.top = `${centerOffset}px`;
        el.classList.add('single');
      } else {
        const offset = windowHeight - h - windowHeight / 2 + headerHeight / 2;
        el.style.top = `${offset}px`;
      }
    });
  });
};

// 基本イベント
window.addEventListener('load', adjustStickyPosition);
window.addEventListener('resize', adjustStickyPosition);
window.addEventListener('orientationchange', adjustStickyPosition);

// 画像読み込み後に再調整（画像で高さが変わるレイアウトに対応）
// const images = document.querySelectorAll('.f-container img');
// let loadedCount = 0;

// images.forEach((img) => {
//   if (img.complete) {
//     loadedCount++;
//   } else {
//     img.addEventListener('load', () => {
//       loadedCount++;
//       if (loadedCount === images.length) {
//         adjustStickyPosition();
//       }
//     });
//   }
// });

// 念のため DOMが完全に安定したあとにも再調整
setTimeout(adjustStickyPosition, 1000);
