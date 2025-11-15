letters.forEach((el) => {
  const isAll = el.dataset.letters === 'all'; // ← data-letters="all"かどうかを判定

  // SVG <g>タグまたはSVG要素の場合
  if (el instanceof SVGElement || el.tagName.toLowerCase() === 'g') {
    const paths = el.querySelectorAll('path');
    paths.forEach((path) => path.classList.add('letter'));

    const { start, end } = getScrollTriggerRange(el); // ← 共通関数を使用

    gsap.to(paths, {
      opacity: 1,
      filter: 'blur(0px)',
      ease: 'power2.out',
      // data-letters="all" の場合はstaggerしない
      stagger: isAll ? 0 : { amount: 0.5, from: 'start' },
      delay: isAll ? 1 : 0, // ← ★ allの場合のみ1秒遅延
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: true,
        // markers: true,
        scroller: window, //メインビジュアルのpin中でも反応させる
      },
    });
  } else {
    // テキストの場合（1文字ずつspanで囲む）
    const text = el.textContent; // ← trim()を削除してスペースも保持
    el.textContent = '';

    text.split('').forEach((char) => {
      const span = document.createElement('span');

      if (char === ' ') {
        // 半角スペースの場合は改行されずに表示されるように &nbsp; を使う
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }

      span.classList.add('letter');
      el.appendChild(span);
    });

    const letters = el.querySelectorAll('.letter');
    const { start, end } = getScrollTriggerRange(el); // ← 共通関数を使用

    gsap.to(letters, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      ease: 'power2.out',
      stagger: isAll ? 0 : { amount: 0.5, from: 'start' },
      delay: isAll ? 1 : 0, // ← ★ allの場合のみ1秒遅延
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: true,
        // markers: true,
        scroller: window, //メインビジュアルのpin中でも反応させる
      },
    });
  }
});
