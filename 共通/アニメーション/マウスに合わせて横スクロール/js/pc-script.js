document.addEventListener('DOMContentLoaded', () => {
  const feature = document.querySelector('.feature');
  const scrollBox = document.querySelector('.scroll__box');
  const targetList = document.querySelectorAll('.c__sec');
  let isJumping = false;

  // スワイプ開始位置
  let touchStartX = 0;

  if (!feature || !scrollBox) return;

  // wheel（スクロール）イベント：縦→横に変換
  scrollBox.addEventListener(
    'wheel',
    (e) => {
      if (isJumping) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scrollBox.scrollBy({
          left: e.deltaY,
          // behavior: 'smooth',
        });
      }
    },
    { passive: false }
  );

  // タッチスワイプ：横スクロール対応
  scrollBox.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  scrollBox.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].clientX;
    const deltaX = touchStartX - touchX;
    scrollBox.scrollBy({
      left: deltaX,
    });
    touchStartX = touchX;
  });

  // .feature が80%以上見えたら showed を追加
  const featureObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, intersectionRatio }) => {
        if (isIntersecting && intersectionRatio >= 0.8) {
          feature.classList.add('showed');
        }
      });
    },
    { threshold: [0.8] }
  );

  featureObserver.observe(feature);

  // スクロール位置補正（下から戻ってきたとき）
  // window.addEventListener('scroll', () => {
  //   if (isJumping) return;
  //   const rect = feature.getBoundingClientRect();
  //   const vh = window.innerHeight;

  //   if (rect.top < 0 && rect.bottom > vh * 0.8) {
  //     isJumping = true;
  //     window.scrollTo({
  //       top: feature.offsetTop,
  //       behavior: 'smooth',
  //     });
  //     setTimeout(() => (isJumping = false), 800);
  //   }
  // });

  // 横スクロール中の表示チェック
  function checkHorizontalInView() {
    const viewportLeft = window.innerWidth * 0.3;
    const viewportCenter = window.innerWidth * 0.6;
    const viewportRight = window.innerWidth * 0.85;

    targetList.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const rectCenter = rect.left + rect.width / 2;
      const rectRight = rect.right;

      const isVisible =
        rectCenter <= viewportCenter && rectRight >= viewportLeft;

      if (isVisible) {
        el.classList.add('showed');
      } else {
        el.classList.remove('showed');
      }
    });
  }

  scrollBox.addEventListener('scroll', checkHorizontalInView);
  window.addEventListener('resize', checkHorizontalInView);
  checkHorizontalInView();
});

// 画面の高さに基づいて --vh を設定
function setVhVariables() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVariables();
window.addEventListener('resize', setVhVariables);
