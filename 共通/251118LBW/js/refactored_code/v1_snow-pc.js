/****************************************************
 * 定数とユーティリティ関数
 ****************************************************/

// 各 .snowcontents あたりに降らせる雪の数
const SNOW_NUM = 15;

// すべての SnowContainer インスタンスを格納
const snowContainers = [];

/** 範囲指定のランダム整数 */
const rand = (min, max) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

/** 雪の落下速度（ゆっくり化） */
const getRandomSnowSpeed = () => (Math.random() * 2 + 1) / 3;

/** ランダムな雪のサイズ(px)を返す */
const getRandomSnowSize = () => {
  const sizes = [20, 30, 14];
  return sizes[Math.floor(Math.random() * sizes.length)] + 'px';
};

/** "100px" → 100（数値のみ抽出） */
const pxToNum = (px) => parseFloat(px);

/**
 * 雪の left 位置に応じて透明度を制御（中央 30%〜70% を透明化）
 */
const calcOpacity = (left, width, baseOpacity) => {
  const start = width * 0.3;
  const end = width * 0.7;
  return left >= start && left <= end ? 0 : baseOpacity;
};

/****************************************************
 * クラス定義
 ****************************************************/

/** 各 snowcontents を管理するクラス */
class SnowContainer {
  constructor(root) {
    this.root = root;
    this.snowList = [];
    this.wrapper = null;
  }
}

/** 雪 1 粒を管理 */
class Snow {
  constructor(el, speed, container) {
    this.el = el;
    this.speed = speed;
    this.container = container;
    this.originalOpacity = 1.0;
  }
}

/****************************************************
 * 雪 DOM を作成
 ****************************************************/
function createSnowElement(containerEl) {
  const rect = containerEl.getBoundingClientRect();
  const snow = document.createElement('div');

  // 絶対位置
  snow.style.position = 'absolute';
  snow.style.top = rand(0, rect.height - 10) + 'px';
  snow.style.left = rand(10, rect.width - 10) + 'px';

  // サイズ
  const size = getRandomSnowSize();
  snow.style.width = size;
  snow.style.height = size;

  // 画像設定
  snow.style.backgroundImage = "url('./img/snow.png')";
  snow.style.backgroundSize = 'contain';
  snow.style.backgroundRepeat = 'no-repeat';
  snow.style.backgroundPosition = 'center';

  // スタイル
  snow.style.opacity = '1';
  snow.style.zIndex = '9999';
  snow.style.pointerEvents = 'none';

  return { el: snow, opacity: 1 };
}

/****************************************************
 * 雪アニメーション：すべての雪を動かす
 ****************************************************/
function moveSnow() {
  snowContainers.forEach((container) => {
    const rect = container.root.getBoundingClientRect();

    container.snowList.forEach((snowObj) => {
      const el = snowObj.el;

      // 現在 top の数値化
      let top = pxToNum(el.style.top) + snowObj.speed;

      // 下まで来たら上にリセット
      if (top >= rect.height - 10) {
        top = 0;

        // サイズ・位置・速度リセット
        const size = getRandomSnowSize();
        el.style.width = size;
        el.style.height = size;
        el.style.left = rand(10, rect.width - 10) + 'px';
        snowObj.originalOpacity = 1.0;
        snowObj.speed = getRandomSnowSpeed();
      }

      // top 更新
      el.style.top = top + 'px';

      // 位置に応じて透明度調整
      const left = pxToNum(el.style.left);
      el.style.opacity = calcOpacity(left, rect.width, snowObj.originalOpacity);
    });
  });
}

/****************************************************
 * 初期化処理
 ****************************************************/
function initSnow() {
  document.querySelectorAll('.snowcontents').forEach((root) => {
    // relative 化
    if (getComputedStyle(root).position === 'static') {
      root.style.position = 'relative';
    }

    const container = new SnowContainer(root);

    // 雪のラッパー div
    const wrapper = document.createElement('div');
    wrapper.className = 'snow_container';
    wrapper.style.position = 'absolute';
    wrapper.style.top = 0;
    wrapper.style.left = 0;
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.overflow = 'hidden';

    root.appendChild(wrapper);
    container.wrapper = wrapper;

    // 雪生成
    for (let i = 0; i < SNOW_NUM; i++) {
      const { el, opacity } = createSnowElement(root);
      wrapper.appendChild(el);

      const snowObj = new Snow(el, getRandomSnowSpeed(), root);
      snowObj.originalOpacity = opacity;
      container.snowList.push(snowObj);
    }

    snowContainers.push(container);
  });

  // アニメーション実行
  if (snowContainers.length > 0) {
    setInterval(moveSnow, 10);
  }
}

/****************************************************
 * DOM 準備完了で開始
 ****************************************************/
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', initSnow)
  : initSnow();
