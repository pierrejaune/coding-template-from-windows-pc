// -----------------------------------------
// GSAPでエリア内で画像のせり上がり（安定版 + 1フレーム遅延）
// -----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
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
          bg.style.top = `${topOffset}px`;
          afterPin?.classList.add('on', 'showed');
          section.classList.add('on');
        },
        onLeave: () => {
          afterPin?.classList.remove('on');
          section.classList.remove('on');
        },
        onEnterBack: () => {
          bg.style.top = `${topOffset}px`;
          afterPin?.classList.add('on', 'showed');
          section.classList.add('on');
        },
        onLeaveBack: () => {
          afterPin?.classList.remove('on', 'showed');
          section.classList.remove('on');
        },
      });

      // ------------------------------
      // 2枚目以降を下から上へスライド
      // ------------------------------
      imgs.forEach((img, i) => {
        if (i === 0) return;

        gsap.fromTo(
          img,
          { yPercent: 100, force3D: true },
          {
            yPercent: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section,
              start: `top-=${topOffset - imgHeight * (i - 1)} top`,
              end: `top-=${topOffset - imgHeight * i} top`,
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    // レイアウト安定後に再計算
    ScrollTrigger.refresh();
  }

  // ------------------------------
  // 遅延実行で高さを安定させる
  // ------------------------------
  function runAfterImagesLoaded() {
    const allImages = document.querySelectorAll('img');
    let loaded = 0;

    if (allImages.length === 0) {
      requestAnimationFrame(() => setupStickyImageScroll());
      return;
    }

    allImages.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === allImages.length)
          requestAnimationFrame(() => setupStickyImageScroll());
      } else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded === allImages.length)
            requestAnimationFrame(() => setupStickyImageScroll());
        });
      }
    });
  }

  runAfterImagesLoaded();
});
