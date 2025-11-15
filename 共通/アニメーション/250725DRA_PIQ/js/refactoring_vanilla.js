document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // フェードイン処理
  // ===============================
  const animationPosition = (selector) => {
    const scroll = window.scrollY; // スクロール量
    const windowHeight = window.innerHeight; // 画面の高さ

    document.querySelectorAll(selector).forEach((el) => {
      const imgPos = el.getBoundingClientRect().top + scroll; // 要素の位置（絶対値）
      if (scroll > imgPos - windowHeight * 0.75) {
        el.classList.add('is_show');
      }
    });
  };

  // ページロード後の初期処理
  window.addEventListener('load', () => {
    setTimeout(() => {
      document
        .querySelectorAll('.feature')
        .forEach((el) => el.classList.add('is_show'));
      setTimeout(() => animationPosition('.js_anime'), 500);
    }, 1000);
  });

  // スクロール時
  window.addEventListener('scroll', () => animationPosition('.js_anime'));

  // ===============================
  // スライダー (slickはjQuery依存)
  // ===============================
  $('.slider').slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    infinite: true,
    fade: true,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  // ===============================
  // 動画遅延読み込み (LazyLoad)
  // ===============================
  new LazyLoad({
    elements_selector: '.lazy',
  });

  // Intersection Observerで動画を再生
  const movieObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target;
        // 動画が読み込み可能になったら再生
        const tryPlay = () => {
          video.play().catch((err) => {
            console.warn('Video play interrupted:', err);
          });
        };

        if (video.readyState >= 2) {
          // すでに再生できる状態なら即再生
          tryPlay();
        } else {
          // 読み込み完了してから再生
          video.addEventListener('canplay', tryPlay, { once: true });
        }
      }
    });
  });

  document.querySelectorAll('.js_movie').forEach((movie) => {
    movieObserver.observe(movie);
  });

  // ミュート切替
  document.querySelectorAll('.mutebtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const video = btn.previousElementSibling; // 直前の動画
      const isMuted = btn.classList.contains('on');

      btn.classList.toggle('on');
      btn.textContent = isMuted ? 'ON' : 'OFF';
      if (video) video.muted = isMuted;
    });
  });

  // ===============================
  // アコーディオン
  // ===============================
  document.querySelectorAll('.js_accordionbtn01').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('on');

      btn.classList.toggle('on');
      const img = btn.querySelector('img');
      if (img) img.src = isOpen ? 'img/open.svg' : 'img/close.svg';

      // 全体をまとめて開閉する仕様
      document.querySelectorAll('.sec__accordiontxt').forEach((txt) => {
        txt.classList.toggle('is_show', !isOpen);
      });
    });
  });
});
