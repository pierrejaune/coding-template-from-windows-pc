// ===============================
// ランダム降雪アニメーション（軽量版）
// requestAnimationFrame を使用
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const areas = document.querySelectorAll('.snow-area');

  // ======== ファーストビューで雪を表示するかどうかのフラグ ========
  const showInitialSnow = true;

  areas.forEach((area) => {
    // ======== 設定値の取得 ========
    const remPx = 10; // 1rem = 10px（SPデザイン基準）
    const baseSpeedRem = parseFloat(area.dataset.speed) || 5; // rem/s
    const baseSpeedPx = baseSpeedRem * remPx; // px/s に換算
    const height = area.offsetHeight;

    // ======== ランダムな速度倍率（自然な降り方に見せる） ========
    const speedRates = [0.6, 0.8, 1.0, 1.2, 1.5];

    // ===================== 雪生成関数 =====================
    function createSnowflake(initial = false) {
      const snow = document.createElement('span');
      snow.classList.add('snowflake');

      // サイズをランダムに設定（小60%, 中30%, 大10%）
      const r = Math.random();
      if (r < 0.6) snow.classList.add('s');
      else if (r < 0.9) snow.classList.add('m');
      else snow.classList.add('l');

      // 横位置をランダムに設定
      const areaWidth = area.offsetWidth;
      snow.style.left = Math.random() * areaWidth + 'px';

      // 横揺れ幅をランダム設定（エリア幅の15%まで）
      const sway = Math.random() * 0.15 * areaWidth;
      snow.style.setProperty('--sway', `${sway}px`);

      // ランダムな速度倍率を選択
      const rate = speedRates[Math.floor(Math.random() * speedRates.length)];
      const speedPx = baseSpeedPx * rate;
      const duration = (height / speedPx).toFixed(2); // 落下時間（秒）

      // 落下アニメーション設定
      snow.style.animation = `fall ${duration}s linear forwards`;

      // ======== ファーストビュー表示対応 ========
      if (initial) {
        // 途中から落ちているように見せる（delayをマイナスに）
        const progress = Math.random();
        const delay = -(duration * progress).toFixed(2);
        snow.style.animationDelay = `${delay}s`;
      }

      area.appendChild(snow);

      // アニメーション終了後に要素削除
      setTimeout(() => snow.remove(), duration * 1000);
    }

    // ===================== ファーストビュー雪生成 =====================
    if (showInitialSnow) {
      const initialCount = 100;
      for (let i = 0; i < initialCount; i++) {
        createSnowflake(true);
      }
    }

    // ===================== 雪降りループ（rAFで軽量化） =====================
    let lastTime = performance.now();
    const interval = 300; // 300msごとに雪生成
    let accumulator = 0;
    let active = true;

    function loop(now) {
      if (!active) return; // 停止フラグ

      const delta = now - lastTime;
      lastTime = now;
      accumulator += delta;

      // エリアがDOMに存在しない場合は停止
      if (!document.body.contains(area)) {
        active = false;
        return;
      }

      // 累積時間がintervalを超えたら雪を生成
      if (accumulator >= interval) {
        createSnowflake(false);
        accumulator -= interval;
      }

      // 次のフレームを要求
      requestAnimationFrame(loop);
    }

    // 初回呼び出し
    requestAnimationFrame(loop);
  });
});
