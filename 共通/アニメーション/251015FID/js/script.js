// ================================
// Slides（スライダーの初期化）
// ================================

// 通常スライドを適用するコンテナ番号の配列
const normalSlideContainerNumbers = [3, 7, 18];

// フェードスライドを適用するコンテナ番号の配列
const fadeSlideContainerNumbers = [5, 10, 11, 14, 19, 21, 24];

// 通常スライド（連続スクロール）を初期化する関数
function initNormalSlide(containerNumber) {
  new Swiper(`.container${containerNumber} .swiper-container`, {
    loop: true, // スライドをループさせる
    speed: 4000, // スライドの移動速度（ミリ秒）
    autoplay: {
      delay: 0, // 待機時間なしで自動再生（連続スクロール）
      disableOnInteraction: false, // ユーザー操作後も自動再生を継続
    },
    slidesPerView: 'auto', // 画面に複数スライドを自動で表示
  });
}

// フェードスライド（フェードで切り替え）を初期化する関数
function initFadeSlide(containerNumber) {
  new Swiper(`.container${containerNumber} .swiper-container`, {
    loop: true, // スライドをループさせる
    speed: 800, // 切り替えアニメーションの速度
    effect: 'fade', // フェード効果を使用
    fadeEffect: { crossFade: true }, // フェード時に前後をクロスフェード
    autoplay: {
      delay: 2600, // 各スライドの表示時間
      disableOnInteraction: false, // ユーザー操作後も自動再生を継続
    },
    normalizeSlideIndex: true, // スライドインデックスを正規化
    watchOverflow: true, // スライド数が少ない場合にエラーを防ぐ
    pagination: {
      el: document.querySelector(
        `.container${containerNumber} .swiper-pagination`
      ), // ページネーション要素を指定
      clickable: true, // ページネーションをクリック可能にする
    },
  });
}

// 定義した番号のコンテナに対して通常スライドを初期化
normalSlideContainerNumbers.forEach((number) => initNormalSlide(number));

// 定義した番号のコンテナに対してフェードスライドを初期化
fadeSlideContainerNumbers.forEach((number) => initFadeSlide(number));

// ================================
// Intersection Observer（要素が画面内に入ったときのアニメーション制御）
// ================================

// data-observer 属性を持つ要素を全て取得
const observedObjects = document.querySelectorAll('[data-observer]');

// IntersectionObserverの設定
const observerOption = {
  root: null, // ビューポートを基準に監視
  rootMargin: '0px', // 判定範囲の余白なし
  threshold: 0.1, // 10%以上見えたら「交差」と判定
};

// IntersectionObserverを生成
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // 要素が画面内に入り、まだactiveクラスが付いていない場合に付与
    if (entry.isIntersecting && !entry.target.classList.contains('active')) {
      entry.target.classList.add('active');
    }

    // activeになった要素が trigger-credit 属性を持つ場合、親要素内の .credits-container にactiveを付与
    if (
      entry.target.classList.contains('active') &&
      entry.target.getAttribute('trigger-credit') === ''
    ) {
      entry.target.parentElement
        .querySelector('.credits-container')
        .classList.add('active');
    }

    // activeになった要素が trigger-text 属性を持つ場合、親要素内の .container__text にactiveを付与
    if (
      entry.target.classList.contains('active') &&
      entry.target.getAttribute('trigger-text') === ''
    ) {
      entry.target.parentElement
        .querySelector('.container__text')
        .classList.add('active');
    }
  });
}, observerOption);

// 取得した全要素を監視対象として登録
observedObjects.forEach((object) => observer.observe(object));

// ================================
// Fixed ribbon contents（リボン要素の表示制御）
// ================================

// 公開日時をUTCで設定
const openDate = new Date('2025-10-18T00:00:00Z');

// JST（日本時間）に変換（UTCから+9時間）
const jstOpenDate = new Date(openDate.getTime() - 9 * 60 * 60 * 1000);

// 現在時刻を取得
const nowDateTime = new Date();

// 現在時刻が公開日時を過ぎていたら、.fixed-text__point 要素を非表示にする
nowDateTime > jstOpenDate
  ? (document.querySelector('.fixed-text__point').style.display = 'none')
  : null;

// ================================
// Sticky containers（stickyエリアの高さをCSS変数に反映）
// ================================

// ルート要素（<html>）を取得
const root = document.documentElement;

// stickyコンテナの高さを取得してCSS変数にセットする関数
function updateContentHeight() {
  const numberOfContainers = 7; // sticky-container の数（例：7個）
  for (let i = 1; i <= numberOfContainers; i++) {
    const content = document.querySelector(`.sticky-container${i}`);
    // 各コンテナの高さをCSS変数 --container-heightN に代入
    root.style.setProperty(
      `--container-height${i}`,
      `${content.offsetHeight}px`
    );
  }
}

// ページ読み込み時とリサイズ時に高さを更新
window.addEventListener('load', updateContentHeight);
window.addEventListener('resize', updateContentHeight);
