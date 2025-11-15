$(document).ready(function () {
  $('.modal-link').colorbox({
    inline: true,
    rel: 'gallery',
    width: '80%',
    height: '90%',
    transition: 'none',
    close: '❌',
    loop: true,
    overlayClose: false,
    current: '{current}/{total}', // ← ここで表記を変更
    onOpen: function () {
      $('.custom-overlay').fadeIn(300);
    },
    onCleanup: function () {
      $('.custom-overlay').fadeOut(300);
    },
    onComplete: function () {
      $('#cboxLoadedContent').scrollTop(0);
    },
  });
  $('.custom-overlay').on('click', function () {
    $.colorbox.close(); // モーダルを閉じる
    $('.custom-overlay').fadeOut(300); // オーバーレイも非表示
  });
});
