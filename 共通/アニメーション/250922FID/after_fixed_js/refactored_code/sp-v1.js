// ---------------------------------------
// ページの全リソース（画像など含む）が読み込まれたら実行
// ---------------------------------------
window.addEventListener('load', function () {
  // GSAPのScrollTriggerプラグインを登録
  gsap.registerPlugin(ScrollTrigger);

  // .con 要素を配列として取得
  const conElements = gsap.utils.toArray('.con');

  // 各 .con 要素ごとに処理
  conElements.forEach((conEl, index) => {
    // .con 内の .inner1 要素を取得
    const inner = conEl.querySelector('.inner1');

    // .inner1 をスクロール開始でフェードインさせるアニメーション
    gsap.fromTo(
      inner,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: conEl,
          start: 'top top',
          end: `+=${0.5 * window.innerHeight}`,
          scrub: true,
          pinSpacing: false,
          markers: false,
          id: `o-${index + 1}`,
        },
      }
    );

    // conEl をスクロールで固定（上部）
    ScrollTrigger.create({
      trigger: conEl,
      start: 'top top',
      end: `+=${window.innerHeight}`,
      pin: conEl,
      pinSpacing: false,
      markers: false,
      id: `t-${index + 1}`,
    });

    // conEl をスクロールで固定（下部）
    ScrollTrigger.create({
      trigger: conEl,
      start: 'bottom bottom',
      end: `+=${2 * window.innerHeight}`,
      pin: conEl,
      pinSpacing: false,
      markers: false,
      id: `b-${index + 1}`,
    });

    // -------------------------------------
    // 各 .con に showed クラスを付け替え
    // （最後の .con は通過後も showed を残す）
    // -------------------------------------
    ScrollTrigger.create({
      trigger: conEl,
      start: 'top 1%',
      end: 'bottom -10%',
      onEnter: () => conEl.classList.add('showed'),
      onEnterBack: () => conEl.classList.add('showed'),
      onLeave: () => {
        if (index !== conElements.length - 1) {
          conEl.classList.remove('showed');
        }
      },
      onLeaveBack: () => conEl.classList.remove('showed'),
      markers: false,
      id: 'showed-' + (index + 1),
    });
  });
});

// ---------------------------------------
// DOM構築後に Swiper スライダーを初期化
// ---------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.sec03 .swiper', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    speed: 2000,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });
});

// ---------------------------------------
// クレジット表記の整形処理（SP用設定）
// ---------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const creditAdjustments = {
    '.sec01 .credit': [2],
    '.sec02 .credit': [2, 4],
    '.sec03 .credit': [2],
    '.sec04 .credit': [2],
    '.sec05 .credit': [2],
    '.sec06 .credit': [2],
    '.sec07 .credit': [1, 3],
  };

  for (const [selector, indices] of Object.entries(creditAdjustments)) {
    const items = document.querySelectorAll(`${selector} .item`);
    indices.forEach((i) => {
      if (items.length >= i) {
        const target = items[i - 1];
        target.classList.add('-mr0');
        target.insertAdjacentHTML('afterend', '<br>');
      }
    });
  }
});

// ---------------------------------------
// .-type 要素を1文字ずつ分割してspanで囲む処理
// ---------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const typeElements = document.querySelectorAll('.-type');

  typeElements.forEach((el) => {
    const textNodes = [...el.childNodes].filter(
      (node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()
    );

    textNodes.forEach((node) => {
      const wrapped = node.nodeValue
        .split('')
        .map((c) => (c === ' ' ? ' ' : `<span class="char">${c}</span>`))
        .join('');
      const spanWrapper = document.createElement('span');
      spanWrapper.innerHTML = wrapped;
      node.replaceWith(...spanWrapper.childNodes);
    });
  });

  // IntersectionObserver でアニメーション発火
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const chars = entry.target.querySelectorAll('.char');
          chars.forEach((char, i) => {
            setTimeout(() => {
              char.classList.add('show');
            }, i * 100);
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  typeElements.forEach((el) => observer.observe(el));
});

// ---------------------------------------
// .mv__List, .js-fade 要素をスクロールでフェードイン
// ---------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const fadeElements = document.querySelectorAll('.mv__List, .js-fade');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => observer.observe(el));
});
