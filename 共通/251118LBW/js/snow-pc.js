const SNOW_NUM = 15; // 各.snowcontentsあたりの雪の数
const snow_containers = [];

class SnowContainer {
  constructor(container) {
    this.container = container;
    this.snow_list = [];
    this.snow_div = null;
  }
}

class Snow {
  constructor(snow, speed, container) {
    this.snow = snow;
    this.speed = speed;
    this.container = container;
    this.originalOpacity = 1.0; // 元の透明度を保存
  }
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomSnowSpeed() {
  // 速度を10倍遅くする (0.1～0.3の範囲)
  return (Math.random() * 2 + 1) / 3;
}

// 0.2rem～2remの間で0.2rem刻みでランダムなサイズを取得
function getRandomSnowSize() {
  const sizes = [20, 30, 14];
  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex] + 'px';
}

// "100px"のような文字列から数字部分だけを抜き出す
function getPxNum(px_str) {
  var i;
  for (i = 0; i < px_str.length; i++) {
    if (isNaN(px_str[i]) && px_str[i] != '.') break;
  }
  const num_str = px_str.substring(0, i);
  return Number(num_str);
}

// 中央エリアに基づいて透明度を計算する関数（フェードゾーンなし）
function calculateOpacityBasedOnPosition(
  leftPos,
  containerWidth,
  originalOpacity
) {
  // 中央40%のエリア（左から30%〜70%）
  const centerStart = containerWidth * 0.3;
  const centerEnd = containerWidth * 0.7;

  // 中央エリア内なら完全に透明、それ以外は元の透明度
  if (leftPos >= centerStart && leftPos <= centerEnd) {
    return 0; // 中央エリアでは完全に透明
  } else {
    return originalOpacity; // それ以外では元の透明度
  }
}

function moveSnow() {
  snow_containers.forEach((container) => {
    const containerRect = container.container.getBoundingClientRect();

    for (let i = 0; i < container.snow_list.length; i++) {
      const snow_obj = container.snow_list[i];

      // 雪が親要素の底に到達する前に一番上に戻す
      let top_num = getPxNum(snow_obj.snow.style.top) + snow_obj.speed;
      if (top_num >= containerRect.height - 10) {
        // 雪を初期化
        top_num = 0;
        const random_size = getRandomSnowSize();
        snow_obj.snow.style.width = random_size;
        snow_obj.snow.style.height = random_size;
        snow_obj.snow.style.left =
          String(getRandom(10, containerRect.width - 10)) + 'px';
        snow_obj.originalOpacity = 1.0; // 元の透明度を設定
        snow_obj.speed = getRandomSnowSpeed();
      }

      // 各雪を下にずらす
      snow_obj.snow.style.top = String(top_num) + 'px';

      // 現在の水平位置を取得
      const leftPos = getPxNum(snow_obj.snow.style.left);

      // 位置に基づいて透明度を調整
      const adjustedOpacity = calculateOpacityBasedOnPosition(
        leftPos,
        containerRect.width,
        snow_obj.originalOpacity
      );
      snow_obj.snow.style.opacity = adjustedOpacity;
    }
  });
}

function createSnow(container) {
  const snow = document.createElement('div');
  const containerRect = container.getBoundingClientRect();

  // 位置の設定（コンテナ内でのrelative位置）
  snow.style.position = 'absolute';
  snow.style.top = String(getRandom(0, containerRect.height - 10)) + 'px';
  snow.style.left = String(getRandom(10, containerRect.width - 10)) + 'px';

  // サイズの設定（0.2rem～2remの間で0.2rem刻み）
  const random_size = getRandomSnowSize();
  snow.style.width = random_size;
  snow.style.height = random_size;

  // 雪の画像を設定
  snow.style.backgroundImage = "url('./img/snow.png')";
  snow.style.backgroundSize = 'contain';
  snow.style.backgroundRepeat = 'no-repeat';
  snow.style.backgroundPosition = 'center';

  // 完全不透明に設定
  snow.style.opacity = 1.0;

  // z-indexを設定して前面に表示
  snow.style.zIndex = '9999';

  // ポインターイベントを無効化（クリックを透過させる）
  snow.style.pointerEvents = 'none';

  return { element: snow, initialOpacity: 1.0 };
}

function initSnow() {
  // すべての.snowcontents要素を取得
  const snowContentsElements = document.querySelectorAll('.snowcontents');

  snowContentsElements.forEach((element) => {
    // position: relativeを設定（絶対位置の子要素の基準点にする）
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }

    const container = new SnowContainer(element);

    // 雪を入れるコンテナdivを作成
    const snow_div = document.createElement('div');
    snow_div.className = 'snow_container';
    snow_div.style.position = 'absolute';
    snow_div.style.top = '0';
    snow_div.style.left = '0';
    snow_div.style.width = '100%';
    snow_div.style.height = '100%';
    snow_div.style.pointerEvents = 'none'; // クリックを透過
    snow_div.style.overflow = 'hidden'; // はみ出た雪を隠す
    element.appendChild(snow_div);

    container.snow_div = snow_div;

    // 雪を生成
    for (let i = 0; i < SNOW_NUM; i++) {
      let { element: snow, initialOpacity } = createSnow(element);
      snow_div.appendChild(snow);
      const snowObj = new Snow(snow, getRandomSnowSpeed(), element);
      snowObj.originalOpacity = initialOpacity;
      container.snow_list.push(snowObj);
    }

    snow_containers.push(container);
  });

  // moveSnowを10msごとに定期実行
  if (snow_containers.length > 0) {
    setInterval(moveSnow, 10);
  }
}

// DOMが読み込まれたら実行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSnow);
} else {
  initSnow();
}
