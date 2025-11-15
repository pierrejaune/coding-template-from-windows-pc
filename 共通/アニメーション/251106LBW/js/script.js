// WR用のjs/script.jsにコピペしてください。
$(function () {
  // inview
  $('.js-fade, .js-in').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-show');
    }
  });

  // slider
  $('.ph-slider').slick({
    fade: false,
    speed: 2000,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    autoplay: false,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    variableWidth: true,
  });

  // スライド切り替え直前に即座にクラスを付与
  $('.ph-slider').on(
    'beforeChange',
    function (event, slick, currentSlide, nextSlide) {
      const $slider = $(this);
      const slideIndex = nextSlide !== undefined ? nextSlide : 0;
      const $nextActiveSlide = $slider.find(
        '.slick-slide[data-slick-index="' + slideIndex + '"]'
      );

      // 一度フェードアウト
      $slider.addClass('dots-transitioning');

      setTimeout(function () {
        // 次に表示されるスライドに.ph-sが存在するかチェック
        if (
          $nextActiveSlide.find('.ph-s').length > 0 ||
          $nextActiveSlide.hasClass('ph-s')
        ) {
          $slider.addClass('on');
        } else {
          $slider.removeClass('on');
        }

        // フェードイン
        setTimeout(function () {
          $slider.removeClass('dots-transitioning');
        }, 50);
      }, 300);
    }
  );

  // 初回読み込み時に1枚目をチェック（トランジションなし）
  $('.ph-slider').each(function () {
    const $slider = $(this);
    const $firstSlide = $slider.find('.slick-slide[data-slick-index="0"]');

    if ($firstSlide.find('.ph-s').length > 0 || $firstSlide.hasClass('ph-s')) {
      $slider.addClass('on');
    }
  });

  ////////

  // ↓ここから追加
  function checkOverlap() {
    const $header = $('.ph-header');

    if ($header.length) {
      const headerRect = $header[0].getBoundingClientRect();
      let isOverlapping = false;

      // すべての.js-navy要素をチェック
      $('.js-navy').each(function () {
        const navyRect = this.getBoundingClientRect();

        // この要素が画面内に表示されているかチェック
        const isVisible = navyRect.width > 0 && navyRect.height > 0;

        if (isVisible) {
          const overlapping = !(
            headerRect.bottom < navyRect.top ||
            headerRect.top > navyRect.bottom ||
            headerRect.right < navyRect.left ||
            headerRect.left > navyRect.right
          );

          if (overlapping) {
            isOverlapping = true;
            return false; // eachを抜ける
          }
        }
      });

      $header.toggleClass('on', isOverlapping);
    }
  }

  // スクロール時とslickのスライド切り替え時に判定
  $(window).on('scroll', checkOverlap);

  // beforeChangeで即座に判定開始
  $('.ph-slider').on('beforeChange', function () {
    // アニメーション中も継続的にチェック
    const checkInterval = setInterval(checkOverlap, 16); // 約60fps

    // アニメーション終了後にインターバルを停止
    setTimeout(function () {
      clearInterval(checkInterval);
      checkOverlap(); // 最後にもう一度確実にチェック
    }, 2000); // speedと同じ2000ms
  });

  $('.ph-slider').on('afterChange', checkOverlap);
  $(window).on('load resize', checkOverlap);

  // 初回実行
  checkOverlap();

  ///////////////////

  // 画面に表示時スライド開始(autoplayはfalseに設定する)
  $('.ph-slider').on('inview', function (event, isInView) {
    if (isInView) {
      setTimeout(() => {
        $(this).slick('slickPlay');
      }, 2000);
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
    } else if ($target.closest('.js-ph-slide').length) {
      // js-ph-slideをクリックした場合
      const $clickedLook = $target.closest('.js-ph-slide');
      const wasOpen = $clickedLook.hasClass('open');

      // クリックされたスライダーを取得
      const $slider = $clickedLook.closest('.ph-slider'); // スライダーのクラス名を適宜変更

      // そのスライダー内の全てのjs-ph-slideからopenクラスを削除
      $slider.find('.js-ph-slide').removeClass('open');

      // クリックされたjs-ph-slideが閉じていた場合のみopenクラスを追加（トグル動作）
      if (!wasOpen) {
        // クリックされたスライドと同じphクラスを持つスライドを、同じスライダー内から取得
        const phClass = $clickedLook.attr('class').match(/ph\d+/);

        if (phClass) {
          // 同じスライダー内の、同じphクラスを持つ全てのjs-ph-slideに.openを追加
          $slider.find('.js-ph-slide.' + phClass[0]).addClass('open');
        } else {
          // phクラスがない場合は通常通り
          $clickedLook.addClass('open');
        }
      }
    } else {
      // その他の場所をクリックした場合、全てのjs-ph-slideからopenクラスを削除
      $('.js-ph-slide').removeClass('open');
    }
  });

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

  //credit 折り返し要素検知
  function detectLineEndItems() {
    $('.credit').each(function () {
      const $items = $(this).find('li');

      // line-endクラスをリセット
      $items.removeClass('line-end');

      if (!$items.length) return;

      // 要素を行ごとにグループ化
      const rows = [];
      let currentRow = [];
      let currentY = $items.first().offset().top;

      $items.each(function () {
        const $item = $(this);
        const itemY = $item.offset().top;

        if (Math.abs(itemY - currentY) <= 2) {
          currentRow.push({ element: $item, left: $item.offset().left });
        } else {
          if (currentRow.length) rows.push(currentRow);
          currentRow = [{ element: $item, left: $item.offset().left }];
          currentY = itemY;
        }
      });

      if (currentRow.length) rows.push(currentRow);

      // 各行の最も右の要素にline-endクラスを追加
      rows.forEach((row) => {
        const rightmost = row.reduce((max, current) =>
          current.left > max.left ? current : max
        );
        rightmost.element.addClass('line-end');
      });
    });
  }

  // 実行とリサイズ対応
  $(document).ready(function () {
    setTimeout(detectLineEndItems, 100);
    $(window).on('resize', () => setTimeout(detectLineEndItems, 50));
  });

  $(document).ready(function () {
    // 段階的に実行して確実に適用
    const runDetection = () => {
      detectLineEndItems();
    };

    setTimeout(runDetection, 100);
    setTimeout(runDetection, 300);
    setTimeout(runDetection, 500);
    setTimeout(runDetection, 1000);

    // Slickイベントにもフック（セレクタは適宜変更）
    $(document).on('init afterChange', '.slick-slider', runDetection);

    // リサイズ対応
    let resizeTimer;
    $(window).on('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(runDetection, 100);
    });
  });
});

// WR用のjs/script.jsにコピペしてください。
