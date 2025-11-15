// ======================================================
// ビューポート高さに基づき CSS カスタムプロパティ --vh を設定する関数
// （モバイルでアドレスバーの表示/非表示変動に対応させるため）
// ======================================================
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('load', setViewportHeight);
window.addEventListener('resize', setViewportHeight);

// ======================================================
// ページ読み込み後の初期処理
// ======================================================
window.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------
  // 配列から特定要素を削除するヘルパー関数（Array.prototype 拡張）
  // ------------------------------------------------------
  // 注意：プロトタイプ拡張は他ライブラリと衝突する可能性があるため
  // 必要なら別ユーティリティ関数にするのもあり
  // Array.prototype.remove = function (element) {
  //   const idx = this.indexOf(element);
  //   if (idx !== -1) {
  //     this.splice(idx, 1);
  //   }
  // };
  // ------------------------------------------------------
  // 画像プリロード処理
  // images: 画像 URL の配列
  // onProgress: (totalCount, loadedCount) → callback
  // ------------------------------------------------------
  // function preloadImages(images, onProgress) {
  //   const total = images.length;
  //   images.forEach((src) => {
  //     const img = new Image();
  //     img.src = src;
  //     img.onload = () => {
  //       images.remove(src);
  //       onProgress(total, total - images.length);
  //     };
  //     // エラーもロード済み扱いにするなら img.onerror を追加してもよい
  //   });
  // }
  // let nowPercent = 0; // 実際に読み込まれた割合（整数％）
  // let displayPercent = 0; // 表示用に段階的に増やす割合
  // const preloadList = [
  //   'https://feature-tool.bcg.staff-start.com/assets/uploads/202406/7442cd51-d20c-424a-a116-9b5310785b42/asset/images/visual1.jpg',
  //   'https://feature-tool.bcg.staff-start.com/assets/uploads/202406/7442cd51-d20c-424a-a116-9b5310785b42/asset/images/visual2.jpg',
  // ];
  // preloadImages(preloadList, (total, loaded) => {
  //   nowPercent = Math.ceil((loaded / total) * 100);
  // });
  // ------------------------------------------------------
  // ローディングアニメーション進行制御
  // ------------------------------------------------------
  // const timerId = setInterval(() => {
  //   if (displayPercent >= 100) {
  //     clearInterval(timerId);
  //     document.getElementById('loader')?.classList.add('complete');
  //     setTimeout(() => {
  //       // ページトップへスクロール（アニメーションなし）
  //       window.scrollTo({ top: 0, behavior: 'auto' });
  //       // ローダーをフェードアウトさせて、本体コンテンツを出す
  //       const loader = document.getElementById('loader');
  //       if (loader) {
  //         loader.style.transition = 'opacity 0.3s ease';
  //         loader.style.opacity = '0';
  //         loader.addEventListener(
  //           'transitionend',
  //           () => {
  //             document.body.classList.add('loaded');
  //             Contents(); // メイン処理へ
  //           },
  //           { once: true }
  //         );
  //       } else {
  //         // loader 要素が見つからなかったら即実行
  //         document.body.classList.add('loaded');
  //         Contents();
  //       }
  //     }, 1000);
  //   } else {
  //     if (displayPercent < nowPercent) {
  //       displayPercent++;
  //       const span = document.querySelector('#loader .bar span');
  //       if (span) {
  //         span.style.width = displayPercent * 1.25 + '%';
  //       }
  //     }
  //   }
  //   if (displayPercent >= 20) {
  //     document.getElementById('loader')?.classList.add('active');
  //   }
  // }, 20);
});

// ======================================================
// メインのコンテンツ初期化関数
// ======================================================
function Contents() {
  // const loaderElem = document.getElementById('loader');
  // if (loaderElem) loaderElem.remove();

  // document.getElementById('visual')?.classList.add('on');
  // setTimeout(() => {
  //   document.getElementById('lead')?.classList.add('on');
  // }, 750);

  // リンククリックの挙動（PC / モバイルで異なる制御）
  // if (window.innerWidth >= 768) {
  //   document.querySelectorAll('.link').forEach((el) => {
  //     el.addEventListener('click', () => {
  //       el.classList.toggle('on');
  //     });
  //   });
  // } else {
  //   document.querySelectorAll('.link').forEach((el) => {
  //     el.addEventListener('click', (e) => {
  //       if (!e.target.closest('.items__credit')) {
  //         el.classList.toggle('on');
  //       }
  //     });
  //   });
  // }

  // スクロール・リサイズ時の処理
  window.addEventListener('scroll', onScrollOrResize);
  window.addEventListener('resize', onScrollOrResize);

  function onScrollOrResize() {
    const baseH = window.innerHeight;
    const triggerH = baseH / 1.5;
    const now = window.scrollY;
    // const WW = window.innerWidth;

    const sec3 = document.querySelector('.sec3')?.offsetTop ?? Infinity;
    const sec4 = document.querySelector('.sec4')?.offsetTop ?? Infinity;

    // .photo 要素の表示トリガー
    document.querySelectorAll('.photo').forEach((el) => {
      if (now + triggerH >= el.offsetTop) {
        el.classList.add('show');
      }
    });
    // .text 要素の表示トリガー
    document.querySelectorAll('.text').forEach((el) => {
      if (now + triggerH >= el.offsetTop) {
        el.classList.add('show');
      }
    });

    // sec3 のパララックス効果
    if (sec3 < now + baseH * 0.5) {
      console.log('pararax');

      const bg = document.querySelector('.sec3 .bgph');
      if (bg) {
        bg.style.top = (now - sec3) * 0.1 + 'px';
      }
    }
    // sec4 のパララックス効果
    if (sec4 < now + baseH * 0.5) {
      const bg = document.querySelector('.sec4 .bgph');
      if (bg) {
        bg.style.top = (now - sec4) * 0.1 + 'px';
      }
    }
  }

  // ページトップへ戻るボタン挙動
  document.querySelectorAll('.pgtop').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}
Contents();
// ======================================================
// Swiper スライダー初期化（Swiper ライブラリ前提）
// ======================================================
function runSwiper(targetSelector, slidesPerView, effect, speed, delay) {
  new Swiper(targetSelector, {
    loop: true,
    effect,
    speed,
    slidesPerView,
    centeredSlides: false,
    autoplay: { delay },
    spaceBetween: 20,
  });
}

// ======================================================
// in-view
// ======================================================
$(function () {
  // フェードイン
  $('.js-anime').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-animete-active');
    }
  });
});

// ============================================
// Vivus.js を使った SVG 描画アニメーション
// （Walkway.js 版を Vivus.js に置き換え）
// 💡 Vivus.js とは
// SVGの各パス（path, line, polylineなど）を手書きのように描画できるライブラリ。
// 小さく軽量（約10KB）。
// 商用利用可（MIT License）。
// GSAPやAnime.jsなどとも組み合わせ可能。
// 初心者でも簡単に導入でき、Walkway.jsより更新も活発で、描画制御が細かい。
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // アニメーション対象となる SVG 要素をすべて取得
  const targets = document.querySelectorAll('.js-svg-draw');

  // IntersectionObserver を使って、スクロールで要素が見えたら発火
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        // 要素がビューポート内に入り、まだアニメーションしていない場合のみ実行
        if (
          entry.isIntersecting &&
          !entry.target.hasAttribute('data-animated')
        ) {
          entry.target.setAttribute('data-animated', 'true');

          // 少し遅らせてフェードインを開始
          setTimeout(() => {
            // フェードイン（opacity: 0 → 1）
            entry.target.style.transition = 'opacity 0.5s ease-in-out';
            entry.target.style.opacity = '1';

            // Vivus.js による描画アニメーションを実行
            const id = entry.target.id;
            if (id) {
              // Vivus インスタンスを生成
              new Vivus(
                id,
                {
                  type: 'delayed', // 'delayed', 'sync', 'oneByOne' など選択可
                  duration: 600, // アニメーション速度（値を大きくするとゆっくり）
                  animTimingFunction: Vivus.EASE, // イージング設定
                  start: 'autostart', // 自動開始（inViewportでも可）
                  forceRender: true, // ブラウザ描画不具合を防止
                },
                () => {
                  // 描画完了後の処理（例：塗りつぶし）
                  entry.target.classList.add('filled');
                }
              );
            }
          }, 500);

          // 一度だけ実行するため、監視を解除
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 } // 要素の10%以上が表示されたら発火
  );

  // 初期状態は非表示（opacity: 0）にして監視開始
  targets.forEach((el) => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});
