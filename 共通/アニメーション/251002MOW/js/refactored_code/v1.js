// =============================
// フェードアニメーション処理
// =============================

// ページ読み込み時とスクロール時に発火
window.addEventListener('load', fadeInOnScroll);
window.addEventListener('scroll', fadeInOnScroll);

function fadeInOnScroll() {
  // フェード効果を適用する全ての要素を取得
  const elements = document.querySelectorAll(
    '.fadeIn, .fadeUp, .fadeLeft, .fadeRight, .clip, .clip02'
  );

  // 現在のスクロール位置を取得
  const scrollY = window.scrollY;
  // ビューポート（表示領域）の高さを取得
  const windowHeight = window.innerHeight;

  elements.forEach((el) => {
    // 各要素のドキュメント上でのY座標を取得
    const elementTop = el.getBoundingClientRect().top + scrollY;

    // 要素が画面内に入ったら "active" クラスを追加
    if (scrollY > elementTop - windowHeight * 1) {
      el.classList.add('active');
    }
  });
}

// =============================
// 動画のミュート切り替え処理
// =============================

// すべての .video-toggle-btn を取得
const videoButtons = document.querySelectorAll('.video-toggle-btn');

// 各ボタンにクリックイベントを設定
videoButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // ボタンの親要素 .movie 内の video 要素を取得
    const video = btn.closest('.movie').querySelector('video');

    if (video.muted) {
      // ---- ミュート解除時 ----
      // 他の全動画をミュート状態に戻す
      document.querySelectorAll('video').forEach((v) => (v.muted = true));
      document
        .querySelectorAll('.video-toggle-btn')
        .forEach((b) => b.classList.add('is-muted'));

      // この動画だけミュート解除
      video.muted = false;
      btn.classList.remove('is-muted');
    } else {
      // ---- ミュート有効化 ----
      video.muted = true;
      btn.classList.add('is-muted');
    }
  });
});

// =============================
// sticky要素の位置調整処理
// =============================

// ページ読み込み時とリサイズ時に位置更新
window.addEventListener('load', updateStickyPositions);
window.addEventListener('resize', updateStickyPositions);

function updateStickyPositions() {
  // .sticky クラスを持つすべての要素を取得
  const containers = document.querySelectorAll('.sticky');
  const viewportHeight = window.innerHeight;

  containers.forEach((container) => {
    const containerHeight = container.offsetHeight;
    // ビューポートと要素の高さの差を算出し、top位置を調整
    const topValue = containerHeight - viewportHeight;
    container.style.top = -topValue + 'px';
  });
}

// =============================
// 右クリック禁止処理
// =============================

// HTML全体で右クリック（コンテキストメニュー）を無効化
document.documentElement.oncontextmenu = function () {
  return false;
};
