// -----------------------------------------
// GSAPでエリア内で画像のせり上がり（安定版）
// -----------------------------------------
window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);

  function setupStickyImageScroll() {
    const hasLeft = document.querySelector('.f-left') !== null;
    const topOffset = hasLeft ? 80 : 52;

    const pinSections = document.querySelectorAll('.sec__pin');

    pinSections.forEach((pinSection) => {
      const section = pinSection.closest('.sec__area');
      const bg = pinSection.querySelector('.sec__pin-box');
      const imgs = bg ? bg.querySelectorAll('.sec__img') : [];
      const afterPin = section ? section.querySelector('.after-pin') : null;

      if (!section || !bg || imgs.length === 0) return;

      const imgCount = imgs.length;
      const imgHeight = imgs[0].offsetHeight;
      const scrollLength = imgHeight * (imgCount - 1);

      // ------------------------------
      // sec__pinを固定（pin）
      // ------------------------------
      ScrollTrigger.create({
        trigger: section,
        start: `top-=${topOffset}px top`,
        end: `+=${scrollLength}`,
        pin: pinSection,
        pinSpacing: true,
        anticipatePin: 1.5,
        invalidateOnRefresh: true,
        onEnter: () => {
          afterPin?.classList.add('on', 'showed');
          section.classList.add('on');
        },
        onLeave: () => {
          afterPin?.classList.remove('on');
          section.classList.remove('on');
        },
        onEnterBack: () => {
          afterPin?.classList.add('on', 'showed');
          section.classList.add('on');
        },
        onLeaveBack: () => {
          afterPin?.classList.remove('on', 'showed');
          section.classList.remove('on');
        },
      });

      // ------------------------------
      // 2枚目以降を順番にせり上げる
      // ------------------------------
      imgs.forEach((img, i) => {
        if (i === 0) return;

        const startY = imgHeight * (i - 1);
        const endY = imgHeight * i;

        gsap.fromTo(
          img,
          { yPercent: 100, force3D: true },
          {
            yPercent: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section,
              start: `top-=${topOffset + startY}px top`,
              end: `top-=${topOffset + endY}px top`,
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    // リサイズ・動的読み込み対応
    ScrollTrigger.refresh();
  }

  setupStickyImageScroll();

  // 画像遅延読み込みなどに対応（再計算）
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
});
