// ===========================
// ページ読み込み後に実行
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------
  // ① inview相当の処理：要素が画面内に入ったらクラスを付与
  // クラスごとに異なる threshold（発火タイミング）を設定
  // -------------------------------------
  // 各クラスごとの設定をまとめる
  const observerSettings = [
    { selector: '.js-inview', classToAdd: 'is-active', threshold: 0.1 },
    { selector: '.move03', classToAdd: 'is-move03', threshold: 0.3 },
    { selector: '.move04', classToAdd: 'is-move04', threshold: 0.6 },
  ];

  // 各設定ごとに IntersectionObserver を生成
  observerSettings.forEach((setting) => {
    // 対象要素をすべて取得
    const elements = document.querySelectorAll(setting.selector);
    if (!elements.length) return; // 該当要素がなければスキップ

    // 各設定に応じた IntersectionObserver を作成
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          // 要素が指定した割合以上見えたらクラス付与
          if (entry.isIntersecting) {
            entry.target.classList.add(setting.classToAdd);
            // 一度だけ発火させる場合は監視を解除
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: setting.threshold,
      }
    );

    // 各要素を監視開始
    elements.forEach((el) => observer.observe(el));
  });

  // -------------------------------------
  // ② 動画のミュート切り替えボタン処理
  // -------------------------------------
  const video = document.querySelector('#headVideo');
  const muteButton = document.querySelector('#mute');
  const soundOn = document.querySelector('.sound-on');
  const soundOff = document.querySelector('.sound-off');

  if (video && muteButton) {
    muteButton.addEventListener('click', () => {
      const isMuted = video.muted;

      // ミュート状態を反転
      video.muted = !isMuted;

      // アイコンの表示切り替え
      if (isMuted) {
        soundOn.style.display = 'none';
        soundOff.style.display = 'block';
        muteButton.classList.add('off');
      } else {
        soundOn.style.display = 'block';
        soundOff.style.display = 'none';
        muteButton.classList.remove('off');
      }
    });
  }

  // -------------------------------------
  // ③ 背景画像の事前読み込み（プリロード）
  //先に読み込んでブラウザにキャッシュさせる。大量の読み込みは不可になるのでファーストビューなどで使用を推奨
  // -------------------------------------
  const images = ['img/bg_blue.jpg', 'img/bg_pink.jpg'];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // -------------------------------------
  // ④ sticky要素の固定解除処理
  // -------------------------------------
  const stickyElements = document.querySelectorAll('.sticky-element');
  const triggers = document.querySelectorAll('.trigger-point');

  stickyElements.forEach((sticky) => {
    // sticky要素より下にある最初のトリガー要素を特定
    const trigger = Array.from(triggers).find(
      (t) => t.offsetTop > sticky.offsetTop
    );
    if (!trigger) return;

    const checkPosition = () => {
      const triggerY = trigger.offsetTop + 300;
      const scrollY = window.scrollY;

      sticky.classList.toggle('is-released', scrollY > triggerY);
    };

    // 初期判定とスクロールイベント登録
    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
  });

  // -------------------------------------
  // ⑤ パララックス効果（風船などを上下に動かす）
  // -------------------------------------
  const parallaxElements = document.querySelectorAll('.c__03 .balloon');

  const handleParallax = (() => {
    let ticking = false;
    return () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        parallaxElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + scrollY;

          // 要素が画面内にある場合のみ動かす
          if (rect.top < windowHeight && rect.bottom > 0) {
            const speed = 1.0;
            const progress =
              (scrollY - elementTop + windowHeight) /
              (windowHeight + rect.height);
            const translateY = (progress - 0.5) * -100 * speed;
            el.style.transform = `translateY(${translateY}px)`;
          }
        });

        ticking = false;
      });
    };
  })();

  window.addEventListener('scroll', handleParallax, { passive: true });
  handleParallax(); // 初期実行（読み込み時の位置反映）

  // -------------------------------------
  // ⑥ スクロールで.featureの背景画像を切り替え
  // -------------------------------------
  const feature = document.querySelector('.feature');
  const c01 = document.querySelector('.c__01');
  const c07 = document.querySelector('.c__07');

  if (feature && c01 && c07) {
    const bgA = 'url(../img/bg_pink.jpg)';
    const bgB = 'url(../img/bg_blue.jpg)';

    const handleBackgroundChange = (() => {
      let ticking = false;
      return () => {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const halfHeight = windowHeight / 2;

          const c01Rect = c01.getBoundingClientRect();
          const c07Rect = c07.getBoundingClientRect();

          const c01Passed = c01Rect.top <= halfHeight;
          const c07Passed = c07Rect.top <= halfHeight;

          // 条件に応じてCSSカスタムプロパティを変更
          if (c07Passed) {
            feature.style.setProperty('--bg-image', bgA);
          } else if (c01Passed) {
            feature.style.setProperty('--bg-image', bgB);
          } else {
            feature.style.setProperty('--bg-image', bgA);
          }

          ticking = false;
        });
      };
    })();

    window.addEventListener('scroll', handleBackgroundChange, {
      passive: true,
    });
    handleBackgroundChange(); // 初回実行
  }
});

// ===========================
// Slickスライダーの設定部分（jQuery依存のためそのまま）
// ===========================
$(document).ready(function () {
  $('.feature .slick').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2400,
    speed: 1000,
    fade: false,
    dots: true,
    centerMode: true,
    centerPadding: 0,
    variableWidth: true,
    slidesToShow: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  });
});
