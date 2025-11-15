// ============================================================
// フェードイン・動画可視範囲制御（IntersectionObserver）
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------
  // CSS変数 --vw に正確なビューポート幅を設定
  // --------------------------------------------
  const updateVW = () => {
    const vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  };
  window.addEventListener('resize', updateVW);
  window.addEventListener('load', updateVW);

  // --------------------------------------------
  // IntersectionObserver設定まとめ
  // anim：一度だけ表示
  // js_movie：可視範囲に応じて再生/停止
  // --------------------------------------------
  const observerSettings = [
    { selector: '.anim', classToAdd: 'showed', threshold: 0.5, reverse: false },
    {
      selector: '.js_movie',
      classToAdd: 'showed',
      threshold: 0.1,
      reverse: true,
    },
  ];

  observerSettings.forEach((setting) => {
    const elements = document.querySelectorAll(setting.selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add(setting.classToAdd);

            // 動画可視時 → 再生
            if (setting.selector === '.js_movie' && el.tagName === 'VIDEO') {
              el.play().catch(() => {});
            }

            // 一度きりのアニメーションの場合は監視解除
            if (!setting.reverse) observer.unobserve(el);
          } else if (setting.reverse) {
            el.classList.remove(setting.classToAdd);

            // 動画非可視時 → 停止
            if (setting.selector === '.js_movie' && el.tagName === 'VIDEO') {
              el.pause();
            }
          }
        });
      },
      { threshold: setting.threshold }
    );

    elements.forEach((el) => observer.observe(el));
  });
});

// ============================================================
// スライダー設定（Slick → Swiperに移行）
// ============================================================
// window.addEventListener('DOMContentLoaded', () => {
//   // Swiperでフェード自動再生スライダーを実現
//   const sliders = document.querySelectorAll('.slider');
//   sliders.forEach((slider) => {
//     new Swiper(slider, {
//       effect: 'fade',
//       loop: true,
//       speed: 1500,
//       autoplay: {
//         delay: 1000,
//         disableOnInteraction: false,
//       },
//       allowTouchMove: false,
//       fadeEffect: { crossFade: true },
//     });
//   });
// });

// ============================================================
// 動画遅延読み込み＋音声切り替え
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  // LazyLoad初期化
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  });

  // 複数動画対応：ミュート切り替えボタン
  document.querySelectorAll('.js_moviebtn').forEach((btn, index) => {
    console.log(index);

    btn.addEventListener('click', () => {
      const video = btn.closest('video')?.querySelector('.js_movie');
      if (!video) return;

      const isOn = btn.classList.toggle('on');
      video.muted = !isOn;
    });
  });
});

// ============================================================
// モーダルスライダー（Swiper使用）
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalSwiper = new Swiper('.container__swiper', {
    loop: true,
    lazy: true,
    centeredSlides: true,
    watchOverflow: true,
    speed: 400,
    slidesPerView: 1,
    navigation: {
      nextEl: '#modal .next',
      prevEl: '#modal .prev',
    },
  });

  // --------------------------------------------
  // モーダルオープン処理
  // --------------------------------------------
  document.querySelectorAll('.page-slide').forEach((slide, index) => {
    slide.addEventListener('click', (e) => {
      e.preventDefault();

      modalSwiper.slideToLoop(index);
      modal.classList.add('is_show');
      document.body.style.overflow = 'hidden';
    });
  });

  // --------------------------------------------
  // モーダルクローズ処理
  // --------------------------------------------
  const closeBtn = document.querySelector('.container__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is_show');
      document.body.removeAttribute('style');

      // モーダルを閉じた時に--vwを再計算
      const vw = document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--vw', `${vw}px`);
    });
  }
});
