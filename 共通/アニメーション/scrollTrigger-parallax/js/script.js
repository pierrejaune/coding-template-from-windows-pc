const video = document.querySelector('.video');
const content02 = document.querySelector('.content02');
const lastContent = document.querySelector('.last-content');

function updateLayout() {
  const shift = content02.offsetHeight * 0.5;
  lastContent.style.marginTop = `-${shift}px`;
}

function initParallax() {
  gsap.to(content02, {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: video, // ← videoが基準
      start: 'bottom bottom', // ← videoの下端がブラウザ下端に来た時
      end: () => '+=' + content02.offsetHeight, // ← content02の高さ分でパララックス完了
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

function setupObservers() {
  video.addEventListener('loadedmetadata', updateLayout);
  if (video.readyState >= 1) updateLayout();

  const ro = new ResizeObserver(updateLayout);
  ro.observe(video);
  ro.observe(content02);
}

setupObservers();
initParallax();
