$(function () {
  // inview
  $('.js-fade, .js-in').on('inview', function (event, isInView) {
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
    dots: false,
    autoplay: false,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    swipe: false,
    touchMove: false,
    draggable: false,
    accessibility: false,
  });

  // 画面に表示時スライド開始(autoplayはfalseに設定する)
  $('.ph-slider').on('inview', function (event, isInView) {
    if (isInView) {
      setTimeout(() => {
        $(this).slick('slickPlay');
      }, 1750);
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

  // js-credit クリックでクレジットの表示モーダル
  $(document).on('click', function (e) {
    const $target = $(e.target);

    if ($target.closest('.look').length) {
      // lookをクリックした場合、openクラスを追加
      const $look = $target.closest('.look');
      $look.addClass('open');
    } else {
      // look外をクリックした場合、全てのlookからopenクラスを削除
      $('.look').removeClass('open');
    }
  });

  //movieのsound-btn制御
  function initVideoMuteToggle() {
    const $video = $('.js-movie')[0]; // DOM要素を取得
    const $videoBtn = $('.sound-btn');

    if (!$video || $videoBtn.length === 0) {
      console.log('要素が見つかりません');
      return;
    }

    $videoBtn.on('click', function () {
      $video.muted = !$video.muted;
      $videoBtn.toggleClass('on');
    });
  }
  initVideoMuteToggle();

  // ==============================
  // credit 折り返し要素検知
  // ==============================
  // ・.credit 内の <li> 要素を行ごとに判定し、
  //   各行の右端（折り返しの最後の要素）に
  //   .line-end クラスを付与する処理
  // ==============================
  // function detectLineEndItems() {
  //   // .credit をすべて対象に処理
  //   $('.credit').each(function () {
  //     const $items = $(this).find('li'); // 対象となる li 要素群

  //     // まず既存の line-end クラスをリセット
  //     $items.removeClass('line-end');

  //     // li が存在しなければ終了
  //     if (!$items.length) return;

  //     // ------------------------------
  //     // 行ごとに li 要素をグループ化
  //     // ------------------------------
  //     const rows = []; // 行ごとの要素を格納する配列
  //     let currentRow = []; // 現在処理中の行
  //     let currentY = $items.first().offset().top; // 最初の要素の Y 座標

  //     $items.each(function () {
  //       const $item = $(this);
  //       const itemY = $item.offset().top; // 要素の縦位置

  //       // 現在の行と同じ高さとみなす (誤差 ±5px まで許容)
  //       if (Math.abs(itemY - currentY) <= 5) {
  //         currentRow.push({
  //           element: $item,
  //           left: $item.offset().left, // 左端の座標も記録
  //         });
  //       } else {
  //         // 位置が変わったら「次の行」と判定
  //         if (currentRow.length) rows.push(currentRow);
  //         currentRow = [
  //           {
  //             element: $item,
  //             left: $item.offset().left,
  //           },
  //         ];
  //         currentY = itemY; // 新しい行の基準 Y に更新
  //       }
  //     });

  //     // 最後の行を rows に追加
  //     if (currentRow.length) rows.push(currentRow);

  //     // ------------------------------
  //     // 各行の右端の要素に line-end を付与
  //     // ------------------------------
  //     rows.forEach((row) => {
  //       // 左座標が最大の要素（右端の要素）を取得
  //       const rightmost = row.reduce((max, current) =>
  //         current.left > max.left ? current : max
  //       );

  //       // 右端の要素にクラス追加
  //       rightmost.element.addClass('line-end');
  //     });
  //   });
  // }

  // 実行とリサイズ対応
  // $(document).ready(function () {
  //   setTimeout(detectLineEndItems, 100);
  //   $(window).on('resize', () => setTimeout(detectLineEndItems, 50));
  // });

  以下は上記コメントアウト箇所のリファクタリング後のコード;
  // ==============================
  // 行末要素検知ユーティリティ
  // ==============================
  /**
   * 要素群を行ごとに分割する
   * @param {jQuery} $items - 判定対象の要素群
   * @returns {Array} 行ごとの配列
   */
  function groupItemsByRow($items) {
    const rows = [];
    let currentRow = [];
    let currentY = $items.first().offset().top;

    $items.each(function () {
      const $item = $(this);
      const pos = $item.offset(); // top/left を一度で取得

      // 同じ行と判定（誤差 ±5px）
      if (Math.abs(pos.top - currentY) <= 5) {
        currentRow.push({ element: $item, left: pos.left });
      } else {
        if (currentRow.length) rows.push(currentRow);
        currentRow = [{ element: $item, left: pos.left }];
        currentY = pos.top;
      }
    });

    if (currentRow.length) rows.push(currentRow);
    return rows;
  }

  /**
   * 各行の右端要素に line-end クラスを付与
   * @param {jQuery} $container - 行末を検知したい親要素 (.credit など)
   */
  function detectLineEndItems($container) {
    const $items = $container.find('li');
    $items.removeClass('line-end'); // 一旦リセット
    if (!$items.length) return;

    const rows = groupItemsByRow($items);

    rows.forEach((row) => {
      // 右端要素を取得
      const rightmost = row.reduce((max, current) =>
        current.left > max.left ? current : max
      );
      rightmost.element.addClass('line-end');
    });
  }

  // ==============================
  // 初期化処理
  // ==============================
  $(function () {
    const $credits = $('.credit');

    function updateCredits() {
      $credits.each(function () {
        detectLineEndItems($(this));
      });
    }

    // 初回実行
    updateCredits();

    // resize に debounce をかけて再実行
    let resizeTimer;
    $(window).on('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCredits, 150);
    });
  });

  //js-scroll-toggle .onをつけたり消したり
  // .section要素のトップが見えたらonクラスを付与
  var $win = $(window);
  $win.on({
    'load scroll': function () {
      var winTop = $win.scrollTop();
      var winH = $win.height();
      var winBottom = winTop + winH; // ウィンドウの下端

      $('.section').each(function () {
        var $this = $(this);
        var sectionTop = $this.offset().top;

        if (!$this.hasClass('on') && sectionTop <= winBottom) {
          $this.addClass('on');
        } else if ($this.hasClass('on') && sectionTop > winBottom) {
          $this.removeClass('on');
        }
      });
    },
  });

  $win.on({
    'load scroll': function () {
      var winTop = $win.scrollTop();
      var winH = $win.height();
      var winBottom = winTop + winH;
      var $footer = $('.l-footer');
      var $pcLogo = $('.brand-logo');

      if ($footer.length > 0) {
        var footerTop = $footer.offset().top;

        if (!$pcLogo.hasClass('fadeout') && footerTop <= winBottom) {
          $pcLogo.addClass('fadeout');
        } else if ($pcLogo.hasClass('fadeout') && footerTop > winBottom) {
          $pcLogo.removeClass('fadeout');
        }
      }
    },
  });
});
