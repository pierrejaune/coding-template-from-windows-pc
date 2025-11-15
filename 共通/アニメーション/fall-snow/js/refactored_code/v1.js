// ---------------------------------------------
// 再利用型・負荷軽減 雪アニメーション
// ---------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const areas = document.querySelectorAll('.snow-area');

  const showInitialSnow = true; // ファーストビュー時にすでに降っているように見せる
  const initialCount = 100; // 雪の総数（固定）

  areas.forEach((area) => {
    const remPx = 10;
    const baseSpeedRem = parseFloat(area.dataset.speed) || 5;
    const baseSpeedPx = baseSpeedRem * remPx;
    const height = area.offsetHeight;
    const speedRates = [0.6, 0.8, 1.0, 1.2, 1.5];

    const snowflakes = [];

    // ======== 雪の初期生成関数 ========
    function createSnowflake(initial = false) {
      const snow = document.createElement('span');
      snow.classList.add('snowflake');

      // サイズランダム
      const r = Math.random();
      if (r < 0.6) snow.classList.add('s');
      else if (r < 0.9) snow.classList.add('m');
      else snow.classList.add('l');

      // ランダム初期配置
      resetSnowflake(snow, initial);
      area.appendChild(snow);
      snowflakes.push(snow);
    }

    // ======== 再利用時に雪をリセットする関数 ========
    function resetSnowflake(snow, initial = false) {
      const areaWidth = area.offsetWidth;

      // 横位置・揺れ・速度をランダム再設定
      snow.style.left = Math.random() * areaWidth + 'px';
      const sway = Math.random() * 0.15 * areaWidth;
      snow.style.setProperty('--sway', `${sway}px`);

      const rate = speedRates[Math.floor(Math.random() * speedRates.length)];
      const speedPx = baseSpeedPx * rate;
      const duration = (height / speedPx).toFixed(2);
      snow.style.animation = `fall ${duration}s linear forwards`;

      if (initial) {
        const progress = Math.random();
        const delay = -(duration * progress).toFixed(2);
        snow.style.animationDelay = `${delay}s`;
      } else {
        snow.style.animationDelay = `0s`;
      }

      // 落下終了後に上に戻す
      setTimeout(() => {
        resetSnowflake(snow, false);
      }, duration * 1000);
    }

    // ======== 初期生成（最初の5秒以内） ========
    if (showInitialSnow) {
      for (let i = 0; i < initialCount; i++) {
        createSnowflake(true);
      }
    } else {
      // 最初は雪なし → 5秒かけて追加していく
      let created = 0;
      const loop = setInterval(() => {
        createSnowflake(false);
        created++;
        if (created >= initialCount) clearInterval(loop);
      }, 50); // 5秒で100個（50ms間隔）
    }

    // 5秒経過後は再利用ループのみで雪を維持
  });
});
