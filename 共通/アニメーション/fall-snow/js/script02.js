document.addEventListener('DOMContentLoaded', () => {
  const snowAreas = document.querySelectorAll('.snow_area');

  // サイズの出現確率
  const sizeDistribution = [
    { class: 's', weight: 10 },
    { class: 'm', weight: 3 },
    { class: 'l', weight: 5 },
  ];

  // 雪の生成間隔（ms）
  const snowInterval = 600;

  snowAreas.forEach((area) => {
    const areaWidth = area.offsetWidth;

    // 各エリアのスピード範囲を取得（デフォルト値あり）
    const speedMin = parseFloat(area.dataset.speedMin) || 5;
    const speedMax = parseFloat(area.dataset.speedMax) || 10;

    setInterval(() => {
      const snow = document.createElement('span');
      snow.classList.add('snowflake');

      // --- サイズを重み付きランダムで決定 ---
      const totalWeight = sizeDistribution.reduce(
        (sum, s) => sum + s.weight,
        0
      );
      let random = Math.random() * totalWeight;
      let selected = sizeDistribution[0].class;
      for (const s of sizeDistribution) {
        if (random < s.weight) {
          selected = s.class;
          break;
        }
        random -= s.weight;
      }
      snow.classList.add(selected);

      // --- 横位置ランダム ---
      const left = Math.random() * areaWidth;
      snow.style.left = `${left}px`;

      // --- 横揺れの幅をランダム（10〜30%） ---
      // const swayRange = (Math.random() * 0.2 + 0.1) * areaWidth;
      const swayRange = Math.random() * 0.1 * areaWidth;
      snow.style.setProperty('--sway', `${swayRange}px`);

      // --- スピード範囲をデータ属性から適用 ---
      const duration = Math.random() * (speedMax - speedMin) + speedMin;
      snow.style.animationDuration = `${duration}s`;

      // --- アニメーション遅延をランダム ---
      snow.style.animationDelay = `${Math.random() * 3}s`;
      snow.style.animationName = 'fall';

      area.appendChild(snow);

      // 終了後削除
      snow.addEventListener('animationend', () => snow.remove());
    }, snowInterval);
  });
});
