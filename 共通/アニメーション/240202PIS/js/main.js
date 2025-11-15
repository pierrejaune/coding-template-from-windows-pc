// ==================================================
// inview（要素が画面に入ったときにクラスを付与）
// ==================================================
$(function () {
  // .inview クラスを持つ要素が画面内に入ったら処理実行
  // one() を使うことで「最初に入った1回だけ」反応する
  $('.inview').one('inview', function () {
    // 画面内に入った要素に show クラスを付与
    // → CSS でフェードインなどのアニメーションを定義しておけば発火する
    $(this).addClass('show');
  });
});

// 不明な箇所の説明
// *duration: 4 → アニメーションの「進行スピードや尺（どれくらいの間アニメーションが続くか）」
// *end: '+=300%' → アニメーションが「どれくらいの縦スクロール区間で行われるか」

// ==================================================
// STRIPE series（スクロールに合わせてタイトルを表示）
// ==================================================
ScrollTrigger.create({
  trigger: '.section02-top-inr', // この要素を基準に監視
  start: 'top top', // トリガーの top が画面の top に来たとき開始
  pin: true, // 要素を固定表示
  scrub: true, // スクロールとアニメーションを同期
  onEnter: () =>
    // 画面に入ったらタイトルに show クラスを付与
    document.querySelector('.section-title02').classList.add('show'),
});

// ==================================================
// 今治タオルセクション（複数要素のアニメーション）
// ==================================================
gsap
  .timeline({
    scrollTrigger: {
      trigger: '.section04-inr', // このセクションが基準
      start: 'top top',
      pin: true, // 固定表示
      end: '+=350%', // スクロールの長さを指定（350%ぶん動作する）
      scrub: true, // スクロール量に応じてアニメーション
    },
  })
  // タイトルをフェードイン
  .fromTo('.section-title04', { opacity: 0 }, { opacity: 1, duration: 4 }, '0%')
  // チェックアイコンをフェードイン
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

// ==================================================
// Dinosaur セクション（シンプルなフェードイン）
// ==================================================
gsap
  .timeline({
    scrollTrigger: {
      trigger: '.section06-header',
      start: 'top top',
      pin: true, // 固定表示
      end: '+=200%', // スクロール長さ
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

// ==================================================
// 横スクロールアニメーション
// ==================================================
const list = document.querySelector('.horizontal-scroll-list');
gsap.to(list, {
  // 横方向に移動させる（リストの幅 - コンテナの幅分だけ動かす）
  x: () =>
    -(
      list.clientWidth -
      document.querySelector('.horizontal-scroll-container').clientWidth
    ),
  ease: 'none', // イージングなしでスクロールに正確に同期
  scrollTrigger: {
    trigger: '.horizontal-scroll-container', // コンテナが基準
    start: 'top top',
    scrub: true,
    end: '+=300%', // 長めにスクロールで横移動
    pin: true, // コンテナを固定
    // markers: true, // デバッグ用マーカー（コメントアウト中）
  },
});

// ==================================================
// 画像を20%拡大させるアニメーション（スクロール量に応じて拡大）
// ==================================================
const scrlImgScale02 = document.querySelectorAll('.img02 img');
const scrlImgScale03 = document.querySelectorAll('.img03 img');
const scrlImgScale04 = document.querySelectorAll('.img04 img');
const scrlImgScale05 = document.querySelectorAll('.img05 img');

// 共通処理関数
const ImgScale = (elements) => {
  if ('undefined' !== elements && elements.length > 0) {
    elements.forEach((element) => {
      // 要素の位置を取得
      let y =
        window.innerHeight - // 画面の高さ
        element.getBoundingClientRect().top - // 要素の上端の位置
        window.innerHeight / 2; // 画面中央を基準に調整

      if (y > 0) {
        // スマホ（横幅767px以下）の場合 → 拡大率を大きめに
        if (window.matchMedia('(max-width: 767px)').matches) {
          element.style.transform =
            'scale3d(' + (0.00026 * y + 1) + ',' + (0.00026 * y + 1) + ',1)';
        }
        // PC（768px以上）の場合 → 拡大率を抑えめに
        else if (window.matchMedia('(min-width:768px)').matches) {
          element.style.transform =
            'scale3d(' + (0.000122 * y + 1) + ',' + (0.000122 * y + 1) + ',1)';
        }
      }
    });
  }
};

// スクロール時に実行
document.addEventListener('scroll', () => {
  ImgScale(scrlImgScale02);
  ImgScale(scrlImgScale03);
  ImgScale(scrlImgScale04);
  ImgScale(scrlImgScale05);
});
