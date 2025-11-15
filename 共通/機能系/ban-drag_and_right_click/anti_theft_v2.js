document.addEventListener('DOMContentLoaded', () => {
  (() => {
    const container = document.querySelector('.f-container');
    if (!container) return;

    // === 拡張子判定 ===
    const IMG_EXT = /\.(jpe?g|png|svg|gif)(\?.*)?$/i;
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
        .f-container img, .f-container video { display: none !important; }
      }
      .f-container.anti-capture-hidden img,
      .f-container.anti-capture-hidden video {
        transition: all 0s !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);

    // === ヘルパー: ノード内にメディアがあるか（自身／子孫／近い祖先） ===
    function nodeHasMedia(node) {
      if (!node || node.nodeType !== 1) return false;
      try {
        // 自身がメディア
        if (node.tagName === 'IMG') {
          const src = node.getAttribute('src') || '';
          if (IMG_EXT.test(src)) return true;
        }
        if (node.tagName === 'VIDEO') {
          const src = node.getAttribute('src') || '';
          if (VIDEO_EXT.test(src)) return true;
        }
        // 子孫にメディアがいるか
        if (node.querySelector && node.querySelector('img[src], video')) {
          // 厳密に拡張子も確認
          const img = node.querySelector('img[src]');
          if (img && IMG_EXT.test(img.getAttribute('src') || '')) return true;
          const vid = node.querySelector('video[src], video source[src]');
          if (vid) {
            // videoのsrcやsourceをチェック
            if (node.querySelector('video[src]')) {
              const v = node.querySelector('video[src]');
              if (VIDEO_EXT.test(v.getAttribute('src') || '')) return true;
            }
            if (node.querySelector('video source[src]')) {
              const s = node.querySelector('video source[src]');
              if (VIDEO_EXT.test(s.getAttribute('src') || '')) return true;
            }
          }
        }
        // 近い祖先がメディア（まれだが安全策）
        if (node.closest && node.closest('img[src], video')) {
          const ancImg = node.closest('img[src]');
          if (ancImg && IMG_EXT.test(ancImg.getAttribute('src') || ''))
            return true;
          const ancVid = node.closest('video');
          if (ancVid) {
            const vsrc = ancVid.getAttribute('src') || '';
            if (VIDEO_EXT.test(vsrc) || ancVid.querySelector('source[src]'))
              return true;
          }
        }
      } catch (err) {
        return false;
      }
      return false;
    }

    // === ヘルパー: 長押し対象の「メディア包含ブロック」 を探す ===
    // nodeから上にたどって、最初に「子孫に img/video を持つ要素」を返す（containerまで）
    function findClosestMediaContainer(node) {
      let cur = node;
      while (cur && cur !== container && cur !== document.body) {
        if (cur.querySelector && cur.querySelector('img[src], video')) {
          // さらに子孫のsrcの拡張子を確認して確実にメディアを含むか判定
          const imgs = Array.from(cur.querySelectorAll('img[src]'));
          const vids = Array.from(
            cur.querySelectorAll('video, video source[src]')
          );
          const hasImg = imgs.some((i) =>
            IMG_EXT.test(i.getAttribute('src') || '')
          );
          const hasVid = vids.some((v) => {
            if (v.tagName === 'VIDEO')
              return (
                VIDEO_EXT.test(v.getAttribute('src') || '') ||
                v.querySelector('source[src]')
              );
            // source element
            return VIDEO_EXT.test(v.getAttribute('src') || '');
          });
          if (hasImg || hasVid) return cur;
        }
        cur = cur.parentElement;
      }
      // 最終フォールバック: 直接img/videoを探す（例: node自体がimgのケース）
      const directImg =
        node.querySelector && node.querySelector('img[src]')
          ? node.querySelector('img[src]')
          : node.closest && node.closest('img[src]');
      if (directImg) return directImg;
      const directVid =
        node.querySelector && node.querySelector('video')
          ? node.querySelector('video')
          : node.closest && node.closest('video');
      if (directVid) return directVid;
      // なければ container（保険）
      return container;
    }

    // === メディアを一時的に隠す（復帰は自動） ===
    function hideMediaTemporarily(mediaContainer, ms = 2000) {
      if (!mediaContainer) return;
      // collect nodes to hide
      const nodes = Array.from(
        (mediaContainer.querySelectorAll &&
          mediaContainer.querySelectorAll('img[src], video')) ||
          (mediaContainer.tagName && /img|video/i.test(mediaContainer.tagName)
            ? [mediaContainer]
            : [])
      ).filter(Boolean);

      if (nodes.length === 0) return;

      const prevStyles = nodes.map((n) => ({
        node: n,
        vis: n.style.visibility || '',
        op: n.style.opacity || '',
        pe: n.style.pointerEvents || '',
      }));

      nodes.forEach((n) => {
        n.style.visibility = 'hidden';
        n.style.opacity = '0';
        n.style.pointerEvents = 'none';
      });

      // restore after timeout
      setTimeout(() => {
        prevStyles.forEach((p) => {
          if (!p.node) return;
          p.node.style.visibility = p.vis;
          p.node.style.opacity = p.op;
          p.node.style.pointerEvents = p.pe;
        });
      }, ms);
    }

    // === 右クリック禁止 / ドラッグ開始禁止 / 選択開始禁止 ===
    ['contextmenu', 'dragstart', 'selectstart'].forEach((ev) => {
      container.addEventListener(
        ev,
        (e) => {
          try {
            if (nodeHasMedia(e.target)) {
              e.preventDefault();
              e.stopPropagation();
            }
          } catch (err) {}
        },
        { capture: true }
      );
    });

    // === 動画を保護 ===
    function secureVideo(v) {
      const direct = v.getAttribute('src') || '';
      const match =
        VIDEO_EXT.test(direct) ||
        Array.from(v.querySelectorAll('source[src]||[]')).some((s) =>
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

    // === 初期要素処理（draggable無効・動画保護） ===
    function hardenMedia(root = container) {
      root.querySelectorAll &&
        root.querySelectorAll('img[src]').forEach((img) => {
          const src = img.getAttribute('src') || '';
          if (IMG_EXT.test(src)) {
            img.setAttribute('draggable', 'false');
            img.style.userSelect = 'none';
            img.style.webkitUserDrag = 'none';
          }
        });
      root.querySelectorAll &&
        root.querySelectorAll('video').forEach(secureVideo);
    }
    hardenMedia();

    // === 追加要素にも適用 ===
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        if (!m.addedNodes) continue;
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) hardenMedia(n);
        });
      }
    });
    mo.observe(container, { childList: true, subtree: true });

    // === 長押し対策（強化版） ===
    let longPressTimer = null;
    const LONG_PRESS_MS = 600; // 長押し判定（ms）
    const LONG_HIDE_MS = 2000; // 隠す時間（ms）

    container.addEventListener(
      'touchstart',
      (e) => {
        try {
          const t = e.target;
          // イベントが発生した場所にメディア（自身/子孫/祖先）があるか確認
          if (!nodeHasMedia(t)) return;
          // 見つかった「メディア包含ブロック」を取得
          const mediaContainer = findClosestMediaContainer(t);

          // タイマーセット
          longPressTimer = setTimeout(() => {
            // 長押し検知 → メディアを一時的に隠す
            hideMediaTemporarily(mediaContainer, LONG_HIDE_MS);
          }, LONG_PRESS_MS);
        } catch (err) {
          // ignore
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

    // === コピー / カットイベント検出（選択してコピーされた場合の保険） ===
    document.addEventListener(
      'copy',
      (e) => {
        try {
          const sel = window.getSelection && window.getSelection();
          if (!sel || sel.rangeCount === 0) return;
          const range = sel.getRangeAt(0);
          const common =
            range.commonAncestorContainer.nodeType === 3
              ? range.commonAncestorContainer.parentElement
              : range.commonAncestorContainer;
          if (container.contains(common)) {
            // コピーが f-container 内で行われようとしている → 阻止 & 一時的に隠す
            e.preventDefault && e.preventDefault();
            hideMediaTemporarily(container, LONG_HIDE_MS);
          }
        } catch (err) {}
      },
      true
    );

    document.addEventListener(
      'cut',
      (e) => {
        try {
          const sel = window.getSelection && window.getSelection();
          if (!sel || sel.rangeCount === 0) return;
          const range = sel.getRangeAt(0);
          const common =
            range.commonAncestorContainer.nodeType === 3
              ? range.commonAncestorContainer.parentElement
              : range.commonAncestorContainer;
          if (container.contains(common)) {
            e.preventDefault && e.preventDefault();
            hideMediaTemporarily(container, LONG_HIDE_MS);
          }
        } catch (err) {}
      },
      true
    );

    // === 印刷/スクショ系の抑止（既存ロジックを維持） ===
    const HIDE_MS = 5000;
    function hideFor(ms = HIDE_MS) {
      container.classList.add('anti-capture-hidden');
      if (ms > 0)
        setTimeout(() => container.classList.remove('anti-capture-hidden'), ms);
    }

    window.addEventListener(
      'keydown',
      (e) => {
        const key = (e.key || '').toLowerCase();
        // 印刷防止
        if ((e.ctrlKey || e.metaKey) && key === 'p') {
          e.preventDefault();
          e.stopPropagation();
          hideFor(1000);
        }
        // windowsスクリーンショット防止
        if (e.metaKey || key === 'printscreen' || e.keyCode === 44) hideFor();
        // macOSスクショ防止（⌘+Shift+3/4/5）
        if (
          e.metaKey &&
          e.shiftKey &&
          (key === '3' || key === '4' || key === '5')
        ) {
          hideFor(5000);
        }
      },
      true
    );

    window.addEventListener('beforeprint', () =>
      container.classList.add('anti-capture-hidden')
    );
    window.addEventListener('afterprint', () =>
      container.classList.remove('anti-capture-hidden')
    );

    // （必要なら）フォーカス喪失での一時隠しも使える（コメント解除して利用）
    // window.addEventListener('blur', () => hideFor(2500));
  })();
});
