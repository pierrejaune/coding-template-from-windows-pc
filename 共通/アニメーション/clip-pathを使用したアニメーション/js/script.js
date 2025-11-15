$(document).ready(function () {
  // IO START
  const animList = document.querySelectorAll('.anim');
  const IO = new IntersectionObserver((observer) => {
    observer.forEach(
      ({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('showed');
        } else {
          // target.classList.remove('showed');
        }
      },
      { threshold: 0.3 } //30%表示されたら発火
    );
  });
  animList.forEach((target) => IO.observe(target));
});
