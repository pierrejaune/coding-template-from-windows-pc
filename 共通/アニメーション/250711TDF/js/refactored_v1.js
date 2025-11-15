// モーダル箇所
document.addEventListener('DOMContentLoaded', () => {
  class ModalManager {
    constructor() {
      this.fixedContent = document.querySelector('.fixed-content');
      this.scrollPosition = 0;

      this.init();
    }

    init() {
      if (!this.fixedContent) return;

      // モーダルを開くトリガー（data-modal-numを持つ要素）
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-num]');
        if (trigger) {
          const modalClass = trigger.dataset.modalNum;
          const targetModal = document.querySelector(`.${modalClass}`);
          if (targetModal) this.open(targetModal);
        }
      });

      // 閉じる処理（背景クリック or .modal-close）
      this.fixedContent.addEventListener('click', (e) => {
        if (
          e.target.classList.contains('modal-close') ||
          !e.target.closest('.modal-content_box')
        ) {
          this.close();
        }
      });
    }

    open(targetModal) {
      // 現在のスクロール位置を記録
      this.scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      // body固定＋スクロール停止
      document.body.classList.add('modal-lock');
      document.body.style.top = `-${this.scrollPosition}px`;

      // 表示切替
      this.fixedContent.classList.add('modal-open');
      document.querySelectorAll('.modal-box').forEach((box) => {
        box.classList.remove('modal-num-open');
      });
      targetModal.classList.add('modal-num-open');
    }

    close() {
      // モーダル非表示
      this.fixedContent.classList.remove('modal-open');
      document.body.classList.remove('modal-lock');
      document.body.style.top = '';

      // スクロール位置復元
      window.scrollTo({ top: this.scrollPosition });

      // 少し遅れて中身も非表示（アニメーション終了後）
      setTimeout(() => {
        document
          .querySelectorAll('.modal-box')
          .forEach((box) => box.classList.remove('modal-num-open'));
      }, 400);
    }
  }

  // 初期化
  new ModalManager();
});
