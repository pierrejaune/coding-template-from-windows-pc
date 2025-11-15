$(function () {
  // .modelをクリックしたときの処理
  document.querySelectorAll('.model').forEach((model) => {
    model.addEventListener('click', () => {
      // クリックされた.model自体に-clickクラスを付け外し
      model.classList.toggle('-click');

      // .model内の.blockにも-clickクラスを付け外し
      const blocks = model.querySelectorAll('.block');
      blocks.forEach((block) => {
        block.classList.toggle('-click');
      });

      // .block内のSVGパス（.cls-1）に対して0.1秒ずつずらして-activeを付け外し
      // （最初の要素が未アクティブなら付与、そうでなければ削除）
      const cls1Elements = model.querySelectorAll('.block .cls-1');
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
        }, index * 100); // 1つずつ0.1秒の間隔で処理
      });
    });
  });

  // === テキストを1文字ずつ分解して<span>で囲む処理 ===
  // ・HTMLタグはそのまま残す
  // ・テキストノードのみ処理する
  // ・半角スペースは &nbsp; に変換して保持する
  document.querySelectorAll('.block').forEach((block) => {
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // ✅ TEXT_NODEとは？
        // 「タグに囲まれていないテキスト部分」を表すノード。
        // 例: <div>Hello <span>World</span></div>
        // └ "Hello " や "World" が TEXT_NODEになる。

        // テキストノードを対象に1文字ずつ分解
        const text = node.textContent;
        const parentNode = node.parentNode;

        // 前後の不要な空白を削除
        const trimmedText = text.trim();

        if (trimmedText.length > 0) {
          const spans = [];

          trimmedText.split('').forEach((char) => {
            // 1文字ごとに<span class="char-span">で囲む
            // 半角スペースは &nbsp; に変換して保持
            const span = document.createElement('span');
            span.className = 'char-span';
            span.textContent = char === ' ' ? '\u00A0' : char;
            spans.push(span);
          });

          // 元のテキストノードの位置にspanを挿入
          spans.forEach((span) => {
            parentNode.insertBefore(span, node);
          });

          // 元のテキストノードを削除
          parentNode.removeChild(node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // ✅ ELEMENT_NODEとは？
        // div, span, strong など「タグ要素」を表すノード。
        // もし.blockの子要素が<span>などの要素だった場合は、
        // その中にさらにTEXT_NODEが存在する可能性がある。

        // ✅ 再帰処理の意味
        // 子要素を順番に掘り下げて、テキストノードに出会うまで繰り返しprocessNodeを実行する。
        // これにより、タグが入れ子になっていてもテキストをすべて対象にできる。
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
          processNode(node.childNodes[i]);
        }
      }
    }

    processNode(block);
  });

  // .blockに-clickが付いたら、その中の文字を順番にアニメーション表示する
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

  // 1文字ずつ順番に-activeクラスを付与してアニメーション
  function activateCharsSequentially(blockElement) {
    const charSpans = blockElement.querySelectorAll('.char-span');

    // いったん全ての-activeを削除
    charSpans.forEach((span) => span.classList.remove('-active'));

    // 50msずつずらして順番に-activeを付与
    charSpans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add('-active');
      }, index * 50);
    });
  }

  // 以下はスクロール・フェード関連の処理（省略）
});
