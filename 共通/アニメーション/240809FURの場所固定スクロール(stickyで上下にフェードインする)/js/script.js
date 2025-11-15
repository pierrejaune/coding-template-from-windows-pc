document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section');
  const windowHeight = window.innerHeight;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset;
    const index = Math.floor(scrollTop / windowHeight);

    sections.forEach((section, i) => {
      if (i === index) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  });
});
