window.addEventListener('load', () => {
  // --- スクロール位置の復元設定 ---
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'auto';
  }

  // --- 前回のスクロール位置をsessionStorageから復元（URL直入力時対策） ---
  const savedScroll = sessionStorage.getItem('scrollY');
  if (savedScroll && !sessionStorage.getItem('visited')) {
    // 初回演出時は復元しない
    window.scrollTo(0, parseInt(savedScroll, 10));
  }

  // --- アニメ初期化関数（.anim の ScrollTrigger設定） ---
  function initAnimTriggers() {
    const anims = document.querySelectorAll('.anim');
    anims.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => el.classList.add('showed'),
      });
    });
  }

  // --- 初回アクセス判定 ---
  const hasVisited = sessionStorage.getItem('visited');

  if (!hasVisited) {
    const firstPosition = document.getElementById('feature');
    document.body.classList.add('fix'); // 初回のみ固定状態

    if (firstPosition) {
      const targetTop =
        firstPosition.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, targetTop);

      requestAnimationFrame(() => {
        setTimeout(() => {
          document.body.classList.add('show');
          document.querySelector('.pcMv')?.classList.add('showed');
          initAnimTriggers();
          ScrollTrigger.refresh();
        }, 100);
      });
    }

    setTimeout(() => {
      document.body.classList.remove('fix');
      document.body.classList.add('off');
      document.querySelector('.l-header')?.classList.add('show');
      document.body.style.overflow = '';
    }, 5000);

    sessionStorage.setItem('visited', 'true');
  } else {
    // --- 2回目以降 ---
    document.body.classList.remove('fix');
    document.body.classList.add('show', 'off');
    document.querySelector('.pcMv')?.classList.add('showed');
    document.querySelector('.l-header')?.classList.add('show');
    document.body.style.overflow = '';

    // ✅ ScrollTriggerを再初期化
    initAnimTriggers();
    ScrollTrigger.refresh();
  }

  // --- 現在のスクロール位置を保存（URL直入力再アクセス時の復元用） ---
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollY', window.scrollY);
  });
});
