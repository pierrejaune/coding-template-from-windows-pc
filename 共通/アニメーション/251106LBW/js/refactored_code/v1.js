// =========================================================
// slickスライダー以外をVanilla JSで書き換えたリファクタ版
// WR用のjs/script.js にコピペして使用できます
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // 【1】inview（画面内に入ったらクラス付与）
  // ============================================
  // IntersectionObserverを使ってjQueryの"inview"を置き換え
  const inviewTargets = document.querySelectorAll('.js-fade, .js-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-show');
          }
        });
      },
      { threshold: 0.1 }
    );

    inviewTargets.forEach((el) => observer.observe(el));
  }

  // ============================================
  // 【2】slickスライダー（jQuery依存）
  // ============================================
  // ※ slickはjQueryプラグインなのでここは残しています。
  $('.ph-slider').slick({
    fade: false,
    speed: 2000,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    autoplay: false,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    variableWidth: true,
  });

  // --- スライド切り替え直前処理 ---
  $('.ph-slider').on(
    'beforeChange',
    function (event, slick, currentSlide, nextSlide) {
      const $slider = $(this);
      const slideIndex = nextSlide !== undefined ? nextSlide : 0;
      const $nextActiveSlide = $slider.find(
        '.slick-slide[data-slick-index="' + slideIndex + '"]'
      );

      $slider.addClass('dots-transitioning');

      setTimeout(() => {
        if (
          $nextActiveSlide.find('.ph-s').length > 0 ||
          $nextActiveSlide.hasClass('ph-s')
        ) {
          $slider.addClass('on');
        } else {
          $slider.removeClass('on');
        }

        setTimeout(() => {
          $slider.removeClass('dots-transitioning');
        }, 50);
      }, 300);
    }
  );

  // --- 初回チェック ---
  document.querySelectorAll('.ph-slider').forEach((slider) => {
    const firstSlide = slider.querySelector(
      '.slick-slide[data-slick-index="0"]'
    );
    if (
      firstSlide &&
      (firstSlide.querySelector('.ph-s') ||
        firstSlide.classList.contains('ph-s'))
    ) {
      slider.classList.add('on');
    }
  });

  // ============================================
  // 【3】ヘッダーとナビの重なり検知
  // ============================================
  function checkOverlap() {
    const header = document.querySelector('.ph-header');
    if (!header) return;

    const headerRect = header.getBoundingClientRect();
    let isOverlapping = false;

    document.querySelectorAll('.js-navy').forEach((navy) => {
      const navyRect = navy.getBoundingClientRect();

      // 実際に表示されている要素のみ判定
      if (navyRect.width > 0 && navyRect.height > 0) {
        const overlapping = !(
          headerRect.bottom < navyRect.top ||
          headerRect.top > navyRect.bottom ||
          headerRect.right < navyRect.left ||
          headerRect.left > navyRect.right
        );

        if (overlapping) {
          isOverlapping = true;
        }
      }
    });

    header.classList.toggle('on', isOverlapping);
  }

  // イベント監視
  window.addEventListener('scroll', checkOverlap);
  window.addEventListener('load', checkOverlap);
  window.addEventListener('resize', checkOverlap);

  // slickの切り替えイベントに合わせて実行（jQuery併用部分）
  $('.ph-slider').on('beforeChange', () => {
    const checkInterval = setInterval(checkOverlap, 16); // 約60fps
    setTimeout(() => {
      clearInterval(checkInterval);
      checkOverlap();
    }, 2000);
  });
  $('.ph-slider').on('afterChange', checkOverlap);

  // 初回実行
  checkOverlap();

  // ============================================
  // 【4】スライダーがinviewしたら再生開始
  // ============================================
  const sliderElements = document.querySelectorAll('.ph-slider');
  if ('IntersectionObserver' in window) {
    const sliderObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // inview時に2秒遅らせてslickPlayを実行
          setTimeout(() => {
            $(entry.target).slick('slickPlay');
          }, 2000);
        }
      });
    });
    sliderElements.forEach((el) => sliderObserver.observe(el));
  }

  // ============================================
  // 【5】クリックで詳細を開閉（.js-ph-slide / .js-ph）
  // ============================================

  document.addEventListener('click', (e) => {
    const target = e.target;

    // --- 無視対象 ---
    if (target.closest('.credit') || target.closest('.ph-link')) return;

    // --- .js-ph-slideの処理 ---
    const clickedSlide = target.closest('.js-ph-slide');
    if (clickedSlide) {
      const slider = clickedSlide.closest('.ph-slider');
      const allSlides = slider.querySelectorAll('.js-ph-slide');
      const wasOpen = clickedSlide.classList.contains('open');
      allSlides.forEach((slide) => slide.classList.remove('open'));

      if (!wasOpen) {
        const phClassMatch = clickedSlide.className.match(/ph\d+/);
        if (phClassMatch) {
          const sameClass = phClassMatch[0];
          slider
            .querySelectorAll(`.js-ph-slide.${sameClass}`)
            .forEach((slide) => slide.classList.add('open'));
        } else {
          clickedSlide.classList.add('open');
        }
      }
      return;
    }

    // --- .js-ph の処理 ---
    const clickedPh = target.closest('.js-ph');
    if (clickedPh) {
      const wasOpen = clickedPh.classList.contains('open');
      document
        .querySelectorAll('.js-ph')
        .forEach((ph) => ph.classList.remove('open'));
      if (!wasOpen) clickedPh.classList.add('open');
      return;
    }

    // --- その他の場所をクリックした場合 ---
    document
      .querySelectorAll('.js-ph-slide, .js-ph')
      .forEach((el) => el.classList.remove('open'));
  });

  // ============================================
  // 【6】.js-position 要素のsticky位置調整
  // ============================================
  function updatePosition() {
    const windowHeight = window.innerHeight;
    document.querySelectorAll('.js-position').forEach((el) => {
      const elementHeight = el.offsetHeight;

      if (elementHeight <= windowHeight) {
        // 要素が画面より小さい場合 → 上に固定
        el.style.top = '0';
      } else {
        // 要素が大きい場合 → 下寄せに設定
        el.style.top = windowHeight - elementHeight + 'px';
      }
    });
  }

  window.addEventListener('load', updatePosition);
  window.addEventListener('resize', updatePosition);

  // ============================================
  // 【7】クレジット(.credit li)の行末検知
  // ============================================
  function detectLineEndItems() {
    document.querySelectorAll('.credit').forEach((credit) => {
      const items = Array.from(credit.querySelectorAll('li'));
      items.forEach((item) => item.classList.remove('line-end'));
      if (!items.length) return;

      const rows = [];
      let currentRow = [];
      let currentY = items[0].getBoundingClientRect().top;

      items.forEach((item) => {
        const itemY = item.getBoundingClientRect().top;

        // 同じ行かどうかをY位置で判定（誤差2px以内）
        if (Math.abs(itemY - currentY) <= 2) {
          currentRow.push({
            el: item,
            left: item.getBoundingClientRect().left,
          });
        } else {
          rows.push(currentRow);
          currentRow = [{ el: item, left: item.getBoundingClientRect().left }];
          currentY = itemY;
        }
      });
      if (currentRow.length) rows.push(currentRow);

      // 各行の最右要素に line-end クラスを追加
      rows.forEach((row) => {
        const rightmost = row.reduce((max, cur) =>
          cur.left > max.left ? cur : max
        );
        rightmost.el.classList.add('line-end');
      });
    });
  }

  // 段階的に複数回呼び出して確実に反映
  const runDetection = () => detectLineEndItems();
  setTimeout(runDetection, 100);
  setTimeout(runDetection, 300);
  setTimeout(runDetection, 500);
  setTimeout(runDetection, 1000);

  window.addEventListener('resize', () => {
    clearTimeout(window._creditResizeTimer);
    window._creditResizeTimer = setTimeout(runDetection, 100);
  });

  // slickの切り替え時にも再検知（jQuery併用）
  $(document).on('init afterChange', '.slick-slider', runDetection);
});
