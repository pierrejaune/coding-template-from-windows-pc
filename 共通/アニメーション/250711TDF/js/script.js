document.addEventListener('DOMContentLoaded', function () {
  // デバイス判定を行い、対応したデバイスに必要な処理を実行
  var ua = navigator.userAgent;
  var iphone = ua.indexOf('iPhone') > 0;
  var androidSp = ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0;
  // var ipad = ua.indexOf("iPad");
  // var androidT = ua.indexOf("Android");

  if (iphone || androidSp) {
  }
});

/* animation.js */

document.addEventListener('DOMContentLoaded', function () {
  // フェードイン
  $(function () {
    $(window).on('resize load', function () {
      setTimeout(function () {
        $('.feature').addClass('is_show');
        setTimeout(function () {
          $('.js_anime').each(function () {
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight * 0.75) {
              $(this).addClass('is_show');
            }
          });

          $('.js_animenext').each(function () {
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight) {
              $(this).addClass('is_show');
            }
          });
        }, 500);
      }, 1000);
    });
  });

  $(window).on('scroll', function () {
    $('.js_anime').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.75) {
        $(this).addClass('is_show');
      }
    });
  });

  $(window).on('scroll', function () {
    $('.js_animenext').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight) {
        $(this).addClass('is_show');
      }
    });
  });
});

/* modal.js */

document.addEventListener('DOMContentLoaded', () => {
  const fixedContent = document.querySelector('.fixed-content');
  let scrollPosition = 0;

  const openModal = (targetModal) => {
    // 現在のスクロール位置を記録
    scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // body固定＋topに現在位置を設定
    document.body.classList.add('modal-lock');
    document.body.style.top = `-${scrollPosition}px`;

    // モーダル表示処理
    document.querySelectorAll('.modal-box').forEach((box) => {
      box.classList.remove('modal-num-open');
    });
    targetModal.classList.add('modal-num-open');
    fixedContent.classList.add('modal-open');
  };

  const closeModal = () => {
    // モーダル非表示
    fixedContent.classList.remove('modal-open');

    // body固定解除
    document.body.classList.remove('modal-lock');
    document.body.style.top = '';

    // スクロール位置を復元
    window.scrollTo({ top: scrollPosition, behavior: 'instant' });

    // モーダル中身も非表示
    setTimeout(() => {
      document.querySelectorAll('.modal-box').forEach((box) => {
        box.classList.remove('modal-num-open');
      });
    }, 400);
  };

  // モーダルを開くトリガー
  document.querySelectorAll('[data-modal-num]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modalClass = trigger.dataset.modalNum;
      const targetModal = document.querySelector(`.${modalClass}`);
      if (targetModal && fixedContent) openModal(targetModal);
    });
  });

  // モーダルの背景クリック or 閉じるボタンで閉じる
  fixedContent.addEventListener('click', (e) => {
    const isModalBox = e.target.closest('.modal-content_box');
    const isCloseBtn = e.target.classList.contains('modal-close');
    if (!isModalBox || isCloseBtn) closeModal();
  });

  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal();
    });
  });
});
