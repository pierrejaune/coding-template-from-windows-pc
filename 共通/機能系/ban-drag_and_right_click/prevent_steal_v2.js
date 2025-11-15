(() => {
  const container = document.querySelector('.f-container');
  if (!container) return;

  // 拡張子判定
  const IMG_EXT = /\.(jpe?g|png)(\?.*)?$/i; // ← SVGを除外
  const VIDEO_EXT = /\.mp4(\?.*)?$/i;

  // === スタイル適用 ===
  const style = document.createElement('style');
  style.textContent = `
    .f-container, .f-container * {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    @media print {
      .f-container img, .f-container video, .f-container canvas { display: none !important; }
    }
    .f-container.anti-capture-hidden img,
    .f-container.anti-capture-hidden video,
    .f-container.anti-capture-hidden canvas {
      visibility: hidden !important;
    }
  `;
  document.head.appendChild(style);

  // === 対象メディア判定 ===
  function isTargetMedia(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.tagName === 'IMG') {
      const src = el.getAttribute('src') || '';
      return IMG_EXT.test(src); // ← PNG/JPGのみ
    }
    if (el.tagName === 'VIDEO') {
      const direct = el.getAttribute('src') || '';
      if (VIDEO_EXT.test(direct)) return true;
      return Array.from(el.querySelectorAll('source[src]')).some((s) =>
        VIDEO_EXT.test(s.getAttribute('src') || '')
      );
    }
    if (el.tagName === 'CANVAS') return true;
    return false;
  }

  // === 右クリック禁止 / ドラッグ禁止 / 選択禁止 ===
  ['contextmenu', 'dragstart', 'selectstart'].forEach((ev) => {
    container.addEventListener(
      ev,
      (e) => {
        if (isTargetMedia(e.target)) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { capture: true }
    );
  });

  // === JPG/PNG画像を canvas に変換 ===
  function replaceWithCanvas(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = img.src;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      canvas.style.maxWidth = '100%';
      canvas.style.height = 'auto';
      img.replaceWith(canvas);
    };
  }

  // === 動画を保護 ===
  function secureVideo(v) {
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
      v.oncontextmenu = () => false;
    }
  }

  // === 初期要素処理 ===
  function hardenMedia(root = container) {
    root.querySelectorAll('img[src]').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (IMG_EXT.test(src)) {
        img.setAttribute('draggable', 'false');
        replaceWithCanvas(img);
      }
    });
    root.querySelectorAll('video').forEach(secureVideo);
  }
  hardenMedia();

  // === 追加要素にも適用 ===
  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      m.addedNodes &&
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) hardenMedia(n);
        });
    }
  });
  mo.observe(container, { childList: true, subtree: true });

  // === 長押し対策 ===
  let longPressTimer = null;
  const LONG_PRESS_MS = 550;
  container.addEventListener(
    'touchstart',
    (e) => {
      if (isTargetMedia(e.target)) {
        longPressTimer = setTimeout(() => {
          try {
            e.target.blur && e.target.blur();
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

  // === 印刷/スクショ系の抑止 ===
  const HIDE_MS = 4000;
  function hideFor(ms = HIDE_MS) {
    container.classList.add('anti-capture-hidden');
    if (ms > 0)
      setTimeout(() => container.classList.remove('anti-capture-hidden'), ms);
  }

  window.addEventListener(
    'keydown',
    (e) => {
      const key = (e.key || '').toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === 'p') {
        e.preventDefault();
        e.stopPropagation();
        hideFor();
      }
      if (key === 'printscreen' || e.keyCode === 44) hideFor();
      if (
        e.metaKey &&
        e.shiftKey &&
        (key === '3' || key === '4' || key === '5')
      )
        hideFor();
    },
    true
  );

  window.addEventListener('beforeprint', () =>
    container.classList.add('anti-capture-hidden')
  );
  window.addEventListener('afterprint', () =>
    container.classList.remove('anti-capture-hidden')
  );
  window.addEventListener('blur', () => hideFor(2500));
})();
