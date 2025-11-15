$(document).ready(function () {
  $('.accordion-header').on('click', function () {
    var content = $(this).next('.accordion-content');

    // 他のアコーディオンを閉じる（必要なら有効化）
    $('.accordion-content').not(content).slideUp(300);
    $('.accordion-header').not(this).removeClass('active');

    // 現在のアイテムを開閉
    content.stop(true, true).slideToggle(300);
    $(this).toggleClass('active');
  });
});
