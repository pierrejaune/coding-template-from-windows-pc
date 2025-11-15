// ===============================================================
// ▼ デバイス判定とクラス付与処理（Vanilla JS版）
// ===============================================================

// 「device_class」クラスを持つすべての要素を取得
const deviceElems = document.getElementsByClassName('device_class');

// ユーザーエージェント文字列を取得
const ua = navigator.userAgent;

// HTMLCollectionを配列のように扱ってループ
Array.prototype.forEach.call(deviceElems, (elem) => {
  // ---------------------------------
  // iPhone端末を判定してクラス付与
  // ---------------------------------
  if (ua.includes('iPhone')) {
    elem.classList.add('iPhone');
  }

  // ---------------------------------
  // iPad端末を判定してクラス付与
  // ---------------------------------
  if (ua.includes('iPad')) {
    elem.classList.add('iPad');
  }

  // ---------------------------------
  // Android端末を判定してクラス付与
  // ---------------------------------
  if (ua.includes('Android')) {
    elem.classList.add('Android');
  }
});

// ===============================================================
// ▼ スクロールに応じた固定ボタン制御処理
// ===============================================================
document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------
  // 共通関数：固定ボタンの表示・位置制御
  // -----------------------------
  function handleFixedElement(selector, referenceSelector) {
    const element = document.querySelector(selector);
    const reference = document.querySelector(referenceSelector);
    if (!element || !reference) return; // 要素が存在しなければ処理中断

    // 初期状態は非表示
    element.style.display = 'none';
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.3s ease';

    // スクロールイベント
    window.addEventListener('scroll', () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + window.innerHeight;
      const snsOffsetTop =
        reference.getBoundingClientRect().top + window.scrollY;

      // -----------------------------
      // スクロール量が200pxを超えたら表示
      // -----------------------------
      if (scrollTop > 200) {
        element.style.display = 'block';
        element.style.opacity = '1';
      } else {
        element.style.opacity = '0';
        // opacityが0になった後にdisplay:noneにする（アニメーション後）
        setTimeout(() => {
          if (parseFloat(element.style.opacity) === 0) {
            element.style.display = 'none';
          }
        }, 300);
      }

      // -----------------------------
      // SNSリストと重ならないように位置を調整
      // -----------------------------
      if (scrollBottom >= snsOffsetTop) {
        // SNSリストと重なる位置ではabsolute配置
        element.style.position = 'absolute';
        element.style.bottom = '0';
      } else {
        // 通常は画面下部に固定表示
        element.style.position = 'fixed';
        element.style.bottom = '0';
      }
    });
  }

  // =========================
  // 固定ボタン & ページトップボタン適用
  // =========================
  handleFixedElement('.fix', '.feature-snslist');
  handleFixedElement('.pagetop', '.feature-snslist');

  // ===============================================================
  // ▼ フェードインアニメーション制御（IntersectionObserver使用）
  // ===============================================================

  const fadeElements = document.querySelectorAll('.js-fade');
  if (fadeElements.length) {
    // IntersectionObserverで要素が画面内に入ったか監視
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 画面内に入った要素にクラスを追加してアニメーション発火
            entry.target.classList.add('is-active');
            // 一度アニメーションした要素は監視解除（繰り返し不要な場合）
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // 10%見えたら発火
      }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }
});
