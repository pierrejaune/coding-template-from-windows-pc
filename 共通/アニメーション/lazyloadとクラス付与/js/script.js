$(document).ready(function () {
  // 画面外も順次読み込むための設定（拡張）
  window.lazySizesConfig = window.lazySizesConfig || {};
  lazySizesConfig.loadMode = 1; // 1 = visible優先＋順次読み込みも有効

  // 読み込み完了後に .look__list内にある画像にfadein クラス追加
  window.addEventListener('load', function () {
    document.addEventListener('lazyloaded', function (e) {
      const img = e.target;
      if (img.closest('.look__list')) {
        img.classList.add('fadein');
      }
    });
  });

  // ファーストビューの画像が漏れてたら追加でfadein
  window.addEventListener('load', () => {
    document
      .querySelectorAll('.look__list img.lazyloaded:not(.fadein)')
      .forEach((img) => {
        img.classList.add('fadein');
      });
  });
});
