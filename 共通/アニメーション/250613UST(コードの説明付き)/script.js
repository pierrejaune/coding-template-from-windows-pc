// このコードは、ある要素（.left-content）をスクロールに応じて制御する処理です。
document.addEventListener('DOMContentLoaded', function () {
  const target = document.querySelector('.left-content');
  const startTrigger = document.querySelector('.right-content');
  const endTrigger = document.querySelector('.wrap_sec03');

  let prevScroll = window.scrollY;
  let isHandlerActive = false;

  function onScrollHandler() {
    const scrollTop = window.scrollY;
    const goingDown = scrollTop > prevScroll;

    // 各要素の位置・高さを取得
    const startTriggerRect = startTrigger?.getBoundingClientRect();
    const endTriggerRect = endTrigger?.getBoundingClientRect();
    const targetRect = target?.getBoundingClientRect();

    // 開始トリガーのページ内の位置
    const startTriggerTop = startTriggerRect.top + window.scrollY;

    // 終了トリガーの下端位置（画面内位置 + スクロール量 + 高さ）
    const endTriggerBottom =
      endTriggerRect.top + window.scrollY + endTriggerRect.height;

    // ターゲットの高さ
    const targetHeight = targetRect.height;

    // 実際に終了すべき位置（終了トリガーの下端 - ターゲットの高さ）
    const actualEndPosition = endTriggerBottom - targetHeight;

    // トリガー条件判定
    const passedStart = scrollTop + 80 >= startTriggerTop;
    const beforeEnd = scrollTop + 80 < actualEndPosition;

    const inActiveZone = passedStart && beforeEnd;

    // 下方向スクロール中 && 範囲内ならクラス追加、そうでなければ削除
    if (goingDown && inActiveZone) {
      target.classList.add('is-pos-bottom');
    } else {
      target.classList.remove('is-pos-bottom');
    }

    // 前回のスクロール位置を更新
    prevScroll = scrollTop;
  }

  function updateEventBinding() {
    // ウィンドウとターゲットの高さを取得
    const windowHeight = window.innerHeight;
    const targetHeight = target.getBoundingClientRect().height;

    const shouldActivate = targetHeight > windowHeight;

    // イベントバインディングの切り替え（高さ条件に応じて）
    if (shouldActivate && !isHandlerActive) {
      window.addEventListener('scroll', onScrollHandler);
      isHandlerActive = true;
    } else if (!shouldActivate && isHandlerActive) {
      window.removeEventListener('scroll', onScrollHandler);
      target.classList.remove('is-pos-bottom'); // 状態リセット
      isHandlerActive = false;
    }
  }

  // ページ読み込み時に初回チェック
  updateEventBinding();

  // リサイズ時も高さ変化を考慮してチェック
  window.addEventListener('resize', updateEventBinding);
});
