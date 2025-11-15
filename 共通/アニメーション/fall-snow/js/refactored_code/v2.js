// =========================================================
// requestAnimationFrame 版 軽量ランダム降雪アニメーション
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const areas = document.querySelectorAll('.snow-area');
  const showInitialSnow = true; // 読み込み時から降っているように見せる

  areas.forEach((area) => {
    // ======== 設定値 ========
    const remPx = 10; // SP基準 1rem = 10px
    const baseSpeedRem = parseFloat(area.dataset.speed) || 5; // rem/s
    const baseSpeedPx = baseSpeedRem * remPx;
    const areaWidth = area.offsetWidth;
    const areaHeight = area.offsetHeight;
    const speedRates = [0.6, 0.8, 1.0, 1.2, 1.5];
    const snowflakes = []; // 雪オブジェクトを保持
    let isRunning = true; // アニメーション継続フラグ

    // ===============================
    // 雪オブジェクトの生成関数
    // ===============================
    function createSnowflake(initial = false) {
      const snow = document.createElement('span');
      snow.classList.add('snowflake');

      // サイズランダム（小60%, 中30%, 大10%）
      const r = Math.random();
      if (r < 0.6) snow.classList.add('s');
      else if (r < 0.9) snow.classList.add('m');
      else snow.classList.add('l');

      // 横位置・速度・揺れ設定
      const x = Math.random() * areaWidth;
      const sway = Math.random() * 0.15 * areaWidth; // 横揺れ幅
      const rate = speedRates[Math.floor(Math.random() * speedRates.length)];
      const speed = baseSpeedPx * rate; // px/s
      const size = snow.classList.contains('s')
        ? 0.8 * remPx
        : snow.classList.contains('m')
        ? 1.4 * remPx
        : 2.7 * remPx;

      // 初期Y座標（ファーストビューなら途中から降っている）
      let y = initial ? Math.random() * areaHeight : -size;

      // DOMに追加
      snow.style.left = x + 'px';
      area.appendChild(snow);

      // JSで座標更新するためのオブジェクトを返す
      const flake = {
        el: snow,
        x,
        y,
        sway,
        speed,
        size,
        angle: Math.random() * 360,
      };
      snowflakes.push(flake);
    }

    // ===============================
    // 雪の生成（初期または5秒間）
    // ===============================
    if (showInitialSnow) {
      // 表示開始時にランダムな位置に100個
      for (let i = 0; i < 100; i++) createSnowflake(true);
    } else {
      // 通常生成（5秒間だけ）
      const genInterval = setInterval(() => {
        createSnowflake(false);
      }, 100);

      setTimeout(() => clearInterval(genInterval), 5000);
    }

    // ===============================
    // アニメーション更新ループ
    // ===============================
    function animate() {
      if (!isRunning) return;

      const now = performance.now();

      // 各雪を更新
      for (let i = snowflakes.length - 1; i >= 0; i--) {
        const flake = snowflakes[i];
        flake.y += flake.speed / 60; // 60fps基準
        flake.angle += 0.02; // 横揺れ角度更新
        const offsetX = Math.sin(flake.angle) * (flake.sway / 2);

        // 位置を反映（transformでGPU描画）
        flake.el.style.transform = `translate(${offsetX}px, ${flake.y}px)`;

        // 画面外に出たら削除
        if (flake.y > areaHeight + flake.size) {
          flake.el.remove();
          snowflakes.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    // ループ開始
    requestAnimationFrame(animate);

    // ===============================
    // 要素が削除されたら停止（メモリリーク防止）
    // ===============================
    const observer = new MutationObserver(() => {
      if (!document.body.contains(area)) {
        isRunning = false;
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
});
