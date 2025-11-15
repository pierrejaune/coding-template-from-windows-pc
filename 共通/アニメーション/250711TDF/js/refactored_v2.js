// 前後ボタン付き
document.addEventListener('DOMContentLoaded', () => {
  class ModalManager {
    constructor() {
      this.fixedContent = document.querySelector('.fixed-content');
      this.scrollPosition = 0;
      this.modals = Array.from(document.querySelectorAll('.modal-box'));
      this.currentIndex = -1;

      this.init();
    }

    init() {
      if (!this.fixedContent) return;

      // サムネイルクリックでモーダルを開く
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-num]');
        if (trigger) {
          const modalClass = trigger.dataset.modalNum;
          const targetIndex = this.modals.findIndex((m) =>
            m.classList.contains(modalClass)
          );
          if (targetIndex >= 0) this.open(targetIndex);
        }
      });

      // 共通ボタン（閉じる / 前後）の処理
      this.fixedContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-close')) {
          this.close(); // 閉じる
        } else if (e.target.classList.contains('prev')) {
          this.prev(); // 前のモーダルへ
        } else if (e.target.classList.contains('next')) {
          this.next(); // 次のモーダルへ
        } else if (!e.target.closest('.modal-content_box')) {
          this.close(); // 背景クリックでも閉じる
        }
      });
    }

    // モーダルを開く処理
    open(index) {
      this.scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      document.body.classList.add('modal-lock');
      document.body.style.top = `-${this.scrollPosition}px`;

      this.currentIndex = index;
      this.fixedContent.classList.add('modal-open');

      this.modals.forEach((box, i) => {
        box.classList.toggle('modal-num-open', i === this.currentIndex);
      });

      this.scrollToImage(index);
    }

    // モーダルを閉じる処理
    close() {
      this.fixedContent.classList.remove('modal-open');
      document.body.classList.remove('modal-lock');
      document.body.style.top = '';

      window.scrollTo({ top: this.scrollPosition });

      setTimeout(() => {
        this.modals.forEach((box) => box.classList.remove('modal-num-open'));
      }, 400);

      this.currentIndex = -1;
    }

    // 前のモーダルへ
    prev() {
      if (this.currentIndex < 0) return;
      const prevIndex =
        (this.currentIndex - 1 + this.modals.length) % this.modals.length;
      this.switchModal(prevIndex);
    }

    // 次のモーダルへ
    next() {
      if (this.currentIndex < 0) return;
      const nextIndex = (this.currentIndex + 1) % this.modals.length;
      this.switchModal(nextIndex);
    }

    // モーダル切替え処理
    switchModal(newIndex) {
      this.modals[this.currentIndex].classList.remove('modal-num-open');
      this.currentIndex = newIndex;
      this.modals[this.currentIndex].classList.add('modal-num-open');
      this.scrollToImage(newIndex);
    }

    // サムネイル画像位置までスクロール（背景固定を維持したまま）
    scrollToImage(index) {
      const modalClass = this.modals[index].classList[1]; // "modal_01" など
      const relatedImage = document.querySelector(
        `[data-modal-num="${modalClass}"]`
      );
      if (relatedImage) {
        relatedImage.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    }
  }

  new ModalManager();
});
