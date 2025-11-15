// 前後ボタン付き
document.addEventListener('DOMContentLoaded', () => {
  const fixedContent = document.querySelector('.fixed-content');
  let scrollPosition = 0;
  let currentIndex = 0; // 現在のモーダル番号を保持
  let modalBoxes = Array.from(document.querySelectorAll('.modal-box'));

  // モーダルを開く処理
  const openModal = (index) => {
    scrollPosition = window.scrollY || document.documentElement.scrollTop;

    document.body.classList.add('modal-lock');
    document.body.style.top = `-${scrollPosition}px`;

    modalBoxes.forEach((box) => box.classList.remove('modal-num-open'));
    modalBoxes[index].classList.add('modal-num-open');
    fixedContent.classList.add('modal-open');

    currentIndex = index; // 現在のインデックスを更新
  };

  // モーダルを閉じる処理
  const closeModal = () => {
    fixedContent.classList.remove('modal-open');
    document.body.classList.remove('modal-lock');
    document.body.style.top = '';

    // 現在表示中だったモーダルのクラスを取得
    const currentModal = modalBoxes[currentIndex];
    const modalClass = currentModal.classList.contains('modal-box')
      ? [...currentModal.classList].find((c) => c.startsWith('modal_'))
      : null;

    // モーダル非表示（少し遅延してリセット）
    setTimeout(() => {
      modalBoxes.forEach((box) => box.classList.remove('modal-num-open'));
    }, 400);

    // スクロール位置を復元 → 対応する.main__Itemまで移動
    if (modalClass) {
      const targetItem = document.querySelector(
        `[data-modal-num="${modalClass}"]`
      );
      if (targetItem) {
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // 通常復元
        window.scrollTo({ top: scrollPosition, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    }
  };

  // 次のモーダルへ
  const showNext = () => {
    const nextIndex = (currentIndex + 1) % modalBoxes.length;
    openModal(nextIndex);
  };

  // 前のモーダルへ
  const showPrev = () => {
    const prevIndex =
      (currentIndex - 1 + modalBoxes.length) % modalBoxes.length;
    openModal(prevIndex);
  };

  // トリガークリックでモーダルを開く
  document.querySelectorAll('[data-modal-num]').forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      const modalClass = trigger.dataset.modalNum;
      const targetIndex = modalBoxes.findIndex((box) =>
        box.classList.contains(modalClass)
      );
      if (targetIndex !== -1) openModal(targetIndex);
    });
  });

  // 閉じるボタン
  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  // 前へボタン
  document.querySelectorAll('.prev').forEach((btn) => {
    btn.addEventListener('click', showPrev);
  });

  // 次へボタン
  document.querySelectorAll('.next').forEach((btn) => {
    btn.addEventListener('click', showNext);
  });

  // モーダル背景クリックで閉じる
  fixedContent.addEventListener('click', (e) => {
    const isModalBox = e.target.closest('.modal-content_box');
    const isCloseBtn = e.target.classList.contains('modal-close');
    const isPrevBtn = e.target.classList.contains('prev');
    const isNextBtn = e.target.classList.contains('next');

    // 背景クリック、または .modal-close を押した時のみ閉じる
    if ((!isModalBox && !isPrevBtn && !isNextBtn) || isCloseBtn) {
      closeModal();
    }
  });
});
