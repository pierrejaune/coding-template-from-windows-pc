window.addEventListener('load', () => {
  // ブラウザに任せて戻したいので scrollRestoration = "auto"
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'auto';
  }

  const hasVisited = sessionStorage.getItem('visited');

  if (!hasVisited) {
    const firstPosition = document.getElementById('feature');
    document.body.classList.add('fix');

    if (firstPosition) {
      const targetTop =
        firstPosition.getBoundingClientRect().top + window.pageYOffset;

      // ✅ 初回だけ強制スクロールを実行
      window.scrollTo(0, targetTop);

      requestAnimationFrame(() => {
        setTimeout(() => {
          document.body.classList.add('show');
          document.querySelector('.pcMv').classList.add('showed');
          initAnimTriggers();
          ScrollTrigger.refresh();
        }, 100);
      });
    }

    // 5秒後に固定解除
    setTimeout(() => {
      document.body.classList.remove('fix');
      document.body.classList.add('off');
      document.querySelector('.l-header').classList.add('show');
      document.body.style.overflow = '';
    }, 5000);

    sessionStorage.setItem('visited', 'true');
  } else {
    // ✅ 2回目以降は強制スクロールを行わない！
    document.body.classList.remove('fix');
    document.body.classList.add('show', 'off');
    document.querySelector('.pcMv')?.classList.add('showed');
    document.querySelector('.l-header')?.classList.add('show');
    document.body.style.overflow = '';
  }
});
