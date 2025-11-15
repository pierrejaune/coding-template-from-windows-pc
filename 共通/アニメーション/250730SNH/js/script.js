// ------------------------------
// 1. ビューポート幅をCSS変数に設定（--vw）
// ------------------------------
function setViewportWidthVar() {
  const vw = document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}
window.addEventListener('load', setViewportWidthVar);
window.addEventListener('resize', setViewportWidthVar);

// ------------------------------
// 2. フェードイン処理 + アニメーション要素表示
// ------------------------------
window.addEventListener('load', () => {
  setTimeout(() => {
    document
      .querySelectorAll('.feature')
      .forEach((el) => el.classList.add('is_show'));
    setTimeout(() => {
      triggerAnimations('.js_anime');
    }, 500);
  }, 1000);
});

window.addEventListener('scroll', () => {
  triggerAnimations('.js_anime');
});

function triggerAnimations(selector) {
  const elements = document.querySelectorAll(selector);
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY;

  elements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top + scrollTop;
    if (scrollTop > elementTop - windowHeight * 0.75) {
      el.classList.add('is_show');
    }
  });
}

// ------------------------------
// 3. Slick スライダーの代替：Slick.jsはライブラリのままでOK
// ※必要ならSwiper等へ置換も可能
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // jQuery依存のSlickが必要なのでここは残す
  if (window.jQuery && typeof jQuery('.slider').slick === 'function') {
    jQuery('.slider').slick({
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

    jQuery('.loopslider').slick({
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      cssEase: 'linear',
      arrows: false,
      swipe: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      centerMode: true,
      useTransform: true,
      variableWidth: true,
    });
  }
});

// ------------------------------
// 4. 動画のinview再生 + ミュートボタン切替（LazyLoadが必要）
// ------------------------------

// 動画の再生トリガー（カスタムイベント風）
function playVideo(videoEl) {
  if (videoEl && typeof videoEl.play === 'function') {
    videoEl.play();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // LazyLoadの初期化（ライブラリ必要）
  if (typeof LazyLoad !== 'undefined') {
    new LazyLoad({ elements_selector: '.lazy' });
  }

  // inview監視（IntersectionObserver使用に置き換え）
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playVideo(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.js_movie').forEach((el) => {
    observer.observe(el);
  });

  // ミュートボタン制御
  document.querySelectorAll('.mutebtn').forEach((button) => {
    button.addEventListener('click', () => {
      const img = button.querySelector('img');
      const video = button.previousElementSibling;

      const isMuted = button.classList.toggle('on');
      if (isMuted) {
        img.src = 'img/on.svg';
        video.muted = false;
      } else {
        img.src = 'img/off.svg';
        video.muted = true;
      }
    });
  });
});

// ------------------------------
// 5. sticky要素のtop位置調整
// ------------------------------
function adjustStickyPosition(selector, offsetCorrection = false) {
  const element = document.querySelector(selector);
  if (!element) return;

  const windowHeight = window.innerHeight;
  const elementHeight = element.offsetHeight;

  if (elementHeight > windowHeight) {
    const offset = offsetCorrection
      ? `calc(100vh - (${elementHeight}px - 100vh))`
      : `calc(100vh - ${elementHeight}px)`;
    element.style.top = offset;
  }
}

function runStickyAdjustment() {
  setTimeout(() => {
    adjustStickyPosition('.sec01', false);
    ['.sec02', '.sec03', '.sec04'].forEach((selector) => {
      adjustStickyPosition(selector, true);
    });
  }, 1000);
}

window.addEventListener('load', runStickyAdjustment);
window.addEventListener('resize', runStickyAdjustment);
