window.onload = function () {
  // IO START
  const targetList = document.querySelectorAll('.target');
  const IO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.dataset.isActive = 'true';
        }
      });
    },
    { threshold: 0.3 }
  );
  targetList.forEach((target) => IO.observe(target));
  // IO END
};

//ボタン
$(function () {
  $('.sec__img').on('click', function () {
    let img = $(this).data('img');
    $('.moreModal__box').each(function () {
      let box = $(this).data('box');
      if (box == img) {
        $(this).addClass('on');
        $('.moreModal').addClass('on');
        $('.bg').addClass('on');
      }
    });
  });
  $('.bg, .moreModal__close').on('click', function () {
    $('.bg').removeClass('on');
    $('.moreModal').removeClass('on');
    $('.moreModal__box').removeClass('on');
  });
});

// スクロール禁止イベント
$(function () {
  let scrollY = '';
  $('.sec__img').on('click', function () {
    let top = $(window).scrollTop();
    let Btop = top * -1;
    $('body').addClass('modal-lock');
    $('body').css('top', Btop);
    return (scrollY = top);
  });
  $('.bg, .moreModal__close').on('click', function () {
    $('body').removeClass('modal-lock');
    $(window).scrollTop(scrollY);
  });
});
