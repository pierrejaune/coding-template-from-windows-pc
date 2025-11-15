// ================================
// 共通：横スクロール（GSAP + ScrollTrigger）
// ================================
const setupHorizontalPinScroll = (selector) => {
  const elements = document.querySelectorAll(selector);

  // 対象要素が存在しない場合は警告を出して処理を終了
  if (elements.length === 0) {
    console.warn(`No elements found for selector: ${selector}`);
    return;
  }

  // ================================
  // PC専用処理（.feature.feature-pc が存在する場合）
  // ================================
  if (document.querySelector('.feature.feature-pc')) {
    elements.forEach((element) => {
      // 横スクロール距離を計算（全幅 − ウィンドウ幅）
      const scrollDistance = () => element.scrollWidth - window.innerWidth;
      // GSAPでX軸方向へスクロール
      const targetX = () => -scrollDistance();

      gsap.to(element, {
        x: targetX,
        ease: 'none',
        scrollTrigger: {
          trigger: element, // スクロールトリガーとなる要素
          pin: true, // ピン留め（固定）
          scrub: 0.1, // スクロールに応じてアニメーション
          start: '-80px start', // 開始位置
          invalidateOnRefresh: true, // リサイズ時に再計算
          end: () => '+=' + scrollDistance(), // スクロール範囲(横スクロールアニメーションが終わるまでのスクロール距離を自動計算)
          // markers: true, // デバッグ用
        },
      });
    });

    // ================================
    // SP専用処理（.feature.feature-pc が存在しない場合）
    // ================================
  } else {
    // container2部分をピン留めし、横にスライドさせる
    let container2Scroll = gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector('.container2'),
        start: 'top top', //要素の上端が画面上端に来たときに開始
        pin: true,
        scrub: 0.1,
        invalidateOnRefresh: true,
        // markers: true,
      },
    });
    // container2内部の横スクロール
    container2Scroll.to(document.querySelector('.container2__2-container'), {
      xPercent: -100, //要素自身の幅の100%分だけ左にスライド
      ease: 'none',
    });

    // 各.horizontal-scroll-container に対しても横スクロール設定
    elements.forEach((element) => {
      const scrollDistance = () => element.scrollWidth - window.innerWidth;
      const targetX = () => -scrollDistance();
      let horizontalScroll = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          pin: true,
          scrub: 0.1,
          start: '-49px top',
          invalidateOnRefresh: true,
          end: () => '+=' + scrollDistance(), //トリガーの開始位置からさらにscrollDistance()の値ぶんスクロールした時
          // markers: true,
        },
      });
      horizontalScroll.to(element, {
        //要素をスクロール量に応じて左に移動させる
        x: targetX,
        ease: 'none',
      });
    });
  }
};

// ================================
// 共通：ロード時にGSAP ScrollTriggerを登録して実行
// ================================
const horizontalPinScroll = () =>
  setupHorizontalPinScroll('.horizontal-scroll-container');
window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);
  horizontalPinScroll();
});

// ================================
// 共通：モーダル表示処理
// data-modal-button → 開く
// modal-close-button → 閉じる
// ================================
const modalButtons = document.querySelectorAll('[data-modal-button]');
modalButtons.forEach((button) =>
  button.addEventListener('click', (e) => {
    const { targetModal } = e.currentTarget.dataset;
    const target = document.querySelector(`[data-modal='${targetModal}']`); //ボタンのdata-target-modalと一致するモーダル要素を取得
    target.setAttribute('data-modal-active', null);

    // 背景スクロールを無効化
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  })
);

const modalCloseButtons = document.querySelectorAll('[modal-close-button]');
modalCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modals = document.querySelectorAll('[data-modal]');
    modals.forEach((modal) => modal.removeAttribute('data-modal-active'));

    // 背景スクロールを再有効化
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
  });
});

// ================================
// 共通：動画再生ボタン
// data-video-play-buttonクリックで再生＋ボタン非表示
// ================================
const videoPlayButton = document.querySelector('[data-video-play-button]');
if (videoPlayButton) {
  videoPlayButton.addEventListener('click', (e) => {
    document.querySelector('[data-video]').play();
    e.currentTarget.style.display = 'none';
  });
}

// ================================
// 共通：動画のミュート切り替え
// data-video-sound-toggle-buttonクリックでON/OFF
// ================================
const videoSoundToggleButton = document.querySelector(
  '[data-video-sound-toggle-button]'
);
if (videoSoundToggleButton) {
  videoSoundToggleButton.addEventListener('click', (e) => {
    const video = document.querySelector('[data-video]');
    video.muted = !video.muted;

    // ミュート状態をdata属性で切り替え
    if (e.currentTarget.getAttribute('data-is-muted')) {
      e.currentTarget.removeAttribute('data-is-muted');
    } else {
      e.currentTarget.setAttribute('data-is-muted', 'true');
    }
  });
}
