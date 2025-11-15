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
  //アンカーリンク
  $(window).on('load', function () {
    $('a[href^="#"]').on('click', function () {
      var speed = 500,
        href = $(this).attr('href'),
        target = $(href == '#' || href == '' ? 'html' : href),
        headerHeight = $('.l-header').innerHeight(),
        headerHeightFixed = $('.l-header .pc-header-main').innerHeight(),
        currentScroll = $(window).scrollTop();

      // 目的地のセクションまでの累積高さを計算
      var targetScrollCumulative = 0;
      $('.js-position').each(function () {
        if ($(this).attr('id') === href.replace('#', '')) {
          return false;
        }
        targetScrollCumulative += $(this).outerHeight();
      });

      // 進む方向か戻る方向かを判定
      var position;
      if (currentScroll > targetScrollCumulative) {
        // 上方向（戻る）：累積高さ + ヘッダー高さ
        position = targetScrollCumulative + 130 + 80;
        console.log('上方向（累積+ヘッダー）:', position);
      } else {
        // 下方向（進む）：offset().topからヘッダー分を引く
        position = target.offset().top - 80;
        console.log('下方向（offset-ヘッダー）:', position);
      }

      $('html, body').animate({ scrollTop: position }, speed, 'swing');
      return false;
    });
  });
  //stickyの影響なのか、ページ内リンクで戻る方向だと途中で止まるのを制御
  // $('a[href^="#"]').on('click', function (e) {
  //   e.preventDefault();

  //   var targetId = $(this).attr('href');
  //   var $target = $(targetId);

  //   if ($target.length) {
  //     // 現在のスクロール位置
  //     var currentScroll = $(window).scrollTop();

  //     // 目的地のセクションまでの累積高さを計算
  //     var targetScroll = 0;
  //     $('.js-position').each(function () {
  //       if ($(this).attr('id') === targetId.replace('#', '')) {
  //         return false; // このセクションで停止
  //       }
  //       targetScroll += $(this).outerHeight();
  //     });

  //     console.log('現在:', currentScroll, '目的地:', targetScroll);

  //     // スムーススクロール
  //     $('html, body').animate({
  //       scrollTop: targetScroll
  //     },);
  //   }
  // });

  // クリックでクレジットの表示モーダル
  // $(document).on('click', function (e) {
  //   const $target = $(e.target);

  //   if ($target.closest('.credit').length || $target.closest('.ph-link').length) {
  //     // .creditまたは.ph-linkをクリックした場合は何もしない
  //     return;
  //   } else if ($target.closest('.js-ph').length) {
  //     // lookをクリックした場合
  //     const $clickedLook = $target.closest('.js-ph');
  //     const wasOpen = $clickedLook.hasClass('open');

  //     // まず全てのlookからopenクラスを削除
  //     $('.js-ph').removeClass('open');

  //     // クリックされたlookが閉じていた場合のみopenクラスを追加（トグル動作）
  //     if (!wasOpen) {
  //       $clickedLook.addClass('open');
  //     }
  //   } else {
  //     // その他の場所をクリックした場合、全てのlookからopenクラスを削除
  //     $('.js-ph').removeClass('open');
  //   }
  // });

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

  // totop時間差付けて戻る
  $('.totop').on('click', function () {
    const $icon = $(this);
    $('.totop-icon01').addClass('is-animating');

    setTimeout(function () {
      $('html, body').animate(
        {
          scrollTop: 0,
        },
        600
      ); //.6sかけて戻る
      $('.totop-icon01').removeClass('is-animating');
    }, 1400);
  });

  // onつけたり消したり
  var $win = $(window);
  $win.on({
    'load scroll': function () {
      var winTop = $win.scrollTop();
      var winH = $win.height();
      var winCenter = winTop + winH / 2; // ウィンドウの下端

      $('#contents01, #contents02').each(function () {
        var $this = $(this);
        var targetTop = $this.offset().top;

        if (!$this.hasClass('on') && targetTop <= winCenter) {
          $this.addClass('on');
        } else if ($this.hasClass('on') && targetTop > winCenter) {
          $this.removeClass('on');
        }
      });
    },
  });
});

// WR用のjs/script.jsにコピペしてください。
