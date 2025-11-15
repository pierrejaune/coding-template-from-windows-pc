// 動画遅延読み込み・音声切り替え・inview制御
$(function () {
  // GSAPプラグイン登録
  gsap.registerPlugin(ScrollTrigger);

  // LazyLoad 初期化
  if (document.querySelector('.movie video')) {
    new LazyLoad({
      elements_selector: '.lazy',
    });
  }

  // すべての .movie 要素を取得
  const movies = document.querySelectorAll('.movie');

  movies.forEach((movieEl) => {
    const video = movieEl.querySelector('video');
    const btn = movieEl.querySelector('.movie-btn');

    if (!video || !btn) return;

    // --- 音声切り替え ---
    const toggleAudio = () => {
      video.muted = !video.muted;
    };

    const toggleSoundChange = () => {
      toggleAudio();
      btn.classList.toggle('on');
    };

    btn.addEventListener('click', toggleSoundChange);

    // --- ★ .movie.first専用処理 ---
    if (movieEl.classList.contains('first')) {
      movieEl.addEventListener(
        'transitionend',
        (e) => {
          // 例: opacity変化後に限定したい場合（必要に応じてコメント解除）
          // if (e.propertyName !== 'opacity') return;

          movieEl.classList.add('large');
          video.currentTime = 0;
          video.play();
        },
        { once: true }
      );
    } else {
      // --- ★ .first以外の動画はinview時に再生 ---
      ScrollTrigger.create({
        trigger: movieEl,
        start: 'top 80%', // 画面に8割入った時に再生
        end: 'bottom 20%', // 画面から出る直前まで
        onEnter: () => {
          video.currentTime = 0; // 再生前にリセットしたい場合
          video.play();
        },
        onEnterBack: () => {
          video.play(); // 上方向スクロールでも再生再開
        },
        onLeave: () => {
          video.pause(); // 画面外に出たら停止
        },
        onLeaveBack: () => {
          video.pause();
        },
      });
    }
  });
});
