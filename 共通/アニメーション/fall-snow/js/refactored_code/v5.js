// ============================================================
// 軽量ランダム降雪アニメーション
// - requestAnimationFrameで生成タイミング制御
// - IntersectionObserverで可視範囲＋100pxで初回降雪開始
// - data-always="true" を指定したエリアは常に初回降雪
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const areas = document.querySelectorAll('.snow-area');

  // ======== 設定：初回に見せたい雪の数 ========
  const initialCount = 100;

  // ======== 画面内に入った時だけ降雪を開始する ========
  // rootMargin: '100px 0px' → 画面上下100pxの範囲で発火
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const area = entry.target;

        // すでに降雪を開始しているならスキップ（重複防止）
        if (area.dataset.started === 'true') return;

        // 画面に入るか、または data-always="true" が付いている場合に降雪開始
        if (entry.isIntersecting || area.dataset.always === 'true') {
          startSnow(area);
          area.dataset.started = 'true'; // 再実行防止
        }
      });
    },
    { root: null, rootMargin: '100px 0px', threshold: 0 }
  );

  // ======== 監視開始 ========
  areas.forEach((area) => {
    // data-always="true" の場合は即開始
    if (area.dataset.always === 'true') {
      startSnow(area);
      area.dataset.started = 'true';
    } else {
      observer.observe(area);
    }
  });

  // ============================================================
  // 雪を降らせる関数本体
  // ============================================================
  function startSnow(area) {
    // ======== 設定値取得 ========
    const remPx = 10; // 1rem = 10px 固定
    const baseSpeedRem = parseFloat(area.dataset.speed) || 5; // rem/s
    const baseSpeedPx = baseSpeedRem * remPx; // px/s に換算
    const height = area.offsetHeight;
    const speedRates = [0.6, 0.8, 1.0, 1.2, 1.5]; // 落下速度のランダム倍率

    // ===================== 雪生成関数 =====================
    function createSnowflake(initial = false) {
      const snow = document.createElement('span');
      snow.classList.add('snowflake');

      // サイズ（小60%, 中30%, 大10%）
      const r = Math.random();
      if (r < 0.6) snow.classList.add('s');
      else if (r < 0.9) snow.classList.add('m');
      else snow.classList.add('l');

      // 横位置ランダム配置
      const areaWidth = area.offsetWidth;
      snow.style.left = Math.random() * areaWidth + 'px';

      // 横揺れ幅ランダム（エリア幅の100%もしくはdata-sway指定値まで）
      const dataSway = parseFloat(area.dataset.sway);
      const swayRate = isNaN(dataSway) ? 1 : dataSway; //dataSway未設定なら1
      // console.log(swayRate);
      const sway = Math.random() * swayRate * areaWidth;
      snow.style.setProperty('--sway', `${sway}px`);

      // ランダム速度設定
      // const rate = speedRates[Math.floor(Math.random() * speedRates.length)];
      // const speedPx = baseSpeedPx * rate;
      // const duration = (height / speedPx).toFixed(2);

      // // 落下アニメーション設定
      // snow.style.animation = `fall ${duration}s linear forwards`;

      // ランダム速度設定
      const rate = speedRates[Math.floor(Math.random() * speedRates.length)];
      const speedPx = baseSpeedPx * rate;
      const duration = (height / speedPx).toFixed(2);

      // CSS変数で落下・横揺れのアニメーション時間を設定
      snow.style.setProperty('--fall-duration', `${duration}s`);

      // 横揺れは雪のサイズや速度に合わせて少しランダム化
      const swayDuration = (Math.random() * 3 + 3).toFixed(2); // 3〜6秒のランダム
      snow.style.setProperty('--sway-duration', `${swayDuration}s`);

      // アニメーション設定（CSS変数を参照させる）
      snow.style.animation = `fall var(--fall-duration) linear forwards, sway var(--sway-duration) ease-in-out infinite`;

      // ファーストビュー時の途中降下演出
      if (initial) {
        const progress = Math.random();
        const delay = -(duration * progress).toFixed(2);
        snow.style.animationDelay = `${delay}s`;
      }

      area.appendChild(snow);

      // アニメーション終了後に削除
      setTimeout(() => snow.remove(), duration * 1000);
    }

    // ===================== ファーストビュー雪生成 =====================
    for (let i = 0; i < initialCount; i++) {
      createSnowflake(true);
    }

    // ===================== 通常の雪降りループ =====================
    let lastTime = performance.now();
    const interval = 300; // 300msごとに生成(雪の量調整)
    let accumulator = 0;
    let active = true;

    function loop(now) {
      if (!active) return;

      const delta = now - lastTime;
      lastTime = now;
      accumulator += delta;

      // エリアがDOMに存在しない場合は停止（メモリリーク防止）
      if (!document.body.contains(area)) {
        active = false;
        return;
      }

      // intervalを超えたら雪を生成
      if (accumulator >= interval) {
        createSnowflake(false);
        accumulator -= interval;
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }
});
