// -------------------------------------
// SVGパスの手書きアニメーション設定（Edge 対応版）
// - 各 path の長さを取得して CSS 変数にセット
// - 監視は path 自身ではなく ownerSVGElement（親の <svg>）で行う
// -------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // すべての .js-draw 要素（SVG path）を取得
  const paths = document.querySelectorAll('.js-draw');

  paths.forEach((path) => {
    // --- 1) パス長を取得してスタイル初期化 ---
    // getTotalLength() はレンダリング前だと不安定な場合があるため、
    // 強制的にレイアウト情報を取得してから呼ぶ（ブラウザ互換性向上）
    // 例: (親SVGがまだレンダリングされていれば確実)
    path.getBoundingClientRect(); // reflow/triger render（Edge対策）

    const length = path.getTotalLength(); // pathの総長を取得（ピクセルの数値）

    // CSS変数にパス長を代入（CSSで var(--path-length) として使える）
    path.style.setProperty('--path-length', `${length}`);

    // stroke-dasharray を全長に設定（破線パターンを「線分長=全長」に）
    // ※ 単なる数値（px指定は不要）で問題ないブラウザが多いですが
    //    stringで入れてもOK
    path.style.strokeDasharray = length;

    // 初期状態：strokeDashoffset = 0 にして「線は全部表示」させる（今回の要望）
    path.style.strokeDashoffset = 0;

    // ちらつき防止のため最初は非表示にしておく（Intersectionで表示）
    path.style.opacity = 0;

    // --- 2) 観測対象（observe target）を決める ---
    // Edgeで path を直接監視しても isIntersecting が期待通りにならない場合があるため、
    // path.ownerSVGElement（このpathの属する<svg>）を監視する。
    // もしさらに外側のラッパーがあるなら .closest('.anim') 等を使っても良い。
    const svg = path.ownerSVGElement || path.closest('svg') || path;

    // --- 3) IntersectionObserver を作成（SVG/ラッパーを監視） ---
    const observerOptions = {
      threshold: 0.3, // 30% 見えたら発火
    };

    const svgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // entry.target はここでは svg（またはラッパー要素）
        if (entry.isIntersecting) {
          // SVG が可視範囲に入ったら、対応する path を描画開始
          // path が複数ある場合はこのループの外でまとめて操作しても良い
          path.style.opacity = 1;
          path.classList.add('showed');
        } else {
          // 可視範囲外の挙動：必要ならリセット（繰り返し再生が不要ならコメントアウト）
          // path.classList.remove('showed');
          // path.style.strokeDashoffset = 0;
          // path.style.opacity = 0;
        }
      });
    }, observerOptions);

    // --- 4) 監視開始（SVGを監視） ---
    svgObserver.observe(svg);
  });
});
