document.addEventListener('DOMContentLoaded', () => {
  /**
   * 特定のセクション内の要素にクラス追加と<br>挿入を行う
   * @param {string} section - セクションセレクタ
   * @param {number[]} indexes - nth-of-type で対象にする要素の番号
   */
  function adjustCredits(section, indexes) {
    indexes.forEach((i) => {
      const el = document.querySelector(
        `${section} .credit .item:nth-of-type(${i})`
      );
      if (el) {
        el.classList.add('-mr0');
        el.insertAdjacentHTML('afterend', '<br>');
      }
    });
  }

  // 各セクションごとの調整（重複を1行にまとめた）
  adjustCredits('.sec01', [2]);
  adjustCredits('.sec02', [2, 4]);
  adjustCredits('.sec03', [2]);
  adjustCredits('.sec04', [2]);
  adjustCredits('.sec05', [2]);
  adjustCredits('.sec06', [2]);
  adjustCredits('.sec07', [1, 3]);

  /**
   * テキストノードを1文字ずつ <span class="char"> でラップする
   */
  document.querySelectorAll('.-type').forEach((el) => {
    [...el.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        const wrapped = node.nodeValue
          .split('')
          .map((c) => (c === ' ' ? ' ' : `<span class="char">${c}</span>`))
          .join('');
        const temp = document.createElement('span');
        temp.innerHTML = wrapped;
        // node を置き換え
        el.replaceChild(temp, node);
        // temp 内の子要素を el に直接移動
        while (temp.firstChild) {
          el.insertBefore(temp.firstChild, temp);
        }
        el.removeChild(temp);
      }
    });
  });

  /**
   * IntersectionObserver を使って要素が画面内に入ったら処理を実行
   * @param {Element} el - 対象要素
   * @param {Function} callback - 発火時の処理
   */
  function observeInView(el, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target); // 一度だけ発火
        }
      });
    });
    observer.observe(el);
  }

  // テキストアニメーション処理
  document.querySelectorAll('.-type').forEach((el) => {
    observeInView(el, (target) => {
      const chars = target.querySelectorAll('.char');
      chars.forEach((char, i) => {
        setTimeout(() => {
          char.classList.add('show');

          // 全ての .char に .show が付いたら .-icon を表示
          if (target.querySelectorAll('.char.show').length === chars.length) {
            setTimeout(() => {
              const icon = target.querySelector('.-icon');
              if (icon) icon.classList.add('show');
            }, 100);
          }
        }, i * 100);
      });
    });
  });

  // フェード系の処理
  document.querySelectorAll('.LeftCont__List, .js-fade').forEach((el) => {
    observeInView(el, (target) => {
      target.classList.add('is-active');
    });
  });
});
