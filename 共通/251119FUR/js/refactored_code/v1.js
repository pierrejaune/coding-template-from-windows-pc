// ===============================
//  GSAP ScrollTrigger 初期化
// ===============================
window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  setupGsap();
});

// ===============================================
//  GSAP ScrollTrigger に置き換えたフェードイン
// ===============================================
window.addEventListener('load', () => {
  // .target フェードイン
  document.querySelectorAll('.target').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: 'top 60%', // threshold:0.5 相当
          toggleActions: 'play none none none',
          onEnter: () => (el.dataset.isActive = 'true'),
        },
      }
    );
  });
});

// ==============================
// MV スライダー
// ==============================
document.addEventListener('DOMContentLoaded', function () {
  new Swiper('#feature .swiper-container', {
    loop: true,
    effect: 'fade',
    speed: 1000,
    autoplay: { delay: 2800, disableOnInteraction: false },
    lazy: { loadPrevNext: true },
    fadeEffect: { crossFade: true },
  });
});

// ==============================
// TOP スライダー
// ==============================
document.addEventListener('DOMContentLoaded', function () {
  new Swiper('#feature .swiper-container02', {
    loop: true,
    effect: 'fade',
    speed: 100,
    autoplay: { delay: 1000, disableOnInteraction: false },
    lazy: { loadPrevNext: true },
    fadeEffect: { crossFade: true },
  });
});

// ===================================================================
// sec01 リボンアニメーション（既存クラス操作のまま → GSAP不要）
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  const ribbonElement = document.querySelector('.link03--ribbon');
  if (ribbonElement) {
    function triggerRibbonAnimation() {
      ribbonElement.classList.remove('is-rotating');
      void ribbonElement.offsetWidth;
      ribbonElement.classList.add('is-rotating');
    }
    triggerRibbonAnimation();
    setInterval(triggerRibbonAnimation, 7000);
  }

  // =============================================================
  // sec03 link11 スパンコール → GSAP ScrollTrigger へ書き換え
  // =============================================================
  const triggerLink11 = document.querySelector('.link11');
  const animLink11 = document.querySelectorAll(
    '.link11--span01, .link11--span02'
  );

  if (triggerLink11 && animLink11.length) {
    animLink11.forEach((el) => el.classList.remove('is-visible'));

    gsap.fromTo(
      animLink11,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: triggerLink11,
          start: 'top 60%', // threshold:0.4 相当
          once: true,
        },
      }
    );
  }

  // =============================================================
  // sec03 link12 → GSAP ScrollTrigger に書き換え
  // =============================================================
  const span01 = document.querySelector('.link12--span01');

  if (span01) {
    gsap.fromTo(
      span01,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: span01,
          start: 'top 55%', // threshold:0.7 の代替
          once: true,
        },
      }
    );
  }

  // =============================================================
  // sec02 link05 → GSAP ScrollTrigger
  // =============================================================
  const wrap05 = document.querySelector('.link05__wrap');

  if (wrap05) {
    gsap.fromTo(
      wrap05,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: wrap05,
          start: 'top 60%', // threshold:0.5
          once: true,
        },
      }
    );
  }

  // =============================================================
  // link16 can01 → GSAP ScrollTrigger
  // =============================================================
  const trigger16 = document.querySelector('.link16--can01');
  const wrap16 = document.querySelector('.link16__wrap');

  if (trigger16 && wrap16) {
    wrap16.classList.remove('is-visible');

    gsap.to(wrap16, {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: trigger16,
        start: 'top 70%', // threshold:0.3
        once: true,
      },
    });
  }

  // =============================================================
  // link24 ベア / レッドのループフェード（既存のロジック維持）
  // =============================================================
  const red = document.querySelector('.rotate--red');
  const bear = document.querySelector('.rotate--bear');

  if (red && bear) {
    const redDuration = 12000;
    const bearDuration = 3000;

    function fadeToBear() {
      red.style.opacity = '0';
      bear.style.opacity = '1';
      setTimeout(fadeToRed, bearDuration);
    }
    function fadeToRed() {
      red.style.opacity = '1';
      bear.style.opacity = '0';
      setTimeout(fadeToBear, redDuration);
    }
    setTimeout(fadeToBear, redDuration);
  }

  // =============================================================
  // link25 キティ / レッドのループフェード（既存ロジック維持）
  // =============================================================
  const red25 = document.querySelector('.link25__wrap .rotate--red');
  const kitty25 = document.querySelector('.link25__wrap .rotate--kitty');

  if (red25 && kitty25) {
    const redDuration_L25 = 12000;
    const kittyDuration_L25 = 3000;

    function fadeToKitty_L25() {
      red25.style.opacity = '0';
      kitty25.style.opacity = '1';
      setTimeout(fadeToRed_L25, kittyDuration_L25);
    }
    function fadeToRed_L25() {
      red25.style.opacity = '1';
      kitty25.style.opacity = '0';
      setTimeout(fadeToKitty_L25, redDuration_L25);
    }
    setTimeout(fadeToKitty_L25, redDuration_L25);
  }

  // =============================================================
  // link26 りんごクリックアニメーション（既存ロジック維持）
  // =============================================================
  const appleElement = document.querySelector('.tap--anime .apple');
  const link26Image = document.querySelector('.link26__wrap .link26');
  const tapAnimeContainer = document.querySelector('.tap--anime');
  const logoElement = document.querySelector('.link26--logo');

  if (appleElement && link26Image && logoElement) {
    let clickCount = 0;
    const maxClicks = 10;
    const scaleFactor = 0.96;

    appleElement.addEventListener('click', () => {
      if (clickCount < maxClicks) {
        clickCount++;

        const m = link26Image.style.transform.match(/scale\((.*?)\)/);
        const currentScale = m ? parseFloat(m[1]) : 1;
        const newScale = currentScale * scaleFactor;

        link26Image.style.transform = `scale(${newScale})`;

        if (clickCount === maxClicks) {
          appleElement.style.cursor = 'default';
          setTimeout(() => {
            link26Image.style.transition =
              'transform 2s ease-out, opacity 2s ease-out';
            link26Image.style.transform = `scale(${newScale}) translateY(-400px)`;
            link26Image.style.opacity = '0';

            if (tapAnimeContainer) {
              tapAnimeContainer.style.transition = 'opacity 2s ease-out';
              tapAnimeContainer.style.opacity = '0';
              tapAnimeContainer.style.pointerEvents = 'none';
            }
          }, 300);
        }
      }
    });

    logoElement.addEventListener('click', () => {
      if (clickCount === maxClicks) {
        clickCount = 0;
        link26Image.style.transition = 'none';
        tapAnimeContainer.style.transition = 'none';

        link26Image.style.transform = 'scale(1) translateY(1000px)';
        link26Image.style.opacity = '0';

        tapAnimeContainer.style.transform = 'translateY(1000px)';
        tapAnimeContainer.style.opacity = '0';

        void link26Image.offsetWidth;

        setTimeout(() => {
          const resetTransition =
            'transform 2s cubic-bezier(0.25, 1, 0.5, 1), opacity 2s ease-out';

          link26Image.style.transition = resetTransition;
          link26Image.style.transform = 'scale(1) translateY(0)';
          link26Image.style.opacity = '1';

          tapAnimeContainer.style.transition = resetTransition;
          tapAnimeContainer.style.transform = 'translateY(0)';
          tapAnimeContainer.style.opacity = '1';
        }, 50);

        setTimeout(() => {
          link26Image.style.transition = 'transform 0.3s ease-out';
          appleElement.style.cursor = 'pointer';
          appleElement.style.opacity = '1';
          tapAnimeContainer.style.pointerEvents = 'auto';
          tapAnimeContainer.style.transform = '';
          tapAnimeContainer.style.transition = '';
        }, 2000);
      }
    });

    link26Image.style.transform = 'scale(1)';
    link26Image.style.opacity = '1';
    link26Image.style.transition = 'transform 0.3s ease-out';
    tapAnimeContainer.style.opacity = '1';
  }
});

// ====================================
// link04 用 setupGsap（既存のまま）
// ====================================
function setupGsap() {
  gsap.registerPlugin(ScrollTrigger);

  const centerContainer = document.querySelector('.container__center');
  if (!centerContainer) return;
}
