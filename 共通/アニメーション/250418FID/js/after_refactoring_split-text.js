document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // 各文字を <span> で囲む処理
  // -------------------------------
  const textElements = document.querySelectorAll('.TextRandomAnime');

  textElements.forEach((el) => {
    const text = el.textContent; // 元のテキストを取得
    const spanWrapped = [...text] // 文字列を配列に分割
      .map((char) => `<span>${char}</span>`)
      .join(''); // 各文字を <span> で囲んで結合
    el.innerHTML = spanWrapped; // HTMLに書き換え
  });

  // -------------------------------
  // アニメーション制御
  // -------------------------------
  const handleScroll = () => {
    const winH = window.innerHeight; // ウィンドウ高さ
    const scrollY = window.scrollY; // 現在のスクロール位置

    textElements.forEach((el) => {
      const elemPos = el.getBoundingClientRect().top + scrollY; // 要素の絶対位置
      if (scrollY > elemPos - winH * 0.7) {
        el.classList.add('appearRandomtext'); // クラス付与でアニメーション発火
      }
    });
  };

  // -------------------------------
  // 初回 & スクロール時に実行
  // -------------------------------
  window.addEventListener('load', handleScroll);
  window.addEventListener('scroll', handleScroll);
});
