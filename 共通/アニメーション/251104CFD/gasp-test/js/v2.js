document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  function setupStickyImageScroll() {
    const hasLeft = document.querySelector('.f-left') !== null;
    const topOffset = hasLeft ? 80 : 50;

    const section = document.querySelector('.sec__area');
    const sticky = section.querySelector('.sec__pin');
    const bg = sticky.querySelector('.bg-navy');
    const imgs = bg.querySelectorAll('.sec__img');
    const imgCount = imgs.length;
    const imgHeight = imgs[0].offsetHeight;
    const scrollLength = imgHeight * (imgCount - 1);

    // ------------------------------
    // sec__stickyをpinして固定
    // ------------------------------
    ScrollTrigger.create({
      trigger: section,
      start: `top+=${topOffset}px top`,
      end: `+=${scrollLength}`,
      pin: sticky,
      pinSpacing: true, // 固定中に他の要素を押し下げる
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => (bg.style.top = `${topOffset}px`),
      onEnterBack: () => (bg.style.top = `${topOffset}px`),
    });

    // ------------------------------
    // 2枚目以降を下から上へスライド
    // ------------------------------
    imgs.forEach((img, i) => {
      if (i === 0) return; // 1枚目は固定表示

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
  }

  setupStickyImageScroll();
});
