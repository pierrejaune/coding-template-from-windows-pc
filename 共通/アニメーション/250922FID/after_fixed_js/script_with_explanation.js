// ページの全リソース（画像など含む）が読み込まれたら実行
$(window).load(function () {
  // GSAPのScrollTriggerプラグインを登録
  gsap.registerPlugin(ScrollTrigger);

  // #feature 要素を取得（スクロールに応じてクラスを付け替える対象）
  var featureElement = document.querySelector('#feature');

  // .con 要素を配列として取得
  var conElements = gsap.utils.toArray('.con');
  // 各 .con 要素の id を収集（空文字は除外）
  var conIds = conElements
    .map(function (element) {
      return element.id;
    })
    .filter(Boolean);

  // すべての .con 要素ごとに処理
  document.querySelectorAll('.con').forEach(function (r, o) {
    // .con 内の .inner1 要素を取得
    var n = r.querySelector('.inner1');

    // .inner1 要素をスクロール開始でフェードインさせるアニメーション
    gsap.fromTo(
      n,
      {
        opacity: 0, // 初期状態：透明
      },
      {
        opacity: 1, // 最終状態：表示
        ease: 'none',
        scrollTrigger: {
          trigger: r, // .con 要素がトリガー
          start: 'top top', // 画面上部に要素のtopが到達した時に開始
          end: function () {
            return '+='.concat(0.5 * window.innerHeight); // 画面高さの50%分スクロールで終了
          },
          scrub: !0, // スクロール量に応じてアニメーション同期
          pinSpacing: !1,
          markers: !1, // デバッグ用マーカー非表示
          id: 'o-'.concat(o + 1), // 識別ID
        },
      }
    );

    // 各 .con 要素をスクロール時に固定（pin）する処理
    ScrollTrigger.create({
      trigger: r,
      start: 'top top',
      end: function () {
        return '+='.concat(+window.innerHeight); // 画面高さ分スクロールで終了
      },
      pin: r, // .con を固定
      pinSpacing: !1,
      markers: !1,
      id: 't-'.concat(o + 1),
    });

    // 下端が画面下部に来たときからさらにスクロールで固定
    ScrollTrigger.create({
      trigger: r,
      start: 'bottom bottom',
      end: function () {
        return '+='.concat(2 * window.innerHeight); // 画面高さ×2分固定
      },
      pin: r,
      pinSpacing: !1,
      markers: !1,
      id: 'b-'.concat(o + 1),
    });

    // #feature 要素に現在表示中の .con の id をクラスとして付与
    if (featureElement && r.id) {
      ScrollTrigger.create({
        trigger: r,
        start: 'top top',
        end: 'bottom bottom',
        onToggle: function (self) {
          if (self.isActive && r.id) {
            // 既存の con* クラスを削除
            featureElement.classList.forEach(function (className) {
              if (className.startsWith('con')) {
                featureElement.classList.remove(className);
              }
            });
            // 現在の .con の id をクラスとして追加
            featureElement.classList.add(r.id);
            console.log('#feature に', r.id, 'クラスを追加');
          }
        },
        markers: false,
        id: 'feature-class-'.concat(o + 1),
      });
    }
  });
});

// DOM構築後に Swiper スライダーを初期化
document.addEventListener('DOMContentLoaded', function () {
  var swipersec03 = new Swiper('.sec03 .swiper', {
    loop: true, // ループ有効
    centeredSlides: true, // スライドを中央寄せ
    slidesPerView: 'auto', // スライドの表示数を自動調整
    speed: 2000, // 切り替え速度
    effect: 'fade', // フェードエフェクト
    fadeEffect: {
      crossFade: true, // クロスフェード有効
    },
    autoplay: {
      delay: 2000, // 自動切り替え間隔
      disableOnInteraction: false, // ユーザー操作後も自動再生継続
    },
  });
});

// jQuery の DOM 準備完了イベント
$(function () {
  // 各セクションのクレジット要素に改行やクラスを追加
  $('.sec01 .credit .item:nth-of-type(2)').addClass('-mr0').after('<br>');
  $('.sec02 .credit .item:nth-of-type(2)').addClass('-mr0').after('<br>');
  $('.sec03 .credit .item:nth-of-type(2)').addClass('-mr0').after('<br>');
  $('.sec04 .credit .item:nth-of-type(3)').addClass('-mr0').after('<br>');
  $('.sec06 .credit .item:nth-of-type(3)').addClass('-mr0').after('<br>');
  $('.sec07 .credit .item:nth-of-type(3)').addClass('-mr0').after('<br>');

  // .js-fade 要素が表示領域に入ったら is-active クラスを付与
  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });

  // スクロール時も再判定して .js-fade に is-active を付与
  $(window).scroll(function () {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });
});
