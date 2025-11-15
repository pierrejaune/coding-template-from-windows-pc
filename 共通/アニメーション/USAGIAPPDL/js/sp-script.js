// ===============================================================
// ▼ デバイス判定とクラス付与処理
// ===============================================================

// 「device_class」というクラスを持つ要素をすべて取得
let elem = document.getElementsByClassName('device_class');

// HTMLCollectionをforEachで扱うために、Array.prototype.forEach.callを使用
Array.prototype.forEach.call(elem, function (elem) {
  // ---------------------------------
  // iPhone端末を判定
  // ---------------------------------
  if (navigator.userAgent.indexOf('iPhone') > 0) {
    // iPhoneの場合、対象要素に 'iPhone' クラスを追加
    elem.classList.add('iPhone');
  }

  // ---------------------------------
  // iPad端末を判定
  // ---------------------------------
  if (navigator.userAgent.indexOf('iPad') > 0) {
    // iPadの場合、対象要素に 'iPad' クラスを追加
    elem.classList.add('iPad');
  }

  // ---------------------------------
  // Android端末を判定
  // ---------------------------------
  if (navigator.userAgent.indexOf('Android') > 0) {
    // Androidの場合、対象要素に 'Android' クラスを追加
    elem.classList.add('Android');
  }
});

// ===============================================================
// ▼ jQueryを使ったスクロール時のUI制御処理
// ===============================================================
$(function () {
  // =========================
  // .fix 要素（固定ボタンなど）の制御
  // =========================

  $('.fix').hide(); // 初期状態では非表示にしておく

  // スクロールイベントを監視
  $(window).on('scroll', function () {
    // 現在のスクロール位置（上端からの距離）
    const scrollTop = $(this).scrollTop();

    // ウィンドウ下端の位置（スクロール位置 + ウィンドウ高さ）
    const scrollBottom = scrollTop + $(window).height();

    // ページ内の「.feature-snslist」要素の上端位置を取得
    const snsOffsetTop = $('.feature-snslist').offset().top;

    // -----------------------------
    // スクロール200px以上で .fix を表示
    // -----------------------------
    if (scrollTop > 200) {
      $('.fix').fadeIn(); // フェードイン表示
    } else {
      $('.fix').fadeOut(); // 非表示に戻す
    }

    // -----------------------------
    // SNSリストと重なりを回避する処理
    // -----------------------------
    if (scrollBottom >= snsOffsetTop) {
      // 画面下端がSNSリストの上端に達したらabsolute配置に変更（重なり防止）
      $('.fix').css({
        position: 'absolute',
        bottom: '0',
      });
    } else {
      // 通常スクロール中は固定表示
      $('.fix').css({
        position: 'fixed',
        bottom: '0',
      });
    }
  });

  // =========================
  // .pagetop 要素の制御
  // =========================

  $('.pagetop').hide(); // 初期状態は非表示

  $(window).on('scroll', function () {
    const scrollTop = $(this).scrollTop();
    const scrollBottom = scrollTop + $(window).height();
    const snsOffsetTop = $('.feature-snslist').offset().top;

    // -----------------------------
    // 200px以上スクロールでページトップボタンを表示
    // -----------------------------
    if (scrollTop > 200) {
      $('.pagetop').fadeIn();
    } else {
      $('.pagetop').fadeOut();
    }

    // -----------------------------
    // SNSリストと重なり防止
    // -----------------------------
    if (scrollBottom >= snsOffsetTop) {
      // SNSリストにかかる手前でabsolute配置に変更
      $('.pagetop').css({
        position: 'absolute',
      });
    } else {
      // 通常時は画面固定
      $('.pagetop').css({
        position: 'fixed',
      });
    }
  });

  // =========================
  // フェードインアニメーション制御
  // =========================

  // 「inview」プラグインを利用し、要素が表示領域に入った時にクラスを付与
  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      // 要素が画面内に入ったら「is-active」クラスを追加
      $(this).addClass('is-active');
    }
  });

  // スクロール時にも再チェックを実行
  $(window).scroll(function () {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });
});
