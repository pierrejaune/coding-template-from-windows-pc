// ---------------------------------------
// ページの全リソース（画像など含む）が読み込まれたら実行
// ---------------------------------------
window.addEventListener('load', function () {
  // GSAPのScrollTriggerプラグインを登録
  gsap.registerPlugin(ScrollTrigger);

  // #feature 要素を取得（スクロールに応じてクラスを付け替える対象）
  // const featureElement = document.querySelector('#feature');

  // .con 要素を配列として取得
  const conElements = gsap.utils.toArray('.con');

  // 各 .con 要素ごとに処理
  conElements.forEach((conEl, index) => {
    // .con 内の .inner1 要素を取得
    const inner = conEl.querySelector('.inner1');

    // .inner1 をスクロール開始でフェードインさせるアニメーション
    gsap.fromTo(
      inner,
      { opacity: 0 }, // 初期状態
      {
        opacity: 1, // 最終状態
        ease: 'none',
        scrollTrigger: {
          trigger: conEl,
          start: 'top top', // 要素の top が画面上端に来た時
          end: `+=${0.5 * window.innerHeight}`, // 画面高さの50%スクロールで終了
          scrub: true, // スクロールに応じてアニメ同期
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
      end: `+=${window.innerHeight}`, // 1画面分スクロールで終了
      pin: conEl,
      pinSpacing: false,
      markers: false,
      id: `t-${index + 1}`,
    });

    // conEl をスクロールで固定（下部）
    ScrollTrigger.create({
      trigger: conEl,
      start: 'bottom bottom',
      end: `+=${2 * window.innerHeight}`, // 2画面分スクロールで固定
      pin: conEl,
      pinSpacing: false,
      markers: false,
      id: `b-${index + 1}`,
    });

    // #feature に現在の con の id をクラスとして付与
    // if (featureElement && conEl.id) {
    //   ScrollTrigger.create({
    //     trigger: conEl,
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     onToggle: (self) => {
    //       if (self.isActive && conEl.id) {
    //         // con* で始まるクラスをすべて削除
    //         [...featureElement.classList].forEach((cls) => {
    //           if (cls.startsWith('con')) featureElement.classList.remove(cls);
    //         });
    //         // 現在の con の id をクラスとして追加
    //         featureElement.classList.add(conEl.id);
    //         console.log('#feature に', conEl.id, 'クラスを追加');
    //       }
    //     },
    //     markers: false,
    //     id: `feature-class-${index + 1}`,
    //   });
    // }

    // -------------------------------------
    // 各 .con に showed クラスを付け替え
    // （次の .con がpinされるまで維持）
    // -------------------------------------
    // ScrollTrigger.create({
    //   trigger: conEl,
    //   start: 'top 1%', // 画面高さ1%に来たら showed を付与
    //   end: 'bottom -10%', // 画面高さ-10%を抜けたら解除
    //   onEnter: () => conEl.classList.add('showed'),
    //   onEnterBack: () => conEl.classList.add('showed'),
    //   onLeave: () => conEl.classList.remove('showed'),
    //   onLeaveBack: () => conEl.classList.remove('showed'),
    //   markers: false,
    //   id: 'showed-' + (index + 1),
    // });

    // -------------------------------------
    // 各 .con に showed クラスを付け替え
    // （最後の .con は通過後も showed を残す）
    // -------------------------------------
    ScrollTrigger.create({
      trigger: conEl,
      start: 'top 1%', // 画面高さ1%に来たら showed を付与
      end: 'bottom -10%', // 画面高さ-10%を抜けたら解除
      onEnter: () => conEl.classList.add('showed'),
      onEnterBack: () => conEl.classList.add('showed'),
      onLeave: () => {
        // 最後の .con 以外なら showed を削除
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
    loop: true, // ループ有効
    centeredSlides: true, // スライドを中央に配置
    slidesPerView: 'auto', // 自動で枚数調整
    speed: 2000, // 切り替え速度
    effect: 'fade', // フェードエフェクト
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 2000, // 自動切り替え間隔
      disableOnInteraction: false, // ユーザー操作後も継続
    },
  });
});

// ---------------------------------------
// クレジット表記の整形処理
// ---------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  // セクションごとに「何番目の item に処理するか」をまとめて設定
  const creditAdjustments = {
    '.sec01 .credit': 2,
    '.sec02 .credit': 2,
    '.sec03 .credit': 2,
    '.sec04 .credit': 3,
    '.sec06 .credit': 3,
    '.sec07 .credit': 3,
  };

  // 各指定箇所にクラス追加 & <br> 挿入
  for (const [selector, index] of Object.entries(creditAdjustments)) {
    const items = document.querySelectorAll(`${selector} .item`);
    if (items.length >= index) {
      const target = items[index - 1]; // nth-of-type(N) は配列で index-1
      target.classList.add('-mr0');
      target.insertAdjacentHTML('afterend', '<br>');
    }
  }
});

// ---------------------------------------
// .js-fade 要素をスクロールでフェードイン
// （IntersectionObserver を使用）
// ---------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const fadeElements = document.querySelectorAll('.js-fade');

  // IntersectionObserver で要素が見えたらクラスを追加
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    },
    { threshold: 0.1 } // 10%見えたら発火
  );

  fadeElements.forEach((el) => observer.observe(el));
});
