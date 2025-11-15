// リロード時にブラウザがスクロール位置を復元しないようにする
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  const firstPosition = document.getElementById('feature');

  if (firstPosition) {
    // #feature の絶対座標を取得
    const targetTop =
      firstPosition.getBoundingClientRect().top + window.pageYOffset;

    // 一旦トップに強制スクロール
    window.scrollTo(0, targetTop);

    // スクロール反映を待ってからアニメーションを実行
    requestAnimationFrame(() => {
      setTimeout(() => {
        // main表示クラスを付与
        document.body.classList.add('show');
        document.querySelector('.pcMv').classList.add('showed');

        // .anim の ScrollTrigger 初期化
        initAnimTriggers();

        // ScrollTrigger位置を再計算
        ScrollTrigger.refresh();
      }, 100);
    });
  }

  // 5秒後にヘッダー表示
  setTimeout(() => {
    document.body.classList.add('off');
    document.querySelector('.l-header').classList.add('show');
    document.body.style.overflow = '';
  }, 5000);
});

function initAnimTriggers() {
  document.querySelectorAll('.anim').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      onEnter: () => {
        el.classList.add('showed');
      },
      once: true,
    });
  });
}
