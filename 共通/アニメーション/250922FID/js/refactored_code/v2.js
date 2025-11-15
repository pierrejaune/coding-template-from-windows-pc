// ----------------------------
// ページ読み込み後に実行（jQuery）
// ----------------------------
$(window).load(function () {
  // GSAPのScrollTriggerプラグインを登録
  gsap.registerPlugin(ScrollTrigger);

  // .con要素を配列化して、そのid属性を収集
  // var conElements = gsap.utils.toArray('.con');
  // var conIds = conElements
  //   .map(function (element) {
  //     return element.id; // idを取得
  //   })
  //   .filter(Boolean); // 空でないものだけ残す

  // 各 .con 要素ごとに処理を実行
  document.querySelectorAll('.con').forEach(function (r, o) {
    // .inner1 要素を取得
    var n = r.querySelector('.inner1');

    // .inner1 のフェードインアニメーション
    gsap.fromTo(
      n,
      { opacity: 0 }, // 初期状態（透明）
      {
        opacity: 1, // 表示状態
        ease: 'none',
        scrollTrigger: {
          trigger: r, // アニメーションを開始する要素
          start: 'top top', // トリガーの開始位置
          end: function () {
            return '+=' + 0.5 * window.innerHeight; // 終了位置（画面高さの半分）
          },
          scrub: true, // スクロール連動
          pinSpacing: false,
          markers: false, // デバッグ用マーカー非表示
          id: 'o-' + (o + 1), // 識別用ID
        },
      }
    );

    // 各 .con 要素をスクロールに応じて固定（ピン留め）
    ScrollTrigger.create({
      trigger: r,
      start: 'top top',
      end: function () {
        return '+=' + window.innerHeight; // 画面高さ分固定
      },
      pin: r, // r を固定
      pinSpacing: false,
      markers: false,
      id: 't-' + (o + 1),
    });

    // 下方向にさらに固定領域を作る
    ScrollTrigger.create({
      trigger: r,
      start: 'bottom bottom',
      end: function () {
        return '+=' + 2 * window.innerHeight; // 画面高さ2倍分固定
      },
      pin: r,
      pinSpacing: false,
      markers: false,
      id: 'b-' + (o + 1),
    });

    // -------------------------------------
    // 各 .con に showed クラスを付け替え
    // （次の .con がpinされるまで維持）
    // -------------------------------------
    ScrollTrigger.create({
      trigger: r,
      // start: 'top center', // 画面中央に来たら showed を付与
      // endTrigger: conElements[o + 1] || r, // 次の .con が基準（なければ最後の要素で終了）
      // end: 'bottom center', // 中央抜けたら解除
      start: 'top 1%', // 画面高さ1%に来たら showed を付与
      end: 'bottom -10%', // 画面高さ-10%を抜けたら解除
      onEnter: () => r.classList.add('showed'),
      onEnterBack: () => r.classList.add('showed'),
      onLeave: () => r.classList.remove('showed'),
      onLeaveBack: () => r.classList.remove('showed'),
      markers: false,
      id: 'showed-' + (o + 1),
    });
  });
});

// ----------------------------
// DOM構築完了後にSwiperを初期化
// ----------------------------
document.addEventListener('DOMContentLoaded', function () {
  var swipersec03 = new Swiper('.sec03 .swiper', {
    loop: true, // 無限ループ
    centeredSlides: true, // 中央寄せ
    slidesPerView: 'auto', // 自動幅
    speed: 2000, // アニメーション速度（2秒）
    effect: 'fade', // フェード切り替え
    fadeEffect: {
      crossFade: true, // フェードをクロスフェードに
    },
    autoplay: {
      delay: 2000, // 自動切り替え（2秒ごと）
      disableOnInteraction: false, // ユーザー操作後も自動再生を継続
    },
  });
});

// ----------------------------
// jQueryでクレジット部分の調整 & フェードアニメーション
// ----------------------------
$(function () {
  // 各セクションごとに特定の .item にクラスを追加し、<br>を挿入
  // $('.sec01 .credit .item:nth-of-type(2)').addClass('-mr0').after('<br>');
  // $('.sec02 .credit .item:nth-of-type(2)').addClass('-mr0').after('<br>');
  // $('.sec03 .credit .item:nth-of-type(2)').addClass('-mr0').after('<br>');
  // $('.sec04 .credit .item:nth-of-type(3)').addClass('-mr0').after('<br>');
  // $('.sec06 .credit .item:nth-of-type(3)').addClass('-mr0').after('<br>');
  // $('.sec07 .credit .item:nth-of-type(3)').addClass('-mr0').after('<br>');

  // 共通処理の関数
  function addClassAndBreak(selector, nth = 2) {
    const target = document.querySelector(
      `${selector} .credit .item:nth-of-type(${nth})`
    );
    if (target) {
      target.classList.add('-mr0');
      target.insertAdjacentHTML('afterend', '<br>');
    }
  }
  // 適用する対象を配列でまとめる
  const targets = [
    { selector: '.sec01', nth: 2 },
    { selector: '.sec02', nth: 2 },
    { selector: '.sec03', nth: 2 },
    { selector: '.sec04', nth: 3 },
    { selector: '.sec06', nth: 3 },
    { selector: '.sec07', nth: 3 },
  ];
  // ループで一括処理
  targets.forEach(({ selector, nth }) => addClassAndBreak(selector, nth));

  // inviewイベントを使ってフェードイン（スクロール時に.is-activeクラスを付与）
  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });

  // スクロール時にも再度inview判定を実行
  $(window).scroll(function () {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });
});
