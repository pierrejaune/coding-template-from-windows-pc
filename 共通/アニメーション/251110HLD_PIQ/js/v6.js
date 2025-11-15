document.addEventListener('DOMContentLoaded', () => {
  // =========================================================
  // ▼ ページ読み込み直後にDOMが構築された段階で実行したい処理
  // =========================================================

  // --- ページ内リンクなど構造が確定していれば動かせる処理 ---
  setupAnchorLinks();
  setupVideoButtons();
  setupParticles();

  // =========================================================
  // ▼ GSAPやScrollTriggerを含むアニメーション処理は
  //   画像・動画読み込み完了後に確実に実行する
  // =========================================================
  window.addEventListener('load', () => {
    // --- スクロール位置復元設定（ブラウザに任せる）---
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }

    // --- 初期スクロール位置制御（sessionStorage使用）---
    setupInitialScroll(); // ← 下で定義

    // --- GSAP / ScrollTrigger初期化 ---
    initGsapAnimations(); // ← 下で定義

    // --- ScrollTrigger位置再計算（遅延実行で安定）---
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // --- 現在のスクロール位置を保存（URL直入力再アクセス時の復元用）---
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('scrollY', window.scrollY);
    });
  });
});

// =========================================================
// ▼ 初回アクセス制御＋スクロール復元処理
// =========================================================
function setupInitialScroll() {
  const savedScroll = sessionStorage.getItem('scrollY');
  const hasVisited = sessionStorage.getItem('visited');

  // URL直入力時など：初回扱いでなければ前回位置に戻す
  if (savedScroll && hasVisited) {
    window.scrollTo(0, parseInt(savedScroll, 10));
  }

  if (!hasVisited) {
    // --- 初回アクセス時のみ実行 ---
    const firstPosition = document.getElementById('feature');
    document.body.classList.add('fix'); // 固定状態にして動きを止める

    if (firstPosition) {
      const targetTop =
        firstPosition.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, targetTop);

      // スクロール反映後にアニメ実行
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.body.classList.add('show');
          document.querySelector('.pcMv')?.classList.add('showed');

          // ScrollTrigger 初期化（後述の関数で定義）
          initAnimTriggers();
          ScrollTrigger.refresh();
        }, 100);
      });
    }

    // 5秒後にヘッダー表示
    setTimeout(() => {
      document.body.classList.remove('fix');
      document.body.classList.add('off');
      document.querySelector('.l-header')?.classList.add('show');
      document.body.style.overflow = '';
    }, 5000);

    sessionStorage.setItem('visited', 'true');
  } else {
    // --- 2回目以降 ---
    document.body.classList.remove('fix');
    document.body.classList.add('show', 'off');
    document.querySelector('.pcMv')?.classList.add('showed');
    document.querySelector('.l-header')?.classList.add('show');
    document.body.style.overflow = '';

    // ScrollTrigger 初期化
    initAnimTriggers();
    ScrollTrigger.refresh();
  }
}

// =========================================================
// ▼ GSAP / ScrollTrigger関連のアニメーション初期化
// =========================================================
function initGsapAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // --- .anim要素のScrollTrigger設定 ---
  initAnimTriggers();

  // --- 各種アニメーション系処理 ---
  setupFadeAnimations();
  setupTextAnimations();
  setupImageParallax();
  setupFirstTlAnimation();
  setupMovieScrollTriggers();
}

// =========================================================
// ▼ 以下、あなたの既存の個別関数群をそのまま保持
//   （値は変更せず、呼び出し位置を整理）
// =========================================================

// --- ページ内リンク ---
function setupAnchorLinks() {
  // ここに既存のページ内リンク処理
}

// --- 動画ボタンなどの設定 ---
function setupVideoButtons() {
  // ここに既存の動画再生・停止関連処理
}

// --- パーティクル処理 ---
function setupParticles() {
  // ここに既存のパーティクル発生処理
}

// --- .anim 要素にshowedを付けるScrollTrigger設定 ---
function initAnimTriggers() {
  const anims = document.querySelectorAll('.anim');
  anims.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => el.classList.add('showed'),
    });
  });
}

// --- フェードアニメ ---
function setupFadeAnimations() {
  // fade要素などのGSAP記述をそのまま移植
}

// --- テキストアニメ ---
function setupTextAnimations() {
  // data-letters系など、既存のGSAPテキスト処理をそのまま移植
}

// --- 画像パララックス ---
function setupImageParallax() {
  // mask画像やup/toRightなどのGSAP記述をそのまま移植
}

// --- 初回メインビジュアル等のTimeline処理 ---
function setupFirstTlAnimation() {
  // f-wrapやpcMvなど初回限定アニメ
}

// --- 動画再生ScrollTrigger ---
function setupMovieScrollTriggers() {
  // .movie要素の再生・停止関連ScrollTriggerを移植
}
