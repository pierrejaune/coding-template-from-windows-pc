// ================================
// フェードイン (Vanilla JS)
// ================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document
      .querySelectorAll('.feature')
      .forEach((el) => el.classList.add('is_show'));

    const animeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is_show');
          animeObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll('.js_anime')
      .forEach((el) => animeObserver.observe(el));
  }, 1000);
});

// ================================
// スライダー (jQuery + slick依存)
// ================================
$(function () {
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
});

// ================================
// ヒーロー動画 preload + MutationObserver
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('hero-video');
  if (!heroVideo) return;

  heroVideo.pause();
  heroVideo.currentTime = 0;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.attributeName === 'class' &&
        heroVideo.classList.contains('showed')
      ) {
        setTimeout(() => {
          heroVideo.play().catch((e) => console.log('ヒーロー動画再生失敗', e));
        }, 1000);
      }
    });
  });

  observer.observe(heroVideo, { attributes: true });
});

// ================================
// 下層動画 lazy + IntersectionObserver
// ================================
function safePlay(video) {
  video.muted = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  const p = video.play();
  if (p && typeof p.catch === 'function') {
    p.catch((err) => console.warn('Video play interrupted:', err));
  }
}

const movieObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (video.readyState >= 2) {
          safePlay(video);
        } else {
          const onReady = () => {
            video.removeEventListener('canplay', onReady);
            safePlay(video);
          };
          video.addEventListener('canplay', onReady, { once: true });
        }
      } else {
        video.pause();
      }
    });
  },
  {
    root: null,
    rootMargin: '200px 0px',
    threshold: 0.01,
  }
);

document.querySelectorAll('.js_movie').forEach((video) => {
  video.muted = true;
  video.setAttribute('playsinline', '');
  movieObserver.observe(video);
});

// ================================
// 動画 Mute切り替え (Vanilla JS)
// ================================
document.querySelectorAll('.mutebtn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const video = btn.previousElementSibling;
    if (!video) return;
    video.muted = !video.muted;
    btn.classList.toggle('on', !video.muted);
    btn.textContent = video.muted ? 'ON' : 'OFF';
  });
});

// ================================
// アコーディオン (Vanilla JS)
// ================================
document.querySelectorAll('.js_accordionbtn01').forEach((btn) => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('on');
    const img = btn.querySelector('img');
    const txt = document.querySelector('.sec__accordiontxt');

    btn.classList.toggle('on');
    if (img) img.src = isOpen ? 'img/open.svg' : 'img/close.svg';
    if (txt) txt.classList.toggle('is_show', !isOpen);
  });
});
