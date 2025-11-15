$(function () {
  $('.js-inview').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let scrlY = 0; // スクロール位置を保存する変数

  // ------------------------------
  // アコーディオン処理
  // ------------------------------
  const accordionTriggers = document.querySelectorAll('.accordionTrigger');

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      // クリックした要素以外の accordion を閉じる
      accordionTriggers.forEach((other) => {
        if (other !== trigger) {
          other.classList.remove('open');
          other.textContent = 'read more';
          if (other.previousElementSibling) {
            other.previousElementSibling.classList.remove('slide');
          }
        }
      });

      // 開閉の切り替え
      trigger.classList.toggle('open');
      if (trigger.classList.contains('open')) {
        trigger.textContent = 'close';
      } else {
        trigger.textContent = 'read more';
      }

      // 直前の要素に slide クラスを付与/解除
      if (trigger.previousElementSibling) {
        trigger.previousElementSibling.classList.toggle('slide');
      }
    });
  });

  // ------------------------------
  // モーダル処理（開く）
  // ------------------------------
  const modalOpenBtns = document.querySelectorAll('.js-modal-open');
  modalOpenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.dataset.target; // data-target を取得
      const modal = document.getElementById(targetId);
      if (!modal) return;

      // jQueryの fadeIn の代わりに display:block にするだけ
      modal.style.display = 'block';

      // スクロール位置を保存して固定
      scrlY = window.scrollY;
      document.body.classList.add('no_scroll');
      window.scrollTo(0, scrlY);
    });
  });

  // ------------------------------
  // モーダル処理（閉じる）
  // ------------------------------
  const modalCloseBtns = document.querySelectorAll('.modalClose');
  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // 全モーダルを非表示にする
      const modals = document.querySelectorAll('.js-modal');
      modals.forEach((modal) => {
        modal.style.display = 'none';
      });

      // スクロール制御解除
      document.body.classList.remove('no_scroll');
      window.scrollTo(0, scrlY);
    });
  });
});

$(document).ready(function () {
  $('.feature .slick').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    fade: true,
    dots: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  });
});
