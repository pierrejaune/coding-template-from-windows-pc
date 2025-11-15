document.querySelectorAll('.sec__gif').forEach((gifElement) => {
  const img = gifElement.querySelector('a img');
  if (!img) return;

  const originalSrc = img.getAttribute('src');

  // すでに showed クラスがある場合は何もしない
  if (gifElement.classList.contains('showed')) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // クラスが変わって、初めて showed が付いた場合だけ処理
      if (
        mutation.attributeName === 'class' &&
        gifElement.classList.contains('showed') &&
        !gifElement.dataset.gifReloaded // 一度処理したかどうか確認
      ) {
        // 処理済みフラグをセット（再実行防止）
        gifElement.dataset.gifReloaded = 'true';

        // GIF画像のリセット
        img.setAttribute('src', '');
        img.offsetHeight; // 強制再描画
        img.setAttribute('src', originalSrc);
      }
    });
  });

  observer.observe(gifElement, { attributes: true });
});
