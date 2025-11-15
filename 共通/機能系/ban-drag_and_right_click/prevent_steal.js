(() => {
  const container = document.querySelector('.f-container');
  if (!container) return;

  // 対象拡張子
  const IMG_EXT = /\.(jpe?g|png|svg)(\?.*)?$/i;
  const VIDEO_EXT = /\.mp4(\?.*)?$/i;

  // 対象メディア判定
  function isTargetMedia(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.tagName === 'IMG') {
      const src = el.getAttribute('src') || '';
      return IMG_EXT.test(src);
    }
    if (el.tagName === 'VIDEO') {
      const direct = el.getAttribute('src') || '';
      if (VIDEO_EXT.test(direct)) return true;
      const sources = el.querySelectorAll('source[src]');
      return Array.from(sources).some((s) =>
        VIDEO_EXT.test(s.getAttribute('src') || '')
      );
    }
    return false;
  }

  // 右クリック禁止（捕捉段階で握りつぶす）
  container.addEventListener(
    'contextmenu',
    (e) => {
      if (isTargetMedia(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    { capture: true }
  );

  // ドラッグ開始禁止
  container.addEventListener(
    'dragstart',
    (e) => {
      if (isTargetMedia(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    { capture: true }
  );

  // 選択開始も禁止（画像長押しでの呼び出し抑制に寄与）
  container.addEventListener(
    'selectstart',
    (e) => {
      if (isTargetMedia(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    { capture: true }
  );

  // モバイル長押し対策（CSSベース + ロングプレス検知）
  const style = document.createElement('style');
  style.textContent = `
    .f-container, .f-container * {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    /* 印刷時は強制的に非表示（保険） */
    @media print {
      .f-container img, .f-container video { display: none !important; }
    }
    /* スクショ/印刷ショートカット検出時の一時隠し */
    .f-container.anti-capture-hidden img,
    .f-container.anti-capture-hidden video {
      visibility: hidden !important;
    }
  `;
  document.head.appendChild(style);

  let longPressTimer = null;
  const LONG_PRESS_MS = 550;

  container.addEventListener(
    'touchstart',
    (e) => {
      const t = e.target;
      if (isTargetMedia(t)) {
        // 長押し検知（発火時に何もしない=コールアウトを出させない狙い）
        longPressTimer = setTimeout(() => {
          // 何もしないが、長押し中の既定動作を誘発させないためにフォーカス移動を試みる
          try {
            t.blur && t.blur();
          } catch {}
        }, LONG_PRESS_MS);
      }
    },
    { passive: true }
  );

  ['touchend', 'touchcancel', 'touchmove'].forEach((type) => {
    container.addEventListener(
      type,
      () => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      },
      { passive: true }
    );
  });

  // 既存/追加要素にも属性を付与（draggable無効、動画のダウンロードUI抑止）
  function hardenMedia(root = container) {
    root.querySelectorAll('img[src]').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (IMG_EXT.test(src)) img.setAttribute('draggable', 'false');
    });
    root.querySelectorAll('video').forEach((v) => {
      const direct = v.getAttribute('src') || '';
      const match =
        VIDEO_EXT.test(direct) ||
        Array.from(v.querySelectorAll('source[src]')).some((s) =>
          VIDEO_EXT.test(s.getAttribute('src') || '')
        );
      if (match) {
        v.setAttribute(
          'controlsList',
          `${v.getAttribute('controlsList') || ''} nodownload`.trim()
        );
        v.setAttribute('disablePictureInPicture', '');
        v.setAttribute('draggable', 'false');
        // 念のため動画上の右クリックも抑止
        v.oncontextmenu = () => false;
      }
    });
  }
  hardenMedia();

  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      m.addedNodes &&
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) hardenMedia(n);
        });
    }
  });
  mo.observe(container, { childList: true, subtree: true });

  // ===== 印刷/スクショ系の抑止（発見し次第、即時に非表示） =====
  const HIDE_MS = 4000; // 非表示継続時間（必要に応じて調整）
  function hideFor(ms = HIDE_MS) {
    container.classList.add('anti-capture-hidden');
    if (ms > 0)
      setTimeout(() => container.classList.remove('anti-capture-hidden'), ms);
  }

  // Ctrl/Cmd+P を握りつぶす & 非表示
  window.addEventListener(
    'keydown',
    (e) => {
      const key = (e.key || '').toLowerCase();
      // 印刷ショートカット
      if ((e.ctrlKey || e.metaKey) && key === 'p') {
        e.preventDefault();
        e.stopPropagation();
        hideFor();
      }
      // Windows: PrintScreen（key または keyCode=44）
      if (key === 'printscreen' || e.keyCode === 44) {
        hideFor();
      }
      // macOS: Shift+Cmd+3/4/5 (全画面/範囲/ツール)
      if (
        e.metaKey &&
        e.shiftKey &&
        (key === '3' || key === '4' || key === '5')
      ) {
        hideFor();
      }
    },
    true
  );

  // 印刷イベント（ブラウザがトリガーする正式イベント）
  window.addEventListener('beforeprint', () => {
    // 印刷プレビューに入る直前に確実に隠す
    container.classList.add('anti-capture-hidden');
  });
  window.addEventListener('afterprint', () => {
    container.classList.remove('anti-capture-hidden');
  });

  // フォーカス喪失直後に一時的に隠す（OSスクショ起動でフォーカスが外れた場合の保険）
  window.addEventListener('blur', () => hideFor(2500));
})();
