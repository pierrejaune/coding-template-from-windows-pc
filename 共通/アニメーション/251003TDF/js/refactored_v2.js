// ======================
// IntersectionObserver (既存コードそのまま)
// ======================
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
// モーダル処理（元コードに統合・jQuery）
// ==========================
$(function () {
  // -----------------------
  // 変数（統合）
  // -----------------------
  let currentIndex = -1; // 現在表示中のモーダルインデックス
  const $modalBoxes = $('.moreModal__box'); // モーダルボックス群
  let savedScrollY = 0; // スクロール固定時の保存位置

  // -----------------------
  // open: サムネ（.sec__img）をクリック → 対応する .moreModal__box を開く
  // (元の挙動を委譲で安全に)
  // -----------------------
  $(document).on('click', '.sec__img', function (e) {
    e.preventDefault();
    const img = $(this).data('img');

    // 一致する data-box を探し、該当 index を currentIndex に設定して開く
    $modalBoxes.each(function (index) {
      const box = $(this).data('box');
      if (box == img) {
        currentIndex = index; // ★ 開いたモーダルの番号を記録
        $modalBoxes.removeClass('on'); // 前のonをクリア（安全対策）
        $(this).addClass('on');
        $('.moreModal').addClass('on');
        $('.bg').addClass('on');

        // -----------------------
        // スクロール禁止（body固定）
        // -----------------------
        savedScrollY = $(window).scrollTop();
        const Btop = savedScrollY * -1;
        $('body')
          .addClass('modal-lock')
          .css('top', Btop + 'px');

        return false; // each を抜ける
      }
    });
  });

  // -----------------------
  // close: 背景（.bg）or close ボタンで閉じる
  // -----------------------
  $(document).on('click', '.bg, .moreModal__close', function (e) {
    e.preventDefault();
    closeModal();
  });

  // -----------------------
  // --- ADDED: prev / next 共通ボタン（.moreModal の直下に設置想定）
  // クリックは委譲で受け、stopPropagation() で背景クリック処理と干渉しない
  // -----------------------
  $(document).on('click', '.moreModal .next', function (e) {
    e.preventDefault();
    e.stopPropagation(); // ★ 背景クリックで閉じる処理への伝播を止める（重要）
    if ($modalBoxes.length === 0) return;

    // 現在のモーダルを閉じてインデックス更新 → 新しいモーダルを開く
    $modalBoxes.eq(currentIndex).removeClass('on');
    currentIndex = (currentIndex + 1) % $modalBoxes.length;
    $modalBoxes.eq(currentIndex).addClass('on');

    // 対応する .sec__img までページを移動（モーダルは開いたまま）
    safeScrollToSecImg(currentIndex);
  });

  $(document).on('click', '.moreModal .prev', function (e) {
    e.preventDefault();
    e.stopPropagation(); // ★ 背景クリック処理と干渉させない
    if ($modalBoxes.length === 0) return;

    $modalBoxes.eq(currentIndex).removeClass('on');
    currentIndex = (currentIndex - 1 + $modalBoxes.length) % $modalBoxes.length;
    $modalBoxes.eq(currentIndex).addClass('on');

    safeScrollToSecImg(currentIndex);
  });
  // --- END ADDED prev/next ---

  // -----------------------
  // closeModal: モーダル閉じ処理を関数化（元の復元ロジックを統合）
  // -----------------------
  function closeModal() {
    $('.bg').removeClass('on');
    $('.moreModal').removeClass('on');
    $modalBoxes.removeClass('on');

    // body 固定解除 & 元のスクロール位置に戻す
    $('body').removeClass('modal-lock').css('top', '');
    $(window).scrollTop(savedScrollY);

    currentIndex = -1;
  }

  // -----------------------
  // --- ADDED: safeScrollToSecImg(index)
  // モーダル表示中（body が .modal-lock）でも安全に
  // 対応する .sec__img の位置までページを移動する（モーダルは開いたまま）
  // -----------------------
  function safeScrollToSecImg(index) {
    const boxName = $modalBoxes.eq(index).data('box'); // ex: "img_01"
    const $target = $(`.sec__img[data-img="${boxName}"]`);
    if (!$target.length) return;

    const targetTop = $target.offset().top;

    // body が固定されている場合の手順：
    // 1) 一時的にロック解除してページを直接移動
    // 2) savedScrollY を更新してから再ロックする
    if ($('body').hasClass('modal-lock')) {
      // ロック解除
      $('body').removeClass('modal-lock').css('top', '');
      // 目的位置へ瞬間移動（アニメーションだとずれる可能性があるため瞬間）
      $(window).scrollTop(targetTop);
      // savedScrollY 更新
      savedScrollY = targetTop;
      // 再ロック（body の top は -savedScrollY px にする）
      $('body')
        .addClass('modal-lock')
        .css('top', -savedScrollY + 'px');
      return;
    }

    // ロックされていない場合はスムーススクロール
    $('html, body').animate({ scrollTop: targetTop }, 400);
  }
  // --- END safeScrollToSecImg ---

  // -----------------------
  // Optional: キーボード操作（Escで閉じる / ← → で前後移動）
  // （必要なら有効化してください。不要ならこのブロックを削除）
  // -----------------------
  $(document).on('keydown', function (e) {
    if (currentIndex === -1) return; // モーダル非表示時は無効
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      // next
      $('.moreModal .next').trigger('click');
    } else if (e.key === 'ArrowLeft') {
      // prev
      $('.moreModal .prev').trigger('click');
    }
  });
  // -----------------------
}); // end jQuery ready
