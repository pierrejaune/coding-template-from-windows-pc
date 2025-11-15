// DOMの読み込み完了後に実行
$(function () {
  // .js-inviewクラスの要素にinviewイベントを設定
  $('.js-inview').on('inview', function (event, isInView) {
    // 要素がビューポート内に表示されたら（in view）
    if (isInView) {
      // is-activeクラスを付与（アニメーションや表示切り替えなどに使用される）
      $(this).addClass('is-active');
    }
  });
});

// スライダー（slick）の初期化：ページのDOMがすべて読み込まれた後に実行
$(document).ready(function () {
  $('.feature .slick').slick({
    arrows: false, // 次・前の矢印は表示しない
    autoplay: true, // 自動再生する
    autoplaySpeed: 3000, // 3秒ごとにスライドを切り替える
    speed: 1000, // スライドの切り替えに1秒かける
    fade: false, // フェードではなくスライド切り替え
    dots: true, // スライドのドットナビゲーションを表示
    pauseOnFocus: false, // フォーカス時に自動再生を止めない
    pauseOnHover: false, // ホバー時に自動再生を止めない
    pauseOnDotsHover: false, // ドットにホバーしても止めない
  });
});

// DOMContentLoaded後に実行（Vanilla JS）
document.addEventListener('DOMContentLoaded', function () {
  // .c__01_img01 .slick スライダーがスライド切り替えされた直後にイベント発火
  $('.c__01_img01 .slick').on(
    'afterChange',
    function (event, slick, currentSlide) {
      // クレジット表示要素（li）をすべて取得
      const links = document.querySelectorAll('.c__01_img01 .credit li');

      // currentSlideが0（最初のスライド）の場合のみ、color-whiteクラスを削除し、
      // それ以外のスライドならクラスを追加する
      links.forEach((link) => {
        if (currentSlide === 0) {
          link.classList.remove('color-white');
        } else {
          link.classList.add('color-white');
        }
      });
    }
  );

  // ページ読み込み時にも初期スライドに応じて色クラスを適用
  const initialSlide = $('.c__01_img01 .slick').slick('slickCurrentSlide');
  const links = document.querySelectorAll('.c__01_img01 .credit li');
  links.forEach((link) => {
    if (initialSlide === 0) {
      link.classList.remove('color-white');
    } else {
      link.classList.add('color-white');
    }
  });
});
