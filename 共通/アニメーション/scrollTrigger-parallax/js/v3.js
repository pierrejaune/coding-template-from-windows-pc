window.addEventListener('scroll', () => {
  const target = document.querySelector('.f-main-wrap');
  const snow = document.querySelector('.snow');

  if (!target || !snow) return;

  // 要素の位置を取得
  const rect = target.getBoundingClientRect();
  const top = rect.top;

  // 画面上端を超えたらクラス付与
  if (top <= 0) {
    snow.classList.add('on');
  } else {
    snow.classList.remove('on');
  }
});
