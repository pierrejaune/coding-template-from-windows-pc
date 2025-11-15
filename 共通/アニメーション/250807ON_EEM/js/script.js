// ================================
// フェードイン関連の処理
// ================================
$(function () {
  // ウィンドウサイズを取得して CSSカスタムプロパティ(--vw) にセット
  // → レスポンシブデザインでJSから幅を参照するために使う
  $(window).on('resize load', function () {
    let vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  });

  // ページ読み込み後の処理
  $(window).on('load', function () {
    setTimeout(function () {
      // .feature 要素を表示するクラスを付与（フェードイン開始）
      $('.feature').addClass('is_show');

      // 0.5秒後にアニメーション判定と背景処理を実行
      setTimeout(function () {
        animationposition('.js_anime');
        scrollbg();
      }, 500);
    }, 1000); // 1秒待ってから開始
  });

  // スクロールしたら都度チェック
  $(window).on('scroll', function () {
    animationposition('.js_anime');
    scrollbg();
  });

  // ----------------------------
  // アニメーション発火位置の判定
  // ----------------------------
  function animationposition(e) {
    $(e).each(function () {
      var imgPos = $(this).offset().top; // 要素の位置
      var scroll = $(window).scrollTop(); // 現在のスクロール位置
      var windowHeight = $(window).height(); // ウィンドウの高さ

      // 画面の下から 75% の位置に来たら表示用クラスを付与
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  }

  // ----------------------------
  // 背景切り替え処理
  // ----------------------------
  // function scrollbg() {
  //   var scroll = $(window).scrollTop(); // 現在のスクロール量
  //   var windowHeight = $(window).height();

  //   // .sec02 の中央付近を基準点に
  //   var bgP2 = $('.sec02').offset().top - windowHeight / 2;

  //   // .sec03 の中央付近を基準点に
  //   var bgP3 = $('.sec03').offset().top - windowHeight / 2;

  //   // sec02 より下に来たら背景を is_bg02 に
  //   if (scroll > bgP2) {
  //     $('.js_bg').addClass('is_bg02');
  //   } else {
  //     $('.js_bg').removeClass('is_bg02');
  //   }

  //   // sec03 より下に来たら背景を is_bg03 に
  //   if (scroll > bgP3) {
  //     $('.js_bg').addClass('is_bg03');
  //   } else {
  //     $('.js_bg').removeClass('is_bg03');
  //   }
  // }

  function scrollbg() {
    const scroll = $(window).scrollTop(); // 現在のスクロール量
    const windowHeight = $(window).height(); // ウィンドウの高さ
    const $bg = $('.js_bg'); // 背景対象

    // チェックしたい要素と付与するクラスの対応リスト
    const bgPoints = [
      { el: '.sec02', cls: 'is_bg02' },
      { el: '.sec03', cls: 'is_bg03' },
    ];

    bgPoints.forEach(({ el, cls }) => {
      const point = $(el).offset().top - windowHeight / 2;
      $bg.toggleClass(cls, scroll > point); // trueなら追加, falseなら削除
    });
  }
});

// ================================
// slick.js スライダーの初期化
// ================================
$(function () {
  $('.sec__slider').slick({
    dots: false, // ドットナビゲーションなし
    arrows: false, // 矢印なし
    slidesToShow: 1, // 1枚ずつ表示
    autoplay: true, // 自動再生ON
    speed: 1500, // スライド切替スピード（1.5秒）
    autoplaySpeed: 1000, // 自動再生の間隔（1秒）
    infinite: true, // 無限ループON
    fade: false, // フェード切替はOFF（通常スライド）
    pauseOnFocus: false, // フォーカスしても止めない
    pauseOnHover: false, // ホバーしても止めない
    centerMode: true, // スライドを中央寄せ表示
    variableWidth: true, // スライド幅を可変にする
  });
});
