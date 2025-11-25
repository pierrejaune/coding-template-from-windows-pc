/******************************************************************
 * GSAP + ScrollTrigger を全体に導入したバージョン
 * - すべての IntersectionObserver を ScrollTrigger に置き換え
 * - アニメーションは「class を付与して CSS で制御（あなたの指定 A）」方式を継続
 * - 元コードの動作を忠実に維持しつつリファクタリング
 ******************************************************************/

window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  setupGsap(); // link04 の横スクロール（元仕様）
});

/* --------------------------------------------------------------
 * .target フェードイン（IO → ScrollTrigger）
 * threshold: 0.5 → start: "top 60%"
 * -------------------------------------------------------------- */
window.addEventListener('load', () => {
  document.querySelectorAll('.target').forEach((el) => {
    el.classList.remove('is-active');

    ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      once: true,
      onEnter: () => el.classList.add('is-active'),
    });
  });
});

/* --------------------------------------------------------------
 * MV スライダー
 * -------------------------------------------------------------- */
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

/* --------------------------------------------------------------
 * TOP スライダー
 * -------------------------------------------------------------- */
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

/* --------------------------------------------------------------
 * sec01 リボンアニメーション（元の class 操作のまま）
 * -------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const ribbon = document.querySelector('.link03--ribbon');
  if (ribbon) {
    const animate = () => {
      ribbon.classList.remove('is-rotating');
      void ribbon.offsetWidth; // Reflowでアニメをリセット
      ribbon.classList.add('is-rotating');
    };
    animate();
    setInterval(animate, 7000);
  }

  /* --------------------------------------------------------------
   * sec03 link11 → GSAP ScrollTrigger に置き換え
   * threshold: 0.4 → start: "top 60%"
   * -------------------------------------------------------------- */
  const link11 = document.querySelector('.link11');
  const spans11 = document.querySelectorAll('.link11--span01, .link11--span02');
  if (link11 && spans11.length) {
    spans11.forEach((s) => s.classList.remove('is-visible'));

    ScrollTrigger.create({
      trigger: link11,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        spans11.forEach((s, i) => {
          setTimeout(() => s.classList.add('is-visible'), i * 120);
        });
      },
    });
  }

  /* --------------------------------------------------------------
   * sec03 link12
   * threshold: 0.7 → start: "top 55%"
   * -------------------------------------------------------------- */
  const span12 = document.querySelector('.link12--span01');
  if (span12) {
    span12.classList.remove('is-visible');

    ScrollTrigger.create({
      trigger: span12,
      start: 'top 55%',
      once: true,
      onEnter: () => span12.classList.add('is-visible'),
    });
  }

  /* --------------------------------------------------------------
   * sec02 link05
   * threshold: 0.5 → start: "top 60%"
   * -------------------------------------------------------------- */
  const wrap05 = document.querySelector('.link05__wrap');
  if (wrap05) {
    wrap05.classList.remove('is-visible');

    ScrollTrigger.create({
      trigger: wrap05,
      start: 'top 60%',
      once: true,
      onEnter: () => wrap05.classList.add('is-visible'),
    });
  }

  /* --------------------------------------------------------------
   * link16
   * threshold: 0.3 → start: "top 70%"
   * -------------------------------------------------------------- */
  const can16 = document.querySelector('.link16--can01');
  const wrap16 = document.querySelector('.link16__wrap');
  if (can16 && wrap16) {
    wrap16.classList.remove('is-visible');

    ScrollTrigger.create({
      trigger: can16,
      start: 'top 70%',
      once: true,
      onEnter: () => wrap16.classList.add('is-visible'),
    });
  }

  /* --------------------------------------------------------------
   * link24（bear / red のループフェード）元ロジックのまま
   * -------------------------------------------------------------- */
  const red = document.querySelector('.rotate--red');
  const bear = document.querySelector('.rotate--bear');
  if (red && bear) {
    const redTime = 12000;
    const bearTime = 3000;

    const showBear = () => {
      red.style.opacity = '0';
      bear.style.opacity = '1';
      setTimeout(showRed, bearTime);
    };
    const showRed = () => {
      red.style.opacity = '1';
      bear.style.opacity = '0';
      setTimeout(showBear, redTime);
    };
    setTimeout(showBear, redTime);
  }

  /* --------------------------------------------------------------
   * link25（kitty / red のループフェード）元ロジックのまま
   * -------------------------------------------------------------- */
  const red25 = document.querySelector('.link25__wrap .rotate--red');
  const kitty25 = document.querySelector('.link25__wrap .rotate--kitty');
  if (red25 && kitty25) {
    const redTime = 12000;
    const kittyTime = 3000;

    const showKitty = () => {
      red25.style.opacity = '0';
      kitty25.style.opacity = '1';
      setTimeout(showRed25, kittyTime);
    };
    const showRed25 = () => {
      red25.style.opacity = '1';
      kitty25.style.opacity = '0';
      setTimeout(showKitty, redTime);
    };
    setTimeout(showKitty, redTime);
  }

  /* --------------------------------------------------------------
   * link26 りんごクリックアニメーション（元ロジック維持）
   * -------------------------------------------------------------- */
  const apple = document.querySelector('.tap--anime .apple');
  const img26 = document.querySelector('.link26__wrap .link26');
  const tapBox = document.querySelector('.tap--anime');
  const logo = document.querySelector('.link26--logo');

  if (apple && img26 && logo && tapBox) {
    let count = 0;
    const max = 10;
    const scaleDown = 0.96;

    apple.addEventListener('click', () => {
      if (count >= max) return;

      count++;
      const m = img26.style.transform.match(/scale\((.*?)\)/);
      const now = m ? parseFloat(m[1]) : 1;
      const next = now * scaleDown;

      img26.style.transform = `scale(${next})`;

      if (count === max) {
        apple.style.cursor = 'default';
        setTimeout(() => {
          img26.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
          img26.style.transform = `scale(${next}) translateY(-400px)`;
          img26.style.opacity = '0';

          tapBox.style.transition = 'opacity 2s ease-out';
          tapBox.style.opacity = '0';
          tapBox.style.pointerEvents = 'none';
        }, 300);
      }
    });

    logo.addEventListener('click', () => {
      if (count !== max) return;

      count = 0;
      img26.style.transition = 'none';
      tapBox.style.transition = 'none';

      img26.style.transform = 'scale(1) translateY(1000px)';
      img26.style.opacity = '0';
      tapBox.style.transform = 'translateY(1000px)';
      tapBox.style.opacity = '0';

      void img26.offsetWidth;

      setTimeout(() => {
        const tr =
          'transform 2s cubic-bezier(0.25, 1, 0.5, 1), opacity 2s ease-out';

        img26.style.transition = tr;
        tapBox.style.transition = tr;

        img26.style.transform = 'scale(1) translateY(0)';
        img26.style.opacity = '1';

        tapBox.style.transform = 'translateY(0)';
        tapBox.style.opacity = '1';
      }, 50);

      setTimeout(() => {
        img26.style.transition = 'transform 0.3s ease-out';
        apple.style.cursor = 'pointer';
        apple.style.opacity = '1';
        tapBox.style.pointerEvents = 'auto';
        tapBox.style.transform = '';
        tapBox.style.transition = '';
      }, 2000);
    });

    img26.style.transform = 'scale(1)';
    img26.style.opacity = '1';
    img26.style.transition = 'transform 0.3s ease-out';
    tapBox.style.opacity = '1';
  }
});

/* --------------------------------------------------------------
 * link04 横スクロール（元のまま扱う仕様）
 * -------------------------------------------------------------- */
function setupGsap() {
  gsap.registerPlugin(ScrollTrigger);

  const centerContainer = document.querySelector('.container__center');
  if (!centerContainer) {
    console.error("基準要素 '.container__center' が見つかりません。");
    return;
  }
  /*
   * ▼▼▼【以下は既存の横スクロールコード（変更なし）】▼▼▼
   */
  const containerSelectors = ['.scroll-container'];

  containerSelectors.forEach((selector, index) => {
    const element = document.querySelector(selector);

    const contentSelector =
      index === 0
        ? '.link--scroll'
        : `.link--scroll${String(index + 1).padStart(2, '0')}`;
    const content = element ? element.querySelector(contentSelector) : null;
    console.log('content', content);

    if (!element || !content) {
      console.warn(`GSAP target elements not found for: ${selector}`);
      return;
    }

    gsap.to(selector, {
      x: () => `-${content.scrollWidth - centerContainer.offsetWidth}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'center center',
        end: () => `+=${content.scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });
}
