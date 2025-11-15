const setupHorizontalPinScroll = (selector) => {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    console.warn(`No elements found for selector: ${selector}`);
    return;
  }

  elements.forEach((element) => {
    const scrollDistance = () => element.scrollWidth - window.innerWidth;
    const targetX = () => -scrollDistance();
    gsap.to(element, {
      x: targetX,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        pin: true,
        scrub: 0.1,
        start: '-80px start',
        invalidateOnRefresh: true,
        end: () => '+=' + scrollDistance(),
        onRefresh: (self) => {},
        // markers: true,
      },
    });
  });
};

const horizontalPinScroll = () =>
  setupHorizontalPinScroll('.horizontal-scroll-container');
window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);
  horizontalPinScroll();
});

const modalButtons = document.querySelectorAll('[data-modal-button]');
modalButtons.forEach((button) =>
  button.addEventListener('click', (e) => {
    const { targetModal } = e.currentTarget.dataset;
    const target = document.querySelector(`[data-modal='${targetModal}']`);
    target.setAttribute('data-modal-active', null);

    // set body style
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  })
);

const modalCloseButtons = document.querySelectorAll('[modal-close-button]');
modalCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modals = document.querySelectorAll('[data-modal]');
    modals.forEach((modal) => modal.removeAttribute('data-modal-active'));

    // reset body style
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
  });
});

const videoPlayButton = document.querySelector('[data-video-play-button]');
videoPlayButton.addEventListener('click', (e) => {
  document.querySelector('[data-video]').play();
  e.currentTarget.style.display = 'none';
});

const videoSoundToggleButton = document.querySelector(
  '[data-video-sound-toggle-button]'
);
videoSoundToggleButton.addEventListener('click', (e) => {
  document.querySelector('[data-video]').muted =
    !document.querySelector('[data-video]').muted;
  if (e.currentTarget.getAttribute('data-is-muted')) {
    e.currentTarget.removeAttribute('data-is-muted');
  } else {
    e.currentTarget.setAttribute('data-is-muted', 'true');
  }
});
