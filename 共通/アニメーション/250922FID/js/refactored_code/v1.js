// ----------------------------
// ページ読み込み後に実行（jQuery）
// ----------------------------
$(window).load(function () {
  // GSAPのScrollTriggerプラグインを登録
  gsap.registerPlugin(ScrollTrigger);

  // .con要素を配列化して、そのid属性を収集
  var conElements = gsap.utils.toArray('.con');
  var conIds = conElements
    .map(function (element) {
      return element.id; // idを取得
    })
    .filter(Boolean); // 空でないものだけ残す

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
    // 各 .con に直接 showed クラスを付け替え
    // （アクティブな要素だけクリック可能にする）
    // -------------------------------------
    ScrollTrigger.create({
      trigger: r,
      start: 'top center', // 画面中央に入ったら showed を付与
      end: 'bottom center', // 中央を抜けたら解除
      toggleClass: { targets: r, className: 'showed' },
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
  $('.sec01 .credit .item:nth-of-type(2)').addClass('-mr0').after('<br>');
  $('.sec02 .credit .item:nth-of-type(2)').addClass('-mr0').after('<br>');
  $('.sec03 .credit .item:nth-of-type(2)').addClass('-mr0').after('<br>');
  $('.sec04 .credit .item:nth-of-type(3)').addClass('-mr0').after('<br>');
  $('.sec06 .credit .item:nth-of-type(3)').addClass('-mr0').after('<br>');
  $('.sec07 .credit .item:nth-of-type(3)').addClass('-mr0').after('<br>');

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
