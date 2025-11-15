{
  /* <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script> */
}
{
  /* <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script> */
}

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // 対象要素を取得
  const movieTop = document.querySelector('.movie-top');
  const fMainWrap = document.querySelector('.f-main-wrap');

  // 動画エリアの高さを取得（レスポンシブ対応）
  const getVideoHeight = () => movieTop.offsetHeight;

  // .movie-topの下端が画面下端に来てから動画の高さぶんスクロールする間、
  // .f-main-wrapを動画高さぶん上に動かす（パララックス風）
  gsap.to(fMainWrap, {
    y: () => -getVideoHeight(), // 上方向に動画の高さぶん移動
    ease: 'none',
    scrollTrigger: {
      trigger: movieTop,
      start: 'bottom bottom', // .movie-top下端が画面下端に達した瞬間から
      end: () => '+=' + getVideoHeight(), // 動画の高さぶんスクロールした位置まで
      scrub: true, // スクロールに連動して滑らかに
    },
  });

  // リサイズ時に動画高さを再取得してリフレッシュ
  window.addEventListener('resize', () => ScrollTrigger.refresh());
});
