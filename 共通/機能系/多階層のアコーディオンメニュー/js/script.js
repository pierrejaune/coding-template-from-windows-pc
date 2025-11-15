// $(document).ready(function () {
//   $('.accordion-header').on('click', function () {
//     var content = $(this).next('.accordion-content');

//     // 同じ階層のアコーディオンを閉じる
//     $(this).parent().siblings().find('.accordion-content').slideUp(300);
//     $(this).parent().siblings().find('.accordion-header').removeClass('active');

//     // 現在のコンテンツを開閉
//     content.stop(true, true).slideToggle(300);
//     $(this).toggleClass('active');
//   });
// });

$(document).ready(function () {
  $('.accordion-header').on('click', function () {
    var content = $(this).next('.accordion-content');

    // 自分のコンテンツを開閉
    content.stop(true, true).slideToggle(300);
    $(this).toggleClass('active');
  });
});
