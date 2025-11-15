// ============================================
// jQuery：要素が画面内に入ったらフェードインアニメーションを開始
// ============================================
$(function () {
  // .js-anime クラスを持つ要素が画面内に入ったタイミングでイベント発火
  $('.js-anime').on('inview', function (event, isInView) {
    // 要素がビューポート内に入った場合
    if (isInView) {
      // フェードインアニメーション用のクラスを付与
      // → CSS側で .is-animete-active にアニメーション定義しておく想定
      $(this).addClass('is-animete-active');
    }
  });
});

// ============================================
// 純粋なJavaScript：ページの全HTMLが読み込まれた後に実行
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  // --------------------------------------------
  // ★ 点滅アニメーションの設定
  // --------------------------------------------

  // .star クラスを持つ全ての要素を取得（星の装飾など）
  const stars = document.querySelectorAll('.star');

  // 各星に対してランダムなアニメーションタイミングを設定
  stars.forEach((star, index) => {
    // 0〜3秒の範囲でランダムな遅延時間を生成
    const delay = Math.random() * 3000;
    // 1.5〜3秒の範囲でランダムな点滅速度（アニメーションの長さ）を生成
    const duration = 1500 + Math.random() * 1500;

    // それぞれの値をCSS変数として設定
    // CSS側で animation-delay: var(--star-delay) のように利用できる
    star.style.setProperty('--star-delay', `${delay}ms`);
    star.style.setProperty('--star-duration', `${duration}ms`);

    // アニメーションを適用するクラスを付与
    star.classList.add('animate');
  });

  // --------------------------------------------
  // Slickスライダーの初期化
  // --------------------------------------------
  $('.slideFig').slick({
    autoplay: true, // 自動再生ON
    arrows: false, // 前後の矢印ボタンを非表示
    autoplaySpeed: 5000, // 5秒ごとに切り替え
    dots: true, // スライダー下部にドットナビゲーションを表示
    pauseOnFocus: false, // フォーカスしても一時停止しない
    pauseOnHover: false, // ホバーしても一時停止しない
    fade: true, // フェード切り替え（スライドではなくクロスフェード）
    cssEase: 'ease-in-out', // フェードのイージング設定
    speed: 1000, // 切り替えアニメーションの時間（1秒）
  });

  // --------------------------------------------
  // 背景画像の3段階切り替え（スクロール追従型）
  // --------------------------------------------
  // feature__sub-wrap の中にある .bgImg 要素を取得
  const bgImg = document.querySelector('.feature__sub-wrap > .bgImg');
  // 背景が追従する範囲（コンテンツ領域）を指定
  const featureSubWrapBody = document.querySelector('.feature__sub-wrap-body');

  // 両方の要素が存在する場合のみ処理を実行
  if (bgImg && featureSubWrapBody) {
    // スクロールイベントで背景画像の位置を制御
    window.addEventListener('scroll', function () {
      // feature__sub-wrap-body の位置情報を取得
      const bodyRect = featureSubWrapBody.getBoundingClientRect();

      // ページ上部に到達したかどうか
      const isAtTop = bodyRect.top <= 0;
      // コンテンツ領域を通過しきったかどうか
      const isContentPassed = bodyRect.bottom <= window.innerHeight;

      // クラスをリセット（毎回状態を初期化）
      bgImg.classList.remove('is-fixed', 'is-bottom');

      if (isContentPassed) {
        // コンテンツを通過しきった場合：背景を下に固定（position: absolute; bottom:0）
        bgImg.classList.add('is-bottom');
      } else if (isAtTop) {
        // コンテンツ途中にある場合：背景を固定（position: fixed）
        bgImg.classList.add('is-fixed');
      }
      // どちらでもない場合（まだ上部にあるとき）はデフォルト状態（上付き absolute）
    });
  }
});
