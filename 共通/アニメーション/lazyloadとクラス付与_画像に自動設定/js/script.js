$(function () {
  // lazysizes 設定（事前）
  window.lazySizesConfig = window.lazySizesConfig || {};
  lazySizesConfig.loadMode = 1;

  // .look__list 内の画像に .lazyload クラスを追加
  document.querySelectorAll('.look__list img').forEach((img) => {
    if (img.getAttribute('src')) {
      // src → data-src に移動
      img.setAttribute('data-src', img.getAttribute('src'));
      img.removeAttribute('src');
      img.classList.add('lazyload');
    }
  });

  // lazySizes ライブラリを動的に読み込み
  const script = document.createElement('script');
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);

  // 遅延読み込み後に .fadein を付与（.look__list内のみ）
  document.addEventListener('lazyloaded', function (e) {
    const img = e.target;
    if (img.closest('.look__list')) {
      img.classList.add('fadein');
    }
  });

  // 念のためファーストビューも処理（lazyloaded クラスがあるけど fadein が無い場合）
  window.addEventListener('load', () => {
    document
      .querySelectorAll('.look__list img.lazyloaded:not(.fadein)')
      .forEach((img) => {
        img.classList.add('fadein');
      });
  });
});
