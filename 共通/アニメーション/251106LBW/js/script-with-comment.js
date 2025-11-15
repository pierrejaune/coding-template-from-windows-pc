// =========================================================
// WR用のjs/script.js にコピペしてください。
// =========================================================
$(function () {
  // ================================
  // 【1】スクロールで表示されるアニメーション
  // ================================
  // .js-fade や .js-in が画面内に入ったら「is-show」クラスを付与
  $('.js-fade, .js-in').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-show');
    }
  });

  // ================================
  // 【2】Slickスライダーの初期化設定
  // ================================
  $('.ph-slider').slick({
    fade: false, // フェード切り替えは使わない（スライド）
    speed: 2000, // スライドのアニメーション速度（2秒）
    autoplaySpeed: 2000, // 自動切り替え間隔（2秒）
    arrows: false, // 前後の矢印は非表示
    dots: true, // ドットナビゲーションを表示
    autoplay: false, // 自動再生は最初は無効（後で条件付きで開始）
    infinite: true, // 無限ループ
    pauseOnFocus: false, // フォーカス時に停止しない
    pauseOnHover: false, // ホバー時に停止しない
    variableWidth: true, // 各スライドの幅を可変にする
  });

  // ================================
  // 【3】スライド切り替え直前(beforeChange)処理
  // ================================
  $('.ph-slider').on(
    'beforeChange',
    function (event, slick, currentSlide, nextSlide) {
      const $slider = $(this);
      const slideIndex = nextSlide !== undefined ? nextSlide : 0;
      const $nextActiveSlide = $slider.find(
        '.slick-slide[data-slick-index="' + slideIndex + '"]'
      );

      // クラスの切り替え前に一度フェードアウトのような演出クラスを付与
      $slider.addClass('dots-transitioning');

      setTimeout(function () {
        // 次に表示されるスライドが .ph-s クラスを持つか確認
        if (
          $nextActiveSlide.find('.ph-s').length > 0 ||
          $nextActiveSlide.hasClass('ph-s')
        ) {
          $slider.addClass('on'); // 条件を満たす場合 on クラスを付与
        } else {
          $slider.removeClass('on');
        }

        // 少し遅らせてフェードイン的に復帰
        setTimeout(function () {
          $slider.removeClass('dots-transitioning');
        }, 50);
      }, 300);
    }
  );

  // ================================
  // 【4】初回読み込み時のスライド状態チェック
  // ================================
  $('.ph-slider').each(function () {
    const $slider = $(this);
    const $firstSlide = $slider.find('.slick-slide[data-slick-index="0"]');

    if ($firstSlide.find('.ph-s').length > 0 || $firstSlide.hasClass('ph-s')) {
      $slider.addClass('on');
    }
  });

  // ================================
  // 【5】ヘッダーと要素の重なり検知（.ph-header × .js-navy）
  // ================================
  function checkOverlap() {
    const $header = $('.ph-header');

    if ($header.length) {
      const headerRect = $header[0].getBoundingClientRect();
      let isOverlapping = false;

      // すべての .js-navy 要素を確認 重なっている時は.on クラスを付与
      $('.js-navy').each(function () {
        const navyRect = this.getBoundingClientRect();

        // 要素が実際に表示中かどうか
        const isVisible = navyRect.width > 0 && navyRect.height > 0;

        if (isVisible) {
          // 矩形同士の交差（重なり）を判定
          const overlapping = !(
            headerRect.bottom < navyRect.top ||
            headerRect.top > navyRect.bottom ||
            headerRect.right < navyRect.left ||
            headerRect.left > navyRect.right
          );

          if (overlapping) {
            isOverlapping = true;
            return false; // 1つでも重なっていれば終了
          }
        }
      });

      // 重なっていれば .on クラスを付与
      $header.toggleClass('on', isOverlapping);
    }
  }

  // スクロール時・スライド切替時に都度判定
  $(window).on('scroll', checkOverlap);

  // スライド切り替え開始時に重なりを頻繁にチェック（約60fps）
  $('.ph-slider').on('beforeChange', function () {
    const checkInterval = setInterval(checkOverlap, 16); // 約60fps
    setTimeout(function () {
      clearInterval(checkInterval);
      checkOverlap(); // 終了時にも再判定
    }, 2000); // スライダーのspeedと同じ
  });

  $('.ph-slider').on('afterChange', checkOverlap);
  $(window).on('load resize', checkOverlap);
  checkOverlap(); // 初回チェック

  // ================================
  // 【6】スライダーが画面内に入ったら再生開始
  // ================================
  $('.ph-slider').on('inview', function (event, isInView) {
    if (isInView) {
      setTimeout(() => {
        $(this).slick('slickPlay'); // 自動再生開始
      }, 2000); // 2秒遅延
    }
  });

  // ================================
  // 【7】クリックでクレジット（credit）やスライド詳細表示
  // ================================
  $(document).on('click', function (e) {
    const $target = $(e.target);

    if (
      $target.closest('.credit').length ||
      $target.closest('.ph-link').length
    ) {
      // クレジットまたはリンク内クリックは無視
      return;
    } else if ($target.closest('.js-ph-slide').length) {
      // スライド(.js-ph-slide)クリック時の処理
      const $clickedLook = $target.closest('.js-ph-slide');
      const wasOpen = $clickedLook.hasClass('open');
      const $slider = $clickedLook.closest('.ph-slider');

      // 全スライドの open をリセット
      $slider.find('.js-ph-slide').removeClass('open');

      // 閉じていた場合のみ open を付与
      if (!wasOpen) {
        const phClass = $clickedLook.attr('class').match(/ph\d+/);

        if (phClass) {
          // 同じクラス(ph◯◯)を持つスライドを全て開く
          $slider.find('.js-ph-slide.' + phClass[0]).addClass('open');
        } else {
          $clickedLook.addClass('open');
        }
      }
    } else {
      // それ以外の場所をクリックした場合は全て閉じる
      $('.js-ph-slide').removeClass('open');
    }
  });

  // ================================
  // 【8】別タイプの詳細（.js-ph）のクリック挙動
  // ================================
  $(document).on('click', function (e) {
    const $target = $(e.target);

    if (
      $target.closest('.credit').length ||
      $target.closest('.ph-link').length
    ) {
      return;
    } else if ($target.closest('.js-ph').length) {
      const $clickedLook = $target.closest('.js-ph');
      const wasOpen = $clickedLook.hasClass('open');

      $('.js-ph').removeClass('open');
      if (!wasOpen) {
        $clickedLook.addClass('open');
      }
    } else {
      $('.js-ph').removeClass('open');
    }
  });

  // ================================
  // 【9】.js-position 要素のsticky位置調整
  // ================================
  $(window).on('load resize', function () {
    function updatePosition() {
      var windowHeight = $(window).height();

      $('.js-position').each(function () {
        var elementHeight = $(this).outerHeight();

        if (elementHeight <= windowHeight) {
          // 要素が画面より小さい場合は上に固定
          $(this).css('top', '0');
        } else {
          // 要素が画面より大きい場合は下寄せに調整
          var topValue = windowHeight - elementHeight;
          $(this).css('top', topValue + 'px');
        }
      });
    }

    updatePosition();
  });

  // ================================
  // 【10】クレジット内（.credit li）の行末要素検知
  // ================================
  function detectLineEndItems() {
    $('.credit').each(function () {
      const $items = $(this).find('li');
      $items.removeClass('line-end');
      if (!$items.length) return;

      const rows = [];
      let currentRow = [];
      let currentY = $items.first().offset().top;

      // 各 li の縦位置を比較し行ごとにグループ化
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

      // 各行で最も右にある li に line-end クラスを付与
      rows.forEach((row) => {
        const rightmost = row.reduce((max, current) =>
          current.left > max.left ? current : max
        );
        rightmost.element.addClass('line-end');
      });
    });
  }

  // 初期実行とリサイズ対応
  $(document).ready(function () {
    setTimeout(detectLineEndItems, 100);
    $(window).on('resize', () => setTimeout(detectLineEndItems, 50));
  });

  // 段階的に複数回実行して確実に反映させる
  $(document).ready(function () {
    const runDetection = () => {
      detectLineEndItems();
    };

    setTimeout(runDetection, 100);
    setTimeout(runDetection, 300);
    setTimeout(runDetection, 500);
    setTimeout(runDetection, 1000);

    // Slickの初期化・スライド切り替え時にも再実行
    $(document).on('init afterChange', '.slick-slider', runDetection);

    // リサイズ時にも安定再実行
    let resizeTimer;
    $(window).on('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(runDetection, 100);
    });
  });
});
