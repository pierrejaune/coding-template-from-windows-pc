window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);

  const hasLeft = document.querySelector('.f-left') !== null;
  const topOffset = hasLeft ? 80 : 50;

  const section = document.querySelector('.sec__area');
  const bg = section.querySelector('.bg-navy');
  const imgs = section.querySelectorAll('.sec__img');
  if (imgs.length <= 1) return;

  const imgH = imgs[0].offsetHeight;
  const scrollLen = imgH * (imgs.length - 1);

  // 安定化: サイズ明示
  bg.style.width = '100%';
  bg.style.left = '0';
  bg.style.overflow = 'hidden';

  // 固定処理（pinSpacing無効）
  ScrollTrigger.create({
    trigger: section,
    start: `top+=${topOffset}px top`,
    end: `+=${scrollLen}`,
    pin: bg,
    pinSpacing: false, // ← レイアウト再計算を抑制
    scrub: true,
    onEnter: () => (bg.style.top = `${topOffset}px`),
    onEnterBack: () => (bg.style.top = `${topOffset}px`),
  });

  // スライド処理
  imgs.forEach((img, i) => {
    if (i === 0) return;
    gsap.fromTo(
      img,
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: `top+=${topOffset + imgH * (i - 1)} top`,
          end: `top+=${topOffset + imgH * i} top`,
          scrub: true,
        },
      }
    );
  });

  // 画像ロード後にScrollTriggerを再計算
  ScrollTrigger.refresh();
});
