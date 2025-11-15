$(document).ready(function () {
  $("a[href^='#']").on('click', function (e) {
    e.preventDefault();
    let target = $($(this).attr('href'));
    if (target.length) {
      $('html, body').animate(
        {
          scrollTop: target.offset().top,
        },
        800
      );
    }
  });
});
