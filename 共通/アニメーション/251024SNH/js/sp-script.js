// WR用のjs/script.jsにコピペしてください。
$(function () {
  // inview
  $('.js-fade, .js-in, .js-zoom').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-show');
    }
  });

  // slider
  $('.ph-slider').slick({
    fade: true,
    speed: 1500,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    autoplay: false,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  // 画面に表示時スライド開始(autoplayはfalseに設定する)
  $('.ph-slider').on('inview', function (event, isInView) {
    if (isInView) {
      setTimeout(() => {
        $(this).slick('slickPlay');
      }, 1750);
    }
  });

  // クリックでクレジットの表示モーダル
  $(document).on('click', function (e) {
    const $target = $(e.target);

    if (
      $target.closest('.credit').length ||
      $target.closest('.ph-link').length
    ) {
      // .creditまたは.ph-linkをクリックした場合は何もしない
      return;
    } else if ($target.closest('.js-ph').length) {
      // lookをクリックした場合
      const $clickedLook = $target.closest('.js-ph');
      const wasOpen = $clickedLook.hasClass('open');

      // まず全てのlookからopenクラスを削除
      $('.js-ph').removeClass('open');

      // クリックされたlookが閉じていた場合のみopenクラスを追加（トグル動作）
      if (!wasOpen) {
        $clickedLook.addClass('open');
      }
    } else {
      // その他の場所をクリックした場合、全てのlookからopenクラスを削除
      $('.js-ph').removeClass('open');
    }
  });

  // js-position stickyの開始位置
  $(window).on('load resize', function () {
    function updatePosition() {
      var windowHeight = $(window).height();

      $('.js-position').each(function () {
        var elementHeight = $(this).outerHeight();
        // var elementHeight = this.getBoundingClientRect().height;

        if (elementHeight <= windowHeight) {
          // 要素の高さがウィンドウの高さより低い場合
          $(this).css('top', '0');
        } else {
          // 要素の高さがウィンドウの高さより高い場合
          var topValue = windowHeight - elementHeight;
          $(this).css('top', topValue + 'px');
        }
      });
    }

    updatePosition();
  });

  function initVideoMuteToggle() {
    const $movieAreas = $('.movie-area');

    if ($movieAreas.length === 0) {
      console.log('要素が見つかりません');
      return;
    }

    $movieAreas.each(function () {
      const $movieArea = $(this);
      const $video = $movieArea.find('.js-movie')[0]; // DOM要素を取得
      const $videoBtn = $movieArea.find('.sound-btn');

      if (!$video || $videoBtn.length === 0) {
        console.log('動画またはボタンが見つかりません');
        return;
      }

      $videoBtn.on('click', function () {
        // クリックされたボタンが既にonの場合
        if ($videoBtn.hasClass('on')) {
          $video.muted = true;
          $videoBtn.removeClass('on');
        } else {
          // 他の動画をすべてミュートにする
          $('.js-movie').each(function () {
            this.muted = true;
          });
          // 他のボタンからonクラスを削除
          $('.sound-btn').removeClass('on');

          // クリックされたボタンに対応する動画のみミュート解除
          $video.muted = false;
          $videoBtn.addClass('on');
        }
      });
    });
  }

  initVideoMuteToggle();

  $(document).ready(function () {
    function handlePageLoad() {
      // Navigation Timing Level 2 (modern)
      const [navEntry] = performance.getEntriesByType('navigation');
      const isNewNavigation = navEntry && navEntry.type === 'navigate';

      if (isNewNavigation) {
        const offsetTop = $('.l-container').offset().top;
        $('html, body').scrollTop(offsetTop);
        console.log('新規読み込み: .l-container の位置までスクロール');
      } else {
        console.log('リロードまたは履歴移動: 位置をそのままに');
      }
    }

    handlePageLoad();
  });

  $('.totop-icon01').on('click', function () {
    const $icon = $(this);

    // // 一度クラスを削除してリセット
    // $icon.removeClass('is-animating');

    // // リフロー（再描画）を強制してアニメーションをリセット
    // $icon[0].offsetWidth;

    // アニメーションクラスを追加
    $icon.addClass('is-animating');

    // 1.4秒後（アニメーション終了後）にページトップへスクロール
    setTimeout(function () {
      // ページトップへスムーススクロール
      $('html, body').animate(
        {
          scrollTop: 0,
        },
        600
      ); // 600msでスクロール

      // アニメーションクラスを削除（次回クリック用）
      $icon.removeClass('is-animating');
    }, 1400); // 1400ms = 1.4s
  });
});

// WR用のjs/script.jsにコピペしてください。
