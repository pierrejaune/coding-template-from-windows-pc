// STRIPE series
ScrollTrigger.create({
  trigger: '.section02-top-inr', // トリガーとなる要素
  start: 'top top', // ページのトップと要素のトップが一致したときに開始
  pin: true, // 要素をスクロール中固定（ピン留め）する
  scrub: true, // スクロール量に応じてアニメーションを追従
  onEnter: () =>
    // トリガーが表示領域に入ったときの処理
    document.querySelector('.section-title02').classList.add('show'), // クラスを追加して表示処理などを行う
});

// 今治タオル
gsap
  .timeline({
    scrollTrigger: {
      trigger: '.section04-inr', // トリガーとなる要素
      start: 'top top', // スタート位置
      pin: true, // ピン留め
      end: '+=350%', // スクロール範囲（ページの3.5倍分）
      scrub: true, // スクロール連動
    },
  })
  // タイトルをフェードイン
  .fromTo('.section-title04', { opacity: 0 }, { opacity: 1, duration: 4 }, '0%')
  // チェック要素を150%進んだ位置でフェードイン
  .fromTo('.check04', { opacity: 0 }, { opacity: 1, duration: 3 }, '150%')
  // 画像を下からスライドイン
  .fromTo('.img13', { y: '120%' }, { y: '0%', duration: 3 }, '150%')
  // 背景をぼかす
  .fromTo(
    '.section04-bg',
    { filter: 'blur(0px)' },
    { filter: 'blur(5px)', duration: 4 },
    '250%'
  );

// Dinosaur
gsap
  .timeline({
    scrollTrigger: {
      trigger: '.section06-header', // トリガー
      start: 'top top',
      pin: true, // 固定表示
      end: '+=200%', // 2倍分のスクロール範囲
      scrub: true,
    },
  })
  // タイトルをフェードイン
  .fromTo(
    '.section-title06',
    { opacity: 0 },
    { opacity: 1, duration: 1 },
    '0%'
  );

// 横スクロール
const list = document.querySelector('.horizontal-scroll-list');
gsap.to(list, {
  x: () =>
    -(
      list.clientWidth -
      document.querySelector('.horizontal-scroll-container').clientWidth
    ), // コンテナの幅を超える分だけ左にスクロール
  ease: 'none', // 緩急なし
  scrollTrigger: {
    trigger: '.horizontal-scroll-container', // スクロール開始の基準要素
    start: 'top top',
    scrub: true, // スクロールと連動
    end: '+=300%', // 3倍分スクロールして横移動させる
    pin: true, // 固定表示で横スクロールっぽく見せる
    // markers: true,  // デバッグ用のマーカー（開発時のみ使用）
  },
});

// 20%拡大するアニメーション
// 画像をスクロールに応じてscale拡大する処理（各画像要素のグループ）
const scrlImgScale02 = document.querySelectorAll('.img02 img');
const scrlImgScale03 = document.querySelectorAll('.img03 img');
const scrlImgScale04 = document.querySelectorAll('.img04 img');
const scrlImgScale05 = document.querySelectorAll('.img05 img');

// スクロール位置に応じてスケールを調整する関数
const ImgScale = (elements) => {
  if ('undefined' !== elements && elements.length > 0) {
    elements.forEach((element) => {
      let y =
        window.innerHeight -
        element.getBoundingClientRect().top -
        window.innerHeight / 2; // 要素の中心が画面中央に来た時を基準に拡大

      if (y > 0) {
        // スマホとPCで拡大率を調整
        if (window.matchMedia('(max-width: 767px)').matches) {
          element.style.transform =
            'scale3d(' + (0.00026 * y + 1) + ',' + (0.00026 * y + 1) + ',1)';
        } else if (window.matchMedia('(min-width:768px)').matches) {
          element.style.transform =
            'scale3d(' + (0.000122 * y + 1) + ',' + (0.000122 * y + 1) + ',1)';
        }
      }
    });
  }
};

// スクロール時に各画像グループを拡大処理
document.addEventListener('scroll', () => {
  ImgScale(scrlImgScale02);
  ImgScale(scrlImgScale03);
  ImgScale(scrlImgScale04);
  ImgScale(scrlImgScale05);
});
