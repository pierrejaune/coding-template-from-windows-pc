// inviewのみ
// $(document).ready(function () {
//   $(window).on('scroll', function () {
//     $('.inview-target').each(function () {
//       let elementTop = $(this).offset().top;
//       let windowBottom = $(window).scrollTop() + $(window).height();

//       if (windowBottom > elementTop) {
//         $(this).addClass('inview');
//       }
//     });
//   });
// });

// inviewとoutview
// $(document).ready(function () {
//   $(window).on('scroll', function () {
//     $('.inview-target').each(function () {
//       let elementTop = $(this).offset().top;
//       let elementBottom = elementTop + $(this).outerHeight();
//       let windowTop = $(window).scrollTop();
//       let windowBottom = windowTop + $(window).height();

//       // 要素が画面内に入ったら addClass
//       if (windowBottom > elementTop && windowTop < elementBottom) {
//         $(this).addClass('inview');
//       } else {
//         $(this).removeClass('inview'); // 画面外に出たら removeClass
//       }
//     });
//   });
// });

// inviewとoutview見えるタイミング調整
$(document).ready(function () {
  $(window).on('scroll', function () {
    $('.inview-target').each(function () {
      let elementTop = $(this).offset().top;
      let elementHeight = $(this).outerHeight();
      let windowTop = $(window).scrollTop();
      let windowBottom = windowTop + $(window).height();

      // 要素の半分が画面内に入ったら addClass
      if (
        windowBottom > elementTop + elementHeight / 2 &&
        windowTop < elementTop + elementHeight / 2
      ) {
        $(this).addClass('inview');
      } else {
        $(this).removeClass('inview'); // outview で removeClass
      }
    });
  });
});
