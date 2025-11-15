$(document).ready(function () {
  $('.tab-btn').click(function () {
    let tabId = $(this).data('tab');

    // タブボタンのアクティブ状態を更新
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    // 対応するパネルをフェードイン表示
    $('.tab-panel').stop(true, true).fadeOut(200).removeClass('active');
    $('.tab-panel[data-tab="' + tabId + '"]')
      .fadeIn(200)
      .addClass('active');
  });
});
