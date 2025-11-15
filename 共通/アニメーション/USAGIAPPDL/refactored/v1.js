// ---------------------------------------
// DOMの読み込みが完了したら実行
// ---------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // 共通関数定義
  // =========================

  /**
   * フッターとの重なりを避けつつ、
   * 特定の要素をスクロール位置に応じて表示/非表示する関数
   * @param {string} selector 対象要素のセレクタ
   */
  function handleFixedElement(selector) {
    const element = document.querySelector(selector);
    const footer = document.querySelector('.l-footer');
    if (!element || !footer) return; // 要素が存在しない場合は中断

    // 初期状態は非表示
    element.style.display = 'none';

    window.addEventListener('scroll', () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = windowHeight + scrollTop;
      const footerHeight = footer.offsetHeight;

      // -----------------------------
      // 200px以上スクロールで表示
      // -----------------------------
      if (scrollTop > 200) {
        // フェードイン風にアニメーション表示
        element.style.display = 'block';
        element.style.opacity = '1';
        element.style.transition = 'opacity 0.3s ease';
      } else {
        // フェードアウト
        element.style.opacity = '0';
        setTimeout(() => {
          if (parseFloat(element.style.opacity) === 0)
            element.style.display = 'none';
        }, 300);
      }

      // -----------------------------
      // フッターとの重なりを防止
      // -----------------------------
      if (scrollHeight - scrollPosition <= footerHeight) {
        // ページ最下部付近 → absolute配置
        element.style.position = 'absolute';
        element.style.bottom = '0';
      } else {
        // 通常時は画面下固定
        element.style.position = 'fixed';
        element.style.bottom = '0';
      }
    });
  }

  // =========================
  // フェードインアニメーション処理
  // =========================

  /**
   * .js-fade 要素が画面内に入ったときに
   * is-active クラスを付与してアニメーションを開始
   */
  function initFadeInElements() {
    const fadeElements = document.querySelectorAll('.js-fade');
    if (!fadeElements.length) return;

    // IntersectionObserverを使用してinview判定
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          // 一度アニメーションしたら監視を解除（不要なら削除可）
          observer.unobserve(entry.target);
        }
      });
    });

    fadeElements.forEach((el) => observer.observe(el));
  }

  // =========================
  // 実行部分
  // =========================
  handleFixedElement('.fix'); // 固定ボタンの制御
  handleFixedElement('.pagetop'); // ページトップボタンの制御
  initFadeInElements(); // フェードイン要素の制御
});
