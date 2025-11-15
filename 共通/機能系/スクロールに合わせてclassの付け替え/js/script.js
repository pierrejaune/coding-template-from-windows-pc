// jQueryの場合

// jsの場合
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.js-observeTarget');
  const fixedBg = document.querySelector('.js-chengeBackgroundImage');
  const bgClasses = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5'];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = [...sections].indexOf(entry.target);

        // 背景クラスだけを入れ替える
        bgClasses.forEach((bg) => fixedBg.classList.remove(bg));
        fixedBg.classList.add(bgClasses[index]);

        // セクションの active クラス制御
        sections.forEach((s) => s.classList.remove('active'));
        entry.target.classList.add('active');
      }
    });
  });

  sections.forEach((section) => observer.observe(section));
});
