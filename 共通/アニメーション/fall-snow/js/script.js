document.addEventListener('DOMContentLoaded', () => {
  const snowAreas = document.querySelectorAll('.snow_area');

  // サイズごとの出現確率（合計100にしなくてもOK）
  const sizeDistribution = [
    { class: 's', weight: 60 }, // 小雪
    { class: 'm', weight: 30 }, // 中雪
    { class: 'l', weight: 10 }, // 大雪
  ];

  // 雪の生成間隔（ms）
  const snowInterval = 600; // ← 数値を増やすと雪が減る

  snowAreas.forEach((area) => {
    const areaWidth = area.offsetWidth;

    setInterval(() => {
      const snow = document.createElement('span');
      snow.classList.add('snowflake');

      // サイズを重み付きランダムで選択
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

      // ランダムな横位置
      const left = Math.random() * areaWidth;
      snow.style.left = `${left}px`;

      // 横揺れの幅をランダム（エリア幅の10〜30%）
      const swayRange = (Math.random() * 0.2 + 0.1) * areaWidth; // 10〜30%
      snow.style.setProperty('--sway', `${swayRange}px`);

      // アニメーション時間をランダムに
      const duration = Math.random() * 5 + 6; // 6〜11秒
      snow.style.animationDuration = `${duration}s`;

      // ランダムで開始ディレイ
      snow.style.animationDelay = `${Math.random() * 3}s`;

      // アニメーション設定
      snow.style.animationName = 'fall';

      area.appendChild(snow);

      // アニメーション終了後に削除
      snow.addEventListener('animationend', () => {
        snow.remove();
      });
    }, snowInterval);
  });
});
