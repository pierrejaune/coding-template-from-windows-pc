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

// ==========================
// モーダル処理
// ==========================
$(function () {
  let currentIndex = 0; // ★ 現在表示中のモーダルインデックスを管理
  const $modalBoxes = $('.moreModal__box');

  // モーダルを開く
  $('.sec__img').on('click', function () {
    let img = $(this).data('img');

    $modalBoxes.each(function (index) {
      let box = $(this).data('box');
      if (box == img) {
        currentIndex = index; // ★ 開いた時点のインデックスを記録
        $(this).addClass('on');
        $('.moreModal').addClass('on');
        $('.bg').addClass('on');
      }
    });
  });

  // モーダルを閉じる
  $('.bg, .moreModal__close').on('click', function () {
    $('.bg').removeClass('on');
    $('.moreModal').removeClass('on');
    $modalBoxes.removeClass('on');
  });

  // ==========================
  // ★ ここから prev / next 機能追加
  // ==========================
  $('.next').on('click', function () {
    $modalBoxes.eq(currentIndex).removeClass('on'); // 現在のモーダルを閉じる
    currentIndex = (currentIndex + 1) % $modalBoxes.length; // 次へ（最後なら最初へループ）
    $modalBoxes.eq(currentIndex).addClass('on'); // 次のモーダルを開く
  });

  $('.prev').on('click', function () {
    $modalBoxes.eq(currentIndex).removeClass('on'); // 現在のモーダルを閉じる
    currentIndex = (currentIndex - 1 + $modalBoxes.length) % $modalBoxes.length; // 前へ（最初なら最後へループ）
    $modalBoxes.eq(currentIndex).addClass('on'); // 前のモーダルを開く
  });
});

// ==========================
// スクロール禁止イベント
// ==========================
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
