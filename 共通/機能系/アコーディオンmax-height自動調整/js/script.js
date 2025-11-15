// jQueryの場合
$("[class^='sec'][class$='__Hide-Btn']").on('click', function () {
  const $btn = $(this);
  const sectionPrefix = $btn.attr('class').match(/(sec\d{2})/)[1];
  const $target = $(`.${sectionPrefix}__Hide`);
  const $wrapper = $target.find('.sec__wrapper');
  const $img = $btn.find('img');

  const isOpen = $target.hasClass('-op');

  if (isOpen) {
    // 閉じる処理
    $target.removeClass('-op').css('max-height', '');
    $img.attr('src', './img/btn_all_colors.svg');
  } else {
    // 画像等の読み込みを考慮して高さ取得を遅延
    const updateHeight = () => {
      const wrapperHeight = $wrapper.outerHeight(true);
      $target.css('max-height', wrapperHeight + 'px');
    };

    $target.addClass('-op');
    updateHeight();

    // 念のため画像読み込み後にも再設定
    $wrapper.find('img').on('load', function () {
      updateHeight();
    });

    $img.attr('src', './img/btn_all_colors_close.svg');
  }
});

// jsの場合
document
  .querySelectorAll("[class^='sec'][class$='__Hide-Btn']")
  .forEach((btn) => {
    btn.addEventListener('click', () => {
      const className = btn.className;
      const sectionPrefixMatch = className.match(/(sec\d{2})/);
      if (!sectionPrefixMatch) return;
      const sectionPrefix = sectionPrefixMatch[1];

      const target = document.querySelector(`.${sectionPrefix}__Hide`);
      const wrapper = target.querySelector('.sec__wrapper');
      const img = btn.querySelector('img');

      const isOpen = target.classList.contains('-op');

      if (isOpen) {
        // 閉じる処理
        target.classList.remove('-op');
        target.style.maxHeight = '';
        img.setAttribute('src', './img/btn_all_colors.svg');
      } else {
        const updateHeight = () => {
          const wrapperHeight = wrapper.offsetHeight;
          target.style.maxHeight = wrapperHeight + 'px';
        };

        target.classList.add('-op');
        updateHeight();

        // 画像読み込み後にも再設定
        const images = wrapper.querySelectorAll('img');
        images.forEach((image) => {
          image.addEventListener('load', updateHeight);
        });

        img.setAttribute('src', './img/btn_all_colors_close.svg');
      }
    });
  });
