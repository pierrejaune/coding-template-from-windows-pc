// WR用のjs/script.jsにコピペしてください。

document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.swiper', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    speed: 2000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});

$(function () {
  // .-modelをクリックしたら.-model内の.blockに-clickをtoggle
  document.querySelectorAll('.model').forEach((model) => {
    model.addEventListener('click', () => {
      // .model自体に-clickクラスをトグル
      model.classList.toggle('-click');

      // .model内の.blockにも-clickクラスをトグル
      const blocks = model.querySelectorAll('.block');
      blocks.forEach((block) => {
        block.classList.toggle('-click');
      });

      // 新機能：.block内の.cls-1に0.1秒ずつずらして-activeクラスをトグル.cls-1はsvg画像のpathについているclass
      const cls1Elements = model.querySelectorAll('.block .cls-1');

      // 最初の要素の状態でトグルの方向を決める
      const isAdding =
        cls1Elements.length > 0 &&
        !cls1Elements[0].classList.contains('-active');

      cls1Elements.forEach((cls1, index) => {
        setTimeout(() => {
          if (isAdding) {
            cls1.classList.add('-active');
          } else {
            cls1.classList.remove('-active');
          }
        }, index * 100); // 0.1秒（100ms）ずつ遅延
      });
    });
  });
  // .block内の文字列を1文字ずつspanで囲む（HTMLタグは保持、文字間の半角スペースのみ保持）
  document.querySelectorAll('.block').forEach((block) => {
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // テキストノードを1文字ずつspanで囲む
        const text = node.textContent;
        const parentNode = node.parentNode;

        // 先頭・末尾の空白を削除してから処理
        const trimmedText = text.trim();

        // 有効な文字がある場合のみ処理
        if (trimmedText.length > 0) {
          const spans = [];

          trimmedText.split('').forEach((char) => {
            // すべての文字をspanで囲む（半角スペースは&nbsp;に置き換え）
            const span = document.createElement('span');
            span.className = 'char-span';
            span.textContent = char === ' ' ? '\u00A0' : char;
            spans.push(span);
          });

          // テキストノードの位置に各spanを挿入
          spans.forEach((span) => {
            parentNode.insertBefore(span, node);
          });

          // 元のテキストノードを削除
          parentNode.removeChild(node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 子ノードを後ろから処理（インデックス変化を避けるため）
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
          processNode(node.childNodes[i]);
        }
      }
    }

    processNode(block);
  });

  // .block-clickクラスの監視と.char-spanへのアクティブ化
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        const target = mutation.target;
        if (target.classList.contains('-click')) {
          activateCharsSequentially(target);
        }
      }
    });
  });

  // 全ての.blockを監視
  document.querySelectorAll('.block').forEach((block) => {
    observer.observe(block, { attributes: true });
  });

  // .char-spanに順番に-activeクラスを付与（HTMLタグ間も連続）
  function activateCharsSequentially(blockElement) {
    // .block内の全ての.char-spanを取得（HTMLタグ境界関係なく）
    const charSpans = blockElement.querySelectorAll('.char-span');

    // 既存の-activeクラスを全て削除
    charSpans.forEach((span) => span.classList.remove('-active'));

    // HTMLタグに関係なく連続したインデックスで-activeクラスを付与
    charSpans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add('-active');
      }, index * 50); // 0.05秒 = 50ミリ秒
    });
  }

  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });
  $(window).scroll(function () {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      $('.fixbtn').fadeIn(300);
    } else {
      $('.fixbtn').fadeOut(300);
    }

    const scrollHeight = $(document).outerHeight(true);
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footerTop = $('.staff').offset().top - 100;
    if (scrollPosition >= footerTop) {
      $('.fixbtn').css({
        position: 'absolute',
      });
    } else {
      $('.fixbtn').css({
        position: 'fixed',
      });
    }
  });
});

// WR用のjs/script.jsにコピペしてください。
