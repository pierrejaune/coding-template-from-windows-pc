window.onload = function () {
  const feature = document.querySelector('.feature');
  const scrollBox = document.querySelector('.scroll__box');
  const targetList = document.querySelectorAll('.c__sec');
  const creditList = document.querySelectorAll('.credit');
  let isJumping = false;

  if (!feature || !scrollBox) return;

  // スクロールで .feature の縦位置を固定
  feature.addEventListener(
    'wheel',
    (e) => {
      if (isJumping) {
        e.preventDefault();
        return;
      }

      const atStart = scrollBox.scrollLeft <= 0;
      const atEnd =
        scrollBox.scrollLeft + scrollBox.clientWidth >= scrollBox.scrollWidth;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        // .feature の前に戻る
        if (atStart && e.deltaY < 0) {
          isJumping = true;
          window.scrollBy({
            top: -window.innerHeight * 0.5,
            behavior: 'smooth',
          });
          setTimeout(() => (isJumping = false), 800);
        }
        // .feature の後に進む
        else if (atEnd && e.deltaY > 0) {
          isJumping = true;
          window.scrollBy({
            top: window.innerHeight * 0.5,
            behavior: 'smooth',
          });
          setTimeout(() => (isJumping = false), 800);
        } else {
          scrollBox.scrollLeft += e.deltaY;
        }

        // 横スクロール中は常に top を補正
        if (Math.abs(window.scrollY - feature.offsetTop) > 1) {
          window.scrollTo({
            top: feature.offsetTop,
            behavior: 'auto',
          });
        }
      }
    },
    { passive: false }
  );

  // .feature が80%以上見えたら自動スクロール & .showed
  const featureObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, intersectionRatio }) => {
        if (isIntersecting && intersectionRatio >= 0.8) {
          feature.classList.add('showed');
          if (Math.abs(window.scrollY - feature.offsetTop) > 5 && !isJumping) {
            isJumping = true;
            window.scrollTo({
              top: feature.offsetTop,
              behavior: 'smooth',
            });
            setTimeout(() => (isJumping = false), 800);
          }
        }
      });
    },
    { threshold: [0.8] }
  );

  featureObserver.observe(feature);

  // 下から戻ってきたときにも補正
  window.addEventListener('scroll', () => {
    if (isJumping) return;

    const rect = feature.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.top < 0 && rect.bottom > vh * 0.8) {
      isJumping = true;
      window.scrollTo({
        top: feature.offsetTop,
        behavior: 'smooth',
      });
      setTimeout(() => (isJumping = false), 800);
    }
  });

  // 横スクロール中、.c__sec の中央が 20vw〜70vw に入ったら .showed と .credit0X 切り替え
  function checkHorizontalInView() {
    const viewportLeft = window.innerWidth * 0.2;
    const viewportRight = window.innerWidth * 0.7;

    targetList.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      const isVisible = center >= viewportLeft && center <= viewportRight;

      if (isVisible) {
        el.classList.add('showed');

        // .credit 切り替え
        creditList.forEach((c) => c.classList.remove('on'));
        const credit = document.querySelector(`.credit0${index + 1}`);
        if (credit) credit.classList.add('on');
      } else {
        el.classList.remove('showed');
      }
    });
  }

  // 横スクロール時に checkHorizontalInView 実行
  scrollBox.addEventListener('scroll', checkHorizontalInView);

  // 初期実行
  checkHorizontalInView();
};
