document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.sec');
  const backgrounds = document.querySelectorAll('.bg');

  function onScroll() {
    const scrollY = window.scrollY;
    let currentIndex = -1;

    sections.forEach((section, index) => {
      const offsetTop = section.offsetTop;

      // セクションのtopが現在のscroll位置を超えていない（＝topに到達している）
      if (scrollY >= offsetTop) {
        currentIndex = index;
      }
    });

    // 対応する.bgにshowedを付け、他は削除
    backgrounds.forEach((bg, index) => {
      if (index === currentIndex) {
        bg.classList.add('showed');
      } else {
        bg.classList.remove('showed');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);
  onScroll(); // 初回実行
});
