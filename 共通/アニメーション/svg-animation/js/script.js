document.addEventListener('DOMContentLoaded', () => {
  const observerSettings = [
    { selector: '.anim', classToAdd: 'showed', threshold: 0.5, reverse: false },
    {
      selector: '.js_movie',
      classToAdd: 'showed',
      threshold: 0.1,
      reverse: true,
    },
  ];

  observerSettings.forEach((setting) => {
    const elements = document.querySelectorAll(setting.selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(setting.classToAdd);

            if (
              setting.selector === '.js_movie' &&
              entry.target.tagName === 'VIDEO'
            ) {
              entry.target.play().catch(() => {});
            }
          } else if (setting.reverse) {
            entry.target.classList.remove(setting.classToAdd);

            if (
              setting.selector === '.js_movie' &&
              entry.target.tagName === 'VIDEO'
            ) {
              entry.target.pause();
            }
          }
        });
      },
      { threshold: setting.threshold }
    );

    elements.forEach((el) => observer.observe(el));
  });

  // -------------------------------------
  // SVGパスの手書きアニメーション設定
  // -------------------------------------
  // すべての .js-draw 要素（SVG path）を取得
  const paths = document.querySelectorAll('.js-draw');

  paths.forEach((path) => {
    // パスの全長を取得（パスごとに異なる）
    const length = path.getTotalLength();

    // CSS変数にパス長を代入（CSS側でも利用できる）
    path.style.setProperty('--path-length', `${length}px`);

    // strokeDasharray を全長に設定（線を「線分」に分解）
    path.style.strokeDasharray = length;

    // strokeDashoffset = 0 で「線がすべて表示された状態」
    // この状態からアニメーションで offset を増やしていくと「逆方向」に描かれる
    path.style.strokeDashoffset = 0;

    // 初期状態ではアニメーションを止めておく
    path.style.opacity = 0; // ← ちらつき防止（非表示）

    // -------------------------------------
    // IntersectionObserverで可視範囲検知
    // -------------------------------------
    const pathObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 可視範囲に入った瞬間に描画を開始
            path.style.opacity = 1;
            path.classList.add('showed');
          } else {
            // 可視範囲外に出たときの挙動（必要なら再描画対応）
            // path.classList.remove('showed');
            // path.style.strokeDashoffset = 0;
            // path.style.opacity = 0;
          }
        });
      },
      {
        threshold: 0.3, // 30%見えた時に発火
      }
    );

    // 各パスを監視開始
    pathObserver.observe(path);
  });
});
