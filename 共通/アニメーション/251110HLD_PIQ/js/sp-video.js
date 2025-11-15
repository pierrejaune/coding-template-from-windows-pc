// document.addEventListener('DOMContentLoaded', () => {
//   // すべての .movie 要素内の video を取得
//   const videos = document.querySelectorAll('.movie video');

//   videos.forEach((video) => {
//     if (!video) return;

//     // 初期化（位置を最初に戻す）
//     video.pause();
//     video.currentTime = 0;

//     // ページロード後に再生開始
//     video.play().catch((e) => {
//       console.log(
//         '自動再生できませんでした。ユーザー操作が必要な場合があります。',
//         e
//       );
//     });
//   });
// });

/*
<video
  class="movie-video"
  poster="/assets/images/hero-poster.jpg"
  muted
  playsinline
  autoplay
>
  <source src="/assets/videos/hero.mp4" type="video/mp4">
</video>
*/

document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.movie video');

  videos.forEach((video) => {
    // 自動再生を試みる
    const tryPlay = () => {
      video.play().catch((err) => {
        console.warn('自動再生できませんでした:', err);
        showControls(video);
      });
    };

    // エラー発生（ファイル未ロードや容量オーバーなど）も検知
    video.addEventListener('error', (e) => {
      console.warn('動画読み込みエラー:', e);
      showControls(video);
    });

    // 再生開始できたら controls を確実に非表示
    video.addEventListener('playing', () => {
      video.removeAttribute('controls');
    });

    tryPlay();
  });

  function showControls(video) {
    // 一度だけ controls を付与
    if (!video.hasAttribute('controls')) {
      video.setAttribute('controls', '');
      video.classList.add('show-controls'); // CSS用フラグ（任意）
    }
  }
});
