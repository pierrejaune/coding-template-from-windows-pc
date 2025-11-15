document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('svg[data-vivus-id]');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const svg = entry.target;
          const id = svg.getAttribute('id');
          if (!svg.classList.contains('animated')) {
            new Vivus(id, {
              duration: 500,
              type: 'delayed', // 手書き感が強くなる
              forceRender: false,
              animTimingFunction: Vivus.EASE,
            });
            svg.classList.add('animated'); // 一度だけアニメーション
          }
          obs.unobserve(svg);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  targets.forEach((el) => {
    observer.observe(el);
  });
});
