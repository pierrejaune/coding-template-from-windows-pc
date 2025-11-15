$(function () {
  // inview
  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-show');
    }
  });

  const typing = (element, typingSpeed = 100) => {
    const sentence = element.innerHTML.trim();
    const originalHeight = element.offsetHeight; // 元の高さを取得
    element.innerHTML = ''; // テキストを消す
    element.style.minHeight = originalHeight + 'px'; // 元の高さを維持

    // HTMLのタグをそのまま残し、テキストのみを取り出す
    const parts = sentence.split(/(<[^>]+>|\s+)/); // タグと空白を分割
    let index = 0;

    const typeCharacter = () => {
      if (index < parts.length) {
        const part = parts[index];

        // spanタグや空白をそのまま追加
        if (part.match(/<[^>]+>/) || part.match(/\s+/)) {
          element.innerHTML += part;
          index++;
          typeCharacter();
        } else {
          const textSpan = document.createElement('span'); // 1文字ずつ追加するための span
          element.appendChild(textSpan);

          let charIndex = 0;
          const typeText = () => {
            if (charIndex < part.length) {
              textSpan.textContent += part[charIndex];
              charIndex++;
              setTimeout(typeText, typingSpeed); // タイピングスピードを適用
            } else {
              index++;
              setTimeout(typeCharacter, 0); // 次の文字（または空白）へ遷移
            }
          };
          typeText();
        }
      }
    };

    typeCharacter();
  };

  // すべての .js-typing 要素を監視
  document.querySelectorAll('.js-typing').forEach((element) => {
    const observer = new MutationObserver(() => {
      if (element.classList.contains('is-show')) {
        typing(element, 100); // 通常の速さ
        observer.disconnect();
      }
    });

    observer.observe(element, { attributes: true });
  });

  // すべての .js-typing2 要素を監視
  document.querySelectorAll('.js-typing2').forEach((element) => {
    const observer = new MutationObserver(() => {
      if (element.classList.contains('is-show')) {
        typing(element, 50); // 速いタイピング速度
        observer.disconnect();
      }
    });

    observer.observe(element, { attributes: true });
  });

  //アンカーリンク
  $(window).on('load', function () {
    $('a[href^="#"]').on('click', function () {
      var speed = 500,
        href = $(this).attr('href'),
        target = $(href == '#' || href == '' ? 'html' : href),
        headerHeight = $('.l-header .pc-header-sticky').innerHeight(),
        imgHeight = $('.u-head__txt').innerHeight(),
        position = target.offset().top - headerHeight - imgHeight - 100;
      console.log(imgHeight);
      $('html, body').animate({ scrollTop: position }, speed, 'swing');
      return false;
    });
  });
});
