//fade
$(function () {
  $(window).on('load scroll', function () {
    $('.fadeIn').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 0.85) {
        $(this).addClass('active');
      }
    });
  });
});

//　star アニメーションのdelayとduration個別自動設定
document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.star,.star02');

  stars.forEach((star, index) => {
    const delay = Math.random() * 3000;
    const duration = 5000;

    star.style.setProperty('--star-delay', `${delay}ms`);
    star.style.setProperty('--star-duration', `${duration}ms`);
    star.classList.add('animate');
  });
});

// swiper
$(function () {
  // 無限スクロールスワイパー
  const swiper01 = new Swiper('.swiper01', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
    },
  });

  const swiper02 = new Swiper('.swiper02,.swiper03', {
    loop: true,
    spaceBetween: 0,
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 0,
  });
});

/************************************************************
 * order_type01（Vanilla JS リファクタリング版）
 * 画面内へ 85% 手前に入った .fadeIn_anim_area に対し、
 * 内部の .fadeIn_anim を 1つずつ遅延アニメーションさせる
 ************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  const areas = document.querySelectorAll('.fadeIn_anim_area');

  function handleFadeIn() {
    const scroll = window.scrollY;
    const winH = window.innerHeight;

    areas.forEach((area) => {
      const triggerPos = area.getBoundingClientRect().top + scroll;

      // トリガー条件：スクロール位置 > 要素位置 - 画面高の 85%
      if (scroll > triggerPos - winH * 0.85) {
        const anims = area.querySelectorAll('.fadeIn_anim');

        anims.forEach((el, i) => {
          // 400ms * index のディレイで順番に active を付与
          setTimeout(() => {
            el.classList.add('active');
          }, 400 * i);
        });
      }
    });
  }

  // 初回 + スクロール時に実行
  window.addEventListener('load', handleFadeIn);
  window.addEventListener('scroll', handleFadeIn);
});

/************************************************************
 * order_type02（Vanilla JS リファクタリング版）
 * 左アイコン群 → 右アイコン群 → リセット → 無限ループ
 ************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  /**
   * 指定コンテナ内の .icon を delay 間隔で順番に active 付与
   * 全部終わったら callback 実行
   */
  function playIconsSequentially(container, delay, callback) {
    const icons = Array.from(container.querySelectorAll('.icon'));
    let index = 0;

    function activateNext() {
      icons[index].classList.add('active');
      index++;

      if (index >= icons.length) {
        // 全て終わったら callback を呼ぶ
        if (callback) setTimeout(callback, delay);
      } else {
        // 次へ
        setTimeout(activateNext, delay);
      }
    }

    activateNext();
  }

  /**
   * 左 → 右 → リセット → 再ループ
   */
  function loopLeftRight() {
    const left = document.querySelector('.loop_left');
    const right = document.querySelector('.loop_right');

    playIconsSequentially(left, 500, () => {
      playIconsSequentially(right, 500, () => {
        // 両方終わったら1秒休憩してリセット
        setTimeout(() => {
          document
            .querySelectorAll('.loop_left .icon, .loop_right .icon')
            .forEach((icon) => icon.classList.remove('active'));

          // 0.5秒後に再スタート
          setTimeout(loopLeftRight, 500);
        }, 1000);
      });
    });
  }

  // 無限ループ開始
  loopLeftRight();
});
