document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  function setupStickyImageScroll() {
    const hasLeft = document.querySelector('.f-left') !== null;
    const topOffset = hasLeft ? 80 : 50;
    const pinSections = document.querySelectorAll('.sec__pin');

    pinSections.forEach((pinSection) => {
      const section = pinSection.closest('.sec__area');
      const bg = pinSection.querySelector('.bg-navy');
      const imgs = bg.querySelectorAll('.sec__img');
      const afterPin = section.querySelector('.after-pin'); // ★追加箇所

      if (!section || !bg || imgs.length === 0) return;

      const imgCount = imgs.length;
      const imgHeight = imgs[0].offsetHeight;
      const scrollLength = imgHeight * (imgCount - 1);

      // ------------------------------
      // sec__pinを固定（pin）
      // ------------------------------
      ScrollTrigger.create({
        trigger: section,
        start: `top+=${topOffset}px top`,
        end: `+=${scrollLength}`,
        pin: pinSection,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          bg.style.top = `${topOffset}px`;
          afterPin?.classList.add('on'); // ★固定開始時にon付与
        },
        onLeave: () => {
          afterPin?.classList.remove('on'); // ★固定終了時にon削除
        },
        onEnterBack: () => {
          bg.style.top = `${topOffset}px`;
          afterPin?.classList.add('on'); // ★上方向スクロールで再度on付与
        },
        onLeaveBack: () => {
          afterPin?.classList.remove('on'); // ★逆戻りで固定解除時に削除
        },
      });

      // ------------------------------
      // 2枚目以降を下から上へスライド
      // ------------------------------
      imgs.forEach((img, i) => {
        if (i === 0) return;

        gsap.fromTo(
          img,
          { yPercent: 100, force3D: false },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: `top+=${topOffset + imgHeight * (i - 1)} top`,
              end: `top+=${topOffset + imgHeight * i} top`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });
  }

  setupStickyImageScroll();
});
