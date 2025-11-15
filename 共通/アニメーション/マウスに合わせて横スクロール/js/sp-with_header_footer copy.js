document.addEventListener('DOMContentLoaded', function () {
  const feature = document.querySelector('.feature');
  const scrollBox = document.querySelector('.scroll__box');
  const staff = document.querySelector('.feature .staff');
  const sections = Array.from(document.querySelectorAll('.c__sec'));

  // 初期表示で.featureにshowedを追加
  feature?.classList.add('showed');
  document.querySelector('.c__sec.sec01').classList.add('showed');
  if (!feature || !scrollBox || sections.length === 0) return;

  function updateSectionVisibility() {
    const scrollRect = scrollBox.getBoundingClientRect();

    let anySectionShowed = false;

    sections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      const secLeft = rect.left;
      const secRight = rect.right;
      const scrollWidth = scrollRect.width;

      const leftStart = scrollWidth * 0.2;
      const leftEnd = scrollWidth * 0.8;
      const hideStart = scrollWidth * 0.81;
      const hideEnd = scrollWidth;

      const inShowRange = secLeft >= leftStart && secLeft <= leftEnd;
      const inHideRange = secRight >= hideStart && secRight <= hideEnd;

      if (inShowRange && !sec.classList.contains('showed')) {
        sections.forEach((s) => s.classList.remove('showed'));
        sec.classList.add('showed');
        feature.classList.add('showed');
        anySectionShowed = true;
      } else if (inHideRange) {
        sec.classList.remove('showed');
        if (idx === sections.length - 1) {
          feature.classList.remove('showed');
        }
      }
    });

    if (staff) {
      const staffRect = staff.getBoundingClientRect();
      const scrollBoxRect = scrollBox.getBoundingClientRect();
      const isStaffInView =
        staffRect.left < scrollBoxRect.right &&
        staffRect.right > scrollBoxRect.left &&
        staffRect.top < scrollBoxRect.bottom &&
        staffRect.bottom > scrollBoxRect.top;

      if (isStaffInView) {
        feature.classList.remove('showed');
      }
    }
  }

  // ★ 要望①②: スクロールやスワイプ時に .feature をウィンドウトップに合わせて、html に scroll-stop を追加
  let hasScrolledFeature = false;
  function scrollFeatureToTop() {
    if (hasScrolledFeature) return;
    hasScrolledFeature = true;

    const featureTop = feature.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: featureTop,
      behavior: 'smooth',
    });

    // スクロール直後に scroll-stop クラスを追加（スムーススクロール中でも即付与）
    document.documentElement.classList.add('scroll-stop');
  }

  // ⑤ マウスホイールで横スクロール（上下操作時のみ）
  scrollBox.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();

      // ★ 要望①②トリガー: ユーザーがスクロールしたら発動
      scrollFeatureToTop();

      scrollBox.scrollBy({
        left: e.deltaY * 3,
        behavior: 'smooth',
      });
    },
    { passive: false }
  );

  // ★ 要望①②: タッチ操作でも同様の処理（左右スワイプ検知）
  let touchStartX = 0;
  let touchStartY = 0;

  scrollBox.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  });

  scrollBox.addEventListener('touchend', (e) => {
    if (e.changedTouches.length > 0) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      // 横スワイプまたは縦スクロールが一定距離以上なら発火
      if (Math.abs(deltaX) > 30 || Math.abs(deltaY) > 30) {
        scrollFeatureToTop(); // ★ 要望①②トリガー
      }
    }
  });

  scrollBox.addEventListener('scroll', () => {
    updateSectionVisibility();

    // ③ 左右端に到達したら scroll-stop クラスを外す＋スクロール
    const isAtLeft = scrollBox.scrollLeft <= 0;
    const isAtRight =
      scrollBox.scrollLeft + scrollBox.clientWidth >= scrollBox.scrollWidth - 1;

    if (isAtLeft || isAtRight) {
      document.documentElement.classList.remove('scroll-stop');

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (isAtLeft) {
        window.scrollTo({
          top: scrollY - windowHeight,
          behavior: 'smooth',
        });
      } else if (isAtRight) {
        window.scrollTo({
          top: scrollY + windowHeight,
          behavior: 'smooth',
        });
      }
    }
  });

  window.addEventListener('resize', updateSectionVisibility);
  updateSectionVisibility();
});

// 画面の高さに基づいて --vh を設定（100vhの代わりに使用）
function setVhVariables() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVariables();
window.addEventListener('resize', setVhVariables);
window.addEventListener('orientationchange', setVhVariables);
