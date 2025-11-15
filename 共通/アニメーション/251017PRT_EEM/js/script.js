// フェードイン
$(function () {
  $(window).on('resize load', function () {
    let vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  });

  $(window).on('load', function () {
    setTimeout(function () {
      $('.feature').addClass('is_show');
      setTimeout(function () {
        animationposition('.js_anime');
      }, 500);
    }, 1000);
  });

  $(window).on('scroll', function () {
    animationposition('.js_anime');
  });

  function animationposition(e) {
    $(e).each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  }
});

// スライダー
$(function () {
  var s = $('.js_slider01');
  var n = s.length;

  function replaceAddClass(i) {
    s.eq(i).siblings().removeClass('is_anime');
    s.eq(i).addClass('is_anime');
  }

  var i = 0;
  replaceAddClass(i);
  setInterval(function () {
    i++;
    if (!(i < n)) {
      i = 0;
    }
    replaceAddClass(i);
  }, 5000);
});

/*==================================================
  スライダー01（単純なフェード＋切り替え）
  --------------------------------------------------
  一定時間ごとに「is_anime」クラスを付け替えることで、
  CSSアニメーションが切り替わる仕組み。
==================================================*/
$(function () {
  var s = $('.js_slider01'); // .js_slider01クラスの要素を取得（各スライド）
  var n = s.length; // スライドの総数

  // アクティブスライドを切り替える関数
  function replaceAddClass(i) {
    s.eq(i).siblings().removeClass('is_anime'); // 他のスライドからis_animeを除去
    s.eq(i).addClass('is_anime'); // 指定のスライドにis_animeを付与
  }

  var i = 0; // スライドインデックス初期値
  replaceAddClass(i); // 最初のスライドをアクティブに

  // 5秒ごとにスライド切り替え
  setInterval(function () {
    i++;
    if (!(i < n)) {
      // 最後のスライドまでいったら最初に戻る
      i = 0;
    }
    replaceAddClass(i); // クラス付け替え実行
  }, 5000);
});

/*==================================================
  スライダー02（前スライドと次スライドを制御）
  --------------------------------------------------
  現在のスライドに「is_anime」、
  一つ前のスライドに「is_prevanime」を付与して
  より複雑な演出を可能にする。
==================================================*/
$(function () {
  var s = $('.js_slider02'); // .js_slider02クラスのスライド群
  var n = s.length; // スライド数

  // クラス付け替え関数
  function replaceAddClass(i) {
    s.eq(i).siblings().removeClass('is_anime'); // 他スライドのアニメーション解除
    s.eq(i).siblings().removeClass('is_prevanime'); // 前回アニメーションもリセット
    s.eq(i).addClass('is_anime'); // 現在スライドにis_animeを追加
    s.eq(i - 1).addClass('is_prevanime'); // 一つ前のスライドにis_prevanimeを追加
  }

  var i = 0; // インデックス初期化
  replaceAddClass(i); // 最初のスライドをアクティブに

  // 5秒ごとにスライド切り替え
  setInterval(function () {
    i++;
    if (!(i < n)) {
      // 最後までいったら0に戻す
      i = 0;
    }
    replaceAddClass(i);
  }, 5000);
});
