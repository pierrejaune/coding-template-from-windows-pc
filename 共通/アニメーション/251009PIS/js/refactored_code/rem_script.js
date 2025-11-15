document.addEventListener('DOMContentLoaded', () => {
  const snowContainer = document.getElementById('snow-container');
  if (!snowContainer) return;

  const snowImages = ['img/ball01.png', 'img/ball02.png', 'img/ball03.png'];
  const minCount = 1;
  const maxCount = 2;
  const interval = 2500;
  const minSpeed = 12;
  const maxSpeed = 18;
  const minSize = 2.3; // rem単位で設定
  const maxSize = 2.4;
  const maxXMove = 5;

  // -----------------------------
  // rem値をpxに変換する関数
  // -----------------------------
  function remToPx(rem) {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return rem * rootFontSize;
  }

  // -----------------------------
  // 雪の結晶を生成
  // -----------------------------
  function createSnowflake() {
    const flake = document.createElement('img');
    flake.src = snowImages[Math.floor(Math.random() * snowImages.length)];
    flake.className = 'snowflake';

    // サイズをremベースで算出
    const baseSize = Math.random() * (maxSize - minSize) + minSize;
    const pxSize = remToPx(baseSize);
    flake.style.width = `${pxSize}px`;
    flake.style.height = `${pxSize}px`;

    const containerWidth = snowContainer.clientWidth;
    const startX = Math.random() * (containerWidth - pxSize);
    flake.style.left = `${startX}px`;

    const xMove = (Math.random() - 0.5) * 2 * remToPx(maxXMove);
    flake.style.setProperty('--x-move', `${xMove}px`);

    const duration = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    flake.style.animationDuration = `${duration}s`;

    snowContainer.appendChild(flake);
    setTimeout(() => flake.remove(), duration * 1000);
  }

  // -----------------------------
  // 一定間隔で雪を生成
  // -----------------------------
  setInterval(() => {
    const count =
      Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    for (let i = 0; i < count; i++) createSnowflake();
  }, interval);
});
