document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const movieTop = document.querySelector('.movie-top');
  const fMainWrap = document.querySelector('.f-main-wrap');

  // 動画エリアの高さを取得（常に最新値）
  const getVideoHeight = () => movieTop.offsetHeight;

  // f-main-wrap を動画の高さぶんだけ上下に動かすパララックス
  gsap.to(fMainWrap, {
    y: () => -getVideoHeight(), // 下方向にスクロール時に上へ動く
    ease: 'none',
    scrollTrigger: {
      trigger: movieTop,
      start: 'bottom bottom', // movie-top の下端が画面下端に来た時に開始
      end: () => '+=' + getVideoHeight(), // 動画の高さぶんスクロールする間に移動
      scrub: true, // スクロールに合わせて常に同期（上下往復可）
      markers: true, // デバッグ用に有効化可能
      // 👇 イベントコールバック
      onEnter: () => console.log('パララックス開始（下方向）'),
      onLeave: () => console.log('パララックス終了（下へ抜けた）'),
      onEnterBack: () => console.log('パララックス再開（上方向へ戻った）'),
      onLeaveBack: () => console.log('パララックス終了（上へ抜けた）'),
      onUpdate: (self) => console.log('進捗率:', self.progress.toFixed(2)),
    },
  });

  // リサイズ時に高さを再計算してリフレッシュ
  window.addEventListener('resize', () => ScrollTrigger.refresh());
});
