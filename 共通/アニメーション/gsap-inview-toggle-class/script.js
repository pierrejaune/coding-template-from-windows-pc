ScrollTrigger.create({
  trigger: '.ac__list',
  start: 'bottom top', // .ac__listの下端が画面上端に達したとき
  onEnter: () => document.querySelector('.float-nav').classList.add('on'),
  onLeaveBack: () =>
    document.querySelector('.float-nav').classList.remove('on'),
  // markers: true, // デバッグ用
});
