$(document).ready(function () {
  // 1. スクロールで要素が浮かび上がる
  $(window).on('scroll', function () {
    $('.scroll-fade').each(function () {
      if (
        $(this).offset().top <
        $(window).scrollTop() + $(window).height() - 50
      ) {
        $(this).addClass('active');
      }
    });

    $('.scroll-rotate img').each(function () {
      if (
        $(this).offset().top <
        $(window).scrollTop() + $(window).height() - 50
      ) {
        $(this).addClass('active');
      }
    });

    $('.scroll-text').each(function () {
      if (
        $(this).offset().top <
        $(window).scrollTop() + $(window).height() - 50
      ) {
        $(this).addClass('active');
      }
    });
  });

  // 2. スクロールでナビ縮小
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('.nav').addClass('small');
    } else {
      $('.nav').removeClass('small');
    }
  });

  // 3. 背景色をスクロールで変更
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 300) {
      $('.bg-change').css('background', 'black');
    } else {
      $('.bg-change').css('background', 'white');
    }
  });

  // 4. 複数要素を連続表示
  $(window).on('scroll', function () {
    $('.fade-item').each(function (i) {
      if (
        $(this).offset().top <
        $(window).scrollTop() + $(window).height() - 50
      ) {
        $(this)
          .delay(i * 300)
          .queue(function () {
            $(this).addClass('active').dequeue();
          });
      }
    });
  });

  // 5. 数字カウントアップ
  var counted = false;
  $(window).on('scroll', function () {
    var counter = $('.counter');
    if (
      !counted &&
      counter.offset().top < $(window).scrollTop() + $(window).height()
    ) {
      counted = true;
      var num = 0;
      var interval = setInterval(function () {
        num++;
        counter.text(num);
        if (num >= 100) clearInterval(interval);
      }, 20);
    }
  });
});
