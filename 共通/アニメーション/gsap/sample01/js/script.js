gsap.registerPlugin(ScrollTrigger);

function setupPinImages(selector = '.ph__img', pinScrollDistance = '200vh') {
  const elements = document.querySelectorAll(selector);
  elements.forEach((img, index) => {
    const isLast = index === elements.length - 1;

    ScrollTrigger.create({
      trigger: img,
      start: 'top top',
      end: isLast ? undefined : `+=${pinScrollDistance}`,
      pin: !isLast,
      pinSpacing: !isLast, // spacing も無効に
      markers: true, // デバッグ中のみ
    });
  });
}

// 実行
setupPinImages('.ph__img', '200px');
