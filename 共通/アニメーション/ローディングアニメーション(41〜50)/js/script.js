// jQueryでアクティブクラスを追加してアニメーションを開始

$(document).ready(function () {
  // アクティブクラスが付与されたときにアニメーションを実行
  $('.loading-icon').each(function () {
    // クラス名が'loading-icon'で始まる要素が、さらにアニメーションクラスが付与されていない場合
    if (!$(this).hasClass('active')) {
      $(this).addClass('active'); // 'active' クラスを追加してアニメーションを開始
    }
  });

  //ローディング完了後の非表示
  // $(window).on('load', function () {
  //   setTimeout(function () {
  //     $('.loading-icon').fadeOut(500);
  //   }, 500); // スムーズな遷移のため遅延を加える
  // });
  // ページ遷移後、ローディング非表示
  setTimeout(function () {
    $('.loading-icon').addClass('loaded'); // 2秒後に非表示
  }, 2000);
});
