document.addEventListener('DOMContentLoaded', function () {
  const feature = document.querySelector('.feature');
  const scrollBox = document.querySelector('.scroll__box');
  const staff = document.querySelector('.feature .staff');
  const sections = Array.from(document.querySelectorAll('.c__sec'));

  // 初期表示で.featureにshowedを追加
  feature?.classList.add('showed');
  if (!feature || !scrollBox || sections.length === 0) return;

  function updateSectionVisibility() {
    const scrollRect = scrollBox.getBoundingClientRect();

    let anySectionShowed = false;

    sections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      const secLeft = rect.left - scrollRect.left;
      const secRight = rect.right - scrollRect.left;
      const scrollWidth = scrollRect.width;

      const leftStart = scrollWidth * 0.2;
      const leftEnd = scrollWidth * 0.74;
      const hideStart = scrollWidth * 0.75;
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

        // 最後の .c__sec の場合 .feature の showed も外す
        if (idx === sections.length - 1) {
          feature.classList.remove('showed');
        }
      }
    });

    // ③ .feature .staff が画面内に入ったら .feature の showed を外す
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

  // ⑤ マウスホイールで横スクロール（上下操作時のみ）
  scrollBox.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      scrollBox.scrollBy({
        left: e.deltaY * 3,
        behavior: 'smooth',
      });
    },
    { passive: false }
  );

  scrollBox.addEventListener('scroll', updateSectionVisibility);
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
