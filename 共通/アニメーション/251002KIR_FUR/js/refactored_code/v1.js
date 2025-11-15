// ============================================
// ページ読み込み完了後にすべて実行
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  // --------------------------------------------
  // フェードイン（inview検知をVanilla JSで実装）
  // --------------------------------------------

  // IntersectionObserverを使って、要素が画面内に入ったかを検知
  const fadeTargets = document.querySelectorAll('.js-anime');

  if (fadeTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 要素がビューポート内に入ったら
          if (entry.isIntersecting) {
            // フェードイン用クラスを付与
            entry.target.classList.add('is-animete-active');
            // 一度表示したら監視を解除（不要なら削除可）
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // 要素が10%見えた時点で発火
      }
    );

    fadeTargets.forEach((target) => observer.observe(target));
  }

  // --------------------------------------------
  // ★ 点滅アニメーション設定（Vanilla JS）
  // --------------------------------------------

  // .star クラスを持つ全ての要素を取得
  const stars = document.querySelectorAll('.star');

  stars.forEach((star) => {
    // 0〜3秒のランダムな遅延
    const delay = Math.random() * 3000;
    // 1.5〜3秒のランダムな点滅速度
    const duration = 1500 + Math.random() * 1500;

    // CSS変数をセット
    star.style.setProperty('--star-delay', `${delay}ms`);
    star.style.setProperty('--star-duration', `${duration}ms`);

    // アニメーション開始クラスを追加
    star.classList.add('animate');
  });

  // --------------------------------------------
  // Slickスライダー（jQuery依存のまま）
  // --------------------------------------------
  $('.slideFig').slick({
    autoplay: true, // 自動再生ON
    arrows: false, // 前後矢印を非表示
    autoplaySpeed: 5000, // 5秒ごとに切り替え
    dots: true, // 下にドットナビゲーション表示
    pauseOnFocus: false, // フォーカスで停止しない
    pauseOnHover: false, // ホバーで停止しない
    fade: true, // フェード切り替え
    cssEase: 'ease-in-out', // イージング
    speed: 1000, // アニメーション速度
  });

  // --------------------------------------------
  // 背景画像の3段階切り替え（Vanilla JS）
  // --------------------------------------------

  // 対象要素を取得
  const bgImg = document.querySelector('.feature__sub-wrap > .bgImg');
  const featureSubWrapBody = document.querySelector('.feature__sub-wrap-body');

  if (bgImg && featureSubWrapBody) {
    window.addEventListener('scroll', function () {
      // .feature__sub-wrap-body の位置情報を取得
      const bodyRect = featureSubWrapBody.getBoundingClientRect();

      // ページ上部に達したかどうか
      const isAtTop = bodyRect.top <= 0;
      // 下までスクロールして通過したかどうか
      const isContentPassed = bodyRect.bottom <= window.innerHeight;

      // クラスをいったんリセット
      bgImg.classList.remove('is-fixed', 'is-bottom');

      if (isContentPassed) {
        // 通過後：背景を下に固定（absolute bottom）
        bgImg.classList.add('is-bottom');
      } else if (isAtTop) {
        // 範囲内スクロール中：背景を固定（fixed）
        bgImg.classList.add('is-fixed');
      }
      // それ以外（まだ範囲上部の場合）はデフォルト（absolute top）
    });
  }
});
