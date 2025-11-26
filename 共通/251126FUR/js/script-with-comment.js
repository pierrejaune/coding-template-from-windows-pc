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

// ======================
// order_type01
// スクロールや読み込み時に .fadeIn_anim_area が画面内に入ったら
// 内部にある .fadeIn_anim 要素を順番にフェードイン（active付与）させる処理
// ======================
$(function () {
  // window の load・scroll の両方で発火
  $(window).on('load scroll', function () {
    // フェードインの起点となる領域をすべてチェック
    $('.fadeIn_anim_area').each(function () {
      // 対象領域のページ上の位置（上端）
      var triggerPos = $(this).offset().top;
      // 現在のスクロール量
      var scroll = $(window).scrollTop();
      // ウィンドウの高さ
      var windowHeight = $(window).height();

      // スクロール位置が対象要素の 85% 手前に来たらアニメを開始
      if (scroll > triggerPos - windowHeight * 0.85) {
        // 内部の .fadeIn_anim を順に処理
        $(this)
          .find('.fadeIn_anim')
          .each(function (i) {
            var _this = $(this);

            // 400ms * 順番 のディレイで1つずつ active クラスを付与
            setTimeout(function () {
              _this.addClass('active');
            }, 400 * i);
          });
      }
    });
  });
});

// ======================
// order_type02
// 左側アイコン → 右側アイコン → 全リセット → 再ループ
// というアニメーションを繰り返す処理
// ======================
$(function () {
  // ----------------------
  // loopIcons
  // container 内の .icon を delay 間隔で 1つずつ active にする
  // 全て終わったら callback を実行
  // ----------------------
  function loopIcons(container, delay, callback) {
    const icons = container.find('.icon');
    let index = 0;

    // アイコンを1つずつ active にする内部関数
    function showNext() {
      $(icons[index]).addClass('active');
      index++;

      // 最後まで行ったら callback → 次へ
      if (index >= icons.length) {
        if (callback) {
          setTimeout(callback, delay);
        }
      } else {
        // 次のアイコンを delay 後に表示
        setTimeout(showNext, delay);
      }
    }

    // ループ開始
    showNext();
  }

  // ----------------------
  // loopLeftRight
  // 左（.loop_left） → 右（.loop_right）
  // → 1秒置いて両方の active を全解除 → 再スタート
  // ----------------------
  function loopLeftRight() {
    loopIcons($('.loop_left'), 500, function () {
      loopIcons($('.loop_right'), 500, function () {
        // 右まで終わったら1秒待つ
        setTimeout(() => {
          // 両方の .icon の active を消す（リセット）
          $('.loop_left .icon, .loop_right .icon').removeClass('active');

          // 少し待って再ループ開始
          setTimeout(loopLeftRight, 500);
        }, 1000);
      });
    });
  }

  // アニメーションループ開始
  loopLeftRight();
});
