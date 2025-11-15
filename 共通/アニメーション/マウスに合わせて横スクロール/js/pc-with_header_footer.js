document.addEventListener('DOMContentLoaded', () => {
  const feature = document.querySelector('.feature');
  const scrollBox = document.querySelector('.scroll__box');
  const targetList = document.querySelectorAll('.c__sec');
  const staff = document.querySelector('.feature .staff');
  let isJumping = false;

  // スワイプ開始位置
  let touchStartX = 0;

  if (!feature || !scrollBox) return;

  // === ✅ 要望①・②追加 ===
  function smoothScrollToFeature() {
    const featureTop = feature.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: featureTop,
      behavior: 'smooth',
    });

    // スクロール完了後に scroll-stop を付ける
    setTimeout(() => {
      document.documentElement.classList.add('scroll-stop');
    }, 600);
  }

  // スクロール or スワイプ時に .feature の top に合わせてスクロール
  feature.addEventListener(
    'wheel',
    (e) => {
      if (!document.documentElement.classList.contains('scroll-stop')) {
        smoothScrollToFeature();
      }
    },
    { passive: true }
  );

  feature.addEventListener('touchstart', () => {
    if (!document.documentElement.classList.contains('scroll-stop')) {
      smoothScrollToFeature();
    }
  });

  // === ✅ 要望③追加 ===
  function checkScrollBoxEdgeAndRemoveStop() {
    const atLeft = scrollBox.scrollLeft <= 0;
    const atRight =
      scrollBox.scrollLeft + scrollBox.clientWidth >= scrollBox.scrollWidth - 1;

    if (atLeft || atRight) {
      document.documentElement.classList.remove('scroll-stop');
    }
  }

  scrollBox.addEventListener('scroll', () => {
    checkScrollBoxEdgeAndRemoveStop();
    checkHorizontalInView();

    // === ✅ 要望：左右端で上下に50vhスクロール追加 ===
    if (isJumping) return;

    const atLeft = scrollBox.scrollLeft <= 0;
    const atRight =
      scrollBox.scrollLeft + scrollBox.clientWidth >= scrollBox.scrollWidth - 1;

    if (atLeft || atRight) {
      isJumping = true;

      // 一時的に操作をブロック
      document.documentElement.classList.add('scrolling');

      const direction = atLeft ? -1 : 1;
      const vh = window.innerHeight * 0.5;

      window.scrollBy({
        top: direction * vh,
        behavior: 'smooth',
      });

      // スクロール完了まで800ms待機
      setTimeout(() => {
        isJumping = false;
        document.documentElement.classList.remove('scrolling');
      }, 800);
    }
  });

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

  // 横スクロール中の表示チェック
  function checkHorizontalInView() {
    const viewportLeft = window.innerWidth * 0.35;
    const viewportCenter = window.innerWidth * 0.65;
    const viewportRight = window.innerWidth * 0.85;

    targetList.forEach((el) => {
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

      // タブレット縦向きの時
      if (window.matchMedia('(orientation:portrait)').matches) {
        if (staff) {
          const staffRect = staff.getBoundingClientRect();
          const scrollBoxRect = scrollBox.getBoundingClientRect();
          const isStaffInView =
            staffRect.left < scrollBoxRect.right &&
            staffRect.right > scrollBoxRect.left;

          if (isStaffInView) {
            feature.classList.remove('showed');
          } else {
            feature.classList.add('showed');
          }
        }
      }
    });
  }

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
