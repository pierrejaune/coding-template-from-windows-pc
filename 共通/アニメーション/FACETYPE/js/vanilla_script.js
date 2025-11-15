// リファクタリング slick.js使用のため一部jQuery使用
document.addEventListener('DOMContentLoaded', () => {
  // --- IntersectionObserver ---
  const targetList = document.querySelectorAll('.target');
  const IO = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) target.dataset.isActive = 'true';
      });
    },
    { threshold: 0.3 }
  );
  targetList.forEach((target) => IO.observe(target));

  // --- slick 初期化（jQuery使用） ---
  $('.item__slide').slick({
    arrows: true,
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  // --- 定数 ---
  const arrowClasses = [
    'cute',
    'activecute',
    'fresh',
    'coolcasual',
    'feminine',
    'softelegant',
    'elegant',
    'cool',
  ];
  const brandNames = {
    cute: 'キュート',
    activecute: 'アクティブキュート',
    fresh: 'フレッシュ',
    coolcasual: 'クールカジュアル',
    feminine: 'フェミニン',
    cool: 'クール',
    softelegant: 'ソフトエレガント',
    elegant: 'エレガント',
  };

  // --- 共通処理 ---
  function updateUI() {
    const activeSlide = document.querySelector('.item__slide-box.slick-active');
    if (!activeSlide) return;
    const arrow = activeSlide.dataset.arrow;

    // 矢印色切り替え
    const slickArrows = document.querySelectorAll('.slick-arrow');
    slickArrows.forEach((arrowEl) => {
      arrowClasses.forEach((c) => arrowEl.classList.remove(c));
      if (arrow) arrowEl.classList.add(arrow);
    });

    //テキスト量が違うことによる高さ調整
    const itemType = document.querySelector('.item__type');
    if (itemType) {
      itemType.classList.toggle('on', activeSlide.classList.contains('cool'));
    }

    // ブランド切り替え
    const brandEl = document.querySelector('.js-brand');
    if (brandEl) brandEl.textContent = brandNames[arrow] || '';

    // アイテム切り替え
    document
      .querySelectorAll('.item__brand-list, .item__panel')
      .forEach((el) => {
        el.classList.toggle('on', el.classList.contains(arrow));
      });
  }

  // --- slick のスライド切り替え時に updateUI 実行 ---
  $('.item__slide').on('afterChange', updateUI);

  // --- その他イベント ---
  document
    .querySelectorAll('.slick-arrow, .item__type-text, .hero__link-face')
    .forEach((el) => el.addEventListener('click', updateUI));

  document
    .querySelectorAll('.item__slide-img')
    .forEach((el) =>
      el.addEventListener('touchend', () => setTimeout(updateUI, 100))
    );

  // 初期表示時に一度実行
  updateUI();
});
