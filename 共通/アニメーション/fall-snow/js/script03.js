document.addEventListener('DOMContentLoaded', () => {
  const areas = document.querySelectorAll('.snow_area');

  // ======== ファーストビューで雪を表示するかどうかのフラグ ========
  // true にすると読み込み直後から雪が降っているように見える
  // false にすると通常通り読み込み後に雪が降り始める
  const showInitialSnow = false;

  areas.forEach((area) => {
    // ======== SP基準で雪の速度を統一するための設定 ========
    // PCでは html{font-size:0.7142857vw;} によってremが可変のため、
    // rem単位で速度を設定すると、画面幅で雪の速さが変化してしまう。
    // そのため、SPデザイン（750px幅）基準の「1rem=10px」を固定値として扱う。
    const remPx = 10; // ← SPでの1remを固定化（SPでもPCでも速度が同じに見える）

    // ======== data-speed属性から雪の速度（rem/秒単位）を取得 ========
    // 例: <div class="snow_area" data-speed="5"></div>
    //     → 基準速度 = 5rem/s
    const baseSpeedRem = parseFloat(area.dataset.speed) || 5; // rem/s
    const baseSpeedPx = baseSpeedRem * remPx; // px/s に換算

    const height = area.offsetHeight;

    // ======== 落下スピードのランダム倍率（5段階） ========
    // 同じdata-speedでも、ランダムな速度差をつけて自然に見せる
    const speedRates = [0.6, 0.8, 1.0, 1.2, 1.5];

    // ===================== 雪生成関数 =====================
    function createSnowflake(initial = false) {
      const snow = document.createElement('span');
      snow.classList.add('snowflake');

      // サイズランダム（小60%, 中30%, 大10%）
      const r = Math.random();
      if (r < 0.6) snow.classList.add('s');
      else if (r < 0.9) snow.classList.add('m');
      else snow.classList.add('l');

      // 横位置ランダム配置
      const areaWidth = area.offsetWidth;
      snow.style.left = Math.random() * areaWidth + 'px';

      // 横揺れ量ランダム（エリア幅の10%まで）
      const sway = Math.random() * 0.1 * areaWidth;
      snow.style.setProperty('--sway', `${sway}px`);

      // ランダムな速度倍率を選択
      const rate = speedRates[Math.floor(Math.random() * speedRates.length)];
      const speedPx = baseSpeedPx * rate; // 実際のピクセル/秒
      const duration = (height / speedPx).toFixed(2); // 1回の落下時間（秒）

      // 落下アニメーション設定
      snow.style.animation = `fall ${duration}s linear forwards`;

      // ======== ファーストビュー表示対応 ========
      if (initial) {
        // すでに途中から落ちているように見せる
        const progress = Math.random(); // 0〜1 の間
        const delay = -(duration * progress).toFixed(2); // マイナス値で途中から再生
        snow.style.animationDelay = `${delay}s`;
      }

      area.appendChild(snow);

      // アニメーション終了後に要素削除
      setTimeout(() => snow.remove(), duration * 1000);
    }

    // ===================== ファーストビュー時に雪を出す処理 =====================
    if (showInitialSnow) {
      // 表示時にすでに降っているように見せるため、複数個を一気に生成
      const initialCount = 20; // 表示開始時に見せる雪の数
      for (let i = 0; i < initialCount; i++) {
        createSnowflake(true);
      }
    }

    // ===================== 通常の雪降りループ =====================
    const interval = setInterval(() => {
      if (document.body.contains(area)) {
        createSnowflake(false);
      } else {
        // 対象エリアが削除されたら停止（メモリリーク防止）
        clearInterval(interval);
      }
    }, 300); // ← この値を大きくすると雪の量が減ります（生成間隔）
  });
});
