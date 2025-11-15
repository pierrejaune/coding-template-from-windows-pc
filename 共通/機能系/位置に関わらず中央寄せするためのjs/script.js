const centerRelativeElementXWithLeft = (selector, leftSelector) => {
  const el = document.querySelector(selector); // 中央にしたい要素
  const leftEl = document.querySelector(leftSelector); // 左側の要素

  if (!el || !el.offsetParent || !leftEl) return;

  const parent = el.offsetParent;
  const elWidth = el.offsetWidth;
  const parentWidth = parent.offsetWidth;
  const leftElWidth = leftEl.offsetWidth;

  const a = leftElWidth + parentWidth;
  const vw = window.innerWidth;
  const b = (vw - a) / 2;

  const totalShift = a + b;

  el.style.position = 'relative';
  el.style.left = `${a}px`; // 一旦左に配置
  el.style.transform = `translateX(-${totalShift}px)`;
};

// 実行例（例: .my-box を横方向中央に）
window.addEventListener('load', () =>
  centerRelativeElementXWithLeft('.feature .main', '.feature__movie')
);
window.addEventListener('resize', () =>
  centerRelativeElementXWithLeft('.feature .main', '.feature__movie')
);
