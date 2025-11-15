// ✅ requestAnimationFrame + アロー関数 + getBoundingClientRect().height 対応済みコード

window.addEventListener('DOMContentLoaded', () => {
  const ball = document.querySelector('.pc-ball');
  const container = document.querySelector('.pc-flex__left--inner');

  // .container__sticky の top 位置を調整
  const updateStickyPositions = () => {
    const containers = document.querySelectorAll('.container__sticky');
    const viewportHeight = window.innerHeight;

    containers.forEach((container) => {
      const containerHeight = container.getBoundingClientRect().height;
      const topValue = containerHeight - (viewportHeight / 2 + 79);
      container.style.top = -topValue + 'px';
    });

    updateBall(); // 初期位置の更新も行う
  };

  let ticking = false;

  // スクロールイベントハンドラ（requestAnimationFrameで制御）
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateBall();
        ticking = false;
      });
    }
  };

  // ボールの位置と回転をスクロールに応じて更新
  const updateBall = () => {
    if (!ball || !container) return;

    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    const containerHeight = container.getBoundingClientRect().height;
    const ballHeight = ball.getBoundingClientRect().height;

    const maxMoveY = containerHeight * 0.8 - ballHeight;
    const moveY = Math.min(scrollPercent * maxMoveY, maxMoveY);
    const rotateDeg = scrollPercent * 360 * 5;

    ball.style.transform = `translateY(${moveY}px) rotate(${rotateDeg}deg)`;
  };

  // イベント登録
  window.addEventListener('load', updateStickyPositions);
  window.addEventListener('resize', updateStickyPositions);
  window.addEventListener('scroll', onScroll);
});
