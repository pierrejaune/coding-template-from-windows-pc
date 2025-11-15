$(function () {
  // inview
  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-show');
    }
  });

  /**
   * 指定された要素にタイピングアニメーションを適用する関数
   * @param {HTMLElement} element - タイピング対象の要素
   * @param {number} typingSpeed - 1文字ごとの表示速度（ミリ秒）
   */
  const typing = (element, typingSpeed = 100) => {
    const sentence = element.innerHTML.trim();
    const originalHeight = element.offsetHeight; // 元の高さを保持
    element.innerHTML = ''; // テキストをクリア
    element.style.minHeight = originalHeight + 'px'; // レイアウト崩れ防止

    // HTMLタグと空白を保持したままテキスト部分を分割
    const parts = sentence.split(/(<[^>]+>|\s+)/);
    let index = 0;

    const typeCharacter = () => {
      if (index >= parts.length) return; // 終了条件

      const part = parts[index];

      if (/<[^>]+>|\s+/.test(part)) {
        // タグや空白はそのまま挿入
        element.innerHTML += part;
        index++;
        typeCharacter();
      } else {
        // テキスト部分は1文字ずつ表示
        const textSpan = document.createElement('span');
        element.appendChild(textSpan);

        let charIndex = 0;
        const typeText = () => {
          if (charIndex < part.length) {
            textSpan.textContent += part[charIndex++];
            setTimeout(typeText, typingSpeed);
          } else {
            index++;
            setTimeout(typeCharacter, 0);
          }
        };
        typeText();
      }
    };

    typeCharacter();
  };

  /**
   * 要素を監視して「is-show」クラスが付与されたらタイピング開始
   * @param {string} selector - 対象要素のセレクタ
   * @param {number} speed - タイピング速度
   */
  const observeTyping = (selector, speed) => {
    document.querySelectorAll(selector).forEach((element) => {
      const observer = new MutationObserver(() => {
        if (element.classList.contains('is-show')) {
          typing(element, speed);
          observer.disconnect(); // 一度だけ実行
        }
      });
      observer.observe(element, { attributes: true });
    });
  };

  // クラスごとに速度をマッピング
  const typingConfigs = {
    '.js-typing': 100, // 通常速度
    '.js-typing2': 50, // 速い速度
  };

  // 設定に基づいて監視開始
  Object.entries(typingConfigs).forEach(([selector, speed]) => {
    observeTyping(selector, speed);
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
