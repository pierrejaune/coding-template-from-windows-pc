// --vw, --vh を JavaScriptでセット（resize / scroll / load に対応）
function setViewportUnits() {
  const vw = window.innerWidth * 0.01;
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 初回読み込み・リサイズ・スクロール時に更新
window.addEventListener('load', setViewportUnits);
window.addEventListener('resize', setViewportUnits);
window.addEventListener('scroll', setViewportUnits);
